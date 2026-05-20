const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./configs/db");
const apiRoutes = require("./api.routes");
const http = require("http");
const { Server } = require("socket.io");
const Chat = require("./models/chat.model");
const seedAdmin = require("./configs/seedAdmin");

const PORT = process.env.PORT;
const server = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log("User connected:", socket.id)

    socket.on("user_join", (name) => {
        io.emit("user_joined", `${name} joined the chat.`)
    })

    socket.on("send_message", async (data) => {
        const newChat = await Chat.create({
            sender: data.sender,
            message: data.message
        })
        const populatedChat = await Chat.findById(newChat._id)
            .populate("sender")

        io.emit("receive_message", populatedChat)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected")
    })
})

app.use("/", apiRoutes)

app.use(function (req, res, next) {
    next({
        msg: "Not Found",
        status: 404,
    })
})

app.use(function (err, req, res, next) {
    res.status(err.status || 400)
    res.json({
        msg: err.msg || err,
        status: err.status || 400
    })
})

seedAdmin();

server.listen(PORT, (err, done) => {
    if (err) {
        console.log("error is: ", err);
    }
    else {
        console.log("server listening at port: ", PORT);
    }
})