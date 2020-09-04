export const selectLounge = state => state.lounge;
export const selectLoungeRooms = state => selectLounge(state).rooms;
export const selectActiveLoungeRoom = state => selectLounge(state).activeRoom;
