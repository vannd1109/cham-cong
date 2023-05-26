/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const StatisticsScreen = ({ navigation }) => {
  return (
    <>
      <SafeAreaView style={{ display: 'flex', flexDirection: 'column' }}>
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
            <Feather name="menu" style={{ fontSize: 20, color: '#fff' }} />
          </TouchableOpacity>
          <Text style={{ color: '#fff' }}>Thống kê chấm công</Text>
          <View style={{ display: 'flex' }} />
        </View>
        <View style={{ padding: 8 }}>
          <Text>Thông kê</Text>
        </View>
      </SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{ position: 'absolute', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, zIndex: 999, backgroundColor: '#22c55e', bottom: 24, right: 20 }}>
        <FontAwesome name="home" size={24} color={'#fff'} />
      </TouchableOpacity>
    </>
  );
};

export default StatisticsScreen;
