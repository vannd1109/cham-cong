import {StyleSheet, Text, View, Animated} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {logout} from '../actions/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckInOut from '../screens/CheckInOut/index';
import PayRollScreen from '../screens/PayRolls/index';
import HomeScreen from '../screens/Home/index';
import BookRiceScreen from '../screens/BookRice/index';
import NotificationScreen from '../screens/Notification/index';
import {useRef, useState} from 'react';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const currentOpacity = useState(new Animated.Value(0))[0];

  function showMenu() {
    Animated.timing(currentOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    console.log(currentOpacity);
  };

  function hiddenMenu(){
    Animated.timing(currentOpacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    console.log(currentOpacity);
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#003868',
          tabBarInactiveTintColor: 'gray',
          headerRight: () => (
            <FontAwesome
              name="bars"
              style={{fontSize: 24, marginRight: 10}}
              onPress={showMenu}
            />
          ),
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="CheckInOut"
          component={CheckInOut}
          options={{
            tabBarLabel: 'Bảng công',
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="check-square" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarLabel: 'Thông báo',
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="bell" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="PayRolls"
          component={PayRollScreen}
          options={{
            tabBarLabel: 'Lương',
            tabBarIcon: ({color, size}) => (
              <FontAwesome name={'money'} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="BookRice"
          component={BookRiceScreen}
          options={{
            tabBarLabel: 'Đặt cơm',
            tabBarIcon: ({color, size}) => (
              <FontAwesome name={'calendar'} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      {/* <Animated.View
        style={{
          position: "absolute",
          backgroundColor: 'red',
          height: '100%',
          width: '100%',
          right: 0,
          display: 'flex',
          gap: 2,
          opacity: currentOpacity,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 6,
            borderBottomColor: '#c5c5c5',
            padding: 10,
            alignContent: 'center',
          }}>
          <View>
            <FontAwesome name="user" style={{fontSize: 24}} />
          </View>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Nguyễn Duy Văn
            </Text>
            <Text>03492 - Nhân viên</Text>
          </View>
          <View>
            <FontAwesome
              name="close"
              style={{fontSize: 24}}
              onPress={hiddenMenu}
            />
          </View>
        </View>
        <View style={{padding: 10}}>
          <Text>âsdsad</Text>
        </View>
      </Animated.View> */}
    </>
  );
}

const NavigationProvider = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};
export default NavigationProvider;

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#fff',
    position: 'absolute',
    height: '100%',
    width: '100%',
    right: 0,
    display: 'flex',
    gap: 2,
  },
  modalContent: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#fff',
    shadowColor: '#0e447a',
    shadowOffset: 1,
    borderColor: '#0e447a',
    borderWidth: 1,
    width: '60%',
    minHeight: 150,
    borderRadius: 14,
    overflow: 'hidden',
  },
  modalBody: {
    padding: 10,
  },
  modalBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    justifyContent: 'flex-end',
  },
  btnCancel: {
    textTransform: 'capitalize',
    backgroundColor: '#0e447a',
    color: '#fff',
    minWidth: 60,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    borderRadius: 4,
  },
  btnClose: {
    textTransform: 'capitalize',
    backgroundColor: '#c34343',
    color: '#fff',
    minWidth: 60,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    borderRadius: 4,
  },
  modalHeader: {
    backgroundColor: '#0e447a',
    padding: 8,
  },
  modalHeaderText: {
    color: '#fff',
  },
});
