import { Icon } from '@gluestack-ui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { User } from 'lucide-react-native';
import React, { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NAVIGATOR_DATA } from 'src/constants';
import { BOTTOM_NAVIGATOR_NAMES } from 'src/constants/constants';
import { useMessages } from 'src/hooks';
import { ProfileScreen } from 'src/screens/profile/profile.screen';
import { colors } from 'src/theme';

import { AppStackScreenProps } from './main.stack';

type FCProps = AppStackScreenProps<'HOME'>;

export type HomeTabParamList = {
  MANAGEMENT: undefined;
  ORDERS: undefined;
  REPORTS: undefined;
  TABLES: undefined;
  SELL: undefined;
  DEBT_BOOK: undefined;
  RECEIPT_AND_EXPENSE: undefined;
  // ONLINE_STORE: undefined,
  CUSTOMERS: undefined;
  WAREHOUSE: undefined;
  MESSAGES: undefined;
  PRODUCTS: undefined;
  PROFILE: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

export const HomeNavigator: FC<FCProps> = () => {
  const { formatMessage } = useMessages();

  const { bottom } = useSafeAreaInsets();

  const screens = [
    BOTTOM_NAVIGATOR_NAMES.PRODUCTS,
    BOTTOM_NAVIGATOR_NAMES.CUSTOMERS,
    BOTTOM_NAVIGATOR_NAMES.ORDERS,
  ];

  const navigators = [
    // ...DEFAULT_NAVIGATOR,
    ...screens.map(e => {
      return { ...NAVIGATOR_DATA[e], isShow: true };
    }),
    // Object.values(_.omit(NAVIGATOR_DATA, screens)),
  ];

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: [
            // backgroundColor(colors.background),
            // borderTopColor(colors.transparent),
            // { height: bottom + APP_CONFIG.SIZE.BOTTOM_BAR.HEIGHT },
            [
              {
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3,
              },
            ],
          ],
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.text,
          tabBarLabelStyle: {
            fontSize: 12,
            lineHeight: 12,
          },
          tabBarShowLabel: true,
        }}
      >
        {navigators.map(e => {
          const ItemIcon = e.icon;
          return (
            <Tab.Screen
              key={e.id}
              name={e.name}
              component={e.screen}
              options={{
                // headerShown: false,
                // tabBarShowLabel: true,
                tabBarLabel: e.title,
                tabBarIcon: ({ focused }) => (
                  <Icon
                    as={ItemIcon}
                    width={20}
                    height={20}
                    // color="$blue700"
                    fill={focused ? '$blue600' : '$white'}
                  />
                ),
              }}
            ></Tab.Screen>
          );
        })}

        <Tab.Screen
          name="PROFILE"
          component={ProfileScreen}
          options={{
            // tabBarShowLabel: false,
            tabBarLabel: formatMessage('Profile'),
            tabBarIcon: ({ focused }) => (
              <>
                <Icon as={User} width={40} height={40} fill={focused ? '$blue600' : '$white'} />
              </>
            ),
          }}
        />

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
        {/* <Tab.Screen
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
        /> */}

        {/* <Tab.Screen
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
        /> */}
      </Tab.Navigator>
    </>
  );
};
