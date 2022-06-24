import io from "socket.io-client";

const server = "http://localhost:80";

let socket = io();
const openSocket = () => (socket = io());
const closeSocket = () => socket.close();

export { io, socket, server, openSocket, closeSocket };
