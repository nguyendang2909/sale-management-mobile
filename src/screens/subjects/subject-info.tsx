import { FlatList, ScrollView, View } from '@gluestack-ui/themed';
import { useRoute } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Modal, NativeScrollEvent, NativeSyntheticEvent, RefreshControl } from 'react-native';
import { useGetSubjectProfilesQuery } from 'src/api';
import { ViewSafeArea } from 'src/components';
import { UserProfile } from 'src/containers/UserProfile';
import { NearbyUserActions } from 'src/pages/dating-nearby-profile/NearbyUserActions';
import { Entity } from 'src/types';
import { scrollUtil } from 'src/utils/scroll.util';

import { SubjectProfileItem } from './subject-profile-item';

export const SubjectInfo = () => {
  const route = useRoute();
  const subject = (route.params as { subject: string }).subject;

  const [profile, setProfile] = useState<Entity.Profile | null>(null);

  const { data, isLoading, isFetching, refetch } = useGetSubjectProfilesQuery(
    { teachingSubject: subject },
    { skip: !subject },
  );

  const handleCloseProfileDetail = useCallback(() => {
    setProfile(null);
  }, []);

  const handleScroll = async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!scrollUtil.isCloseToBottom(e)) {
      return;
    }
    refetch();
  };

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch}></RefreshControl>
        }
        // onScroll={handleScroll}
        numColumns={2}
        data={data?.data}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        renderItem={({ item }: { item: Entity.Profile }) => {
          return <SubjectProfileItem profile={item} onOpen={setProfile} />;
        }}
      ></FlatList>

      <Modal visible={!!profile} animationType="slide">
        <View flex={1}>
          <View position="absolute" bottom={0} left={0} right={0} zIndex={999}>
            <NearbyUserActions targetUserId={profile?._id} onClose={handleCloseProfileDetail} />
            <ViewSafeArea bottom />
          </View>
          <ScrollView flex={1} backgroundColor="$backgroundLight100">
            <UserProfile profile={profile!} onClose={handleCloseProfileDetail} />
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};
