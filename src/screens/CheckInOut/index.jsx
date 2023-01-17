// import axios from 'axios';
import {useState, useEffect} from 'react';
import moment from 'moment';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const API_URL =
  Platform.OS === 'ios' ? 'http://172.17.9.14:4001' : 'http://172.17.9.14:4001';

function CheckInOut() {
  const timeNow = Date.now;
  const [currentDay, setCurrentDay] = useState(new Date(timeNow).getDate());
  const [currentMonth, setCurrentMonth] = useState(
    new Date(timeNow).getMonth(),
  );
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState(0);
  const [data, setData] = useState([]);
  const [selectedDay, setSelectedDay] = useState({
    '2023-01-17': {selected: true, selectedColor: '#f4511e'},
  });

  useEffect(() => {
    let currentTime = new Date(Date.now());
    const convertTimeCurrent = moment(currentTime).format('YYYY-MM-DD');

    setCurrentDay(currentTime.getDate());
    setCurrentMonth(currentTime.getMonth() + 1);

    let a = JSON.stringify(selectedDay);

    a = a.replace(
      Object.keys(selectedDay)[0],
      `${moment(new Date(Date.now())).format('YYYY-MM-DD')}`,
    );

    fetchData(convertTimeCurrent);
  }, []);

  const fetchData = timeDate => {
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

            if (result) {
              result.forEach(item => {
                if (item?.OriginType === 'O') {
                  let currentTime = new Date(item?.TimeStr);
                  setTimeIn(
                    `${currentTime.getHours() - 7}:${currentTime.getMinutes()}`,
                  );
                }
                if (item?.OriginType === 'I') {
                  let currentTime = new Date(item?.TimeStr);
                  setTimeOut(
                    `${currentTime.getHours() - 7}:${currentTime.getMinutes()}`,
                  );
                }
              });
            } else {
              setTimeIn('');
              setTimeOut('');
            }
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleTimeChange = value => {
    setSelectedDay(value.dateString);
    setCurrentMonth(value.month);
    setCurrentDay(value.day);

    let a = JSON.stringify({
      '2023-01-01': {selected: true, selectedColor: '#f4511e'},
    });

    console.log(selectedDay);

    a = a.replace(
      Object.keys(selectedDay)[0],
      `${moment(new Date(value.timestamp)).format('YYYY-MM-DD')}`,
    );

    fetchData(value.dateString);

    if (data) {
      data.forEach(item => {
        if (item?.OriginType === 'O') {
          let currentTime = new Date(item?.TimeStr);
          setTimeIn(
            `${currentTime.getHours() - 7}:${currentTime.getMinutes()}`,
          );
        }
        if (item?.OriginType === 'I') {
          let currentTime = new Date(item?.TimeStr);
          setTimeOut(
            `${currentTime.getHours() - 7}:${currentTime.getMinutes()}`,
          );
        }
      });
    } else {
      setTimeIn('');
      setTimeOut('');
    }

    // setSelectedDay({`${selectedDay}` : {selected: true, selectedColor: '#00adf5'}})
    // console.log(JSON.parse(selectedDay));
  };

  return (
    <View style={styles.center}>
      <Calendar
        onDayPress={day => handleTimeChange(day)}
        markedDates={selectedDay}
      />
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text style={styles.day}>
              {currentDay}/
              {currentMonth < 10 ? '0' + currentMonth : currentMonth}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.line1}></Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.timer}>
              {timeIn} - {timeOut}
            </Text>
          </View>
        </View>

        {data && (
          <View style={styles.content}>
            <View style={styles.contentItem}>
              <Text style={styles.contentItemPoint}></Text>
              <View>
                <Text style={{fontWeight: 'bold'}}>{timeIn}</Text>
                <Text style={{color: 'gray', fontSize: 13}}>
                  Client: X1_G_70.251 - IP: 171.224.240.197 - Văn phòng: Trụ sở
                  chính
                </Text>
              </View>
            </View>

            <View style={styles.contentItemLast}>
              <Text style={styles.contentItemPoint}></Text>
              <View>
                <Text style={{fontWeight: 'bold'}}>{timeOut}</Text>
                <Text style={{color: 'gray', fontSize: 13}}>
                  Client: X1_G_70.251 - IP: 171.224.240.197 - Văn phòng: Trụ sở
                  chính
                </Text>
              </View>
            </View>
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
});

export default CheckInOut;
