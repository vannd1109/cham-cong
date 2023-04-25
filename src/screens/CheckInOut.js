/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';

const API_URL =
  Platform.OS === 'ios' ? 'http://172.17.9.14:4001' : 'http://172.17.9.14:4001';

const CheckInout = ({navigation}) => {
  const {userInfo} = useContext(AuthContext);
  const userNumber = parseInt(userInfo?.id);
  const timeNow = Date.now;
  const [currentDay, setCurrentDay] = useState(new Date(timeNow).getDate());
  const [currentMonth, setCurrentMonth] = useState(
    new Date(timeNow).getMonth(),
  );
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  const fetchData = async (timeDate, userNumber) => {
    fetch(
      `${API_URL}/api/v1/check-in-out?UserEnrollNumber=${userNumber}&TimeDate=${timeDate}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(async res => {
        try {
          const result = await res.json();
          // console.log(result);
          setData(result);
          if (res.status === 200) {
            let currentTimeIn = new Date(result[0]?.TimeStr);
            setTimeIn(
              `${currentTimeIn.getHours() - 7}:${currentTimeIn.getMinutes()}`,
            );

            let currentTimeOut = new Date(result[1]?.TimeStr);
            setTimeOut(
              `${currentTimeOut.getHours() - 7}:${currentTimeOut.getMinutes()}`,
            );
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleTimeChange = async day => {
    const {dateString} = day;

    console.log(dateString);
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
      setCurrentMonth(day.month);
      setCurrentDay(day.day);
      await fetchData(dateString, userNumber);

      const timer = setInterval(() => {
        setLoading(false);
        clearInterval(timer);
      }, 100);
    }

    const timer = setInterval(() => {
      if (data) {
        let currentTimeIn = new Date(data[0]?.TimeStr);
        setTimeIn(
          `${currentTimeIn.getHours() - 7}:${currentTimeIn.getMinutes()}`,
        );

        let currentTimeOut = new Date(data[1]?.TimeStr);
        setTimeOut(
          `${currentTimeOut.getHours() - 7}:${currentTimeOut.getMinutes()}`,
        );

        // data.forEach(item => {
        //   // if (item?.OriginType === 'O') {
        //   //   let currentTime = new Date(item?.TimeStr);
        //   //   setTimeIn(
        //   //     `${currentTime.getHours() - 7}:${currentTime.getMinutes()}`,
        //   //   );
        //   // }
        //   let currentTimeIn = new Date(item[0]?.TimeStr);
        //     setTimeIn(
        //       `${currentTimeIn.getHours() - 7}:${currentTimeIn.getMinutes()}`,
        //     );
        //   // if (item?.OriginType === 'I') {
        //   //   let currentTime = new Date(item?.TimeStr);
        //   //   setTimeOut(
        //   //     `${currentTime.getHours() - 7}:${currentTime.getMinutes()}`,
        //   //   );
        //   // }
        //   let currentTimeOut = new Date(item[1]?.TimeStr);
        //     setTimeOut(
        //       `${currentTimeOut.getHours() - 7}:${currentTimeOut.getMinutes()}`,
        //     );
        // });
        setLoading(false);
        clearInterval(timer);
      } else {
        setLoading(false);
        clearInterval(timer);
        // setTimeIn('');
        // setTimeOut('');
      }
    }, 50);
  };

  return (
    <View style={styles.center}>
      <View
        style={{
          height: 40,
          backgroundColor: '#003868',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: "row",
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" style={{fontSize: 32, color: '#fff'}} />
        </TouchableOpacity>
        <Text style={{color: "#fff"}}>Bảng chấm công</Text>
        <View style={{display: "flex"}} />
      </View>
      <Calendar
        onDayPress={day => handleTimeChange(day)}
        markedDates={markedDates}
      />
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text style={styles.day}>
              {currentDay < 10 ? '0' + currentDay : currentDay}/
              {currentMonth < 10 ? '0' + currentMonth : currentMonth}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.line1}></Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.timer}>
              {timeIn !== 'NaN:NaN' && <Text>{timeIn}</Text>}
              <Text style={{margin: 10, display: 'flex'}}>-</Text>
              {timeOut !== 'NaN:NaN' && <Text>{timeOut}</Text>}
            </Text>
          </View>
        </View>

        <Spinner
          visible={isLoading}
          textContent={'Đang tải dữ liệu...'}
          // textStyle={styles.spinnerTextStyle}
          indicatorStyler="red"
        />

        {data.length > 0 && !isLoading && (
          <View style={styles.content}>
            {timeIn !== 'NaN:NaN' && (
              <View style={styles.contentItem}>
                <Text style={styles.contentItemPoint}></Text>
                <View>
                  <Text style={{fontWeight: 'bold'}}>{timeIn}</Text>
                  <Text style={{color: 'gray', fontSize: 13}}>
                    Client: X1_G_70.251 - IP: 171.224.240.197 - Văn phòng: Trụ
                    sở chính
                  </Text>
                </View>
              </View>
            )}

            {timeIn === 'NaN:NaN' && (
              <View style={styles.contentItem}>
                <Text style={{fontWeight: 'bold', color: '#f4511e'}}>
                  Không có giờ vào
                </Text>
              </View>
            )}

            {timeOut !== 'NaN:NaN' && (
              <View style={styles.contentItemLast}>
                <Text style={styles.contentItemPoint}></Text>
                <View>
                  <Text style={{fontWeight: 'bold'}}>{timeOut}</Text>
                  <Text style={{color: 'gray', fontSize: 13}}>
                    Client: X1_G_70.251 - IP: 171.224.240.197 - Văn phòng: Trụ
                    sở chính
                  </Text>
                </View>
              </View>
            )}
            {timeOut === 'NaN:NaN' && (
              <View style={styles.contentItemLast}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: 'bold', color: '#f4511e'}}>
                    Không có giờ ra
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        {data.length === 0 && !isLoading && (
          <View style={styles.content}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#f4511e',
              }}>
              Không có dữ liệu
            </Text>
          </View>
        )}
      </View>
    </View>
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
    padding: 8,
  },
  contentItemLast: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    marginTop: 4,
    padding: 8,
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
