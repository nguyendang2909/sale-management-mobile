import { StatusBar } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Header } from 'src/components';
import { DatingNearbyWrapper } from 'src/pages/dating-nearby/dating-nearby-wrapper';

export const DatingNearbyScreen: FC = () => {
  const navigate = useNavigation();
  return (
    <>
      <StatusBar barStyle="default" />
      <Header
        titleTx="Search"
        // rightIcon="settings"
        // onRightPress={() => {
        //   navigate.navigate(SCREENS.DATING_NEARBY_FILTER);
        // }}
      />
      <DatingNearbyWrapper />
    </>
  );
};
