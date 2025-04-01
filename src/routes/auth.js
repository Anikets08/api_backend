import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/config/database.js";
import userQueries from "../db/queries/userQueries.js";

const authRouter = express.Router();
// Register
authRouter.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please provide username and password" });
    }

    // Check if user already exists
    db.get(userQueries.checkUserExists, [username], async (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error checking user existence" });
      }

      if (user) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert new user
      db.run(
        userQueries.createUser,
        [username, hashedPassword],
        function (err) {
          if (err) {
            return res.status(500).json({ message: "Error creating user" });
          }
          res.status(201).json({
            message: "User created successfully",
            userId: this.lastID,
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please provide username and password" });
    }

    // Find user
    db.get(userQueries.getUserByUsername, [username], async (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Error finding user" });
      }

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        token,
        expiresIn: 604800, // 7 days in seconds
        user: {
          id: user.id,
          username: user.username,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default authRouter;
