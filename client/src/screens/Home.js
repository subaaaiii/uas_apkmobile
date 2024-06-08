import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Modal
} from 'react-native';
import {
  adventure,
  comic,
  drama,
  fantasy,
  horror,
  mystery,
  romance,
  scifi,
} from '../assets';
import FavoriteButton from '../components/FavoriteButton';
import { Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { API_URL } from '../utils/constant';
import { categoryColors } from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { Use } from 'react-native-svg';

const { width } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const [loading, isLoading] = useState(false)
  const [refresh, setRefresh] = useState(false);
  const [photo, setPhoto] = useState('')
  const [books, setBooks] = useState([]); //top of the week books
  const [countFavorite, setCountFavorite] = useState([]); 
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState();
  const [user, setUser] = useState([])
  const [listbooks, setListBooks] = useState([]);
  const [listFavoriteBooks, setListFavoriteBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [statusToken, setStatusToken] = useState(false)
  const categoryImages = {
    adventure,
    comic,
    drama,
    fantasy,
    horror,
    mystery,
    romance,
    'sci-fi': scifi,
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

  const getNewToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      // const response = await axios.get(`${API_URL}/token?refreshToken=${refreshToken}`);
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
        setStatusToken(true)
      } else {
        isLoading(false);
        setModalVisible(true);
        setErrorText(data.message);
      }

    } catch (error) {

      isLoading(false);
      setModalVisible(true);
      setErrorText("Sesi anda telah berakhir, silahkan login kembali");
      return

    }
  };

  const fetchPopularBook = async () => {
    try {
      const response = await axios.get(`${API_URL}/favorite`);
      setBooks(response.data.data[0].Book);
      setCountFavorite(response.data.counts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      setListBooks(response.data.data);
      setCountFavorite(response.data.counts[0]);
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

  const Userid = userId; // Sementara, kalo yg login user dgn id = 1
  const fetchBookFavoriteOfUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/favorite/${Userid}`);
      setListFavoriteBooks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const isFavorite = bookId => {
    return listFavoriteBooks.some(favBook => favBook.Book.id === bookId);
  };

  useFocusEffect(
    useCallback(() => {
      const initialize = async () => {
        isLoading(true);
        await getNewToken();
        await fetchUserPhoto();
        await fetchBooks();
        await fetchCategories();
        await fetchBookFavoriteOfUser();
        await fetchPopularBook();
        isLoading(false);
      };
      initialize();
    }, []),
  );

  useEffect(() => {
    fetchUserPhoto();
    // console.log('books', books);
    // // console.log('listbooks', listbooks);
    // // console.log('categories', categories);
    // // console.log(user.images_link)
    // console.log('user', user)
    setRefresh(false);
  }, [books, listbooks]);

  function refetchData() {
    fetchUserPhoto();
    fetchBooks();
    // fetchCategories();
    setRefresh(false);
  }
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      {!statusToken ? (
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
                  setModalVisible(false)
                  navigation.navigate('Login')
                }}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>) : loading ? (
          <View style={styles.loadingContainer} >
            <ActivityIndicator size="large" />
          </View>
        ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={refetchData} />
          }>
          <View style={styles.header}>

            <View style={styles.firstSection}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image
                  source={require('../assets/images/wink.png')}
                  style={{ width: 30, height: 30 }}
                />
                <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: '500', color: '#F5F5F5' }}>Halo, {user.username}</Text>
              </View>

              <TouchableOpacity
                style={{ borderRadius: 50, overflow: 'hidden' }}
                onPress={() => navigation.navigate('Profile', { id: userId })}>
                <Image
                  source={{ uri: photo }}
                  style={{ width: 45, height: 45 }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.secondSection}>
              <Text style={{ fontSize: 20, fontWeight: '500', color: '#F5F5F5' }}>
                Top Of The Week
              </Text>
            </View>
            <View>
              <View style={styles.thirdSection}>
                <View>
                  <ImageBackground
                    source={{ uri: books.images_link }}
                    style={styles.imagebackground}
                    blurRadius={70}>
                    <Image
                      source={{ uri: books.images_link }}
                      style={{ width: 90, height: 140, borderRadius: 5 }}
                    />
                  </ImageBackground>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: 180,
                    }}>
                    <Text
                      style={{ fontSize: 18, fontWeight: '500', color: '#F5F5F5' }}>
                      {books.name}
                    </Text>
                    <View style={styles.ratings}>
                      <Image
                        source={require('../assets/icons/IconStar.png')}
                        style={{ width: 14, height: 14, marginRight: 3 }}
                      />
                      <Text style={{ fontSize: 14, color: '#212121' }}>{books.rating}</Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 14, color: '#F5F5F5' }}>
                      By {books.author}
                    </Text>
                  </View>
                  {/* category */}
                  <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    <Text
                      style={[
                        styles.minicategory,
                        { backgroundColor: categoryColors[books.category1] },
                      ]}>
                      {books.category1}
                    </Text>
                    <Text
                      style={[
                        styles.minicategory,
                        { backgroundColor: categoryColors[books.category2] },
                      ]}>
                      {books.category2}
                    </Text>
                    <Text
                      style={[
                        styles.minicategory,
                        { backgroundColor: categoryColors[books.category3] },
                      ]}>
                      {books.category3}
                    </Text>
                  </View>
                  <View style={{ marginTop: 14 }}>
                    <Text style={{ fontSize: 14, color: '#F5F5F5' }}>
                      Favorited by {countFavorite} Users
                    </Text>
                  </View>
                  <View style={{ marginTop: 16 }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Details', { id: books.id })
                      }>
                      <Text style={styles.primerbutton}>See Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* BAGIAN Category */}
          <View style={styles.categorySection}>
            <View style={styles.titleSection}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#212121' }}>
                Category
              </Text>
              {/* <TouchableOpacity>
            <Text style={{fontSize: 15, color: '#8B8D92'}}>View All</Text>
          </TouchableOpacity> */}
            </View>
            <View style={styles.categorywrap}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ alignItems: 'center', marginBottom: 7 }}
                  onPress={() =>
                    navigation.navigate('Explore', { category: category.name })
                  }>
                  <View style={styles.category}>
                    <Image
                      source={categoryImages[category.name]}
                      style={styles.categoryicons}
                    />
                  </View>
                  <Text>
                    {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View>
              <View style={styles.titleSection}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#212121' }}>
                  New Arrivals
                </Text>
              </View>
              <View style={styles.arrivalswrap}>
                {listbooks
                  .slice(-4)
                  .reverse()
                  .map((book, index) => {
                    console.log(book.images_link);
                    return (
                      <View style={{ gap: 20, marginBottom: 10 }} key={index}>
                        <TouchableOpacity
                          style={styles.imageContainer}
                          onPress={() =>
                            navigation.navigate('Details', { id: book.id })
                          }>
                          <ImageBackground
                            source={{ uri: book.images_link }}
                            style={styles.imagebackgroundshadow}
                            blurRadius={70}>
                            <Image
                              source={{ uri: book.images_link }}
                              style={styles.sizebook}
                            />
                          </ImageBackground>
                        </TouchableOpacity>
                        <FavoriteButton
                          gaya={{ top: 10, right: 15 }}
                          favorite={isFavorite(book.id)}
                          bookId={book.id}
                        />
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </ScrollView>)
      }
    </View >
  );
};
const styles = StyleSheet.create({

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  header: {
    padding: 20,
    paddingBottom: 40,
    width: width,
    alignItems: 'center',
    backgroundColor: '#043657',
  },

  firstSection: {
    width: width,
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondSection: {
    width: width,
    paddingHorizontal: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleSection: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  thirdSection: {
    padding: 15,
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: '#0E5381',
    borderRadius: 10,
    overflow: 'hidden',
  },
  categorySection: {
    paddingHorizontal: 25,
  },
  imagebackground: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    overflow: 'hidden',
    marginRight: 7,
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  minicategory: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 10,
    marginRight: 5,
    color: '#F5F5F5',
  },
  primerbutton: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 14,
    color: '#F5F5F5',
    backgroundColor: '#F08F1D',
    alignSelf: 'flex-end',
  },
  categorywrap: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  category: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#4085B4',
    padding: 10,
  },
  categoryicons: {
    width: 50,
    height: 50,
  },
  sizebook: {
    width: 120,
    height: 170,
    borderRadius: 5,
  },
  arrivalswrap: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 30,
    flexWrap: 'wrap',
  },
  imagebackgroundshadow: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    overflow: 'hidden',
    marginRight: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default Home;
