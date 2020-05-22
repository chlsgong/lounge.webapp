import io from "socket.io-client";

const ENDPOINT = "http://localhost:8080";

export const createSocketHandlers = () => {
  const socket = io(ENDPOINT);

  socket.on("connect", data => {
    console.log('Connected to server!');
  });

  return socket;
}
