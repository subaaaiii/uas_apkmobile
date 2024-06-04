import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { IconEditWhite } from '../assets';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import "core-js/stable/atob";

import { API_URL } from '../utils/constant';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState();
  const [photo, setPhoto] = useState(null)
  const [token, setToken] = useState();
  const [profilepicture, setProfilePicture] = useState(null)

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      const userData = response.data.data;
      const modifiedDate = userData.dateofbirth.split(' ')[0];
      userData.dateofbirth = modifiedDate;
      setUser(userData);
      setProfilePicture(user.images_link)
    } catch (error) {
      console.log(error);
    }
  }

  const updateUser = async () => {
    try {
      const formData = insertFromData();
      console.log(formData)
      const response = await axios.patch(`${API_URL}/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const insertFromData = () => {
    const formData = new FormData();

    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('dateofbirth', user.dateofbirth);

    if (photo && photo.uri) {
      const uriParts = photo.uri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('profilepicture', {
        uri: photo.uri,
        name: photo.fileName,
        type: `image/${fileType}`,
      });
    }
    return formData;

  }

  const handleLogout = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const response = await fetch(
        `${API_URL}/logout?refreshToken=${refreshToken}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        await AsyncStorage.removeItem('refreshToken');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNewToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const response = await fetch(
        `${API_URL}/token?refreshToken=${refreshToken}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        setToken(data.accessToken);
        const decoded = jwtDecode(data.accessToken);
        setUserId(decoded.userId);
      } else {
        Alert.alert(data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputImage = async () => {
    launchImageLibrary({ noData: true }, response => {
      console.log(response.assets[0]);
      if (response) {
        setPhoto(response.assets[0]);
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      setToken(null);
      setUserId(null);

      const initialize = async () => {
        await getNewToken();
        await fetchUserInfo();
      };

      initialize();

      return () => {
      };
    }, [])
  );

  useEffect(() => {
    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);


  return (
    <ScrollView style={styles.Profile}>

      {/* Header */}
      <View style={styles.HeadersContainer}>
        <TouchableOpacity style={styles.BackButton} onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icons/IconBack.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>

        <Text style={styles.Headers}>Profile</Text>
        <View style={{ flexBasis: 100, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => setIsEditing(true)}>
            <IconEditWhite width={25} height={25} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Header */}

      {/* 1st section */}
      <View>
        <ImageBackground
          source={require('../assets/images/bg.png')}
          resizeMode="cover"
          style={{ flex: 1 }}
          imageStyle={styles.ImageBackground}
        >
          <View style={styles.Container}>
            <View style={styles.ContentContainer}>
              <Image
                source={{ uri: user.images_link }}
                style={styles.ProfilePicture}
              />
              <TouchableOpacity
                style={{ backgroundColor: 'green' }}
                onPress={handleInputImage}
              >
                <Image
                  source={require('../assets/images/user.png')}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.ContentContainer}>
              <View>
                <Text style={{ fontSize: 20, color: 'white' }}>{user.username}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 20 }}>
              <View style={{ flexDirection: 'row', borderRightWidth: 0.5, padding: 10, borderColor: 'white' }}>
                <Text style={styles.FollowValue}>4</Text>
                <Text style={styles.Follow}>Followers</Text>
              </View>
              <View style={{ flexDirection: 'row', padding: 10 }}>
                <Text style={styles.FollowValue}>12</Text>
                <Text style={styles.Follow}>Following</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

      </View>
      {/* 1st section */}

      {/* 2nd section */}
      <View>

        <View style={{ padding: 10, paddingLeft: 20, paddingTop: 20 }}>
          <View style={{ borderBottomWidth: 1, borderColor: 'lightgrey', flexDirection: 'row' }}>
            <View style={{ marginRight: 3 }}>
              <Image
                source={require('../assets/images/user.png')}
                style={styles.UserDataIcon}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.UserDataHeader}>Username</Text>
              {isEditing ? (
                <TextInput style={styles.editInput}
                  underlineColor='white'
                  activeUnderlineColor="white"
                  left={IconEditWhite}
                  defaultValue={user.username}
                  onChangeText={(text) => setUser({ ...user, username: text })} />
              ) : (
                <Text style={styles.UserData}>{user.username}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={{ padding: 10, paddingLeft: 20 }}>
          <View style={{ borderBottomWidth: 1, borderColor: 'lightgrey', flexDirection: 'row' }}>
            <View style={{ marginRight: 3 }}>
              <Image
                source={require('../assets/images/email.png')}
                style={styles.UserDataIcon}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.UserDataHeader}>Email</Text>
              {isEditing ? (
                <TextInput style={styles.editInput}
                  underlineColor='white'
                  activeUnderlineColor="white"
                  left={IconEditWhite}
                  defaultValue={user.email}
                  keyboardType="email-address"
                  onChangeText={(text) => setUser({ ...user, email: text })} />
              ) : (
                <Text style={styles.UserData}>{user.email}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={{ padding: 10, paddingLeft: 20 }}>
          <View style={{ borderBottomWidth: 1, borderColor: 'lightgrey', flexDirection: 'row' }}>
            <View style={{ marginRight: 3 }}>
              <Image
                source={require('../assets/images/smartphone-call.png')}
                style={styles.UserDataIcon}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.UserDataHeader}>Phone</Text>
              {isEditing ? (
                <TextInput style={styles.editInput}
                  underlineColor='white'
                  activeUnderlineColor="white"
                  left={IconEditWhite}
                  defaultValue={user.phone}
                  keyboardType="phone-pad"
                  onChangeText={(text) => setUser({ ...user, phone: text })} />
              ) : (
                <Text style={styles.UserData}>{user.phone}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={{ padding: 10, paddingLeft: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: 3 }}>
              <Image
                source={require('../assets/images/calendar.png')}
                style={styles.UserDataIcon}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.UserDataHeader}>Date of Birth</Text>
              {isEditing ? (
                <TextInput style={styles.editInput}
                  underlineColor='white'
                  activeUnderlineColor="white"
                  left={IconEditWhite}
                  defaultValue={user.dateofbirth}
                  keyboardType="phone-pad"
                  onChangeText={(text) => setUser({ ...user, dateofbirth: text })} />
              ) : (
                <Text style={styles.UserData}>{user.dateofbirth}</Text>
              )}
            </View>
          </View>
        </View>
        {/* 2nd section */}
        <View style={{ alignItems: 'center' }}>
          {isEditing ? (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={updateUser}>
              <Text style={{ color: 'white', fontSize: 15 }}>
                Save Profile
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}>
              <Text style={{ color: 'white', fontSize: 15 }}>
                LOG OUT
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  Profile: {
    flex: 1,
    backgroundColor: 'white',
  },
  Container: {
    alignItems: 'center',
  },

  // Header
  Headers: {
    fontSize: 20,
    color: 'white',
    padding: 10,
    flexBasis: 100,
    textAlign: 'center'
  },
  BackButton: {
    padding: 10,
    flexBasis: 100,
    alignItems: 'center'
  },
  HeadersContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#164863',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  //1st Section
  ImageBackground: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15
  },
  ProfilePicture: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 3
  },
  ContentContainer: {
    margin: 5,
  },
  Follow: {
    fontSize: 12,
    color: 'white',
    margin: 5,
    textAlignVertical: 'center'
  },
  FollowValue: {
    fontSize: 16,
    color: 'white',
    margin: 5,
    fontWeight: 'bold'
  },

  //2nd Section
  UserData: {
    fontSize: 16,
    color: 'grey',
    margin: 5,
    fontWeight: 'bold',
    // marginBottom: 30
  },
  UserDataHeader: {
    fontSize: 13,
    fontFamily: '',
    color: 'grey',
    margin: 5
  },
  UserDataIcon: {
    width: 22,
    height: 22,
    margin: 5
  },
  editInput: {
    height: 40,
    backgroundColor: '#ececec',
    underlineColor: 'white',
    width: 'auto'
  },
  logoutButton: {
    padding: 15,
    backgroundColor: 'red',
    margin: 20,
    borderRadius: 30,
    paddingLeft: 40,
    paddingRight: 40
  },
  saveButton: {
    padding: 15,
    backgroundColor: 'green',
    margin: 20,
    borderRadius: 30,
    paddingLeft: 40,
    paddingRight: 40
  }

})

export default Profile;