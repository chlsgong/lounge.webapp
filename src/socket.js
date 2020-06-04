import io from "socket.io-client";

// const ENDPOINT = "http://localhost:8080";
// const ENDPOINT = "http://34.72.202.89:8080";
const ENDPOINT = "https://chlsgong.com:8443";

export const createSocketHandlers = () => {
  const socket = io(ENDPOINT);

  socket.on("connect", data => {
    console.log('Connected to server!');
  });

  return socket;
}
