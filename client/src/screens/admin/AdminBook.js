import axios from 'axios';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
import React from 'react';
import {IconDelete, IconEdit} from '../../assets';
import {API_URL, WARNA_UTAMA, WARNA_DISABLE} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';

const AdminBook = () => {
  const navigation = new useNavigation();
  const [listbooks, setListBooks] = useState([]);
  const [user, setUser] = useState([]);
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      setListBooks(response.data.data);
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
    fetchBooks();
    fetchUser();
  }, []);
  return (
    <View>
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
            List Book
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
      <TouchableOpacity
        style={{
          marginTop: 15,
          marginLeft: 15,
          paddingHorizontal: 8,
          paddingVertical: 10,
          width: 100,
          backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('FormBook')}>
        <Text style={{color: '#f9f9f9'}}>+ Add Book</Text>
      </TouchableOpacity>
      <ScrollView horizontal>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={{width: 75}}>Aksi</DataTable.Title>
            <DataTable.Title style={{width: 25}}>Id</DataTable.Title>
            <DataTable.Title style={{width: 75}}>Name</DataTable.Title>
            <DataTable.Title style={{width: 75}}>Author</DataTable.Title>
            <DataTable.Title style={{width: 75}}>Categories</DataTable.Title>
            <DataTable.Title style={{width: 50}}>Rating</DataTable.Title>
            <DataTable.Title style={{width: 50}}>Pages</DataTable.Title>
            <DataTable.Title style={{width: 75}}>Cover</DataTable.Title>
            <DataTable.Title style={{width: 50}}>Year</DataTable.Title>
            <DataTable.Title style={{width: 100}}>Description</DataTable.Title>
          </DataTable.Header>
          {listbooks.map((book, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell style={{width: 75}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 7,
                  }}>
                  <TouchableOpacity>
                    <IconEdit width={15} height={15} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <IconDelete width={18} height={18} />
                  </TouchableOpacity>
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={{width: 25}}>{index + 1}</DataTable.Cell>
              <DataTable.Cell style={{width: 75}}>{book.name}</DataTable.Cell>
              <DataTable.Cell style={{width: 75}}>{book.author}</DataTable.Cell>
              <DataTable.Cell style={{width: 75}}>
                {book.category1}, {book.category2}, {book.category3}
              </DataTable.Cell>
              <DataTable.Cell style={{width: 50}}>{book.rating}</DataTable.Cell>
              <DataTable.Cell style={{width: 50}}>{book.pages}</DataTable.Cell>
              <DataTable.Cell style={{width: 75}}>{book.cover}</DataTable.Cell>
              <DataTable.Cell style={{width: 50}}>{book.year}</DataTable.Cell>
              <DataTable.Cell style={{width: 100}}>
                {book.description}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default AdminBook;

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
});
