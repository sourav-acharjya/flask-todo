# Todo App

A simple and responsive Todo application built with **Flask**, **SQLite**, **SQLAlchemy**, **HTML**, **Tailwind CSS**, and **JavaScript**.

## Features

* Add new tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed
* Filter tasks:

  * All
  * Active
  * Completed
* Drag and drop task reordering
* Clear all completed tasks
* Persistent task storage using SQLite
* Responsive user interface
* AJAX-based task actions without unnecessary page navigation

## Tech Stack

* **Backend:** Python, Flask
* **Database:** SQLite
* **ORM:** Flask-SQLAlchemy
* **Frontend:** HTML, Tailwind CSS
* **JavaScript:** Vanilla JavaScript
* **Icons:** Font Awesome
* **Drag & Drop:** SortableJS
* **Production Server:** Gunicorn

## Project Structure

```text
todo-app/
│
├── app.py
├── requirements.txt
├── Procfile
├── README.md
│
├── templates/
│   └── index.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── script.js
│
└── instance/
    └── todo.db
```

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd todo-app
```

### 2. Create a virtual environment

Windows:

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the application

```bash
python app.py
```

The application will be available at:

```text
http://127.0.0.1:5000
```

or:

```text
http://localhost:5000
```

## Usage

### Add a Task

Enter a task in the input field and submit it to add a new task.

### Complete a Task

Click the check button next to a task to mark it as completed or active.

### Edit a Task

Click the pencil icon to edit the task content.

### Delete a Task

Click the trash icon to delete a task.

### Reorder Tasks

Drag and drop tasks to change their order.

### Filter Tasks

Use the filter buttons to display:

* All tasks
* Active tasks
* Completed tasks

### Clear Completed Tasks

Use the **Clear Completed** option to remove all completed tasks.

## API Routes

| Method | Route              | Purpose                |
| ------ | ------------------ | ---------------------- |
| `GET`  | `/`                | Display tasks          |
| `POST` | `/add`             | Add a task             |
| `POST` | `/edit/<id>`       | Edit a task            |
| `POST` | `/delete/<id>`     | Delete a task          |
| `POST` | `/complete/<id>`   | Toggle task completion |
| `POST` | `/reorder`         | Update task order      |
| `POST` | `/clear_completed` | Delete completed tasks |

## Production

For production deployment, the application can be served using Gunicorn.

The `Procfile` contains:

```text
web: gunicorn app:app
```

Here:

* `app` before `:` refers to `app.py`
* `app` after `:` refers to the Flask application object

## Requirements

Example `requirements.txt`:

```text
Flask
Flask-SQLAlchemy
gunicorn
```

Install them with:

```bash
pip install -r requirements.txt
```

## Future Improvements

* User authentication
* Task due dates
* Task priorities
* Categories and tags
* Search functionality
* Dark mode
* Task notifications
* REST API
* PostgreSQL support

## License

This project is for learning and personal use.


You can save that directly as **`README.md`** in the root of your project, alongside `app.py` and `requirements.txt`.
```
