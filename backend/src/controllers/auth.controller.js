import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

function sendTokenResponse(user, res, message = "user registered successfully") {
    const token = jwt.sign(
        { id: user._id },
        config.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token);

    res.status(200).json({
        msg: message,
        token,
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
            contact: user.contact,
            role: user.role
        }
    });
}

const registerController = async (req, res) => {
    const { email, contact, fullname, password, isSeller } = req.body;

    try {
        const existinguser = await userModel.findOne({
            $or: [{ email }, { contact }]
        });

        if (existinguser) {
            return res.status(400).json({
                msg: "user already exists with this email or contact number"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            email,
            password: hashedPassword,
            fullname,
            contact,
            role: isSeller ? "seller" : "buyer"
        });

        sendTokenResponse(user, res);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error occurred while registering user"
        });
    }
};



const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await userModel.findOne({ email });

        if (!userExists) {
            return res.status(400).json({ msg: "user not found with this email" });
        }

        const isMatch = await bcrypt.compare(password, userExists.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "invalid credentials" });
        }

        sendTokenResponse(userExists, res,"user logged in successfully");

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error occurred while logging in" });
    }
};


export default { registerController,loginController };