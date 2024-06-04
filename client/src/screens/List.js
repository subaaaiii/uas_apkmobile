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
import {API_URL} from '../utils/constant';
import BookCard from '../components/BookCard';
import {categoryColors} from '../utils/colors';

const List = ({route}) => {
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
      <View style={styles.header}>
        <View style={styles.firstSection}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/icons/IconBack.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <View>
            <Text style={{fontSize: 20, color: '#f5f5f5', fontWeight: '500'}}>
              {category}
            </Text>
          </View>
          <TouchableOpacity>
            <Image
              source={require('../assets/icons/IconNotifikasi.png')}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#f5f5f5',
            borderRadius: 10,
            marginTop: 25,
            color: 'black',
          }}>
          <View
            style={[
              styles.firstSection,
              {marginTop: 0, padding: 10, alignItems: 'center'},
            ]}>
            <View style={{flexDirection: 'row'}}>
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
                  backgroundColor: '#0E5381',
                  padding: 5,
                  borderRadius: 10,
                  overflow: 'hidden',
                }}>
                <Image
                  source={require('../assets/icons/IconFilter.png')}
                  style={{width: 25, height: 25}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          {searchResult && (
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#f5f5f5'}}>Search Result For </Text>
              <Text style={{color: '#80B4D7', fontWeight: 'bold'}}>
                "{searchResult}"
              </Text>
            </View>
          )}
        </View>
        {listbooks.map((book, index) => (
          <BookCard
            key={index}
            title={book.name}
            author={book.author}
            image={book.images_link}
            categories={[
              {name: book.category1},
              {name: book.category2},
              {name: book.category3},
            ]}
            onPress={() => navigation.navigate('Details')}
          />
        ))}
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
