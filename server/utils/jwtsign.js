import { JWT_SECRET, JWT_EXPIRE } from "../config/config.js";
import jwt from 'jsonwebtoken'

const generateToken = (user) => {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
    });
    return token;
};

export default generateToken;