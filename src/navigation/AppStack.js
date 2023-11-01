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
import { useTranslation } from "react-i18next";

const Drawer = createDrawerNavigator();

const AuthStack = () => {
  const { t } = useTranslation();

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
          drawerItemStyle: { height: 0 }
        }}
      />
      <Drawer.Screen
        name={t('timekeeping')}
        component={CheckInOutScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome name="calendar-check-o" size={20} color={'#7c3aed'} />
          ),
          drawerItemStyle: { height: 0 }
        }}
      />
      <Drawer.Screen
        name={t('payroll')}
        component={PayRollsScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome name="money" size={20} color={'#ea580c'} />
          ),
          drawerItemStyle: { height: 0 }
        }}
      />
      <Drawer.Screen
        name={t('time_off')}
        component={TimeOffScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="flash" size={20} color={'#dc2626'} />
          ),
          drawerItemStyle: { height: 0 }
        }}
      />
      <Drawer.Screen
        name={t('book_rice')}
        component={BookRiceScreen}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="rice-bowl" size={20} color={'#10b981'} />
          ),
          drawerItemStyle: { height: 0 }
        }}
      />
      <Drawer.Screen
        name={t('timekeeping_statistics')}
        component={StatisticsScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="bar-chart-outline" size={20} color={'#f59e0b'} />
          ),
          drawerItemStyle: { height: 0 }
        }}
      />
      <Drawer.Screen
        name="Thông tin cá nhân"
        component={ProfileScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="person-outline" size={20} color={'#2563eb'} />
          ),
          drawerItemStyle: { height: 0 }
        }}
      />
      <Drawer.Screen
        name="Tin nhắn"
        component={MessagesScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="chatbox-ellipses-outline" size={20} color={'#38bdf8'} />
          ),
          drawerItemStyle: { height: 0 }
        }}
      />
      <Drawer.Screen
        name="Cài đặt"
        component={SettingsScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="settings-outline" size={20} color={'#a3a3a3'} />
          ),
          drawerItemStyle: { height: 0 }
        }}
      />
    </Drawer.Navigator>
  );
};

export default AuthStack;
