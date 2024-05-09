import { StyleSheet, Text, View , Image, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from './../../assets/logo.png'
import {button1} from '../components/button'
import {head1,head2, form, label, input} from '../components/Layout/Form'
const SignUp = ({navigation}) => {
  return (
    // <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.childcontainer1}>
        
          <View style={styles.s1}>
            
          </View>
          <ScrollView style={styles.s2}>
            <View style={{marginBottom: 50}}>
                <Text style={head1}>Create New Account</Text>
                <Text style={head2}>Already have an account.
                <Text style={{color: '#5757ff'}} 
                onPress={() => navigation.navigate('Login')}> Login now</Text> </Text>
            </View>
            <View style={form}>
              <Text style= {label}>Name</Text>
              <TextInput style={input} placeholderTextColor='black' placeholder="Input your name"/>
            </View>
            <View style={form}>
              <Text style= {label}>Email</Text>
              <TextInput style={input} placeholderTextColor='black' placeholder="Input your email"/>
            </View>
            <View style={form}>
              <Text style= {label}>Dare of birth</Text>
              <TextInput style={input} placeholderTextColor='black' placeholder="Input your Date of birth"/>
            </View>
            <View style={form}>
              <Text style= {label}>Password</Text>
              <TextInput style={input} placeholderTextColor='black' secureTextEntry={true} placeholder="Input your password"/>
            </View>
            <View style={form}>
              <Text style= {label}>Confirm Password</Text>
              <TextInput style={input} placeholderTextColor='black' secureTextEntry={true} placeholder="Confirm your email"/>
            </View>

            

            <View style={{alignItems: 'center'}}>
              <Text style={button1}> Sign Up</Text>
            </View>
            

          </ScrollView>

        </View>
      </View>
    // </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: { 
    width: '100%',
    height: '100%',
    backgroundColor: Colors.PRIMARY,
  },
  childcontainer1:{
    justifyContent: 'center',
    alignItems:'center',
    height: '100%',
    width:'100%'
  },
  logo: {
    width: 300,
    height: 300,
  },
  s1:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center' 
  },

  t1: {
    fontSize: 25,
    color: Colors.WHITE,
    textAlign: 'center',
    
  },
  tt1: {
    fontSize: 15,
    textAlign:'center',
    color: Colors.WHITE,
  },
  s2:{
    backgroundColor: Colors.WHITE,
    width: '100%',
    height: '90%',
    borderRadius: 10, 
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  fp: {
    alignItems:'flex-end',
    margin: 10,
    

  },
  tfp:{
    color: '#5757ff',
    fontWeight:'bold'
  },


})