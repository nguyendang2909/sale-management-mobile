import { ScrollView } from '@gluestack-ui/themed';
import React from 'react';
import { UserProfile } from 'src/containers/UserProfile';
import { AppStackScreenProps } from 'src/types';

type ChatProfileProps = AppStackScreenProps<'ChatProfile'>;

export const ChatProfileScreen: React.FC<ChatProfileProps> = props => {
  const profile = props.route.params.profile;

  return (
    <>
      <ScrollView flex={1} backgroundColor="$backgroundLight100">
        <UserProfile profile={profile} />
      </ScrollView>
    </>
  );
};
