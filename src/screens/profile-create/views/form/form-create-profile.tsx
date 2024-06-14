import {
  Button,
  ButtonText,
  Heading,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from '@gluestack-ui/themed';
import { StackActions, useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useCreateMeMutation } from 'src/api/me.api';
import { useLazyFetchAllShopsQuery } from 'src/api/shop.api';
import { LoadingOverlay, ViewFooter } from 'src/components';
import { SCREENS } from 'src/constants';
import { useMessages } from 'src/hooks';
import { flexGrow } from 'src/styles';
import { FormParams } from 'src/types';
import { createProfileFormUtil } from 'src/utils/create-profile.form.util';

import { ControlProfileEmail } from './control/control-profile-email';
import { ControlShopTitle } from './control/control-shop-title';

export const FormCreateProfile: FC = () => {
  const { formatErrorMessage } = useMessages();
  const [createMe] = useCreateMeMutation();
  const navigation = useNavigation();
  const [fetchAllShops] = useLazyFetchAllShopsQuery();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormParams.CreateProfile>({
    defaultValues: createProfileFormUtil.getDefaultValues(),
    resolver: createProfileFormUtil.getResolver(),
  });

  const navigateShopsScreen = async () => {
    await fetchAllShops();
    navigation.dispatch(StackActions.replace(SCREENS.SHOPS));
  };

  const onSubmit: SubmitHandler<FormParams.CreateProfile> = async values => {
    try {
      await createMe(values).unwrap();
      await navigateShopsScreen();
    } catch (error) {
      const errorMessage: string = _.get(error, 'data.message', '');
      if (errorMessage === 'You have already registered') {
        await navigateShopsScreen();
      } else {
        Toast.show({
          text1: formatErrorMessage(error),
        });
      }
    }
  };

  return (
    <>
      <LoadingOverlay isLoading={isSubmitting} />
      <SafeAreaView edges={['top']}></SafeAreaView>

      <View flex={1}>
        <View flex={1}>
          <View flex={1}>
            <ScrollView style={flexGrow}>
              <View px={16} py={16}>
                <Heading>Thông tin tài khoản</Heading>
              </View>

              <View px={16}>
                <ControlProfileEmail control={control} />
                <ControlShopTitle control={control} mt={16} />
              </View>
            </ScrollView>

            <ViewFooter px={16} py={16}>
              <Button onPress={handleSubmit(onSubmit)}>
                <ButtonText>Tiếp tục</ButtonText>
              </Button>
            </ViewFooter>
          </View>
        </View>
        {Platform.OS === 'android' && <KeyboardAvoidingView behavior={'padding'} />}
      </View>
    </>
  );
};
