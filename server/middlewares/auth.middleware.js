import jwt from "jsonwebtoken";
import mongoose from "mongoose"; // required for ObjectId comparison
import { JWT_SECRET } from "../config/config.js";
import User from "../models/User.model.js";

class AuthMiddleware {
  // Middleware checks if the request has a valid JWT token in the Authorization header
  // If valid, it decodes the token and attaches the user information to the request object
  // This middleware is used to protect routes that require authentication
  // and to ensure that the user is authorized to perform certain actions
  static async authz(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token, please sign-in first before performing this operation." });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      req.user = user;

      console.log("\x1b[33m%s\x1b[0m", "---------------------------------------");
      console.log("action done by user:", user.username); // Debugging line to check the user details

      next();
    } catch (err) {
      return res.status(401).json({ error: `Invalid token, ${err}` });
    }
  }

/*   static checkOwnerById(req, res, next) {
    const userId = req.user.userId;
    const resOwnerId = req.params.userId;

    if (!mongoose.Types.ObjectId(userId).equals(resOwnerId)) {
      return res.status(403).json({ error: "Forbidden: not the owner" });
    }

    next();
  } */
}

export default AuthMiddleware;
