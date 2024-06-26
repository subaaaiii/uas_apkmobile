import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {jwtDecode} from 'jwt-decode';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {API_URL, WARNA_DISABLE} from '../utils/constant';
import BookCard2 from '../components/BookCard2';
import {categoryColors} from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Explore = ({route}) => {
  const {category} = route?.params || {category: null};
  // const initialCategory = route?.params?.category || '';
  // const [category, setCategory] = useState(initialCategory);
  const [loading, isLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const [listFavoriteBooks, setListFavoriteBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [userId, setUserId] = useState();
  const [token, setToken] = useState('');
  const [user, setUser] = useState([]);
  const [listbooks, setListBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const ContainerComponent = searchMode ? View : ScrollView;


  // const Userid = userId; // Sementara, kalo yg login user dgn id = 1

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
      const decoded = jwtDecode(data.accessToken);
      setUserId(decoded.userId);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPopularBook = async () => {
    try {
      const response = await axios.get(`${API_URL}/favorite`);
      setPopularBooks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      setListBooks(response.data.data);
      // setSearchMode(false);
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

  const fetchBookFavoriteOfUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/favorite/${userId}`);
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
        if (!category) {
          await fetchBooks();
          await fetchCategories();
          if (userId) {
            await fetchBookFavoriteOfUser(userId);
          }
          await fetchPopularBook();
          setSearchMode(false);
        }
      };
      initialize();
    }, [category,userId]),
  );

  useEffect(() => {
    getNewToken();
    searchBooks(category);
    setSearchResult(category);
    fetchCategories();
  }, [category]);

  const refetchData = () => {
    fetchBooks();
    setRefresh(false);
    setSearchMode(false);
    setSearchResult('');
    setSearch('');
    fetchBookFavoriteOfUser(userId);
    fetchPopularBook();
  };

  const searchBooks = async (search = '') => {
    try {
      const response = await axios.get(`${API_URL}/books`, {
        params: {search},
      });
      setListBooks(response.data.data);
      if (search) {
        setSearchMode(true);
      } else {
        setSearchMode(false);
      }
      isLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  };
  

  toggleDropdown = () => {
    setDropDown(!dropDown);
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
                {backgroundColor: categoryColors[category.name]},
              ]}
              onPress={() => {
                searchBooks(category.name);
                setSearchResult(category.name);
                setSearch('');
                toggleDropdown();
              }}>
              <Text style={{color: '#F5F5F5'}}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={refetchData} />
          }>
          <View
            style={{
              // marginTop: 25,
              color: 'black',
              backgroundColor: '#0E5381',
              backgroundColor: '#4085B4',
              padding: 10,
            }}>
            <View
              style={[
                styles.firstSection,
                {marginTop: 0, alignItems: 'center', gap: 10, paddingRight: 10},
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#DFE4E7',
                  borderRadius: 10,
                  padding: 10,
                  paddingRight: 0,
                }}>
                <Image
                  source={require('../assets/icons/IconSearch.png')}
                  style={{width: 25, height: 25}}
                />
                <TextInput
                  style={styles.searchinput}
                  value={search}
                  onChangeText={value => setSearch(value)}
                  onSubmitEditing={() => {
                    isLoading(true);
                    setSearchResult(search);
                    searchBooks(search);
                  }}></TextInput>
              </View>
              <TouchableOpacity onPress={toggleDropdown}>
                <View
                  style={{
                    backgroundColor: '#DFE4E7',
                    padding: 5,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={require('../assets/icons/IconFilter.png')}
                    style={{width: 25, height: 25}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.header}>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              {searchResult && (
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: WARNA_DISABLE}}>Search Result For </Text>
                  <Text style={{color: '#80B4D7', fontWeight: 'bold'}}>
                    "{searchResult}"
                  </Text>
                </View>
              )}
            </View>
            {!searchMode && (
              <View style={{marginTop: 10}}>
                <Text style={{fontSize: 14, fontWeight: 400, color: '#F5F5F5'}}>
                  Recomended
                </Text>
              </View>
            )}
            <ContainerComponent
              horizontal={!searchMode}
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                marginTop: 15,
                flexWrap: searchMode ? 'wrap' : 'nowrap',
              }}>
              {listbooks.length === 0 ? (
                <View
                  style={{flex: 1, alignSelf: 'center', alignItems: 'center'}}>
                  <Image
                    source={require('../assets/images/sad.png')}
                    style={{width: 200, height: 200, marginTop: 40}}
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
                  <BookCard2
                    searchMode={searchMode}
                    key={index}
                    title={book.name}
                    author={book.author}
                    image={book.images_link}
                    star={book.rating}
                    userId={userId}
                    categories={[
                      {name: book.category1},
                      {name: book.category2},
                      {name: book.category3},
                    ]}
                    bookId={book.id}
                    refetchData={refetchData}
                    favorite={isFavorite(book.id)}
                    onPress={() =>
                      navigation.navigate('Details', {id: book.id})
                    }
                  />
                ))
              )}
            </ContainerComponent>
            {!searchMode && (
              <View>
                <View style={{marginTop: 10}}>
                  <Text
                    style={{fontSize: 14, fontWeight: 400, color: '#F5F5F5'}}>
                    Popular
                  </Text>
                </View>
                <ScrollView
                  horizontal
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 15,
                    paddingBottom: 30,
                  }}>
                  {popularBooks.map((book, index) => (
                    <BookCard2
                      searchMode={false}
                      key={index}
                      title={book.Book.name}
                      author={book.Book.author}
                      image={book.Book.images_link}
                      star={book.Book.rating}
                      userId={userId}
                      categories={[
                        {name: book.Book.category1},
                        {name: book.Book.category2},
                        {name: book.Book.category3},
                      ]}
                      favorite={isFavorite(book.Book.id)}
                      bookId={book.Book.id}
                      refetchData={refetchData}
                      onPress={() =>
                        navigation.navigate('Details', {id: book.Book.id})
                      }
                    />
                  ))}
                </ScrollView>
              </View>
            )}
            {dropDown && renderDropdownContent()}
          </View>
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
    minHeight: 500,
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
    top: 0,
    right: 0,
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
    color: '#444444',
  },
});
export default Explore;
