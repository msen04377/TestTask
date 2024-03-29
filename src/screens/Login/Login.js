import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { CustomButton } from "../../components";
import { useNavigation } from "@react-navigation/native";
import {useDispatch} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { login } from "../../redux/slices/LoginSlice";

export const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [pass, setPass] = useState("pistol");
  const dispatch = useDispatch();

  const loginUser = async() => {
    const userData = {
      email: email,
      password: pass,
    };
    fetch("https://reqres.in/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(async(json) => {
        console.log("json?.token", json?.token)
        if(json?.token){
          dispatch(login(json))
          await AsyncStorage.setItem("IS_USER_LOGGED_IN", JSON.stringify(json?.token));
        
      }});
  };

  const gotonext = async () => {
    await AsyncStorage.setItem("IS_USER_LOGGED_IN", "yes");
    navigation.navigate("Main");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Login"}</Text>

      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={(txt) => setEmail(txt)}
      />

      <TextInput
        placeholder="Enter password"
        style={styles.input}
        value={pass}
        onChangeText={(txt) => setPass(txt)}
        secureTextEntry={true}
      />

      <CustomButton
        bg={"#E27800"}
        title={"Login"}
        color={"#fff"}
        onClick={() => {
          loginUser();
        }}
      />
      {/* <Text
        style={styles.loginText}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        {'Sign up'}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    color: "#000",
    fontSize: 40,
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 50,
  },
  input: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  loginText: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: "underline",
  },
});
