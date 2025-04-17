import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
import User from '../models/User.model.js';
import generateToken from "../utils/jwtsign.js"


class AuthController {
    static async register(req, res) {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            const { username, email, password } = req.body;
            
            if (!(username && email && password)) {
                throw new Error("Fill all fields (username, email, password)");
            }

            const existingEmail = await User.findOne({ email: email });
            const existingUsername = await User.findOne({ username: username });
            
            if (existingEmail || existingUsername) {
                throw new Error("Username/Email already taken");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const newUser = await User.create([{
                username,
                email,
                password: hashedPassword,
                joining_date: new Date()
            }], { session });

            const token = generateToken(newUser[0]);
            
            await session.commitTransaction();
            res.status(201).json({
                message: "Success",
                data: {
                    user: newUser[0],
                    token: token
                }
            });
        } catch (error) {
            await session.abortTransaction();
            res.status(400).json({
                message: error.message || "Registration failed"
            });
        } finally {
            await session.endSession();
        }
    }   

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            
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

            const token = generateToken(user);
            res.status(200).json({
                message: "Login successful",
                data: {
                    user: user,
                    token: token
                }
            });
            
        } catch (error) {
            res.status(401).json({
                message: error.message || "Login failed"
            });
        }
    }
}

export default AuthController