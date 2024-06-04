import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {API_URL, WARNA_DISABLE} from '../utils/constant';
import BookCard2 from '../components/BookCard2';
import {categoryColors} from '../utils/colors';

const Explore = ({route}) => {
  const {category} = route?.params || {category: 'Search'};
  // const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  // const [books, setBooks] = useState([]);
  const [user, setUser] = useState([]);
  const [listbooks, setListBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const Userid = 1; // Sementara, kalo yg login user dgn id = 1
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${Userid}`);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
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
  useEffect(() => {
    fetchBooks();
    fetchCategories();
    fetchUser();
  }, []);

  useEffect(() => {
    // console.log('books', books);
    console.log('listbooks', listbooks);
    console.log('categories list', categories);
  }, [listbooks]);

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
              onPress={() =>
                navigation.navigate('List', {category: category.name})
              }>
              <Text style={{color: '#F5F5F5'}}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={{flex: 1}}>
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
              paddingRight: 0
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
                setSearchResult(search);
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
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 14, fontWeight: 400, color: '#F5F5F5'}}>
            Newest
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
          {listbooks.map((book, index) => (
            <BookCard2
              key={index}
              title={book.name}
              author={book.author}
              image={book.images_link}
              star={book.rating}
              categories={[
                {name: book.category1},
                {name: book.category2},
                {name: book.category3},
              ]}
              onPress={() => navigation.navigate('Details',{id: book.id})}
            />
          ))}
        </ScrollView>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 14, fontWeight: 400, color: '#F5F5F5'}}>
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
          {listbooks.map((book, index) => (
            <BookCard2
              key={index}
              title={book.name}
              author={book.author}
              image={book.images_link}
              star={book.rating}
              categories={[
                {name: book.category1},
                {name: book.category2},
                {name: book.category3},
              ]}
              onPress={() => navigation.navigate('Details')}
            />
          ))}
        </ScrollView>
        {dropDown && renderDropdownContent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#043657',
    paddingBottom: 30,
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
