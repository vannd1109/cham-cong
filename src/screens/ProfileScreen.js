/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useContext} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../context/AuthContext';
import {TextInput} from 'react-native-gesture-handler';

const ProfileScreen = ({navigation}) => {
  const {userInfo} = useContext(AuthContext);
  const SID = `0${userInfo?.id}`;
  return (
    <SafeAreaView style={{display: 'flex', flexDirection: 'column'}}>
      <View
        style={{
          height: 50,
          backgroundColor: '#003868',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" style={{fontSize: 20, color: '#fff'}} />
        </TouchableOpacity>
        <Text style={{color: '#fff'}}>
          {userInfo?.fullname} - 0{userInfo?.id} - {userInfo?.department}
        </Text>
        <View style={{display: 'flex'}} />
      </View>
      <View style={{padding: 8, display: 'flex', gap: 12}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <Text style={{fontSize: 12, fontWeight: '600', width: 60}}>SID:</Text>
          <TextInput
            style={{
              borderColor: '#00000222',
              borderWidth: 1,
              padding: 4,
              flex: 1,
              borderRadius: 2,
              fontSize: 12,
              paddingLeft: 8,
              color: '#003868',
            }}
            editable={false}
            selectTextOnFocus={false}
            value={SID}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <Text style={{fontSize: 12, fontWeight: '600', width: 60}}>
            Họ và tên:
          </Text>
          <TextInput
            style={{
              borderColor: '#00000222',
              borderWidth: 1,
              padding: 4,
              flex: 1,
              borderRadius: 2,
              fontSize: 12,
              paddingLeft: 8,
              color: '#003868',
            }}
            editable={false}
            selectTextOnFocus={false}
            value={userInfo?.fullname}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <Text style={{fontSize: 12, fontWeight: '600', width: 60}}>
            Bộ phận:
          </Text>
          <TextInput
            style={{
              borderColor: '#00000222',
              borderWidth: 1,
              padding: 4,
              flex: 1,
              borderRadius: 2,
              fontSize: 12,
              paddingLeft: 8,
              color: '#003868',
            }}
            editable={false}
            selectTextOnFocus={false}
            value={userInfo?.department}
          />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{backgroundColor: '#003868', padding: 8, borderRadius: 4}}>
          <Text style={{color: '#fff'}}>Cập nhật thông tin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
