/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RadioButton, Button, Dialog } from 'react-native-paper';
import ProgressBar from 'react-native-progress/Bar';

const arrBookRice = [
  {
    id: 'mon',
    name: 'Thứ 2',
    done: false,
    items: [
      {
        id: 'lunch',
        name: 'Bữa trưa',
        menu: {
          "main-dishes": {
            name: "Món chính",
            items: [
              {
                id: "dish-1",
                foodList: [
                  'Cà ry gà',
                  'Cá mối chiên sả',
                ],
              },
              {
                id: "dish-2",
                foodList: [
                  'Cà ry gà',
                  'Bò xào chua ngọt',
                ],
              },
              {
                id: "dish-3",
                foodList: [
                  'Bò xào chua ngọt',
                  'Cá mối chiên sả',
                ],
              },
              {
                id: "dish-4",
                foodList: [
                  'Đậu hũ sốt bơ tỏi',
                  'Cà ry chay',
                ],
              },
            ]
          },
          "stir-fried-meal": {
            name: "Món xào",
            value: "Cải ngọt xào",
          },
          "soup": {
            name: "Món canh",
            value: "Canh rau thập cẩm - thịt",
          },
          "dessert": {
            name: "Tráng miệng",
            value: "Ổi",
          }
        }
      },
      {
        id: 'dinner',
        name: 'Bữa chiều',
        menu: {
          "main-dishes": {
            name: "Món chính",
            items: [
              {
                id: "dish-1",
                foodList: [
                  'Vịt nấu chao',
                  'Cà chua dồn thịt',
                ],
              },
              {
                id: "dish-2",
                foodList: [
                  'Cà chua dồn thịt',
                  'Cá hường chiên sả',
                ],
              },
              {
                id: "dish-3",
                foodList: [
                  'Vịt nấu chao',
                  'Cá hường chiên sả',
                ],
              },
              {
                id: "dish-4",
                foodList: [
                  'Chả lụa kho cà',
                  'Bắp non xào thập cẩm',
                ],
              },
              {
                id: "dish-5",
                foodList: [
                  'Bún mọc thịt',
                ],
              },
            ]
          },
          "stir-fried-meal": {
            name: "Món xào",
            value: "Đậu đũa xào",
          },
          "soup": {
            name: "Món canh",
            value: "Canh cải xanh - thịt",
          },
          "dessert": {
            name: "Tráng miệng",
            value: "Ổi",
          }
        }
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
        menu: {
          "main-dishes": {
            name: "Món chính",
            items: [
              {
                id: "dish-1",
                foodList: [
                  'Cà ry gà',
                  'Cá mối chiên sả',
                ],
              },
              {
                id: "dish-2",
                foodList: [
                  'Cà ry gà',
                  'Bò xào chua ngọt',
                ],
              },
              {
                id: "dish-3",
                foodList: [
                  'Bò xào chua ngọt',
                  'Cá mối chiên sả',
                ],
              },
              {
                id: "dish-4",
                foodList: [
                  'Đậu hũ sốt bơ tỏi',
                  'Cà ry chay',
                ],
              },
            ]
          },
          "stir-fried-meal": {
            name: "Món xào",
            value: "Cải ngọt xào",
          },
          "soup": {
            name: "Món canh",
            value: "Canh rau thập cẩm - thịt",
          },
          "dessert": {
            name: "Tráng miệng",
            value: "Ổi",
          }
        }
      },
      {
        id: 'dinner',
        name: 'Bữa chiều',
        menu: {
          "main-dishes": {
            name: "Món chính",
            items: [
              {
                id: "dish-1",
                foodList: [
                  'Vịt nấu chao',
                  'Cà chua dồn thịt',
                ],
              },
              {
                id: "dish-2",
                foodList: [
                  'Cà chua dồn thịt',
                  'Cá hường chiên sả',
                ],
              },
              {
                id: "dish-3",
                foodList: [
                  'Vịt nấu chao',
                  'Cá hường chiên sả',
                ],
              },
              {
                id: "dish-4",
                foodList: [
                  'Chả lụa kho cà',
                  'Bắp non xào thập cẩm',
                ],
              },
              {
                id: "dish-5",
                foodList: [
                  'Bún mọc thịt',
                ],
              },
            ]
          },
          "stir-fried-meal": {
            name: "Món xào",
            value: "Đậu đũa xào",
          },
          "soup": {
            name: "Món canh",
            value: "Canh cải xanh - thịt",
          },
          "dessert": {
            name: "Tráng miệng",
            value: "Ổi",
          }
        }
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
        menu: {
          "main-dishes": {
            name: "Món chính",
            items: [
              {
                id: "dish-1",
                foodList: [
                  'Cà ry gà',
                  'Cá mối chiên sả',
                ],
              },
              {
                id: "dish-2",
                foodList: [
                  'Cà ry gà',
                  'Bò xào chua ngọt',
                ],
              },
              {
                id: "dish-3",
                foodList: [
                  'Bò xào chua ngọt',
                  'Cá mối chiên sả',
                ],
              },
              {
                id: "dish-4",
                foodList: [
                  'Đậu hũ sốt bơ tỏi',
                  'Cà ry chay',
                ],
              },
            ]
          },
          "stir-fried-meal": {
            name: "Món xào",
            value: "Cải ngọt xào",
          },
          "soup": {
            name: "Món canh",
            value: "Canh rau thập cẩm - thịt",
          },
          "dessert": {
            name: "Tráng miệng",
            value: "Ổi",
          }
        }
      },
      {
        id: 'dinner',
        name: 'Bữa chiều',
        menu: {
          "main-dishes": {
            name: "Món chính",
            items: [
              {
                id: "dish-1",
                foodList: [
                  'Vịt nấu chao',
                  'Cà chua dồn thịt',
                ],
              },
              {
                id: "dish-2",
                foodList: [
                  'Cà chua dồn thịt',
                  'Cá hường chiên sả',
                ],
              },
              {
                id: "dish-3",
                foodList: [
                  'Vịt nấu chao',
                  'Cá hường chiên sả',
                ],
              },
              {
                id: "dish-4",
                foodList: [
                  'Chả lụa kho cà',
                  'Bắp non xào thập cẩm',
                ],
              },
              {
                id: "dish-5",
                foodList: [
                  'Bún mọc thịt',
                ],
              },
            ]
          },
          "stir-fried-meal": {
            name: "Món xào",
            value: "Đậu đũa xào",
          },
          "soup": {
            name: "Món canh",
            value: "Canh cải xanh - thịt",
          },
          "dessert": {
            name: "Tráng miệng",
            value: "Ổi",
          }
        }
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
        menu: {
          "main-dishes": {
            name: "Món chính",
            items: [
              {
                id: "dish-1",
                foodList: [
                  'Cà ry gà',
                  'Cá mối chiên sả',
                ],
              },
              {
                id: "dish-2",
                foodList: [
                  'Cà ry gà',
                  'Bò xào chua ngọt',
                ],
              },
              {
                id: "dish-3",
                foodList: [
                  'Bò xào chua ngọt',
                  'Cá mối chiên sả',
                ],
              },
              {
                id: "dish-4",
                foodList: [
                  'Đậu hũ sốt bơ tỏi',
                  'Cà ry chay',
                ],
              },
            ]
          },
          "stir-fried-meal": {
            name: "Món xào",
            value: "Cải ngọt xào",
          },
          "soup": {
            name: "Món canh",
            value: "Canh rau thập cẩm - thịt",
          },
          "dessert": {
            name: "Tráng miệng",
            value: "Ổi",
          }
        }
      },
      {
        id: 'dinner',
        name: 'Bữa chiều',
        menu: {
          "main-dishes": {
            name: "Món chính",
            items: [
              {
                id: "dish-1",
                foodList: [
                  'Vịt nấu chao',
                  'Cà chua dồn thịt',
                ],
              },
              {
                id: "dish-2",
                foodList: [
                  'Cà chua dồn thịt',
                  'Cá hường chiên sả',
                ],
              },
              {
                id: "dish-3",
                foodList: [
                  'Vịt nấu chao',
                  'Cá hường chiên sả',
                ],
              },
              {
                id: "dish-4",
                foodList: [
                  'Chả lụa kho cà',
                  'Bắp non xào thập cẩm',
                ],
              },
              {
                id: "dish-5",
                foodList: [
                  'Bún mọc thịt',
                ],
              },
            ]
          },
          "stir-fried-meal": {
            name: "Món xào",
            value: "Đậu đũa xào",
          },
          "soup": {
            name: "Món canh",
            value: "Canh cải xanh - thịt",
          },
          "dessert": {
            name: "Tráng miệng",
            value: "Ổi",
          }
        }
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
        menu: {
          "main-dishes": {
            name: "Món chính",
            items: [
              {
                id: "dish-1",
                foodList: [
                  'Cà ry gà',
                  'Cá mối chiên sả',
                ],
              },
              {
                id: "dish-2",
                foodList: [
                  'Cà ry gà',
                  'Bò xào chua ngọt',
                ],
              },
              {
                id: "dish-3",
                foodList: [
                  'Bò xào chua ngọt',
                  'Cá mối chiên sả',
                ],
              },
              {
                id: "dish-4",
                foodList: [
                  'Đậu hũ sốt bơ tỏi',
                  'Cà ry chay',
                ],
              },
            ]
          },
          "stir-fried-meal": {
            name: "Món xào",
            value: "Cải ngọt xào",
          },
          "soup": {
            name: "Món canh",
            value: "Canh rau thập cẩm - thịt",
          },
          "dessert": {
            name: "Tráng miệng",
            value: "Ổi",
          }
        }
      },
      {
        id: 'dinner',
        name: 'Bữa chiều',
        menu: {
          "main-dishes": {
            name: "Món chính",
            items: [
              {
                id: "dish-1",
                foodList: [
                  'Vịt nấu chao',
                  'Cà chua dồn thịt',
                ],
              },
              {
                id: "dish-2",
                foodList: [
                  'Cà chua dồn thịt',
                  'Cá hường chiên sả',
                ],
              },
              {
                id: "dish-3",
                foodList: [
                  'Vịt nấu chao',
                  'Cá hường chiên sả',
                ],
              },
              {
                id: "dish-4",
                foodList: [
                  'Chả lụa kho cà',
                  'Bắp non xào thập cẩm',
                ],
              },
              {
                id: "dish-5",
                foodList: [
                  'Bún mọc thịt',
                ],
              },
            ]
          },
          "stir-fried-meal": {
            name: "Món xào",
            value: "Đậu đũa xào",
          },
          "soup": {
            name: "Món canh",
            value: "Canh cải xanh - thịt",
          },
          "dessert": {
            name: "Tráng miệng",
            value: "Ổi",
          }
        }
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
        menu: {
          "main-dishes": {
            name: "Món chính",
            items: [
              {
                id: "dish-1",
                foodList: [
                  'Cà ry gà',
                  'Cá mối chiên sả',
                ],
              },
              {
                id: "dish-2",
                foodList: [
                  'Cà ry gà',
                  'Bò xào chua ngọt',
                ],
              },
              {
                id: "dish-3",
                foodList: [
                  'Bò xào chua ngọt',
                  'Cá mối chiên sả',
                ],
              },
              {
                id: "dish-4",
                foodList: [
                  'Đậu hũ sốt bơ tỏi',
                  'Cà ry chay',
                ],
              },
            ]
          },
          "stir-fried-meal": {
            name: "Món xào",
            value: "Cải ngọt xào",
          },
          "soup": {
            name: "Món canh",
            value: "Canh rau thập cẩm - thịt",
          },
          "dessert": {
            name: "Tráng miệng",
            value: "Ổi",
          }
        }
      },
      {
        id: 'dinner',
        name: 'Bữa chiều',
        menu: {
          "main-dishes": {
            name: "Món chính",
            items: [
              {
                id: "dish-1",
                foodList: [
                  'Vịt nấu chao',
                  'Cà chua dồn thịt',
                ],
              },
              {
                id: "dish-2",
                foodList: [
                  'Cà chua dồn thịt',
                  'Cá hường chiên sả',
                ],
              },
              {
                id: "dish-3",
                foodList: [
                  'Vịt nấu chao',
                  'Cá hường chiên sả',
                ],
              },
              {
                id: "dish-4",
                foodList: [
                  'Chả lụa kho cà',
                  'Bắp non xào thập cẩm',
                ],
              },
              {
                id: "dish-5",
                foodList: [
                  'Bún mọc thịt',
                ],
              },
            ]
          },
          "stir-fried-meal": {
            name: "Món xào",
            value: "Đậu đũa xào",
          },
          "soup": {
            name: "Món canh",
            value: "Canh cải xanh - thịt",
          },
          "dessert": {
            name: "Tráng miệng",
            value: "Ổi",
          }
        }
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
        menu: {
          "main-dishes": {
            name: "Món chính",
            items: [
              {
                id: "dish-1",
                foodList: [
                  'Cà ry gà',
                  'Cá mối chiên sả',
                ],
              },
              {
                id: "dish-2",
                foodList: [
                  'Cà ry gà',
                  'Bò xào chua ngọt',
                ],
              },
              {
                id: "dish-3",
                foodList: [
                  'Bò xào chua ngọt',
                  'Cá mối chiên sả',
                ],
              },
              {
                id: "dish-4",
                foodList: [
                  'Đậu hũ sốt bơ tỏi',
                  'Cà ry chay',
                ],
              },
            ]
          },
          "stir-fried-meal": {
            name: "Món xào",
            value: "Cải ngọt xào",
          },
          "soup": {
            name: "Món canh",
            value: "Canh rau thập cẩm - thịt",
          },
          "dessert": {
            name: "Tráng miệng",
            value: "Ổi",
          }
        }
      },
      {
        id: 'dinner',
        name: 'Bữa chiều',
        menu: {
          "main-dishes": {
            name: "Món chính",
            items: [
              {
                id: "dish-1",
                foodList: [
                  'Vịt nấu chao',
                  'Cà chua dồn thịt',
                ],
              },
              {
                id: "dish-2",
                foodList: [
                  'Cà chua dồn thịt',
                  'Cá hường chiên sả',
                ],
              },
              {
                id: "dish-3",
                foodList: [
                  'Vịt nấu chao',
                  'Cá hường chiên sả',
                ],
              },
              {
                id: "dish-4",
                foodList: [
                  'Chả lụa kho cà',
                  'Bắp non xào thập cẩm',
                ],
              },
              {
                id: "dish-5",
                foodList: [
                  'Bún mọc thịt',
                ],
              },
            ]
          },
          "stir-fried-meal": {
            name: "Món xào",
            value: "Đậu đũa xào",
          },
          "soup": {
            name: "Món canh",
            value: "Canh cải xanh - thịt",
          },
          "dessert": {
            name: "Tráng miệng",
            value: "Ổi",
          }
        }
      }
    ]
  },
]

const BookRiceScreen = ({ navigation }) => {
  const [currentDay, setCurrentDay] = useState('mon');
  const [idx, setIdx] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [mainFood, setMainFood] = useState([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      clearInterval(timer);
    }, 1000);
  }, []);

  const handleChange = (idx) => {
    setIdx(idx);
    setCurrentDay(arrBookRice[idx].id);
    setCurrentTab(0);
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      clearInterval(timer);
    }, 1000);
  }

  const handleChangeTab = (index) => {
    setCurrentTab(index);
  }

  const handleSaveFood = () => {
    console.log(currentTab);
    setShowSaved(false);
  }

  const handleChooseFood = (item) => {
    setValue(item.id);
    setMainFood([...item.foodList]);
  }

  return (
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
        <Text style={{ color: '#fff' }}>Đặt cơm từ 15/05 đến 21/05/2023)</Text>
        <TouchableOpacity style={{ display: 'flex' }} onPress={() => setShowSaved(true)} disabled={isClosed ? true : false}>
          <Feather name='save' color='#fff' size={24} />
        </TouchableOpacity>
      </View>
      <View style={{ display: 'flex', gap: 16 }}>
        <View style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center', backgroundColor: '#fff', padding: 8 }}>
          <Text style={{ fontSize: 12, fontStyle: 'italic' }}>Hạn cuối là 13 giờ, thứ 7 ngày 13/05/2023</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#d12c31' }}>3 ngày : 5 giờ : 16 phút</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 16, flexWrap: 'wrap', borderBottomWidth: 0.5, borderBottomColor: '#bfbdbb', paddingBottom: 16, justifyContent: 'center', alignItems: 'center' }}>
          {arrBookRice.map((item, idx) => (
            <TouchableOpacity key={idx} onPress={() => handleChange(idx)} disabled={loading ? true : false}>
              <View style={{ display: 'flex', justifyContent: 'center', borderRadius: 4, backgroundColor: `${currentDay === arrBookRice[idx]?.id ? '#b9e2fa' : '#f2f2f2'}`, alignItems: 'center', gap: 8, width: 60, borderBottomColor: '#003868', borderWidth: .5, height: 60 }}>
                < Text style={{ fontWeight: 'bold', fontSize: 12 }}>{item.name}</Text>
                <View>
                  <FontAwesome name={`${item.done ? 'calendar-check-o' : 'calendar-o'}`} size={24} color={`${item.done ? '#12978f' : '#003868'}`} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {!loading && (
          <>
            <View style={{ paddingBottom: 0, marginBottom: 0, gap: 8, borderBottomColor: '#003868', padding: 8, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              {currentDay === arrBookRice[idx]?.id && (
                arrBookRice[idx]?.items.map((item, index) => (
                  <TouchableOpacity key={item.id} style={{ backgroundColor: `${item.id === arrBookRice[idx].items[currentTab].id ? '#003868' : '#fff'}`, padding: 12, flex: 1, alignItems: 'center' }} onPress={() => handleChangeTab(index)}>
                    <View key={item.id}>
                      <Text style={{ color: `${item.id === arrBookRice[idx].items[currentTab].id ? '#fff' : '#003868'}` }}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
            <ScrollView>
              <View style={{ flexDirection: 'column' }}>
                <ScrollView style={{ display: 'flex', padding: 8, minHeight: 180, maxHeight: 260, marginBottom: 16 }}>
                  <View style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', paddingLeft: 8, color: '#003868' }}>Món chính:</Text>
                    <ScrollView horizontal={true} style={{backgroundColor: '#ffd', padding: 8}}>
                      <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: 14, color: '#d12c31' }}>{mainFood.join(' - ')}</Text>
                    </ScrollView>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 16, padding: 8, }}>
                    {arrBookRice[idx]?.items[currentTab]?.menu['main-dishes'].items.map((item, index) => (
                      <RadioButton.Group key={index} onValueChange={() => handleChooseFood(item)} value={value}>
                        <TouchableOpacity key={item.id} style={{ display: 'flex', padding: 8, flex: 1, borderBottomWidth: 1, borderRightWidth: 1, borderBottomColor: '#bfbdbb', maxWidth: 160, minWidth: 160, overflow: 'visible', backgroundColor: `${item.id === value ? '#58d69f' : '#f2f2f2'}` }} onPress={() => handleChooseFood(item)}>
                          <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>Món {index + 1}</Text>
                          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value={item.id} />
                            <View style={{ display: 'flex', gap: 2 }}>
                              {item.foodList.map((foodItem, index) => (
                                <Text key={index} style={{ display: 'flex', width: '100%', fontSize: 10, textTransform: 'capitalize' }}>{foodItem}</Text>
                              ))}
                            </View>
                          </View>
                        </TouchableOpacity>
                      </RadioButton.Group>
                    ))}
                  </View>
                </ScrollView>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 8, alignItems: 'center', backgroundColor: '#bfbdbb' }}>
                  <Text style={{ width: 120, fontSize: 14, fontWeight: 'bold', padding: 4, color: '#003868' }}>Món xào:</Text>
                  <Text style={{ textTransform: 'uppercase', textTransform: 'uppercase', fontWeight: 'bold', fontSize: 14 }}>{arrBookRice[idx]?.items[currentTab]?.menu['stir-fried-meal'].value}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center', padding: 8 }}>
                  <Text style={{ width: 120, fontSize: 14, fontWeight: 'bold', padding: 4, color: '#003868' }}>Món canh:</Text>
                  <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: 14 }}>{arrBookRice[idx]?.items[currentTab]?.menu['soup'].value}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 8, alignItems: 'center', backgroundColor: '#bfbdbb' }}>
                  <Text style={{ width: 120, fontSize: 14, fontWeight: 'bold', padding: 4, color: '#003868' }}>Tráng miệng: </Text>
                  <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: 14 }}>{arrBookRice[idx]?.items[currentTab]?.menu['dessert'].value}</Text>
                </View>
              </View>
            </ScrollView>
          </>
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
      </View>
      <Dialog visible={showSaved} onDismiss={() => setShowSaved(false)}>
        <Dialog.Title style={{ fontSize: 16, textAlign: 'center' }}>Bạn có muốn lưu lại lựu chọn của mình?</Dialog.Title>
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
  );
};

export default BookRiceScreen;
