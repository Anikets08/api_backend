const userQueries = {
  // Check if user exists
  checkUserExists: "SELECT * FROM users WHERE username = ?",

  // Create new user
  createUser: "INSERT INTO users (username, password) VALUES (?, ?)",

  // Get user by username
  getUserByUsername: "SELECT * FROM users WHERE username = ?",

  // Get user by ID
  getUserById: "SELECT * FROM users WHERE id = ?",

  // create table users
  createTableUsers:
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)",
};

export default userQueries;
