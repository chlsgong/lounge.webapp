export const selectLounge = state => state.lounge;
export const selectLoungeRooms = state => selectLounge(state).rooms;
export const selectActiveLoungeRoom = state => selectLounge(state).activeRoom;
export const selectActiveLoungeRoomId = state => selectActiveLoungeRoom(state).loungeId;
export const selectActiveLoungeRoomName = state => selectActiveLoungeRoom(state).name;
export const selectActiveLoungeRefreshToken = state => selectActiveLoungeRoom(state).auth.refreshToken;
export const selectActiveLoungeAccessToken = state => selectActiveLoungeRoom(state).auth.accessToken;
export const selectIsJoiningLounge = state => selectLounge(state).isJoining;
export const selectErrorJoining = state => selectLounge(state).errorJoining;
