import { StyleSheet, Text, View , Image, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from './../../assets/logo.png'
import {button1} from './../../common/button'
import {head1,head2, form, label, input} from './../../common/Form'
const Login = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.childcontainer1}>
        
          <View style={styles.s1}>
            <Image style={styles.logo} source={Logo}/>
            <Text style = {styles.t1}> Thanhdeptrai.Inc </Text>
            <Text style = {styles.tt1}> Things that need to do </Text>
          </View>
          <View style={styles.s2}>

            <Text style={head1}>Login</Text>
            <Text style={head2}>Sign In to Continue</Text>

            <View style={form}>
              <Text style= {label}>Email</Text>
              <TextInput style={input} placeholderTextColor='black' placeholder="Input your email"/>
            </View>

            <View style={form}>
              <Text style= {label}>Password</Text>
              <TextInput style={input} secureTextEntry={true} placeholderTextColor='black' placeholder="Input your password"/>
            </View>

            <View style={styles.fp}>
              <Text style={styles.tfp}>
                Forgot Password
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={button1}> Login</Text>
              <Text>Don't have account?
              <Text style={{color: '#5757ff'}} 
              onPress={() => navigation.navigate('SignUp')}> Create account</Text></Text>
            </View>
            

          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login

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
    height: '50%',
    borderRadius: 10, 
    paddingHorizontal: 20,
    paddingVertical: 5
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