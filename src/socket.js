import socketIOClient from 'socket.io-client';
import config from './config';
import { loungeClosed } from './redux/lounge/extraActions';

let socket;
let hasJoinedRoom;

export const connect = dispatch => {
  if (socket) return;

  socket = socketIOClient(config.server.URL);
  registerHandlers(dispatch);
};

export const openRoom = loungeId => {
  if (!socket && hasJoinedRoom) return;

  socket.emit('open-lounge', { loungeId });
  hasJoinedRoom = true;
};

export const joinRoom = loungeId => {
  if (!socket && hasJoinedRoom) return;

  socket.emit('join-lounge', { loungeId });
  hasJoinedRoom = true;
};

export const closeRoom = loungeId => {
  if (!socket && !hasJoinedRoom) return;

  socket.emit('close-lounge', { loungeId });
  hasJoinedRoom = false;
};

const registerHandlers = dispatch => {
  if (!socket) return;

  socket.on('connect', _ => {	
    console.log('Connected to server!');	
  });

  socket.on('connect_error', error => {
    console.log('Error connecting to server', error);
  });

  socket.on('disconnect', reason => {
    console.log('disconnect reason', reason);

    if (reason === 'io server disconnect') {
      hasJoinedRoom = false;
      // leave the room page
      dispatch(loungeClosed());
    }
  });

  socket.on('lounge-closed', _ => {
    console.log('lounge closed by host');

    hasJoinedRoom = false;
    // leave the room page
    dispatch(loungeClosed());
  });
};
