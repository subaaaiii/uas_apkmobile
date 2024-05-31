import axios from 'axios';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useEffect, useState} from 'react';
import React from 'react';
import {API_URL, WARNA_UTAMA, WARNA_DISABLE} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
// import { IconEditWhite } from '../../assets';

const FormBook = ({route}) => {
  // const { id } = route.params || null;
  const { id } = route.params || { id: null };
  const navigation = new useNavigation();
  const [user, setUser] = useState([]);
  const [book, setBook] = useState({
    name: '',
    author: '',
    category1: '',
    category2: '',
    category3: '',
    image: 'lumpu.jpg',
    rating: 0, // Default value changed to 0
    pages: 0, // Default value changed to 0
    cover: '',
    year: 0, // Default value changed to 0
    description: ''
  });

  const fetchBook = async () => {
    try {
      const response = await axios.get(`${API_URL}/books/${id}`);
      setBook(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Userid = 1; // Sementara, kalo yg login user dgn id = 1
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${Userid}`);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(id){
      fetchBook();
    }
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_URL}/books`, book);
      console.log('Data buku berhasil disimpan:', response.data);
      navigation.navigate('Wishlist',{ refresh: true }); // this is resresh signal
    } catch (error) {
      console.error('Gagal menyimpan data buku:', error);
    }
  };
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderBottomWidth: 0.5,
          borderBottomColor: WARNA_DISABLE,
        }}>
        <TouchableOpacity
          style={styles.BackButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icons/IconBackUtama.png')}
            style={{width: 30, height: 20}}
          />
        </TouchableOpacity>
        <View>
          <Text style={{fontSize: 20, color: WARNA_UTAMA, fontWeight: '500'}}>
          {id ? 'Edit Book' : 'Add Book'}
          </Text>
        </View>
        <TouchableOpacity
          style={{borderRadius: 50, overflow: 'hidden'}}
          onPress={() => navigation.navigate('Profile', {id: Userid})}>
          <Image
            source={require('../../assets/images/Cat.jpg')}
            style={{width: 45, height: 45}}
          />
        </TouchableOpacity>
      </View>
      <View style={{padding: 10, paddingLeft: 20, paddingTop: 20}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
            flexDirection: 'row',
          }}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonBuku.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Nama Buku</Text>
            <TextInput
              style={styles.editInput}
              // underlineColor="white"
              activeUnderlineColor="white"
              defaultValue={id? book.name : ''}
              onChangeText={text => setBook({...book, name: text})}
            />
          </View>
        </View>
      </View>
      <View style={{padding: 10, paddingLeft: 20, paddingTop: 10}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
            flexDirection: 'row',
          }}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonAuthor.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Author</Text>
            <TextInput
              style={styles.editInput}
              // underlineColor="white"
              activeUnderlineColor="white"
              defaultValue={id? book.author : ''}
              onChangeText={text => setBook({...book, author: text})}
            />
          </View>
        </View>
      </View>
      <View style={{padding: 10, paddingLeft: 20, paddingTop: 10}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
            flexDirection: 'row',
          }}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonCategories.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Categories</Text>
            <TextInput
              style={styles.editInput}
              // underlineColor="white"
              activeUnderlineColor="white"
              defaultValue={id? book.category1 : ''}
              onChangeText={text => setBook({...book, category1: text})}
            />
          </View>
        </View>
      </View>
      <View style={{padding: 10, paddingLeft: 20, paddingTop: 10}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
            flexDirection: 'row',
          }}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonRating.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Rating</Text>
            <TextInput
              style={styles.editInput}
              keyboardType='numeric'
              // underlineColor="white"
              activeUnderlineColor="white"
              defaultValue={id? book.rating.toString() : ''}
              onChangeText={text => setBook({...book, rating: text})}
            />
          </View>
        </View>
      </View>
      <View style={{padding: 10, paddingLeft: 20, paddingTop: 10}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
            flexDirection: 'row',
          }}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonPage.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Pages</Text>
            <TextInput
              style={styles.editInput}
              keyboardType='numeric'
              // underlineColor="white"
              activeUnderlineColor="white"
              defaultValue={id? book.pages.toString() : ''}
              onChangeText={text => setBook({...book, pages: text})}
            />
          </View>
        </View>
      </View>
      <View style={{padding: 10, paddingLeft: 20, paddingTop: 10}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
            flexDirection: 'row',
          }}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonBuku.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Cover</Text>
            <TextInput
              style={styles.editInput}
              // underlineColor="white"
              activeUnderlineColor="white"
              defaultValue={id? book.cover : ''}
              onChangeText={text => setBook({...book, cover: text})}
            />
          </View>
        </View>
      </View>
      <View style={{padding: 10, paddingLeft: 20, paddingTop: 10}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
            flexDirection: 'row',
          }}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonYear.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Year</Text>
            <TextInput
              style={styles.editInput}
              keyboardType='numeric'
              // underlineColor="white"
              activeUnderlineColor="white"
              defaultValue={id? book.year.toString() : ''}
              onChangeText={text => setBook({...book, year: text})}
            />
          </View>
        </View>
      </View>
      <View style={{padding: 10, paddingLeft: 20, paddingTop: 10}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
            flexDirection: 'row',
          }}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonDescription.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Description</Text>
            <TextInput
              style={styles.editInput}
              // underlineColor="white"
              activeUnderlineColor="white"
              defaultValue={id? book.description :''}
              onChangeText={text => setBook({...book, description: text})}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 15,
          marginLeft: 15,
          paddingHorizontal: 8,
          paddingVertical: 10,
          width: 100,
          backgroundColor: 'green',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          marginBottom: 20,
        }}
        onPress={handleSubmit}>
        <Text style={{color: '#f9f9f9'}}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FormBook;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  BackButton: {
    alignItems: 'center',
  },
  editInput: {
    height: 40,
    backgroundColor: '#ececec',
    // underlineColor: 'white',
    // width: 'auto',
  },
  UserDataIcon: {
    width: 22,
    height: 22,
    margin: 5,
  },
});
