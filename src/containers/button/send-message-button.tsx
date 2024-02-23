import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React from 'react';
import { useCreateMatchMutation, useGetMatchByTargetUserIdMutation } from 'src/api';
import { MessageIconButton } from 'src/components';
import { useAppDispatch } from 'src/hooks';
import { matchActions } from 'src/store/match';

type FCProps = {
  targetUserId?: string;
  onClose: () => void;
};

export const SendMessageButton: React.FC<FCProps> = ({ targetUserId, onClose }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [createMatch, { isLoading: isCreateMatchLoading }] = useCreateMatchMutation();
  const [getMatchByTargetUserId, { isLoading: isGetMatchLoading }] =
    useGetMatchByTargetUserIdMutation();

  const isLoading = isCreateMatchLoading || isGetMatchLoading;

  const handleGetMatch = async (targetUserId: string) => {
    try {
      const matchData = await getMatchByTargetUserId(targetUserId).unwrap();
      onClose();
      navigation.navigate('Messages', {
        matchId: matchData.data?._id,
        match: matchData.data,
      });
    } catch (err) {}
  };

  const handleChat = async () => {
    if (!targetUserId) {
      return;
    }
    try {
      const fetchData = await createMatch({
        targetUserId,
      }).unwrap();
      dispatch(matchActions.addMatch(fetchData));
      onClose();
      navigation.navigate('Messages', {
        matchId: fetchData.data?._id,
        match: fetchData.data,
      });
    } catch (error) {
      if (_.get(error, 'status') === 409) {
        return await handleGetMatch(targetUserId);
      }
    }
  };

  return <MessageIconButton onPress={handleChat} isLoading={isLoading} />;
};
