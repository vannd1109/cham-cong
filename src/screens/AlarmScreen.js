/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AlarmScreen = ({navigation}) => {
  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
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
        <Text style={{color: '#fff'}}>Nhắc nhở</Text>
        <View style={{display: 'flex', flexDirection: 'row', gap: 12}}>
          <Feather name="plus" style={{fontSize: 20, color: '#fff'}} />
          <Feather name="list" style={{fontSize: 20, color: '#fff'}} />
          <Feather name="settings" style={{fontSize: 20, color: '#fff'}} />
        </View>
      </View>
      <View>
        <Text>Nhắc nhở</Text>
      </View>
    </View>
  );
};

export default AlarmScreen;
