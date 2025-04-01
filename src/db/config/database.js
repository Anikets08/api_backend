import sqlite3 from "sqlite3";
import userQueries from "../queries/userQueries.js";
import taskQueries from "../queries/taskQueries.js";

const db = new sqlite3.Database(
  "./database.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to SQLite database.");
  }
);

// Create tables
db.serialize(() => {
  // Users table
  db.run(userQueries.createTableUsers);

  // Tasks table
  db.run(taskQueries.createTableTasks);
});

export default db;
