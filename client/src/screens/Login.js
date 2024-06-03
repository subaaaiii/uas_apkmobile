import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal, Alert } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native';
import React, { useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '../utils/constant';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState('');

  const goToHome = () => {
    navigation.dispatch(StackActions.replace('MainNav', { screen: 'MainNav' }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLocaleLowerCase(),
          password: password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('refreshToken', data.refresh_token);
        console.log('Login berhasil!');
        goToHome();
      } else {
        setModalVisible(true);
        setErrorText(data.message);
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      Alert.alert('Login Gagal', 'Terjadi kesalahan pada server');
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.TitleWelcome}>Welcome!</Text>
        <Text style={styles.TitleDetails}>Please enter your details</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 162,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text>Dont have an Account </Text>
          <TouchableOpacity>
            <Text style={{ color: 'blue' }}>Click Here</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorText}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 222,
    height: 105,
    marginTop: 70,
  },
  container: {
    marginTop: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%',
    height: '80%',
  },
  TitleWelcome: {
    fontFamily: 'TitilliumWeb-Black',
    color: 'black',
    letterSpacing: 1,
    fontSize: 30,
    paddingTop: 16,
    paddingLeft: 47,
  },
  TitleDetails: {
    fontFamily: 'TitilliumWeb-Regular',
    paddingLeft: 47,
    color: 'black',
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 45,
    marginRight: 45,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 15,
    marginLeft: 15,
  },
  button: {
    marginTop: 40,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 15,
    marginLeft: 45,
    marginRight: 45,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'TitilliumWeb-Bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontFamily: 'TitilliumWeb-Bold',
    textAlign: 'center',
  },
});

export default Login;