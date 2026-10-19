import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server | null = null;

export const socketConfig = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log(socket.id, "Connected");

        socket.on("join", (userId: string) => {
            if (userId) {
                socket.join(`user:${userId}`);
                console.log(`User ${userId} joined room user:${userId}`);
            }
        });

        socket.on("disconnect", () => {
            console.log(socket.id, "Disconnected");
        });
    });
};

export const getIO = () => {
    if (!io) {
       
        throw new Error("Socket.IO is not initialized. Call socketConfig() first.");
        
    }

    return io;
};