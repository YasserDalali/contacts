import User from "../models/User.model";
import bcrypt from "bcrypt";

class UserService {
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  static async validateUser({ username, email, password }) {
    if (!(username && email && password)) {
      throw new Error("Fill all fields (username, email, password)");
    }

    const existingEmail = await User.findOne({ email: email });

    const existingUsername = await User.findOne({ username: username });

    if (existingEmail || existingUsername) {
      throw new Error("Username/Email already taken");
    }
  }

  static async findUserByEmail(email, password) {
    if (!(email && password)) {
      throw new Error("Fill all fields (email, password)");
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("No user found");
    }

    const passValid = await bcrypt.compare(password, user.password);
    if (!passValid) {
      throw new Error("Invalid password");
    }

    return user;
  }
}

export default UserService;
