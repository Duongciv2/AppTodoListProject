import { View, Text,StyleSheet, SafeAreaView} from 'react-native'
import React from 'react'
import Calendar from '../Calendars/Calendar'
import Task from '../Task/Task'
//import Footer from './Footer'
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={{flex :1, maxHeight: 150}}>
        <Calendar/>
      </View>
      <Task/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 0,
    justifyContent: "flex-start"
  },
});