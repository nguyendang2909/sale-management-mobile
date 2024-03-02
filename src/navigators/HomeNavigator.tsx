import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GradientIcon, MaterialIcons } from 'src/components';
import { APP_CONFIG } from 'src/config/config.app';
import { DEFAULT_NAVIGATORS } from 'src/constants/constants';
import { useMessages } from 'src/hooks';
import { ConversationsScreen } from 'src/screens/Conversations/ConversationsScreen';
import { ProfileScreen } from 'src/screens/Me/ProfileScreen';
import { backgroundColor, borderTopColor } from 'src/styles';
import { colors } from 'src/theme';
import { AppStackScreenProps, HomeTabParamList } from 'src/types';

type FCProps = AppStackScreenProps<'Home'>;

const Tab = createBottomTabNavigator<HomeTabParamList>();

export const HomeNavigator: FC<FCProps> = () => {
  const { formatMessage } = useMessages();

  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: [
            backgroundColor(colors.background),
            borderTopColor(colors.transparent),
            { height: bottom + APP_CONFIG.SIZE.BOTTOM_BAR.HEIGHT },
          ],
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.text,
          tabBarLabelStyle: {
            fontSize: 12,
            lineHeight: 16,
            flex: 1,
          },
          tabBarShowLabel: true,
        }}
      >
        {DEFAULT_NAVIGATORS.map(e => {
          return (
            <Tab.Screen
              key={e.id}
              name={e.name}
              component={e.screen}
              options={{
                // tabBarShowLabel: true,
                tabBarLabel: e.title,
                tabBarIcon: ({ focused }) => (
                  <GradientIcon
                    {...(!focused
                      ? {
                          colors: [colors.palette.neutral500, colors.palette.neutral500],
                        }
                      : {})}
                    size={30}
                    name="book"
                    icon={MaterialIcons}
                  />
                ),
              }}
            ></Tab.Screen>
          );
        })}

        {/* <Tab.Screen
          name="DatingNearby"
          component={DatingNearbyScreen}
          options={{
            tabBarShowLabel: false,
            //   tabBarLabel: formatMessage('Nearby'),
            tabBarIcon: ({ focused }) => (
              <GradientIcon
                {...(!focused
                  ? {
                      colors: [colors.palette.neutral500, colors.palette.neutral500],
                    }
                  : {})}
                size={30}
                name="location-on"
                icon={MaterialIcons}
              />
            ),
          }}
        /> */}
        {/* <Tab.Screen
          name="DatingSwipe"
          component={DatingSwipeScreen}
          options={{
            tabBarShowLabel: false,
            //   tabBarLabel: formatMessage('Swipe'),
            tabBarIcon: ({ focused }) => (
              <GradientIcon
                {...(!focused
                  ? {
                      colors: [colors.palette.neutral500, colors.palette.neutral500],
                    }
                  : {})}
                size={30}
                name="globe"
                icon={FontAwesome}
              />
            ),
          }}
        /> */}
        {/* <Tab.Screen
          name="Star"
          component={StarScreen}
          options={{
            tabBarShowLabel: false,
            //   tabBarLabel: formatMessage('Nearby'),
            tabBarIcon: ({ focused }) => (
              <GradientIcon
                {...(!focused
                  ? {
                      colors: [colors.palette.neutral500, colors.palette.neutral500],
                    }
                  : {})}
                size={30}
                name="star"
                icon={AntDesign}
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Conversations"
          component={ConversationsScreen}
          options={{
            // tabBarShowLabel: false,
            tabBarLabel: formatMessage('Messages'),
            tabBarIcon: ({ focused }) => (
              <GradientIcon
                {...(!focused
                  ? {
                      colors: [colors.palette.neutral500, colors.palette.neutral500],
                    }
                  : {})}
                size={30}
                name="chat"
                icon={MaterialCommunityIcons}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            // tabBarShowLabel: false,
            tabBarLabel: formatMessage('Profile'),
            tabBarIcon: ({ focused }) => (
              <GradientIcon
                {...(!focused
                  ? {
                      colors: [colors.palette.neutral500, colors.palette.neutral500],
                    }
                  : {})}
                size={30}
                name="account"
                icon={MaterialCommunityIcons}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
