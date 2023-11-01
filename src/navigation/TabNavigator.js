/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MessagesScreen from '../screens/MessagesScreen';
import MembersScreen from '../screens/MembersScreen';
import ApplicationScreen from '../screens/ApplicationScreen';
import RemindScreen from '../screens/RemindScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  return (
    <Tab.Navigator
      initialRouteName="Application"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#003868'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: '#efcb6a',
      }}>
      <Tab.Screen
        name="Message"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign
              name="message1"
              color={color}
              size={size}
              style={{fontSize: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Alarm"
        component={RemindScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name="alarm"
              color={color}
              size={size}
              style={{fontSize: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarBadge: 2,
          tabBarBadgeStyle: {backgroundColor: '#efcb6a', fontSize: 12},
          tabBarIcon: ({color, size}) => (
            <Feather
              name="bell"
              color={color}
              size={size}
              style={{fontSize: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Members"
        component={MembersScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather
              name="users"
              color={color}
              size={size}
              style={{fontSize: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Application"
        component={ApplicationScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign
              name="bars"
              color={color}
              size={size}
              style={{fontSize: 20}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
