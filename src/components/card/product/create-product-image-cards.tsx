import { useActionSheet } from '@expo/react-native-action-sheet';
import { ScrollView, View } from '@gluestack-ui/themed';
import React, { Fragment, useState } from 'react';
import { Platform } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import { useUploadProductImageMutation } from 'src/api';
import { useMessages } from 'src/hooks';
import { ProductImageCard } from 'src/screens/product-create/views/form/product-image-card';
import { Entity } from 'src/types';

import { AddProductImageCard } from './add-product-image-card';

type FCProps = {
  images: Entity.ProductImage[];
  addImage: (image: Entity.ProductImage) => void;
  deleteImage: (image: Entity.ProductImage) => void;
};

export const CreateProductImageCards: React.FC<FCProps> = ({ images, addImage, deleteImage }) => {
  const { formatMessage, formatErrorMessage } = useMessages();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [isLoading, setLoading] = useState<boolean>(false);

  const { showActionSheetWithOptions } = useActionSheet();

  const handlePressUploadImage = () => {
    showActionSheetWithOptions(
      {
        showSeparators: true,
        options: ['Tải ảnh lên', 'Huỷ'],
        cancelButtonIndex: 1,
        useModal: true,
      },
      selectedIndex => {
        switch (selectedIndex) {
          case 0:
            handleAddImage();
            break;
        }
      },
    );
  };

  const handlePressUploadedImage = (image: Entity.ProductImage) => {
    showActionSheetWithOptions(
      {
        showSeparators: true,
        options: ['Xoá ảnh', 'Huỷ'],
        cancelButtonIndex: 1,
        useModal: true,
      },
      selectedIndex => {
        switch (selectedIndex) {
          case 0:
            deleteImage(image);
            break;
        }
      },
    );
  };

  const handleAddImage = async () => {
    try {
      if (Platform.OS === 'ios') {
        const permission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
        if (permission !== RESULTS.GRANTED) {
          const requestPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
          if (requestPermission !== RESULTS.LIMITED && requestPermission !== RESULTS.GRANTED) {
            Toast.show({ text1: 'Bạn không có quyền truy cập ảnh' });
            console.log('Permissions to access camera has been blocked');
            return;
          }
        }
      } else if (Platform.OS === 'android') {
        const permission = await check(PERMISSIONS.ANDROID.CAMERA);
        if (permission !== RESULTS.GRANTED) {
          const requestPermission = await request(PERMISSIONS.ANDROID.CAMERA);
          if (requestPermission !== RESULTS.LIMITED && requestPermission !== RESULTS.GRANTED) {
            Toast.show({ text1: 'Bạn không có quyền truy cập ảnh' });
            console.log('Permissions to access camera has been blocked');
            return;
          }
        }
      }
      setLoading(true);
      const photo = await ImageCropPicker.openPicker({
        // width: 640,
        // height: 860,
        cropping: true,
        mediaType: 'photo',
        forceJpg: true,
      });
      const uploadedImage = await uploadProductImage({ file: photo }).unwrap();
      addImage(uploadedImage.data);
    } catch (error) {
      Toast.show({ text1: 'Tải ảnh lên thất bại' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View flexDirection="row" flexWrap="wrap" rowGap={16} columnGap={16}>
          {images.map((image, index) => {
            return (
              <Fragment key={image.id || index.toString()}>
                <ProductImageCard
                  image={image}
                  onPress={handlePressUploadedImage}
                ></ProductImageCard>
              </Fragment>
            );
          })}
          <AddProductImageCard isLoading={isLoading} onPress={handlePressUploadImage} />
        </View>
      </ScrollView>
    </>
  );
};
