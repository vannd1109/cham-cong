/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {AuthContext} from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const API_URL =
  Platform.OS === 'ios'
    ? 'http://172.20.254.70:8080'
    : 'http://172.20.254.70:8080';

    LocaleConfig.locales[""].dayNamesShort[0] = "CN";
    LocaleConfig.locales[""].dayNamesShort[1] = "T2";
    LocaleConfig.locales[""].dayNamesShort[2] = "T3";
    LocaleConfig.locales[""].dayNamesShort[3] = "T4";
    LocaleConfig.locales[""].dayNamesShort[4] = "T5";
    LocaleConfig.locales[""].dayNamesShort[5] = "T6";
    LocaleConfig.locales[""].dayNamesShort[6] = "T7";

    LocaleConfig.locales[""].monthNamesShort[0] = "Tháng 1, ";

const CheckInout = ({navigation}) => {
  const {userInfo} = useContext(AuthContext);
  const userNumber = parseInt(userInfo?.id);
  const timeNow = Date.now();
  const [currentDay, setCurrentDay] = useState(new Date(timeNow).getDate());
  const [currentMonth, setCurrentMonth] = useState(
    new Date(timeNow).getMonth(),
  );
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    setLoading(true);
    const date = new Date();
    const year = date.getFullYear();
    const month =
      date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    setCurrentDay(day);
    setCurrentMonth(month);
    const timeDate = `${year}-${month}-${day}`;

    let currentMarkedDates = {};

    currentMarkedDates[`${timeDate}`] = {
      selected: true,
      selectedColor: '#f4511e',
    };

    setMarkedDates(currentMarkedDates);

    axios
      .get(`${API_URL}/api/check-in-out/${userNumber}/${timeDate}`)
      .then(function (res) {
        const {checkIn, checkOut} = res.data;
        setTimeIn(checkIn || '');
        setTimeOut(checkOut || '');
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        const timer = setInterval(() => {
          setLoading(false);
          clearInterval(timer);
        }, 500);
      });
    console.log(timeOut);
  }, []);

  const handleTimeChange = async day => {
    const {dateString} = day;
    const currentDate = Object.keys(markedDates)[0];
    if (dateString !== currentDate) {
      let currentMarkedDates = {};

      currentMarkedDates[`${dateString}`] = {
        selected: true,
        selectedColor: '#f4511e',
      };

      setMarkedDates(currentMarkedDates);

      setTimeIn('');
      setTimeOut('');
      setLoading(true);
      setCurrentMonth(day.month < 10 ? '0' + day.month : day.month);
      setCurrentDay(day.day < 10 ? '0' + day.day : day.day);
      axios
        .get(`${API_URL}/api/check-in-out/${userNumber}/${dateString}`)
        .then(function (res) {
          const {checkIn, checkOut} = res.data;
          setTimeIn(checkIn || '');
          setTimeOut(checkOut || '');
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          const timer = setInterval(() => {
            setLoading(false);
            clearInterval(timer);
          }, 500);
        });
    }
  };

  return (
    <SafeAreaView style={styles.center}>
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
        <Text style={{color: '#fff'}}>Bảng chấm công</Text>
        <View style={{display: 'flex'}} />
      </View>
      <Calendar
        onDayPress={day => handleTimeChange(day)}
        markedDates={markedDates}
      />
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text style={styles.day}>
              {currentDay}/{currentMonth}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.line1}></Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.timer}>
              {timeIn && <Text>{timeIn}</Text>}
              <Text style={{margin: 10, display: 'flex'}}>-</Text>
              {timeOut && <Text>{timeOut}</Text>}
            </Text>
          </View>
        </View>

        {isLoading && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
            <Text style={{color: '#003868', fontSize: 12, fontStyle: 'italic'}}>
              Đang tải dữ liệu...
            </Text>
          </View>
        )}

        {!isLoading && (
          <View style={styles.content}>
            {timeIn && (
              <View style={styles.contentItem}>
                <Text style={styles.contentItemPoint}></Text>
                <View>
                  <Text style={{fontWeight: 'bold'}}>{timeIn}</Text>
                  <Text style={{color: 'gray', fontSize: 12}}>
                    Client: X1_G_70.251 - IP: 171.224.240.197 - Văn phòng: Trụ
                    sở chính
                  </Text>
                </View>
              </View>
            )}

            {timeOut && timeIn === '' && (
              <View style={styles.contentItem}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 12, color: '#f4511e'}}>
                  Không có giờ vào
                </Text>
              </View>
            )}

            {timeOut && (
              <View style={styles.contentItemLast}>
                <Text style={styles.contentItemPoint}></Text>
                <View>
                  <Text style={{fontWeight: 'bold'}}>{timeOut}</Text>
                  <Text style={{color: 'gray', fontSize: 12}}>
                    Client: X1_G_70.251 - IP: 171.224.240.197 - Văn phòng: Trụ
                    sở chính
                  </Text>
                </View>
              </View>
            )}
            {timeIn && timeOut === '' && (
              <View style={styles.contentItemLast}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 12,
                      color: '#f4511e',
                    }}>
                    Không có giờ ra
                  </Text>
                </View>
              </View>
            )}
            {timeIn === '' && timeOut === '' && (
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#e12424',
                    fontSize: 12,
                    fontStyle: 'italic',
                  }}>
                  Không có dữ liệu
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3282cf',
    flexDirection: 'row',
    padding: 15,
  },
  day: {
    fontSize: 16,
    color: '#fff',
  },
  line1: {
    backgroundColor: 'transparent',
  },
  timer: {
    textAlign: 'center',
    color: '#fff',
  },
  content: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentItem: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    marginTop: 4,
    padding: 16,
  },
  contentItemLast: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    marginTop: 4,
    padding: 16,
  },
  contentItemPoint: {
    backgroundColor: '#48a868',
    width: 12,
    height: 12,
    marginRight: 10,
    textAlign: 'center',
    lineHeight: 12,
    borderRadius: 12 / 2,
    overflow: 'hidden',
    color: '#fff',
  },
  spinnerTextStyle: {
    fontSize: 14,
    color: '#fff',
  },
});

export default CheckInout;
