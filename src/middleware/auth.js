import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // Extract token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "No authentication token, access denied",
        error: "TOKEN_MISSING",
        shouldLogout: true,
      });
    }

    try {
      // Verify token
      const verified = jwt.verify(token, process.env.JWT_SECRET);

      // Check if token is about to expire
      const tokenExp = verified.exp * 1000; // Convert to milliseconds
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;

      if (tokenExp - now < fiveMinutes) {
        // Token is about to expire
        res.set("X-Token-Expiring", "true");
      }

      req.user = verified;
      next();
    } catch (err) {
      // Handle different JWT errors
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token has expired. Please login again.",
          error: "TOKEN_EXPIRED",
          shouldLogout: true,
        });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Invalid token. Please login again.",
          error: "TOKEN_INVALID",
          shouldLogout: true,
        });
      } else {
        return res.status(401).json({
          message: "Token verification failed",
          error: "TOKEN_VERIFICATION_FAILED",
          shouldLogout: true,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error during authentication",
      error: "AUTH_ERROR",
      shouldLogout: true,
    });
  }
};

export default auth;
