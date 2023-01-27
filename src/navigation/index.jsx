import {useDispatch} from 'react-redux';
import {View, Text} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import CheckInOut from '../screens/CheckInOut/index';
import TimeOffScreen from '../screens/TimeOff/index';
import LoginScreen from '../screens/Login/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import PayRollScreen from '../screens/PayRoll/index';
import {logout} from '../actions/auth';
import CustomDrawerList from './CustomDrawerList';
import {useState} from 'react';
const Drawer = createDrawerNavigator();

const image = {
  uri: 'https://img.freepik.com/free-icon/profile_318-932158.jpg?size=338&ext=jpg&ga=GA1.2.1219745364.1673400153&semt=sph',
};

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

const MyDrawer = () => {
  const dispatch = useDispatch();
  const [myNavigation, setMyNavigation] = useState('');
  const onLogout = () => {
    dispatch(logout()).then(response => {
      if (response.status === 'success') {
        myNavigation.navigate('LogIn');
      }
    });
  };

  return (
    <Drawer.Navigator
      initialRouteName="CheckInOut"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          position: 'absolute',
          top: -50,
        },
      }}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <CustomDrawerList {...props} setMyNavigation={setMyNavigation} />
            <DrawerItem label="Thoát" onPress={() => onLogout()} />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen
        name="LogIn"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="CheckInOut"
        component={CheckInOut}
        options={{
          title: 'Chấm công',
          headerStyle: {
            backgroundColor: '#887700',
          },
          headerTintColor: '#fff',
        }}
      />
      <Drawer.Screen
        name="TimeOff"
        component={TimeOffScreen}
        options={{
          title: 'Đăng ký nghỉ phép',
          headerStyle: {
            backgroundColor: '#887700',
          },
          headerTintColor: '#fff',
        }}
      />
      <Drawer.Screen
        name="PayRoll"
        component={PayRollScreen}
        options={{
          title: 'Bảng lương',
          headerStyle: {
            backgroundColor: '#887700',
          },
          headerTintColor: '#fff',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Thông tin người dùng',
          headerStyle: {
            backgroundColor: '#887700',
          },
          headerTintColor: '#fff',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Cài đặt',
          headerStyle: {
            backgroundColor: '#887700',
          },
          headerTintColor: '#fff',
        }}
      />
    </Drawer.Navigator>
  );
};

const NavigationProvider = () => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
};
export default NavigationProvider;
