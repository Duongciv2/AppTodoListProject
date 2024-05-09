import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../Task/Task';
import ProfileScreen from '../screens/ProfileScreen';
import {FontAwesome} from 'react-native-vector-icons'

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    
      <Tab.Navigator>
        
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown:false,
            tabBarLabel:({color}) =>(
              <Text style={{color:color, fontSize:12, justifyContent:'center',marginTop: -7}}>Home</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}/>
        
        <Tab.Screen name="Task" component={TaskScreen} 
        options={{
            headerShown : false,
            tabBarLabel:({color}) =>(
              <Text style={{color:color, fontSize:12, justifyContent:'center',marginTop: -7}}>Achieve</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="gift" size={size} color={color} />
            )
          }}/>


        <Tab.Screen name="Profile" component={ProfileScreen} options={{
            headerShown : false,
            tabBarLabel:({color}) =>(
              <Text style={{color:color, fontSize:12, justifyContent:'center',marginTop: -7}}>Profile</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}/>

      </Tab.Navigator>
  );
}
