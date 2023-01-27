// import axios from 'axios';
import {useState, useEffect} from 'react';
import moment from 'moment';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Spinner from 'react-native-loading-spinner-overlay';

const API_URL =
  Platform.OS === 'ios' ? 'http://172.17.9.14:4001' : 'http://172.17.9.14:4001';
function CheckInOut() {
  const timeNow = Date.now;
  const [currentDay, setCurrentDay] = useState(new Date(timeNow).getDate());
  const [currentMonth, setCurrentMonth] = useState(
    new Date(timeNow).getMonth(),
  );
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [data, setData] = useState([]);
  const [selectedDay, setSelectedDay] = useState({
    '2023-01-25': {
      selected: true,
      marked: true,
      selectedColor: '#f4511e',
    },
  });
  const [isLoading, setLoading] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    let currentTime = new Date(Date.now());
    const convertTimeCurrent = moment(currentTime).format('YYYY-MM-DD');

    setCurrentDay(currentTime.getDate());
    setCurrentMonth(currentTime.getMonth() + 1);

    // let b = {};

    // b[`${convertTimeCurrent}`] = "selected: true, selectedColor: '#f4511e'";

    // setSelectedDay(b);

    fetchData(convertTimeCurrent);
  }, []);

  const fetchData = timeDate => {
    setTimeIn('');
    setTimeOut('');
    fetch(
      `${API_URL}/api/v1/check-in-out?UserEnrollNumber=3492&TimeDate=${timeDate}`,
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
          if (res.status === 200) {
            setData(result);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleTimeChange = day => {
    const {dateString} = day;
    const result = [];

    markedDates[`${dateString}`] = {selected: true, selectedColor: '#f4511e'};

    setMarkedDates(markedDates);

    console.log(markedDates);

    for(let item in markedDates) {
      result.push([item, markedDates [item]]);
      console.log(item);
    }

    const lastItem = {}

    

    // console.log(markedDates);

    // const isMarkedBefore = !!(
    //   // markedDates[`${dateString}`] &&
    //   markedDates[`${dateString}`].selected &&
    //   markedDates[`${dateString}`].selectedColor
    // );

    // markedDates[`${dateString}`] = { selected: !isMarkedBefore };

    // setMarkedDates(markedDates)

    // console.log("-----------------------");
    // console.log(markedDates);

    // console.log(value);
    // setTimeIn('');
    // setTimeOut('');
    // // setLoading(true);
    // setCurrentMonth(value.month);
    // setCurrentDay(value.day);

    // let b = {};

    // b[`${value.dateString}`] = "selected: true, selectedColor: '#f4511e'";

    // setSelectedDay(b);

    // fetchData(value.dateString);

    // if (data) {
    //   let currentTimeIn = new Date(data[0]?.TimeStr);
    //   setTimeIn(
    //     `${currentTimeIn.getHours() - 7}:${currentTimeIn.getMinutes()}`,
    //   );

    //   let currentTimeOut = new Date(data[1]?.TimeStr);
    //   setTimeOut(
    //     `${currentTimeOut.getHours() - 7}:${currentTimeOut.getMinutes()}`,
    //   );
    // }

    // const timer = setInterval(() => {
    //   setLoading(false);
    //   clearInterval(timer);
    // }, 500);

    // const timer = setInterval( () => {
    //   if (data) {
    //     let currentTimeIn = new Date(data[0]?.TimeStr);
    //     setTimeIn(
    //       `${currentTimeIn.getHours() - 7}:${currentTimeIn.getMinutes()}`,
    //     );

    //     let currentTimeOut = new Date(data[1]?.TimeStr);
    //     setTimeOut(
    //       `${currentTimeOut.getHours() - 7}:${currentTimeOut.getMinutes()}`,
    //     );

    //     // data.forEach(item => {
    //     //   // if (item?.OriginType === 'O') {
    //     //   //   let currentTime = new Date(item?.TimeStr);
    //     //   //   setTimeIn(
    //     //   //     `${currentTime.getHours() - 7}:${currentTime.getMinutes()}`,
    //     //   //   );
    //     //   // }
    //     //   let currentTimeIn = new Date(item[0]?.TimeStr);
    //     //     setTimeIn(
    //     //       `${currentTimeIn.getHours() - 7}:${currentTimeIn.getMinutes()}`,
    //     //     );
    //     //   // if (item?.OriginType === 'I') {
    //     //   //   let currentTime = new Date(item?.TimeStr);
    //     //   //   setTimeOut(
    //     //   //     `${currentTime.getHours() - 7}:${currentTime.getMinutes()}`,
    //     //   //   );
    //     //   // }
    //     //   let currentTimeOut = new Date(item[1]?.TimeStr);
    //     //     setTimeOut(
    //     //       `${currentTimeOut.getHours() - 7}:${currentTimeOut.getMinutes()}`,
    //     //     );
    //     // });
    //     setLoading(false);
    //     clearInterval(timer);
    //   } else {
    //     setLoading(false);
    //     clearInterval(timer);
    //     // setTimeIn('');
    //     // setTimeOut('');
    //   }
    // }, 50);
  };

  return (
    <View style={styles.center}>
      <Calendar
        onDayPress={day => handleTimeChange(day)}
        // markedDates={selectedDay}
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
              <Text>{timeIn}</Text>
              <Text style={{margin: 10, display: 'flex'}}>-</Text>
              {timeOut != 'NaN:NaN' && <Text>{timeOut}</Text>}
            </Text>
          </View>
        </View>

        <Spinner
          visible={isLoading}
          textContent={'Đang tải dữ liệu...'}
          textStyle={styles.spinnerTextStyle}
          indicatorStyler="red"
        />

        {!isLoading && (
          <View style={styles.content}>
            {timeIn != 'NaN:NaN' && (
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

            {timeOut != 'NaN:NaN' && (
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
          </View>
        )}

        {!data && (
          <View style={styles.content}>
            <Text>No Data</Text>
          </View>
        )}
      </View>
    </View>
  );
}

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

export default CheckInOut;
