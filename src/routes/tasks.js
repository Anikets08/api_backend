import express from "express";
import db from "../db/config/database.js";
import auth from "../middleware/auth.js";
import taskQueries from "../db/queries/taskQueries.js";

const taskRouter = express.Router();
// Get all tasks for the logged-in user
taskRouter.get("/", auth, (req, res) => {
  db.all(taskQueries.getAllTasks, [req.user.id], (err, tasks) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching tasks" });
    }
    res.json(tasks);
  });
});

// Create a new task
taskRouter.post("/", auth, (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  db.run(
    taskQueries.createTask,
    [req.user.id, title, description || null, status || "pending"],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Error creating task" });
      }
      res.status(201).json({
        message: "Task created successfully",
        taskId: this.lastID,
      });
    }
  );
});

// Update a task
taskRouter.put("/:id", auth, (req, res) => {
  const { title, description, status } = req.body;
  const taskId = req.params.id;

  // First check if task exists and belongs to user
  db.get(taskQueries.getTaskById, [taskId, req.user.id], (err, task) => {
    if (err) {
      return res.status(500).json({ message: "Error checking task" });
    }

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update task
    db.run(
      taskQueries.updateTask,
      [
        title || task.title,
        description || task.description,
        status || task.status,
        taskId,
        req.user.id,
      ],
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Error updating task" });
        }
        res.json({ message: "Task updated successfully" });
      }
    );
  });
});

// Delete a task
taskRouter.delete("/:id", auth, (req, res) => {
  const taskId = req.params.id;

  db.run(taskQueries.deleteTask, [taskId, req.user.id], function (err) {
    if (err) {
      return res.status(500).json({ message: "Error deleting task" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  });
});

export default taskRouter;
