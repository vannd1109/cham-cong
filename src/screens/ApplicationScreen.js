/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ApplicationScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
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
    {
      id: 'statistics',
      name: 'Thống kê chấm công',
      icon: <Ionicons name="bar-chart-outline" size={20} color="#fff" />,
      bgColor: '#2563eb',
    },
  ];

  const handleChangeApp = app => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      navigation.navigate(app.name);
      clearTimeout(timer);
    }, 2000);
  };

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
        <Text style={{color: '#fff'}}>Ứng dụng</Text>
        <View style={{display: 'flex'}}>
          <Feather name="settings" style={{fontSize: 20, color: '#fff'}} />
        </View>
      </View>
      <View
        style={{
          position: 'relative',
        }}>
        <View
          style={{
            padding: 8,
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'space-between',
          }}>
          {appList.map((app, idx) => (
            <View
              key={idx}
              style={{alignItems: 'center', gap: 4, width: 80}}>
              <TouchableOpacity
                onPress={() => handleChangeApp(app)}
                style={{
                  backgroundColor: `${app.bgColor}`,
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {app.icon}
              </TouchableOpacity>
              <Text style={{fontSize: 12, textAlign: 'center'}}>{app.name}</Text>
            </View>
          ))}
        </View>
        {loading && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#00000112',
            }}>
            <View
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{translateY: -50}, {translateX: -100}],
                width: '50%',
                alignItems: 'center',
                gap: 4,
              }}>
              <View
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" />
                <Text style={{color: '#003868', fontSize: 12, fontStyle: 'italic'}}>
                  Đang tải ...
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ApplicationScreen;
