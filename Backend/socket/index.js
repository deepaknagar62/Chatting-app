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

  socket.on("addUsers", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", (data) => {
    const recipient = getUser(data.recieverID);
    if (recipient) {
      io.to(recipient.socketID).emit("getMessage", data);
    } else {
      console.log("Recipient not found");
    }
  });
});
