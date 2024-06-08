import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { FC, useCallback } from 'react';

export const ButtonTag: FC<{
  value: string | boolean;
  onChange: (e: string | boolean) => void;
  isEnabled?: boolean;
  title: string;
}> = ({ value, onChange, isEnabled, title }) => {
  const handlePress = useCallback(() => {
    onChange(value);
  }, [onChange, value]);

  return (
    <>
      <View>
        <Button size="xs" onPress={handlePress} variant={isEnabled ? 'solid' : 'outline'}>
          <ButtonText numberOfLines={1}>{title}</ButtonText>
        </Button>
      </View>
    </>
  );
};
