/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const MessagesScreen = ({navigation}) => {
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
        <Text style={{color: '#fff'}}>CÔNG TY TNHH MTV SEN VÀNG VIỆT NAM</Text>
        <View style={{display: 'flex'}}>
          <Feather name="edit" style={{fontSize: 20, color: '#fff'}} />
        </View>
      </View>
      <View>
        <Text>Tin nhắn</Text>
      </View>
    </SafeAreaView>
  );
};

export default MessagesScreen;
