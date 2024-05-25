import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
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
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const apiUrl = 'http://10.0.2.2:1000';

const Home = () => {
  const navigation = useNavigation();
  const [books, setBooks] = useState([]); //temporary top book
  const [listbooks, setListBooks] = useState([]);
  const [categories, setCategories] = useState([]);
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

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/books`);
      setBooks(response.data.data[0]);
      setListBooks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log('books', books);
    console.log('listbooks', listbooks);
    console.log('categories', categories);
  }, [books, listbooks]);

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.header}>
        <View style={styles.firstSection}>
          <TouchableOpacity>
            <Image
              source={require('../assets/icons/IconMenuDrop.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{borderRadius: 50, overflow: 'hidden'}}
            onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('../assets/images/Cat.jpg')}
              style={{width: 45, height: 45}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.secondSection}>
          <Text style={{fontSize: 20, fontWeight: '500', color: '#F5F5F5'}}>
            Top Of The Week
          </Text>
          {/* <TouchableOpacity>
            <Text style={{fontSize: 15, color: '#C3C3C3'}}>View All</Text>
          </TouchableOpacity> */}
        </View>
        <View>
          <View style={styles.thirdSection}>
            <View>
              <ImageBackground
                source={require('../assets/images/background.jpg')}
                style={styles.imagebackground}>
                <Image
                  source={require('../assets/images/lumpu.jpg')}
                  style={{width: 90, height: 140}}
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
                  style={{fontSize: 18, fontWeight: '500', color: '#F5F5F5'}}>
                  {books.name}
                </Text>
                <View style={styles.ratings}>
                  <Image
                    source={require('../assets/icons/IconStar.png')}
                    style={{width: 14, height: 14, marginRight: 3}}
                  />
                  <Text style={{fontSize: 14, color: '#212121'}}>4.5</Text>
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{fontSize: 14, color: '#F5F5F5'}}>
                  By {books.author}
                </Text>
              </View>
              {/* category */}
              <View style={{flexDirection: 'row', marginTop: 16}}>
                <Text
                  style={[styles.minicategory, {backgroundColor: '#4085B4'}]}>
                  {books.category1}
                </Text>
                <Text
                  style={[styles.minicategory, {backgroundColor: '#ad8cd3'}]}>
                  {books.category2}
                </Text>
                <Text
                  style={[styles.minicategory, {backgroundColor: '#886ed4'}]}>
                  {books.category3}
                </Text>
              </View>
              <View style={{marginTop: 14}}>
                <Text style={{fontSize: 14, color: '#F5F5F5'}}>
                  Favorited by 15 Users
                </Text>
              </View>
              <View style={{marginTop: 16}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Details', {id: books.id})
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
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#212121'}}>
            Category
          </Text>
          {/* <TouchableOpacity>
            <Text style={{fontSize: 15, color: '#8B8D92'}}>View All</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.categorywrap}>
          {categories.map(category => (
              <TouchableOpacity
                style={{alignItems: 'center', marginBottom: 7}}
                onPress={() =>
                  navigation.navigate('List', {category: category.name})
                }>
                <View style={styles.category}>
                  <Image
                    source={categoryImages[category.name]}
                    style={styles.categoryicons}
                  />
                </View>
                <Text>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</Text>
              </TouchableOpacity>
          ))}
        </View>
        <View>
          <View style={styles.titleSection}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#212121'}}>
              New Arrivals
            </Text>
            {/* <TouchableOpacity>
              <Text style={{fontSize: 15, color: '#8B8D92'}}>View All</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.arrivalswrap}>
            {listbooks.map(book => (
              <View style={{gap: 20}}>
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={() => navigation.navigate('Details', {id: book.id})}>
                  <ImageBackground
                    source={require('../assets/images/background.jpg')}
                    style={styles.imagebackgroundshadow}>
                    <Image
                      source={require('../assets/images/dilan.jpg')}
                      style={styles.sizebook}
                    />
                  </ImageBackground>
                </TouchableOpacity>
                <FavoriteButton gaya={{top: 10, right: 15}} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
  },
  arrivalswrap: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 30,
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
});

export default Home;
