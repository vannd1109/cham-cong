/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button, Dialog } from 'react-native-paper';
import ProgressBar from 'react-native-progress/Bar';
import axios from 'axios';
import moment from 'moment';

<<<<<<< HEAD
const API_URL = 'http://172.17.9.14:8080';
=======
const API_URL = 'http://localhost:8080';
>>>>>>> 09ff1d592d8005234977424af57c30d4e0c0e3cb

const BookRiceScreen = ({ navigation }) => {
  const [currentDay, setCurrentDay] = useState('mon');
  const [idx, setIdx] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [menu, setMenu] = useState([]);
  const [selectedDishList, setSelectedDishList] = useState([
    {
      id: 'mon',
      name: 'Thứ 2',
      done: false,
      items: [
        {
          id: 'lunch',
          name: 'Bữa trưa',
          menu: [],
          foodValue: '',
        },
        {
          id: 'dinner',
          name: 'Bữa chiều',
          menu: [],
          foodValue: '',
        }
      ]
    },
    {
      id: 'tue',
      name: 'Thứ 3',
      done: false,
      items: [
        {
          id: 'lunch',
          name: 'Bữa trưa',
          menu: [],
          foodValue: '',
        },
        {
          id: 'dinner',
          name: 'Bữa chiều',
          menu: [],
          foodValue: '',
        }
      ]
    },
    {
      id: 'web',
      name: 'Thứ 4',
      done: false,
      items: [
        {
          id: 'lunch',
          name: 'Bữa trưa',
          menu: [],
          foodValue: '',
        },
        {
          id: 'dinner',
          name: 'Bữa chiều',
          menu: [],
          foodValue: '',
        }
      ]
    },
    {
      id: 'thu',
      name: 'Thứ 5',
      done: false,
      items: [
        {
          id: 'lunch',
          name: 'Bữa trưa',
          menu: [],
          foodValue: '',
        },
        {
          id: 'dinner',
          name: 'Bữa chiều',
          menu: [],
          foodValue: '',
        }
      ]
    },
    {
      id: 'fri',
      name: 'Thứ 6',
      done: true,
      items: [
        {
          id: 'lunch',
          name: 'Bữa trưa',
          menu: [],
          foodValue: '',
        },
        {
          id: 'dinner',
          name: 'Bữa chiều',
          menu: [],
          foodValue: '',
        }
      ]
    },
    {
      id: 'sat',
      name: 'Thứ 7',
      done: false,
      items: [
        {
          id: 'lunch',
          name: 'Bữa trưa',
          menu: [],
          foodValue: '',
        },
        {
          id: 'dinner',
          name: 'Bữa chiều',
          menu: [],
          foodValue: '',
        }
      ]
    },
    {
      id: 'sun',
      name: 'Chủ nhật',
      done: false,
      items: [
        {
          id: 'lunch',
          name: 'Bữa trưa',
          menu: [],
          foodValue: '',
        },
        {
          id: 'dinner',
          name: 'Bữa chiều',
          menu: [],
          foodValue: '',
        }
      ]
    },
  ]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [closeDate, setCloseDate] = useState(null);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      clearInterval(timer);
    }, 1000);
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/book-rice`)
      .then(function (res) {
        console.log(res.data);
        let result = res.data;
        result = result.filter(item => item.status === true);
        setStartDate(result[0].startDate);
        setEndDate(result[0].endDate);
        setCloseDate(result[0].closeDate);
        result = result[0].menu;
        setMenu(result);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const timer = setInterval(function () {
    const dateEntered = new Date(closeDate);
    const now = new Date();

    const _difference = dateEntered.getTime() - now.getTime();

    if (_difference > 0) {
      let _seconds = Math.floor(_difference / 1000);
      let _minutes = Math.floor(_seconds / 60);
      let _hours = Math.floor(_minutes / 60);
      const _days = Math.floor(_hours / 24);

      _hours %= 24;
      _minutes %= 60;
      _seconds %= 60;

      if (_days === 0 && _hours === 0 && _minutes === 0 && _seconds === 0) {
        clearInterval(timer);
      } else {
        setSeconds(_seconds);
        setMinutes(_minutes);
        setHours(_hours);
        setDays(_days);
      }
    }
  }, 1000);

  const handleChange = (idx) => {
    setIdx(idx);
    setCurrentDay(menu?.[idx].id);
    setCurrentTab(0);
  };

  const handleChangeTab = (index) => {
    setCurrentTab(index);
  };

  const handleSaveFood = () => {
    console.log(selectedDishList[idx].items[currentTab]);
    setShowSaved(false);
  };

  const handleChooseFood = (item) => {
    const foodItem = {};
    foodItem.code = item.label;
    foodItem.value = item.value;

    const _selectedDishList = [...selectedDishList];
    _selectedDishList[idx].items[currentTab].foodValue = '';

    const isValid = _selectedDishList[idx].items[currentTab].menu.some(food => food.code === item.label);

    if (isValid) {
      const currenIndex = _selectedDishList[idx].items[currentTab].menu.findIndex(i => i.code === item.label);
      _selectedDishList[idx].items[currentTab].menu.splice(currenIndex, 1);
    } else {
      _selectedDishList[idx].items[currentTab].menu.push(foodItem);
    }

    const isExistsD = _selectedDishList[idx].items[currentTab].menu.some(food => food.code === 'D');
    if (isExistsD) {
      _selectedDishList[idx].items[currentTab].menu = [];
      _selectedDishList[idx].items[currentTab].menu.push(foodItem);
    };

    const isExistsE = _selectedDishList[idx].items[currentTab].menu.some(food => food.code === 'E');
    if (isExistsE) {
      _selectedDishList[idx].items[currentTab].menu = [];
      _selectedDishList[idx].items[currentTab].menu.push(foodItem);
    }

    _selectedDishList[idx].items[currentTab].menu.sort((a, b) => a.code.localeCompare(b.code));

    _selectedDishList[idx].items[currentTab].menu.map(item => {
      _selectedDishList[idx].items[currentTab].foodValue += item.code;
    });

    setSelectedDishList(_selectedDishList);
  }

  return (
    <>
      <SafeAreaView style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fff' }}>
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
          <Text style={{ color: '#fff' }}>Đặt cơm từ {moment(startDate).format("DD/MM")} đến {moment(endDate).format("DD/MM/YYYY")}</Text>
          <TouchableOpacity style={{ display: 'flex' }} onPress={() => setShowSaved(true)} disabled={isClosed ? true : false}>
            <Feather name='save' color='#fff' size={24} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ display: 'flex', gap: 8 }}>
          <View style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center', backgroundColor: '#fff', padding: 8 }}>
            <Text style={{ fontSize: 12, fontStyle: 'italic' }}>Hạn cuối là {moment(closeDate).format("HH")} giờ, thứ {new Date(closeDate).getDay() + 1} ngày {moment(closeDate).format("DD/MM/YYYY")}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#d12c31' }}>
              {days >= 0 && (
                <Text>{days < 10 ? '0' + days : days} ngày : </Text>
              )}
              {days >= 0 && hours >= 0 && (
                <Text>{hours < 10 ? '0' + hours : hours} giờ : </Text>
              )}
              {days >= 0 && hours >= 0 && minutes >= 0 && (
                <Text>{minutes < 10 ? '0' + minutes : minutes} phút : </Text>
              )}
              {days >= 0 && hours >= 0 && minutes >= 0 && seconds >= 0 && (
                <Text>{seconds < 10 ? '0' + seconds : seconds} giây</Text>
              )}
            </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 12, flexWrap: 'wrap', borderBottomWidth: 0.5, borderBottomColor: '#bfbdbb', paddingBottom: 16, justifyContent: 'center', alignItems: 'center' }}>
            {menu?.map((item, idx) => (
              <TouchableOpacity key={idx} onPress={() => handleChange(idx)}
                disabled={loading ? true : false}>
                <View style={{ display: 'flex', justifyContent: 'center', borderRadius: 4, backgroundColor: `${currentDay === menu?.[idx]?.id ? '#b9e2fa' : '#f2f2f2'}`, alignItems: 'center', gap: 8, borderBottomColor: '#003868', borderWidth: .5, width: 60, height: 60 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 10 }}>{item.label}</Text>
                  <View>
                    <FontAwesome
                      name={`${(selectedDishList[idx].items[currentTab].menu.length > 1) || (selectedDishList[idx].items[currentTab].menu.some(item => item.code === 'D' || item.code === 'E')) ? 'calendar-check-o' : 'calendar-o'}`}
                      size={20} color={`${(selectedDishList[idx].items[currentTab].menu.length > 1) || (selectedDishList[idx].items[currentTab].menu.some(item => item.code === 'D' || item.code === 'E')) ? '#12978f' : '#003868'}`}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {!loading && (
            <View style={{ display: 'flex', gap: 8 }}>
              <View style={{ paddingBottom: 0, marginBottom: 0, gap: 8, borderBottomColor: '#003868', padding: 4, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                {currentDay === menu?.[idx]?.id && (
                  menu?.[idx]?.items.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={{
                          backgroundColor: `${item.id === menu?.[idx].items[currentTab].id ? '#003868' : '#fff'}`,
                          borderWidth: 0.5,
                          borderColor: '#003868',
                          borderRadius: 4,
                          padding: 16, flex: 1, alignItems: 'center'
                        }} onPress={() => handleChangeTab(index)}>
                        <View key={item.id}>
                          <Text style={{ color: `${item.id === menu?.[idx].items[currentTab].id ? '#fff' : '#003868'}` }}>{item.label}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })
                )}
              </View>
              <View style={{ display: 'flex', gap: 8 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 4, gap: 12 }}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: 8, color: '#003868' }}>Món chính:</Text>
                  {selectedDishList[idx].items[currentTab].menu.length > '' && (
                    <View style={{ backgroundColor: '#eab308', padding: 4, gap: 4, display: 'flex', flexDirection: 'column' }}>
                      {selectedDishList[idx].items[currentTab].menu.map((item, index) => (
                        item.value.split(',').map((food, idx) => (
                          <Text key={idx} style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 12, color: '#003868' }}>{index + 1 + idx} : {food}</Text>
                        ))
                      ))}
                    </View>
                  )}
                </View>

                <ScrollView>
                  <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 4, justifyContent: 'space-around' }}>
                    {menu?.[idx]?.items[currentTab]?.menu['main-dishes']?.items.map((item, index) =>
                      item?.value && (
                        <TouchableOpacity
                          disabled={
                            (selectedDishList[idx].items[currentTab].menu.length > 1 &&
                              selectedDishList[idx].items[currentTab].menu.every(i => i.code !== item.label))
                              ? true : false
                          }
                          key={item.id}
                          style={{
                            display: 'flex', padding: 8, flex: 1, borderBottomWidth: 1,
                            borderRightWidth: 1, borderBottomColor: '#bfbdbb', minWidth: 160, maxWidth: 220, minHeight: 60,
                            overflow: 'scroll',
                            backgroundColor: `${selectedDishList[idx].items[currentTab].menu.some(i => i.code === item.label) ? '#22c55e' : '#f2f2f2'}`
                          }}
                          onPress={() => handleChooseFood(item)}>
                          <Text style={{ textDecorationLine: 'underline', fontSize: 12, fontWeight: 'bold' }}>Món {item.label}{`${item.vegetarianDish ? ' (CHAY)' : ''}`}</Text>
                          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 4, overflow: 'hidden' }}>
                            <View style={{ display: 'flex', justifyContent: 'center', gap: 4, }}>
                              {item?.value?.split(',')?.map((foodItem, index) => (
                                <Text key={index} style={{ fontSize: 10, textTransform: 'capitalize', borderBottomWidth: 1, borderBottomColor: '#003868' }}>{foodItem}</Text>
                              ))}
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))}
                  </View>
                </ScrollView>
                {menu?.[idx]?.items[currentTab]?.menu['stir-fried-meal'].value && (
                  <View style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 8, alignItems: 'center', backgroundColor: '#bfbdbb' }}>
                    <Text style={{ width: 120, fontSize: 12, fontWeight: 'bold', padding: 4, color: '#003868' }}>Món xào:</Text>
                    <Text style={{ textTransform: 'uppercase', textTransform: 'uppercase', fontWeight: 'bold', fontSize: 12 }}>{menu?.[idx]?.items[currentTab]?.menu['stir-fried-meal'].value}</Text>
                  </View>
                )}
                {menu?.[idx]?.items[currentTab]?.menu['soup'].value && (
                  <View style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center', padding: 8 }}>
                    <Text style={{ width: 120, fontSize: 12, fontWeight: 'bold', padding: 4, color: '#003868' }}>Món canh:</Text>
                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: 12 }}>{menu?.[idx]?.items[currentTab]?.menu['soup'].value}</Text>
                  </View>
                )}
                {menu?.[idx]?.items[currentTab]?.menu['dessert'].value && (
                  <View style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 8, alignItems: 'center', backgroundColor: '#bfbdbb' }}>
                    <Text style={{ width: 120, fontSize: 12, fontWeight: 'bold', padding: 4, color: '#003868' }}>Tráng miệng: </Text>
                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: 12 }}>{menu?.[idx]?.items[currentTab]?.menu['dessert'].value}</Text>
                  </View>
                )}
              </View>
            </View>
          )}
          {loading && (
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
              <Text style={{ color: '#003868', fontStyle: 'italic' }}>
                Đang tải dữ liệu...
              </Text>
              <ProgressBar
                progress={10000}
                indeterminate={true}
                color={'#003868'}
                height={10}
                width={200}
                borderRadius={8}
                animating={true}
                duration={2000}
              />
            </View>
          )}
        </ScrollView>
        <Dialog visible={showSaved} onDismiss={() => setShowSaved(false)}>
          <Dialog.Title style={{ fontSize: 16, textAlign: 'center' }}>Bạn có muốn lưu lại lựa chọn của mình?</Dialog.Title>
          <Dialog.Content>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
              <Button onPress={() => setShowSaved(false)} uppercase={true} textColor='#fff' buttonColor='#d12c31' style={{ width: '50%', padding: 4 }}>
                Huỷ
              </Button>
              <Button onPress={handleSaveFood} uppercase={true} textColor='#fff' buttonColor='#003868' style={{ width: '50%', padding: 4 }}>
                Đồng ý
              </Button>
            </View>
          </Dialog.Content>
        </Dialog>
      </SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{ position: 'absolute', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, zIndex: 999, backgroundColor: '#22c55e', bottom: 24, right: 20 }}>
        <FontAwesome name="home" size={24} color={'#fff'} />
      </TouchableOpacity>
    </>
  );
};

export default BookRiceScreen;
