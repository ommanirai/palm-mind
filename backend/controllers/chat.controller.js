const Chat = require("../models/chat.model");
const User = require("../models/user.model");

const getAllChat = async (req, res, next) => {
    try {
        const chat = await Chat.find().populate("sender");
        if (!chat.length) {
            return next({
                msg: "No chats found.",
                status: 400
            })
        }
        res.json({
            data: chat,
            status: 200
        })
    }
    catch (err) {
        return next(err)
    }
}

const getStats = async (req, res, next) => {
    try {
        const totalChats = await Chat.countDocuments()
        const totalUsers = await User.countDocuments()

        res.json({ totalChats, totalUsers })
    }
    catch (err) {
        return next(err)
    }
}

module.exports = { getAllChat, getStats }