const express = require("express");
const router = express.Router();
const Message = require("../models/Messages");
const User = require("../models/User");
const fetchUser = require("../middleware/authenticateJWT");

// Search for users by name
router.get("/search", fetchUser, async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ success: false, error: "Query is required" });

        const users = await User.find({ name: new RegExp(query, "i") }).select("name email _id");
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start a new chat and add to both users' chat list
router.post("/start", fetchUser, async (req, res) => {
    try {
        const { receiverId } = req.body;
        const senderId = req.user.id;

        if (!receiverId) return res.status(400).json({ success: false, error: "Receiver ID required" });

        const receiver = await User.findById(receiverId);
        if (!receiver) return res.status(404).json({ success: false, error: "User not found" });

        const sender = await User.findById(senderId);

        // Update sender's chat list
        if (!sender.chatList.includes(receiverId)) {
            sender.chatList.push(receiverId);
            await sender.save();
        }

        // Update receiver's chat list
        if (!receiver.chatList.includes(senderId)) {
            receiver.chatList.push(senderId);
            await receiver.save();
        }

        res.status(201).json({ success: true, message: "Chat started successfully." });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Send a message
router.post("/send", fetchUser, async (req, res) => {
    try {
        const { receiverId, message } = req.body;
        const senderId = req.user.id;

        if (!receiverId || !message.trim()) {
            return res.status(400).json({ success: false, error: "Receiver and message are required." });
        }

        // Save message in the database
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            createdAt: new Date(),
        });

        await newMessage.save();

        res.status(201).json({ success: true, message: "Message sent successfully.", data: newMessage });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Fetch messages between two users
router.get("/fetch/:userId", fetchUser, async (req, res) => {
    try {
        const { userId } = req.params;
        const senderId = req.user.id;

        const messages = await Message.find({
            $or: [{ senderId, receiverId: userId }, { senderId: userId, receiverId: senderId }],
        }).sort("createdAt");

        res.status(200).json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Fetch user's chat list
router.get("/chats", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate("chatList", "name email _id");
        res.status(200).json({ success: true, chats: user.chatList });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
