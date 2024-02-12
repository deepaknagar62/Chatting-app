import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
const addUser = (userData, socketID) => {
  !users.some(
    (user) => user._id === userData._id && users.push(...userData, socketID)
  );
};

const getUser = (userID)=>{
    return users.find(user => user._id === userID);
}

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("addUsers", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });
  socket.on("sendMessage",(data) => {
    const user = getUser(data.recieverID);
    io.to(user.socketID).emit("getMessage",data);
  })
});
