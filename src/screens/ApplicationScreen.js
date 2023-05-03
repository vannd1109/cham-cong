/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ApplicationScreen = ({navigation}) => {
  const appList = [
    {
      id: 'check_in',
      name: 'Chấm công',
      icon: <FontAwesome name="calendar-check-o" size={20} color="#fff" />,
      bgColor: '#30a1bb',
    },
    {
      id: 'payrolls',
      name: 'Bảng lương',
      icon: <FontAwesome name="money" size={20} color="#fff" />,
      bgColor: '#2e892e',
    },
    {
      id: 'time_off',
      name: 'Nghỉ phép',
      icon: <Ionicons name="flash" size={20} color="#fff" />,
      bgColor: '#dd3f3f',
    },
    {
      id: 'book_rice',
      name: 'Đặt cơm',
      icon: <MaterialIcons name="rice-bowl" size={20} color="#fff" />,
      bgColor: '#e1a22f',
    },
  ];

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
        <Text style={{color: '#fff'}}>Ứng dụng</Text>
        <View style={{display: 'flex'}}>
          <Feather name="settings" style={{fontSize: 20, color: '#fff'}} />
        </View>
      </View>
      <View
        style={{
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '100%',
        }}>
        {appList.map(app => (
          <View
            key={app.id}
            style={{display: 'flex', alignItems: 'center', flex: 1, gap: 4}}>
            <View
              style={{
                backgroundColor: `${app.bgColor}`,
                width: 40,
                height: 40,
                borderRadius: 8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.navigate(app.name)}>{app.icon}</TouchableOpacity>
            </View>
            <Text style={{fontSize: 12}}>{app.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ApplicationScreen;
