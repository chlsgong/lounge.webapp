import io from "socket.io-client";

import config from './config';

export const createSocketHandlers = () => {
  const socket = io(config.server.URL);

  socket.on('connect', data => {
    console.log('Connected to server!');
  });

  return socket;
}
