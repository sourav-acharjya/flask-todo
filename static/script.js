new Sortable(document.getElementById("taskList"), {
  animation: 150,
  ghostClass: "dragging",

  onEnd: (evt) => {
    const order = Array.from(
      document.querySelectorAll(".task-item")
    ).map((item) => item.dataset.id);

    fetch("/reorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ order }),
    });
  },
});


document.querySelectorAll(".task-item").forEach((task) => {
  const checkbox = task.querySelector(".fa-check");
  const parent = checkbox.parentElement;

  parent.addEventListener("click", function () {
    const taskId = task.dataset.id;
    toggleComplete(taskId);
  });
});


function toggleComplete(id) {
  fetch(`/complete/${id}`, {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
}


function editTask(id) {
  const taskItem = document.querySelector(`.task-item[data-id="${id}"]`);

  const titleElement = taskItem.querySelector(".task-title");

  const oldTitle = titleElement.textContent.trim();

  const newTitle = prompt("Edit your task:", oldTitle);

  if (newTitle === null) {
    return;
  }

  if (newTitle.trim() === "") {
    alert("Task cannot be empty.");
    return;
  }

  fetch(`/edit/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({
      content: newTitle.trim(),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        titleElement.textContent = newTitle.trim();
      } else {
        alert(data.message || "Failed to update task.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong.");
    });
}

function deleteTask(id) {
  const taskItem = document.querySelector(
    `.task-item[data-id="${id}"]`
  );

  taskItem.classList.add("fade-out");

  setTimeout(() => {
    fetch(`/delete/${id}`, {
      method: "POST",

      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((response) => response.json())

      .then((data) => {
        if (data.success) {
          taskItem.remove();

          // Show empty state
          if (
            document.querySelectorAll(".task-item").length === 0
          ) {
            document
              .getElementById("emptyState")
              .classList.remove("hidden");
          }

          // Update statistics
          location.reload();
        } else {
          alert("Failed to delete task.");
        }
      })

      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong.");
      });
  }, 300);
}

function filterTasks(type) {

  // Remove active from all buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Set active button
  if (type === "all") {
    document
      .querySelector(".filter-btn:nth-child(1)")
      .classList.add("active");

  } else if (type === "active") {
    document
      .querySelector(".filter-btn:nth-child(2)")
      .classList.add("active");

  } else if (type === "completed") {
    document
      .querySelector(".filter-btn:nth-child(3)")
      .classList.add("active");
  }

  // Filter tasks
  document.querySelectorAll(".task-item").forEach((task) => {

    const completed = task.dataset.completed === "true";

    if (type === "all") {
      task.style.display = "flex";

    } else if (type === "active") {
      task.style.display = completed ? "none" : "flex";

    } else if (type === "completed") {
      task.style.display = completed ? "flex" : "none";
    }
  });
}


function clearCompleted() {

  fetch("/clear_completed", {
    method: "POST",

    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => response.json())

    .then((data) => {

      if (data.success) {

        document
          .querySelectorAll(".task-item")
          .forEach((task) => {

            if (task.dataset.completed === "true") {

              task.classList.add("fade-out");

              setTimeout(() => {
                task.remove();
              }, 300);
            }
          });

        setTimeout(() => {
          location.reload();
        }, 300);
      }
    });
}

