import React from 'react';
import {TColors} from '@app/theme/Colors';
import useStyles from '@app/theme/useStyles';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@app/components';
import {moderateHScale} from '@app/utils/helper';
import Users from './users';
import Tasks from './tasks';
import Settings from './settings';

const Tab = createBottomTabNavigator();

function Admin(): React.JSX.Element {
  const {colors, styles} = useStyles(createStyles);

  return (
    <Tab.Navigator
      initialRouteName="Task"
      backBehavior="firstRoute"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textPrimary,
        tabBarLabelStyle: {
          fontSize: moderateHScale(12),
        },
        tabBarStyle: {
          backgroundColor: styles.container.backgroundColor,
        },
      }}>
      <Tab.Screen
        name="Technician"
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <Icon
              name={focused ? 'construct' : 'construct-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        component={Users}
      />
      <Tab.Screen
        name="Task"
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <Icon
              name={focused ? 'list' : 'list-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        component={Tasks}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <Icon
              name={focused ? 'settings' : 'settings-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
}

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
    },
  });

export default Admin;
