import io from "socket.io-client";

const server = "http://steeldalal.com";

let socket = io();
const openSocket = () => (socket = io());
const closeSocket = () => socket.close();

export { io, socket, server, openSocket, closeSocket };
