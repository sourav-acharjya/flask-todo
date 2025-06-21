import os
from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///tasks.db').replace('postgres://', 'postgresql://')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    position = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f'<Task {self.id}>'

@app.route('/')
def index():
    tasks = Task.query.order_by(Task.position).all()
    total_tasks = Task.query.count()
    completed_tasks = Task.query.filter_by(completed=True).count()
    pending_tasks = total_tasks - completed_tasks
    progress_percent = int((completed_tasks / total_tasks) * 100) if total_tasks > 0 else 0
    
    return render_template('index.html', 
                           tasks=tasks, 
                           total_tasks=total_tasks,
                           completed_tasks=completed_tasks,
                           pending_tasks=pending_tasks,
                           progress_percent=progress_percent)

@app.route('/add', methods=['POST'])
def add():
    content = request.form['content']
    max_position = db.session.query(db.func.max(Task.position)).scalar() or 0
    new_task = Task(content=content, position=max_position + 1)
    db.session.add(new_task)
    db.session.commit()
    return redirect(url_for('index'))

@app.route('/complete/<int:id>', methods=['POST'])
def complete(id):
    task = Task.query.get_or_404(id)
    task.completed = not task.completed
    db.session.commit()
    return jsonify({'success': True, 'completed': task.completed})

@app.route('/delete/<int:id>', methods=['POST'])
def delete(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'success': True})

@app.route('/reorder', methods=['POST'])
def reorder():
    order = request.json.get('order')
    for index, task_id in enumerate(order):
        task = Task.query.get(task_id)
        if task:
            task.position = index
    db.session.commit()
    return jsonify({'success': True})

@app.route('/clear_completed', methods=['POST'])
def clear_completed():
    Task.query.filter_by(completed=True).delete()
    db.session.commit()
    return jsonify({'success': True})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)