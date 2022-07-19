import io from "socket.io-client";

const server = "http://localhost:5000";

let socket = io();
const openSocket = () => (socket = io());
const closeSocket = () => socket.close();

export { io, socket, server, openSocket, closeSocket };
