import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


export const signInControllers = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist with provided email id" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Credentials' });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token });
        console.log(token);
        // Continue with the rest of your code here
    } catch (error) {
        // Handle any errors that occurred during the database query
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const signUpCOntrollers = async (req, res) => {
    const { firstName, lastName, email, password, confirmpassword } = req.body;
    console.log("ok it won't work")
    console.log(req.body,"body of request")
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(403).json({ message: "User Already Exists" });

        if (password !== confirmpassword) return res.status(400).json({ message: 'Passwords are not the same. Please check!!!' });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });

        res.status(200).json({ result, token });
        console.log(token, 'is from backend of controllers/users');
    } catch (error) {
        // Handle any errors that occurred during the database query
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
