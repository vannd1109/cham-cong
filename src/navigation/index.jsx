import {useDispatch} from 'react-redux';
import {View, Text, Button, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import CheckInOut from '../screens/CheckInOut/index';
import TimeOffScreen from '../screens/TimeOff/index';
import LoginScreen from '../screens/Login/index';
import Icon from 'react-native-vector-icons/Ionicons';
import PayRollScreen from '../screens/PayRolls/index';
import {logout} from '../actions/auth';
import CustomDrawerList from './CustomDrawerList';
import {useState} from 'react';
import MyModal from '../components/Modal';

const Drawer = createDrawerNavigator();

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
  const [modalVisible, setModalVisible] = useState(false);
  const [titleModal, setTitleModal] = useState('Title Modal');

  const onModal = () => {
    setModalVisible(true);
    setTitleModal('Thoát ứng dụng');
  };
  const onLogout = () => {
    dispatch(logout()).then(response => {
      if (response.status === 'success') {
        setModalVisible(false);
        myNavigation.navigate('LogIn');
      }
    });
  };

  const onNotifications = () => {
    alert('Thông báo');
  };

  return (
    <>
      <Drawer.Navigator
        initialRouteName="PayRoll"
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
              <Button title="Thoát" color="#ac2b36" onPress={() => onModal()} />
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
              backgroundColor: '#d68f19',
            },
            headerTintColor: '#0e447a',
            drawerIcon: () => (
              <Icon name="checkbox-outline" color="#0e447a" size={24} />
            ),
            headerRight: () => (
              <View
                style={{
                  position: 'relative',
                  width: 50,
                  display: 'flex',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name="notifications-outline"
                  color="#fff"
                  size={24}
                  onPress={() => onNotifications()}
                />
                <Text
                  style={{
                    position: 'absolute',
                    borderWidth: 1,
                    borderColor: '#0e447a',
                    width: 18,
                    height: 18,
                    textAlign: 'center',
                    color: '#fff',
                    backgroundColor: '#0e447a',
                    right: 8,
                    top: -5,
                    borderRadius: 50,
                    backgroundColor: 'red',
                  }}
                  onPress={() => onNotifications()}>
                  3
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="TimeOff"
          component={TimeOffScreen}
          options={{
            title: 'Đăng ký nghỉ phép',
            headerStyle: {
              backgroundColor: '#d68f19',
            },
            headerTintColor: '#0e447a',
            drawerIcon: () => (
              <Icon name="flash-off-outline" color="#0e447a" size={24} />
            ),
            headerRight: () => (
              <View style={{position: 'relative'}}>
                <Icon
                  name="notifications-outline"
                  color="#fff"
                  size={24}
                  style={{marginRight: 20}}
                  onPress={() => alert('This is a button!')}
                />
                <Text
                  style={{
                    position: 'absolute',
                    borderWidth: 1,
                    borderColor: '#0e447a',
                    width: 18,
                    height: 18,
                    textAlign: 'center',
                    color: '#fff',
                    backgroundColor: '#0e447a',
                    right: 15,
                    top: -5,
                    borderRadius: 50,
                  }}>
                  3
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="PayRoll"
          component={PayRollScreen}
          options={{
            title: 'Bảng lương',
            headerStyle: {
              backgroundColor: '#d68f19',
            },
            headerTintColor: '#0e447a',
            drawerIcon: () => (
              <Icon name="cash-outline" color="#0e447a" size={24} />
            ),
            headerRight: () => (
              <View style={{position: 'relative'}}>
                <Icon
                  name="notifications-outline"
                  color="#fff"
                  size={24}
                  style={{marginRight: 20}}
                  onPress={() => onNotifications()}
                />
                <Text
                  style={{
                    position: 'absolute',
                    borderWidth: 1,
                    borderColor: '#0e447a',
                    width: 18,
                    height: 18,
                    textAlign: 'center',
                    color: '#fff',
                    backgroundColor: '#0e447a',
                    right: 15,
                    top: -5,
                    borderRadius: 50,
                  }}>
                  3
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Thông tin người dùng',
            headerStyle: {
              backgroundColor: '#d68f19',
            },
            headerTintColor: '#0e447a',
            drawerIcon: () => (
              <Icon
                name="information-circle-outline"
                color="#0e447a"
                size={24}
              />
            ),
            headerRight: () => (
              <View style={{position: 'relative'}}>
                <Icon
                  name="notifications-outline"
                  color="#fff"
                  size={24}
                  style={{marginRight: 20}}
                  onPress={() => onNotifications()}
                />
                <Text
                  style={{
                    position: 'absolute',
                    borderWidth: 1,
                    borderColor: '#f4511e',
                    width: 18,
                    height: 18,
                    textAlign: 'center',
                    color: '#fff',
                    backgroundColor: '#f4511e',
                    right: 15,
                    top: -5,
                    borderRadius: 50,
                  }}>
                  3
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            title: 'Cài đặt',
            headerStyle: {
              backgroundColor: '#d68f19',
            },
            headerTintColor: '#0e447a',
            drawerIcon: () => (
              <Icon name="settings-outline" color="#0e447a" size={24} />
            ),
            headerRight: () => (
              <View style={{position: 'relative'}}>
                <Icon
                  name="notifications-outline"
                  color="#fff"
                  size={24}
                  style={{marginRight: 20}}
                  onPress={() => onNotifications()}
                />
                <Text
                  style={{
                    position: 'absolute',
                    borderWidth: 1,
                    borderColor: '#0e447a',
                    width: 18,
                    height: 18,
                    textAlign: 'center',
                    color: '#fff',
                    backgroundColor: '#0e447a',
                    right: 15,
                    top: -5,
                    borderRadius: 50,
                  }}>
                  3
                </Text>
              </View>
            ),
          }}
        />
      </Drawer.Navigator>
      <MyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        titleModal={titleModal}
        onLogout={onLogout}>
        <View style={styles.modalBody}>
          <Text>Bạn có thực sự muốn đóng ứng dụng không?</Text>
        </View>
        <View style={styles.modalBtn}>
          <Button
            title="Hủy"
            color="#d68f19"
            onPress={() => setModalVisible(false)}
          />
          <Button title="Thoát" color="#ac2b36" onPress={() => onLogout()} />
        </View>
      </MyModal>
    </>
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

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#f1f1f18c',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  modalHeader: {
    backgroundColor: '#0e447a',
    padding: 8,
  },
  modalHeaderText: {
    color: '#fff',
  },
});
