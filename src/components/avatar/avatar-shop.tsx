import { Avatar, AvatarFallbackText, AvatarImage } from '@gluestack-ui/themed';

import { iconRegistry } from '../icon';

export const AvatarShop = () => {
  return (
    <Avatar size="sm" bgColor="$white">
      <AvatarFallbackText>S</AvatarFallbackText>
      <AvatarImage bgColor="$white" source={iconRegistry.shop2}></AvatarImage>
    </Avatar>
  );
};
