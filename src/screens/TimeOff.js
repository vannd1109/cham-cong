/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TimeOff = ({navigation}) => {
  return (
    <View style={{display: 'flex', flexDirection: "column"}}>
      <View
        style={{
          height: 40,
          backgroundColor: '#003868',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" style={{fontSize: 32, color: '#fff'}} />
        </TouchableOpacity>
        <Text style={{color: '#fff'}}>Nghỉ phép</Text>
        <View style={{display: 'flex'}}>
            <AntDesign name="pluscircleo" style={{fontSize: 28, color: '#fff'}} />
        </View>
      </View>
      <View>
        <Text>Ngày nghỉ</Text>
      </View>
    </View>
  );
};

export default TimeOff;
