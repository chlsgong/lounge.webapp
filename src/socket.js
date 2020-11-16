import socketIOClient from 'socket.io-client';
import config from './config';

let socket;

export const connect = () => {
  socket = socketIOClient(config.server.URL);

  registerHandlers();
};

export const joinRoom = loungeId => {
  if (!socket) return;

  socket.emit('lounge-joined', { loungeId });
};

const registerHandlers = () => {
  if (!socket) return;

  socket.on('connect', _ => {	
    console.log('Connected to server!');	
  });

  socket.on('connect_error', (error) => {
    console.log('Error connecting to server');
  });
};
