import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import moment, { RFC_2822 } from 'moment';
import Swiper from 'react-native-swiper';
import Colors from '../Utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('screen');

export default function Calendar() {
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState();

  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');

    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  return (
    //<SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.title}>{value.toDateString()}</Text>
        </View>

        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={ind => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, 'week').toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}>
            {weeks.map((dates, index) => (
              <View
                style={[styles.itemRow, { paddingHorizontal: 16 }]}
                key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}>
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: Colors.PRIMARY,
                            borderColor: Colors.LESSPRIMARY,
                            justifyContent:'center'
                          },
                        ]}>
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: 'black',backgroundColor:'white', borderRadius:99, paddingHorizontal: 5 },
                          ]}>
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>
      </View>
    //</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,    
    alignItems:'center', justifyContent:'flex-start',
    backgroundColor:Colors.LIGHTPRIMARY,
    borderRadius: 10,

  },
  header: {
    paddingHorizontal: 10,
    alignItems: 'center',
    
  },
  title: {
    fontSize: 18,
    paddingTop: 10,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
    marginTop: 12,
    
  },
  picker: {
    flex: 1,
    maxHeight: 90,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'flex-start',
  
  },
  /** Item */
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.LESSPRIMARY,
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.BLACK,
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
    //borderWidth:0,
    borderRadius:20,
    //color: 'white'
    
  }
});