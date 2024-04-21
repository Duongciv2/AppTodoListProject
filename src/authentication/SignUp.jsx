import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign ,Ionicons} from "@expo/vector-icons";
import Colors from "./../Utils/Colors";
import Logo from "./../assets/logo.png"
import axios from "axios";
import User from "../../api/models/User";
import localhost from './../Utils/LocalHost'
const SignUp = ({navigation}) => {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password
    }

    axios.post(`http://${localhost.localhost}:3000/register`,user).then((response) => {
      console.log(response);
            Alert.alert("Registration successfull","You have been registered succesfully");
            setEmail("");
            setPassword("");
            setName("");
        }).catch((error) => {
            Alert.alert("Registration failed","an error ocurred during registration");
            console.log("error",error)
        })
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.LIGHTPRIMARY, alignItems: "center" }}
    >
      <View style={{ marginTop: 10 }}>
      <Image style={styles.logo} source={Logo}/>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop:15 }}>
            register  to your account
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>

        <View style = {styles.inputSignUp}>
            <Ionicons style={{marginLeft:8}} name="person" size={24} color="black" />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.textInput}
              placeholder="Enter your name"
            />
          </View>
          <View style = {styles.inputSignUp}>
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="black"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.textInput}
              placeholder="Enter your email"
            />
          </View>

          <View style={styles.inputSignUp}>
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
              style={styles.textInput}
              placeholder="Enter your password"
            />
          </View>


          <View style={{ marginTop: 60 }} />

          <Pressable
            onPress={handleRegister}
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
              Register
            </Text>
          </Pressable>

            <Text style={{ textAlign: "center", fontSize: 15, color: "gray", marginTop:15 }}>
             Already have an account? 
             <Text onPress={() => navigation.navigate("Login")} style={{  color: Colors.LESSPRIMARY }}>Sign In</Text>
            </Text>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({

  logo: {
      width: 100,
      height: 100,
  },
  inputSignUp:{
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