import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import chatRoutes from "./routes/chatRouter.js";
import messageRoutes from "./routes/messageRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    console.log("socket", userData);
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    // if (!chat.users) return console.log("chat.users not defined");

    if (chat?.user?._id === newMessageRecieved.sender._id)
      socket.in(chat?.doctor?._id).emit("message recieved", newMessageRecieved);
    else if (chat?.doctor?._id === newMessageRecieved.sender._id)
      socket.in(chat?.user?._id).emit("message recieved", newMessageRecieved);
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
