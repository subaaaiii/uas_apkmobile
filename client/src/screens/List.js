import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { API_URL, WARNA_DISABLE } from '../utils/constant';
import BookCard from '../components/BookCard';
import { categoryColors } from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const List = () => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const [loading, isLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [listbooks, setListBooks] = useState([]);
  const [userId, setUserId] = useState();
  const [categories, setCategories] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [photo, setPhoto] = useState('')


  const Userid = userId; // Sementara, kalo yg login user dgn id = 1

  const getNewToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      // const response = await axios.get(`${API_URL}/token?refreshToken=${refreshToken}`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
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
      const decoded = jwtDecode(data.accessToken);
      setUserId(decoded.userId);
    } catch (error) {
      console.log(error)
    }
  };

  const fetchUserPhoto = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      setUser(response.data.data)
      setPhoto(response.data.data.images_link)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/favorite/${Userid}`);
      setListBooks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const initialize = async () => {
        isLoading(true);
        await getNewToken()
        await fetchUserPhoto();
        await fetchBooks();
        await fetchCategories();
        isLoading(false)
      };
      initialize();
    }, [userId]),
  );

  useEffect(() => {
    fetchUserPhoto();
    fetchBooks();
    fetchCategories();
  }, [userId]);


  // useEffect(() => {
  //   // console.log('books', books);
  //   console.log('listbooks', listbooks);
  //   console.log('categories list', categories);
  // }, [listbooks]);

  toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  function refetchData() {
    fetchBooks();
    // fetchCategories();
    setRefresh(false);
  }

  const isFavorite = bookId => {
    return listbooks.some(favBook => favBook.Book.id === bookId);
  };

  renderDropdownContent = () => {
    return (
      <View style={styles.dropdownContent}>
        <Text>Filter by kategory:</Text>
        <View style={styles.categoryFilter}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.minicategory,
                { backgroundColor: categoryColors[category.name] },
              ]}
              onPress={() =>
                navigation.navigate('List', { category: category.name })
              }>
              <Text style={{ color: '#F5F5F5' }}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center' }} refreshControl={
      <RefreshControl refreshing={refresh} onRefresh={refetchData} />
    }>
      {loading ? (
        <View style={styles.loadingContainer} >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView style={styles.header} refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={refetchData} />
        }>
          <View style={styles.firstSection}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/icons/IconBack.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 20, color: '#f5f5f5', fontWeight: '500' }}>
                Favorite
              </Text>
            </View>
            <TouchableOpacity
              style={{ borderRadius: 50, overflow: 'hidden' }}
              onPress={() => navigation.navigate('Profile', { id: user.id })}>
              <Image
                source={{ uri: photo }}
                style={{ width: 45, height: 45 }}
              />
            </TouchableOpacity>
          </View>
          {listbooks.length === 0 ? (
            <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center' }}>
              <Image
                source={require('../assets/images/sad.png')}
                style={{ width: 200, height: 200, marginTop: 40 }}
              />
              <Text
                style={{
                  marginTop: 5,
                  fontWeight: 600,
                  fontSize: 18,
                  color: WARNA_DISABLE,
                }}>
                No Book Found...
              </Text>
            </View>
          ) : (
            listbooks.map((book, index) => (
              <BookCard
                refetchData={refetchData}
                key={index}
                title={book.Book.name}
                author={book.Book.author}
                image={book.Book.images_link}
                star={book.Book.rating}
                userId = {userId}
                categories={[
                  { name: book.Book.category1 },
                  { name: book.Book.category2 },
                  { name: book.Book.category3 },
                ]}
                // favorite={true}
                favorite={isFavorite(book.Book.id)}
                bookId={book.Book.id}
                onPress={() => navigation.navigate('Details', { id: book.Book.id })}
              />
            ))
          )
          }
          {dropDown && renderDropdownContent()}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#043657',
    paddingBottom: 30,
    minHeight: 600
  },

  firstSection: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  thirdSection: {
    marginTop: 30,
    padding: 20,
    flexDirection: 'row',
    backgroundColor: '#0E5381',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imagebackground: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    overflow: 'hidden',
    marginRight: 7,
  },
  minicategory: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 12,
    marginRight: 5,
    color: '#F5F5F5',
    marginBottom: 5,
  },
  primerbutton: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 16,
    color: '#F5F5F5',
    backgroundColor: '#F08F1D',
    alignSelf: 'flex-end',
  },
  dropdownContent: {
    position: 'absolute',
    top: 130,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    zIndex: 1,
    maxHeight: 200,
    maxWidth: 300,
  },
  categoryFilter: {
    marginTop: 7,
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dropdownItem: {
    paddingVertical: 8,
    marginRight: 50,
    marginBottom: 3,
  },
  dropdownText: {
    color: '#333',
    fontSize: 16,
  },
  searchinput: {
    padding: 0,
    margin: 0,
    marginLeft: 10,
    width: '78%',
    color: '#f5f5f5',
  },
});
export default List;
