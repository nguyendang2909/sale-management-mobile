import { HStack, Icon, Text, View } from '@gluestack-ui/themed';
import { ChevronLeft } from 'lucide-react-native';
import React, { FC, ReactElement, ReactNode } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { APP_CONFIG } from 'src/config/config.app';
import { useMessages } from 'src/hooks/useMessages';
import { TxKey, ViewProps } from 'src/types';

import { spacing } from '../../theme';
import { ExtendedEdge, useSafeAreaInsetsStyle } from '../../utils/useSafeAreaInsetsStyle';

export type HeaderProps = ViewProps & {
  titleMode?: 'center' | 'flex';
  titleStyle?: StyleProp<TextStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  title?: string;
  titleTx?: TxKey;
  leftIcon?: FC;
  leftIconColor?: string;
  leftText?: string;
  leftTx?: TxKey;
  LeftActionComponent?: ReactElement;
  onLeftPress?: TouchableOpacityProps['onPress'];
  rightIcon?: FC;
  rightIconColor?: string;
  rightText?: string;
  rightTx?: TxKey;
  RightActionComponent?: ReactElement;
  onRightPress?: TouchableOpacityProps['onPress'];
  safeAreaEdges?: ExtendedEdge[];
};

interface HeaderActionProps {
  backgroundColor?: string;
  icon?: FC;
  iconColor?: string;
  text?: string;
  tx?: TxKey;
  onPress?: TouchableOpacityProps['onPress'];
  ActionComponent?: ReactElement;
  children?: ReactNode;
}

export const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const {
    LeftActionComponent,
    leftIcon,
    leftIconColor,
    leftText,
    leftTx,
    onLeftPress,
    onRightPress,
    RightActionComponent,
    rightIcon,
    rightIconColor,
    rightText,
    rightTx,
    safeAreaEdges = ['top'],
    title,
    titleMode = 'center',
    titleTx,
    titleContainerStyle: $titleContainerStyleOverride,
    style: $styleOverride,
    titleStyle: $titleStyleOverride,
    containerStyle: $containerStyleOverride,
    bgColor,
    backgroundColor,
    children,
    ...viewProps
  } = props;

  const finalBackgroundColor = bgColor || backgroundColor || '$white';

  const { formatMessage } = useMessages();

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  const titleContent = titleTx ? formatMessage(titleTx) : title;

  return (
    <View
      zIndex={5}
      w="$full"
      style={[$containerInsets, $containerStyleOverride]}
      backgroundColor={finalBackgroundColor}
      // shadowOffset={{
      //   width: 0,
      //   height: 1,
      // }}
      // shadowOpacity={0.25}
      // shadowRadius={3}
      borderBottomColor="$coolGray100"
      borderBottomWidth={1}
      {...viewProps}
    >
      <View
        minHeight={APP_CONFIG.SIZE.TOP_BAR.HEIGHT}
        // height={APP_CONFIG.SIZE.TOP_BAR.HEIGHT}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        style={$styleOverride}
      >
        <HeaderAction
          tx={leftTx}
          text={leftText}
          icon={leftIcon}
          iconColor={leftIconColor}
          onPress={onLeftPress}
          // txOptions={leftTxOptions}
          backgroundColor={finalBackgroundColor}
          ActionComponent={LeftActionComponent}
        />

        {!!titleContent && (
          <View
            style={[
              titleMode === 'center' && $titleWrapperCenter,
              titleMode === 'flex' && $titleWrapperFlex,
              $titleContainerStyleOverride,
            ]}
            pointerEvents="none"
          >
            <Text
              numberOfLines={1}
              fontWeight="$medium"
              size="md"
              style={[$title, $titleStyleOverride]}
            >
              {titleContent}
            </Text>
          </View>
        )}

        <HeaderAction
          tx={rightTx}
          text={rightText}
          icon={rightIcon}
          iconColor={rightIconColor}
          onPress={onRightPress}
          // txOptions={rightTxOptions}
          // backgroundColor={backgroundColor}
          ActionComponent={RightActionComponent}
        />
      </View>
      {children}
    </View>
  );
};

function HeaderAction(props: HeaderActionProps) {
  const {
    backgroundColor,
    icon,
    text,
    tx,
    // txOptions,
    onPress,
    ActionComponent,
  } = props;

  const { formatMessage } = useMessages();

  const content = tx ? formatMessage(tx) : text;

  if (ActionComponent) return <View pr={8}>{ActionComponent}</View>;

  if (content || onPress) {
    return (
      <HStack
        height="$full"
        justifyContent="center"
        alignItems="center"
        as={onPress ? TouchableOpacity : View}
        {...(onPress ? { onPress } : {})}
        p={8}
      >
        <Icon as={icon || ChevronLeft} size="xl" color={onPress ? '$primary600' : '$coolGray500'} />
        {!!content && (
          <View style={[$actionTextContainer, { backgroundColor }]}>
            <Text
              numberOfLines={1}
              fontWeight="$medium"
              size="md"
              color={onPress ? '$primary600' : ''}
            >
              {content}
            </Text>
          </View>
        )}
      </HStack>
    );
  }

  return <View style={[$actionFillerContainer, { backgroundColor }]} />;
}

const $title: TextStyle = {
  textAlign: 'center',
};

const $actionTextContainer: ViewStyle = {
  flexGrow: 0,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
};

const $actionFillerContainer: ViewStyle = {
  width: 16,
};

const $titleWrapperCenter: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  position: 'absolute',
  paddingHorizontal: spacing.xxl,
  zIndex: 1,
};

const $titleWrapperFlex: ViewStyle = {
  justifyContent: 'center',
  flexGrow: 1,
};
