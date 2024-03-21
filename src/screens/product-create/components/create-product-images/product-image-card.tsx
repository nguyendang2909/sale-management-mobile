import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { CacheImage } from 'src/components';
import { aspectRatio, backgroundColor, borderColor, borderRadius } from 'src/styles';
import { Entity } from 'src/types';

type FCProps = {
  onPress: (id: string) => void;
  image: Entity.ProductImage;
};

export const ProductImageCard: React.FC<FCProps> = ({ onPress, image }) => {
  const handlePress = () => {
    onPress(image.id);
  };

  return (
    <TouchableHighlight
      onPress={handlePress}
      style={[
        { padding: 4, width: 100 },
        borderColor('#d4d8de'),
        borderRadius(20),
        backgroundColor('#d4d8de'),
        aspectRatio(1 / 1),
      ]}
    >
      <>
        <CacheImage
          style={styles.image}
          url={image.path}
          // resizeMode="cover"
        />
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'stretch',
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
  },
});
