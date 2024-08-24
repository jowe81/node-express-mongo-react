import express from 'express';
import dotenv from 'dotenv';
import { protect } from '../middleware/auth.js';
import { getBackendModel } from "../db/getModel.js";

dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
    const { accountType, email, password } = req.body;
    try {
        const User = await getBackendModel("UserGlobal");        
        const user = await User.create({ accountType, email, password });
        res.json({success: true, data: { email }});
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const User = await getBackendModel('UserGlobal');
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            // Login successful.
            res.json({success: true, data: { email }});
        } else {
            res.status(401).json({ message: "Invalid credentials." });
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
});

router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
});

export default router;
