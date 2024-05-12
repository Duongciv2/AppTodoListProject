import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import { MaterialIcons } from '@expo/vector-icons';
  import { AntDesign } from '@expo/vector-icons';
  import Logo from './../assets/logo.png';
  import Colors from './../Utils/Colors';
  import axios from 'axios';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { API_BASE_URL, SCREEN_NAMES } from '../Services/config';
  import { validateEmail, validatePassword } from '../Utils/helpers/validate'; // Import các hàm validate
  
  const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
  
    // ... (phần còn lại của code không thay đổi)
  
    const handleLogin = () => {
      // Reset lỗi trước khi validate
      setEmailError('');
      setPasswordError('');
  
      // Validate email
      if (!email) {
        setEmailError('Email is required');
      } else if (!validateEmail(email)) { // Sử dụng hàm validateEmail
        setEmailError('Invalid email format');
      }
  
      // Validate password
      if (!password) {
        setPasswordError('Password is required');
      } else if (!validatePassword(password)) { // Sử dụng hàm validatePassword
        setPasswordError('Password must be at least 6 characters');
      }
  
      // Nếu không có lỗi, tiếp tục xử lý đăng nhập
      if (!emailError && !passwordError) {
        const user = {
          email: email,
          password: password,
        };
        axios.post(`${API_BASE_URL}/login`, user).then((response) => {
          const token = response.data.token;
          console.log('token', token);
          AsyncStorage.setItem('authToken', token);
          navigation.navigate(SCREEN_NAMES.HOME_SCREEN);
        });
      }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.LIGHTPRIMARY, alignItems: "center" }}>

        <View style={{ marginTop: 10 }}>
            <Image style={styles.logo} source={Logo}/>
        </View>
        <KeyboardAvoidingView>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
                    Log in 
                </Text>
            </View>
            <View style={{ marginTop: 30 }}>
                <View
                    style={styles.inputLogIn}>
                    <MaterialIcons
                    style={{ marginLeft: 8 }}
                    name="email"
                    size={24}
                    color="black"
                    />
                    <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style = {styles.textInput}
                    placeholder="Enter your email"
                    />
                </View>

                <View style={styles.inputLogIn}>
                    <AntDesign
                    style={{ marginLeft: 8 }}
                    name="lock1"
                    size={24}
                    color="black"
                    />
                    <TextInput
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    style = {styles.textInput}
                    placeholder="Enter your password"
                    />
                </View>

                <View
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 12,
                    justifyContent: "space-between",
                    }}
                >
                    <Text>Keep me logged in</Text>
                    <Text style={{ color: Colors.LESSPRIMARY, fontWeight: "500" }}>
                    Forgot Password
                    </Text>
            </View>

            <View style={{ marginTop: 60 }} />

            <Pressable
                onPress={handleLogin}
                style={{
                width: 200,
                backgroundColor: Colors.PRIMARY,
                padding: 15,
                borderRadius: 6,
                marginLeft: "auto",
                marginRight: "auto",
                }}
            >
                <Text
                style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 16,
                }}
                >
                Login
                </Text>
            </Pressable>


            <Text style={{marginTop:15, textAlign: "center", fontSize: 15, color: "gray" }}>
            Don't have an account? 
            <Text onPress={() => navigation.navigate("SignUp")} style={{  color: Colors.LESSPRIMARY }}>Sign Up</Text></Text>
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
    }

export default Login

const styles = StyleSheet.create({

    logo: {
        width: 200,
        height: 200,
    },
    inputLogIn:{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: "white",
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30,
        
    },
    textInput: {
        marginVertical: 10,
        width: 300,     
        paddingLeft:5,
    }
})