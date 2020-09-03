export const selectLounge = state => state.lounge;
export const selectLoungeRooms = state => selectLounge(state).rooms;
