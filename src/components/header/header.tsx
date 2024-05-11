import { HStack, Icon, Text, View } from '@gluestack-ui/themed';
import { ChevronLeft } from 'lucide-react-native';
import React, { FC, ReactElement } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { APP_CONFIG } from 'src/config/config.app';
import { useMessages } from 'src/hooks/useMessages';
import { TxKey } from 'src/types';

import { colors, spacing } from '../../theme';
import { ExtendedEdge, useSafeAreaInsetsStyle } from '../../utils/useSafeAreaInsetsStyle';

export interface HeaderProps {
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
}

interface HeaderActionProps {
  backgroundColor?: string;
  icon?: FC;
  iconColor?: string;
  text?: string;
  tx?: TxKey;
  onPress?: TouchableOpacityProps['onPress'];
  ActionComponent?: ReactElement;
}

export function Header(props: HeaderProps) {
  const {
    backgroundColor = colors.background,
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
  } = props;

  const { formatMessage } = useMessages();

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  const titleContent = titleTx ? formatMessage(titleTx) : title;

  return (
    <View
      zIndex={5}
      w="$full"
      {...(backgroundColor ? { backgroundColor } : {})}
      style={[$containerInsets, $containerStyleOverride]}
    >
      <View
        height={APP_CONFIG.SIZE.TOP_BAR.HEIGHT}
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
          backgroundColor={backgroundColor}
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
            <Text fontWeight="$medium" size="md" style={[$title, $titleStyleOverride]}>
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
          backgroundColor={backgroundColor}
          ActionComponent={RightActionComponent}
        />
      </View>
    </View>
  );
}

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

  if (ActionComponent) return ActionComponent;

  if (content || icon) {
    const Wrapper = onPress ? TouchableOpacity : View;

    return (
      <HStack
        height="$full"
        justifyContent="center"
        alignItems="center"
        as={Wrapper}
        {...(onPress ? { onPress } : {})}
        pl={8}
      >
        <Icon as={icon || ChevronLeft} size="xl" color={onPress ? '$primary600' : '$coolGray500'} />
        {!!content && (
          <View style={[$actionTextContainer, { backgroundColor }]}>
            <Text fontWeight="$medium" size="md" color={onPress ? '$primary600' : ''}>
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
