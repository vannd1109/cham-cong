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
import "../assets/i18n/i18n";
import { useTranslation } from "react-i18next";

const CustomDrawer = props => {
  const { logout, userInfo } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(false);
  const { t, i18n } = useTranslation();
  const [ currentLanguage, setLanguage ] = useState("vi");
  const [currentColor, setColor] = useState("#003868");
  const [languages, setLanguages] = useState([
    {
      id: 'vi',
      label: 'vi',
      active: true,
    },
    {
      id: 'en',
      label: 'en',
      active: false,
    },
  ]);

  const handleChangeLanguage = (language) => {
    const _language = [...languages];
    _language.map((item) => {
      // item.active = item.id === language.id ? true : false;
      if (item.id === language.id) {
        item.active = true;
        i18n.changeLanguage(language?.id)
        .then(() => setLanguage(language?.id))
        .catch(err => console.log(err))
      } else {
        item.active = false;
      }

    });
    setLanguages(_language);
  }

  const handleChangeNotification = () => {
    setNotification(!notification);
  }

  const handleChangeDarkMode = () => {
    setDarkMode(!darkMode);
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
              <Text style={{ color: '#666666', fontSize: 12 }}>{t('dark_mode')}</Text>
              <Switch
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleChangeDarkMode}
                value={darkMode}
              />
            </View>
          </View>
          <View style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 12
          }}>
            <Ionicons name='color-palette-outline' size={24} color={currentColor} style={{ width: 30, textAlign: 'center' }} />
            <View style={{
              display: 'flex', flex: 1, flexDirection: 'row',
              alignItems: 'center', justifyContent: 'space-between',
              borderBottomColor: '#d5d5d5',
              borderBottomWidth: .5,
              padding: 16
            }}>
              <Text style={{ color: '#666666', fontSize: 12 }}>{t('change_color')}</Text>
              <View style={{ width: 24, height: 24, backgroundColor: '#003868', borderRadius: 50 }}></View>
            </View>
          </View>
          <View style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 12
          }}>
            <Ionicons name='notifications-outline' size={24} color={'#666666'} style={{ width: 30, textAlign: 'center' }} />
            <View style={{
              display: 'flex', flex: 1, flexDirection: 'row',
              alignItems: 'center', justifyContent: 'space-between',
              borderBottomColor: '#d5d5d5',
              borderBottomWidth: .5,
              padding: 12
            }}>
              <Text style={{ color: '#666666', fontSize: 12 }}>{t('notification')}</Text>
              <Switch
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleChangeNotification}
                value={notification}
              />
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
              <Text style={{ color: '#666666', fontSize: 12 }}>{t('account_management')}</Text>
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
              <Text style={{ color: '#666666', fontSize: 12 }}>{t('language')}</Text>
              <View style={{ display: 'flex', flexDirection: 'row'}}>
                {languages.map(language => (
                  <TouchableOpacity
                  onPress={() => handleChangeLanguage(language)}
                   key={language.id} 
                   style={{backgroundColor: `${language.id === currentLanguage ? '#003868' : '#666666'}`}}>
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
              <Text style={{ color: '#666666', fontSize: 12 }}>{t('current_version')}</Text>
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
              <Text style={{ color: '#666666', fontSize: 12 }}>{t('use_another_account')}</Text>
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
              {t('exit')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
