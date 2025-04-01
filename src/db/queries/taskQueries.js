const taskQueries = {
  // Get all tasks for a user
  getAllTasks: "SELECT * FROM tasks WHERE user_id = ?",

  // Create new task
  createTask:
    "INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)",

  // Get task by ID and user ID
  getTaskById: "SELECT * FROM tasks WHERE id = ? AND user_id = ?",

  // Update task
  updateTask:
    "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?",

  // Delete task
  deleteTask: "DELETE FROM tasks WHERE id = ? AND user_id = ?",

  // create table tasks
  createTableTasks:
    "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, title TEXT NOT NULL, description TEXT, status TEXT CHECK(status IN ('pending', 'in-progress', 'completed')) DEFAULT 'pending', created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id))",
};

export default taskQueries;
