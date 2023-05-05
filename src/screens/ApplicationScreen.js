/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProgressBar from 'react-native-progress/Bar';

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
          }}>
          {appList.map(app => (
            <View
              key={app.id}
              style={{display: 'flex', alignItems: 'center', flex: 1, gap: 4}}>
              <TouchableOpacity
                onPress={() => handleChangeApp(app)}
                style={{
                  backgroundColor: `${app.bgColor}`,
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {app.icon}
              </TouchableOpacity>
              <Text style={{fontSize: 12}}>{app.name}</Text>
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
              <Text>Đang tải...</Text>
              <ProgressBar
                progress={5000}
                indeterminate={true}
                color={'#003868'}
                height={10}
                width={200}
                borderRadius={8}
                animating={true}
                duration={2000}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ApplicationScreen;
