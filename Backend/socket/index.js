import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
const addUser = (userData, socketID) => {
  !users.some((user) => user.userId === userData.userId) &&
    users.push({ ...userData, socketID });
};

const getUser = (userID) => {
  const user = users.find((user) => user.userId === userID);
  return user;
};

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("addUsers", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });
  socket.on("sendMessage", (data) => {
    const user = getUser(data.recieverID);
    io.to(user.socketID).emit("getMessage", data);
  });
});