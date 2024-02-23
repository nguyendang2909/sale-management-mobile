import { Avatar } from 'native-base';
import React from 'react';
import { useAppSelector } from 'src/hooks';
import { mediaFileUtil } from 'src/utils/media-files.util';

export const ProfileAvatar: React.FC = () => {
  const avatarUrl = useAppSelector(state => {
    const mediaFiles = state.app.profile?.mediaFiles;
    return mediaFiles?.length ? mediaFileUtil.getUrl(mediaFiles[0].key) : null;
  });

  return (
    <>
      <Avatar
        size="xl"
        source={{
          ...(avatarUrl ? { uri: avatarUrl } : {}),
        }}
      />
    </>
  );
};
