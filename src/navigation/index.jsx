import React, {useEffect, useState} from 'react';
import {Platform, Button, Image, View, Text} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CheckInOut from '../screens/CheckInOut/index';
import TimeOffScreen from '../screens/TimeOff/index';
import PayRollScreen from '../screens/PayRoll/index';
import Login from '../screens/Login/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import TimeOff from '../screens/TimeOff/index';
import PayRoll from '../screens/PayRoll/index';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const image = {
  uri: 'https://img.freepik.com/free-icon/profile_318-932158.jpg?size=338&ext=jpg&ga=GA1.2.1219745364.1673400153&semt=sph',
};

function HeaderLeft() {
  const navigation = useNavigation();

  const openMenu = () => {
    navigation.toggleDrawer;
  };

  return (
    <View style={{}}>
      <Text onPress={openMenu}>Drawer</Text>
    </View>
  );
}

function Home() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

function Profile() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Thông tin người dùng</Text>
    </View>
  );
}

function Settings() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Thiết lập</Text>
    </View>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Chấm công" component={CheckInOut} />
      <Drawer.Screen name="Đăng ký nghỉ phép" component={TimeOffScreen} />
      <Drawer.Screen name="Bảng lương" component={PayRoll} />
      <Drawer.Screen name="Thông tin người dùng" component={Profile} />
      <Drawer.Screen name="Cài đặt" component={Settings} />
    </Drawer.Navigator>
  );
}

const MainStack = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Chấm công"
      component={MyDrawer}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Nghỉ phép"
      component={MyDrawer}
      options={{headerShown: false}}
      // options={{
      //   title: 'Đăng ký nghỉ phép',
      //   headerStyle: {
      //     backgroundColor: '#887700',
      //   },
      //   headerTintColor: '#fff',
      //   headerTitleStyle: {
      //     fontWeight: 'bold',
      //   },
      // }}
    />
    <Tab.Screen
      name="Bảng lương"
      component={MyDrawer}
      options={{headerShown: false}}
      // options={{
      //   title: 'Bảng lương',
      //   headerStyle: {
      //     backgroundColor: '#887700',
      //   },
      //   headerTintColor: '#fff',
      //   headerTitleStyle: {
      //     fontWeight: 'bold',
      //   },
      // }}
    />
  </Tab.Navigator>
);

const NavigationProvider = () => {
  const [isLogIn, setIsLogIn] = useState(false);

  return (
    <NavigationContainer>
      {!isLogIn && <Login setIsLogIn={setIsLogIn} />}

      {isLogIn && <MainStack />}
    </NavigationContainer>
  );
};
export default NavigationProvider;
