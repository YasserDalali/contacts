import jwt from "jsonwebtoken";
import mongoose from "mongoose"; // required for ObjectId comparison
import { JWT_SECRET } from "../config/config.js";

class AuthMiddleware {
  static authz(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  }

  static checkOwnerById(req, res, next) {
    const userId = req.user._id;
    const resOwnerId = req.params.userId;

    if (!mongoose.Types.ObjectId(userId).equals(resOwnerId)) {
      return res.status(403).json({ error: "Forbidden: not the owner" });
    }

    next();
  }
}

export default AuthMiddleware;
