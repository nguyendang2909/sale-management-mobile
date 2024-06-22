import { useNavigation } from '@react-navigation/native';
// import { UpdateGeolocation } from 'src/containers/Home/UpdateGeolocation';
import React, { FC } from 'react';
import { Header } from 'src/components';
import { SCREENS } from 'src/constants';
import { DatingSwipeWrapper } from 'src/pages/dating-swipe/temp/dating-swipe-wrapper';

export const DatingSwipeScreen: FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header
        titleTx="AppName"
        rightIcon="settings"
        onRightPress={() => {
          navigation.navigate(SCREENS.DATING_NEARBY_FILTER);
        }}
      />

      <DatingSwipeWrapper />
    </>
  );
};
