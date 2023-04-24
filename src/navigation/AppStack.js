import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import SettingsScreen from '../screens/SettingsScreen';

import TabNavigator from './TabNavigator';
import PayRollsScreen from '../screens/PayRolls';
import CheckInOutScreen from '../screens/CheckInOut';

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
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Chấm công"
        component={CheckInOutScreen}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesome name="calendar-check-o" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Bảng lương"
        component={PayRollsScreen}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesome name="money" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Nghỉ phép"
        component={PayRollsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="flash" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Đặt cơm"
        component={PayRollsScreen}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="rice-bowl" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Thông tin cá nhân"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Tin nhắn"
        component={MessagesScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cài đặt"
        component={SettingsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AuthStack;
