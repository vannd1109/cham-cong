/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MessagesScreen from '../screens/MessagesScreen';
import UsersScreen from '../screens/UsersScreen';
import ApplicationScreen from '../screens/ApplicationScreen';
import AlarmScreen from '../screens/AlarmScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="GameDetails"
        component={GameDetailsScreen}
        options={({route}) => ({
          title: route.params?.title,
        })}
      /> */}
    </Stack.Navigator>
  );
};

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
        component={AlarmScreen}
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
        name="Users"
        component={UsersScreen}
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
