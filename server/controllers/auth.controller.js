import mongoose from "mongoose";
import User from "../models/User.model.js";
import generateToken from "../utils/jwtsign.js";

class AuthController {
  static async register(req, res) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const { username, email, password } = req.body;

      UserService.validateUser({ username, email, password });
      const hashedPassword = UserService.hashPassword(password);

      const newUser = await User.create(
        [
          {
            username,
            email,
            password: hashedPassword,
            joining_date: new Date(),
          },
        ],
        { session }
      );

      const token = generateToken(newUser[0]);

      await session.commitTransaction();
      res.status(201).json({
        message: "Success",
        data: {
          user: newUser[0],
          token: token,
        },
      });
    } catch (error) {
      await session.abortTransaction();
      res.status(400).json({
        message: error.message || "Registration failed",
      });
    } finally {
      await session.endSession();
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = UserService.findUserByEmail(email, password);

      const token = generateToken(user);
      res.status(200).json({
        message: "Login successful",
        data: {
          user: user,
          token: token,
        },
      });
    } catch (error) {
      res.status(401).json({
        message: error.message || "Login failed",
      });
    }
  }
}

export default AuthController;
