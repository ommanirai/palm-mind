const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const ChatModel = mongoose.model("chat", chatSchema)
module.exports = ChatModel