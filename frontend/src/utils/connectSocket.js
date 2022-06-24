import io from "socket.io-client";

const server = "http://43.204.147.225:80";

let socket = io(server);
const openSocket = () => (socket = io(server));
const closeSocket = () => socket.close();

export { io, socket, server, openSocket, closeSocket };
