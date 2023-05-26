/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView
} from 'react-native';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../context/AuthContext';

const CustomDrawer = props => {
  const { logout, userInfo } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [languages, setLanguages] = useState([
    {
      id: 'vie',
      label: 'vie',
      active: true,
    },
    {
      id: 'eng',
      label: 'eng',
      active: false,
    },
  ]);

  const handleChangeLanguage = (language) => {
    const _language = [...languages];
    _language.map((item) => {
      item.active = item.id === language.id ? true : false;
    });

    setLanguages(_language);
  }


  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#003868' }}>
        <View
          style={{ padding: 20 }}>
          <Image
            source={require('../assets/images/user-profile.jpg')}
            style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {userInfo?.fullname}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: '#fff',
                marginRight: 5,
              }}>
              BP {userInfo?.department}
            </Text>
          </View>
        </View>
        <ScrollView style={{ display: 'flex', backgroundColor: '#fff' }}>
          <View style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 12
          }}>
            <Ionicons name='moon-outline' size={24} color={'#666666'} style={{ width: 30, textAlign: 'center' }} />
            <View style={{
              display: 'flex', flex: 1, flexDirection: 'row',
              alignItems: 'center', justifyContent: 'space-between',
              borderBottomColor: '#d5d5d5',
              borderBottomWidth: .5,
              padding: 12
            }}>
              <Text style={{ color: '#666666', fontSize: 12 }}>Chế độ nền tối</Text>
              <Switch
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 12
          }}>
            <Ionicons name='color-palette-outline' size={24} color={'#666666'} style={{ width: 30, textAlign: 'center' }} />
            <View style={{
              display: 'flex', flex: 1, flexDirection: 'row',
              alignItems: 'center', justifyContent: 'space-between',
              borderBottomColor: '#d5d5d5',
              borderBottomWidth: .5,
              padding: 16
            }}>
              <Text style={{ color: '#666666', fontSize: 12 }}>Thay đổi màu sắc</Text>
              <View style={{ width: 24, height: 24, backgroundColor: '#003868', borderRadius: 50 }}></View>
            </View>
          </View>
          <View style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 12
          }}>
            <Feather name='settings' size={20} color={'#666666'} style={{ width: 30, textAlign: 'center' }} />
            <View style={{
              display: 'flex', flex: 1, flexDirection: 'row',
              alignItems: 'center', justifyContent: 'space-between',
              borderBottomColor: '#d5d5d5',
              borderBottomWidth: .5,
              padding: 16
            }}>
              <Text style={{ color: '#666666', fontSize: 12 }}>Quản lý tài khoản</Text>
            </View>
          </View>
          <View style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 12
          }}>
            <FontAwesome name='language' size={20} color={'#666666'} style={{ width: 30, textAlign: 'center' }} />
            <View style={{
              display: 'flex', flex: 1, flexDirection: 'row',
              alignItems: 'center', justifyContent: 'space-between',
              borderBottomColor: '#d5d5d5',
              borderBottomWidth: .5,
              padding: 16
            }}>
              <Text style={{ color: '#666666', fontSize: 12 }}>Ngôn ngữ</Text>
              <View style={{ display: 'flex', flexDirection: 'row'}}>
                {languages.map(language => (
                  <TouchableOpacity
                  onPress={() => handleChangeLanguage(language)}
                   key={language.id} 
                   style={{backgroundColor: `${language.active ? '#003868' : '#666666'}`}}>
                    <Text style={{textTransform: 'uppercase', padding: 8, color: '#fff', width: 50}}>{language.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <View style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 12
          }}>
            <FontAwesome name='mobile-phone' size={24} color={'#666666'} style={{ width: 30, textAlign: 'center' }} />
            <View style={{
              display: 'flex', flex: 1, flexDirection: 'row',
              alignItems: 'center', justifyContent: 'space-between',
              borderBottomColor: '#d5d5d5',
              borderBottomWidth: .5,
              padding: 16
            }}>
              <Text style={{ color: '#666666', fontSize: 12 }}>Phiên bản hiện tại</Text>
              <Text style={{ color: '#666666', fontSize: 12 }}>1.0.0</Text>
            </View>
          </View>
          <View style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 12
          }}>
            <Feather name='user-plus' size={24} color={'#666666'} style={{ width: 30, textAlign: 'center' }} />
            <View style={{
              display: 'flex', flex: 1, flexDirection: 'row',
              alignItems: 'center', justifyContent: 'space-between',
              borderBottomColor: '#d5d5d5',
              borderBottomWidth: .5,
              padding: 16
            }}>
              <Text style={{ color: '#666666', fontSize: 12 }}>Sử dụng tài khoản khác</Text>
            </View>
          </View>
        </ScrollView>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => { logout() }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} color={'#dc2626'} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Thoát
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
