import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/hooks';
import { disconnectWebSocket, getSocket, socketStoreActions } from 'src/store/socket.store';

export const ConnectSocket: React.FC = () => {
  const dispatch = useDispatch();
  const accessToken = useAppSelector(state => state.app.accessToken);
  const userId = useAppSelector(state => state.app.user.id);

  React.useEffect(() => {
    if (accessToken && userId) {
      const socket = getSocket();
      if (!socket || !socket.connected) {
        dispatch(socketStoreActions.initializeWebSocket());
      }
    }

    return () => {
      disconnectWebSocket();
    };
  }, [dispatch, accessToken, userId]);

  return <></>;
};
