import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export const socketConfig = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log(socket.id, "Connected");

        socket.on("disconnect", () => {
            console.log(socket.id, "Disconnected");
        });
    });
};

export const getIO = () => {
    if (!io) {
        console.log("Socket not initialized");
    }

    return io;
};