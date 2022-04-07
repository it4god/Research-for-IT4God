import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

io.on("connection", (socket) => {
    console.log("a user connected :D");
    socket.on("chat", (msg) => {
        console.log(msg);
        io.emit("chat", msg);
    });
});
const PORT = Number(process.env.PORT) || 3000;
console.log(PORT) 

httpServer.listen(PORT);
/*
io.on("connection", (socket) => {

});

*/