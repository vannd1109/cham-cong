/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PayRollsScreen from '../screens/PayRolls';
import CheckInOutScreen from '../screens/CheckInOut';
import TimeOffScreen from '../screens/TimeOff';
import TabNavigator from './TabNavigator';
import BookRiceScreen from '../screens/BookRice';
import StatisticsScreen from '../screens/Statistics';

const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#003868',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: () => (
            <Ionicons name="home-outline" size={20} color={'#4ade80'}  />
          ),
        }}
      />
      <Drawer.Screen
        name="Chấm công"
        component={CheckInOutScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome name="calendar-check-o" size={20} color={'#7c3aed'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Bảng lương"
        component={PayRollsScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome name="money" size={20} color={'#ea580c'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Nghỉ phép"
        component={TimeOffScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="flash" size={20} color={'#dc2626'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Đặt cơm"
        component={BookRiceScreen}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="rice-bowl" size={20} color={'#10b981'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Thống kê chấm công"
        component={StatisticsScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="bar-chart-outline" size={20} color={'#f59e0b'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Thông tin cá nhân"
        component={ProfileScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="person-outline" size={20} color={'#2563eb'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Tin nhắn"
        component={MessagesScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="chatbox-ellipses-outline" size={20} color={'#38bdf8'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cài đặt"
        component={SettingsScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="settings-outline" size={20} color={'#a3a3a3'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AuthStack;
