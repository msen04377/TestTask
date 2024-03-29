import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import {CustomButton} from '../../components';
import {useNavigation} from '@react-navigation/native';
import uuid from 'react-native-uuid';
import axios from 'axios';

export const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const addUser = async() => {
    // console.log("add user ----")
    let uid = uuid.v4();
    try {
      const response = await axios.post("https://reqres.in/api/register",
      {
        email: email,
        password:pass,
      }
    )
      console.log("respons", response)
    } catch (error) {
      console.log("error", error)
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Sign up'}</Text>
      <TextInput
        placeholder="Enter Name"
        style={styles.input}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Enter Mobile"
        style={styles.input}
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      />
      <TextInput
        placeholder="Enter password"
        style={styles.input}
        value={pass}
        onChangeText={txt => setPass(txt)}
      />
      <TextInput
        placeholder="Enter Confirm Password"
        style={styles.input}
        value={confirmPass}
        onChangeText={txt => setConfirmPass(txt)}
      />
      <CustomButton
        bg={'#E27800'}
        title={'Sign up'}
        color={'#fff'}
        onClick={() => {
          addUser();
        }}
      />
      <Text
        style={styles.loginText}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        {'Login'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 40,
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 50,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  loginText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
