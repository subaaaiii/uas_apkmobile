import axios from 'axios';
import React, {Component, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import FavoriteButton from '../components/FavoriteButton';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const apiUrl = "http://10.0.2.2:1000";

const Home = () => {
  const [books, setBooks] = useState([]);
  
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/books`);
      setBooks(response.data.data);
      console.log(response.data.data)
    } catch (error) { 
        console.error(error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);
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
              onPress={() => this.props.navigation.navigate('Profile')}>
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
            <TouchableOpacity>
              <Text style={{fontSize: 15, color: '#C3C3C3'}}>View All</Text>
            </TouchableOpacity>
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
                  Lumpu
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
                  By Tere Liye
                </Text>
              </View>
              {/* category */}
              <View style={{flexDirection: 'row', marginTop: 16}}>
                <Text
                  style={[styles.minicategory, {backgroundColor: '#4085B4'}]}>
                  Romance
                </Text>
                <Text
                  style={[styles.minicategory, {backgroundColor: '#ad8cd3'}]}>
                  Sci-fi
                </Text>
                <Text
                  style={[styles.minicategory, {backgroundColor: '#886ed4'}]}>
                  Family
                </Text>
              </View>
              <View style={{marginTop: 14}}>
                <Text style={{fontSize: 14, color: '#F5F5F5'}}>
                  Reading By 15 Friends
                </Text>
              </View>
              <View style={{marginTop: 16}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Details')}>
                  <Text style={styles.primerbutton}>See Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </View>
        </View>
        {/* Category */}
        <View style={styles.categorySection}>
          <View style={styles.titleSection}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#212121'}}>
              Category
            </Text>
            <TouchableOpacity>
              <Text style={{fontSize: 15, color: '#8B8D92'}}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categorywrap}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() =>
                this.props.navigation.navigate('List', {category: 'Fantasy'})
              }>
              <View style={styles.category}>
                <Image
                  source={require('../assets/icons/fantasy.png')}
                  style={styles.categoryicons}
                />
              </View>

              <Text>Fantasy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() =>
                this.props.navigation.navigate('List', {category: 'Romance'})
              }>
              <View style={styles.category}>
                <Image
                  source={require('../assets/icons/romance.png')}
                  style={styles.categoryicons}
                />
              </View>
              <Text>Romance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() =>
                this.props.navigation.navigate('List', {category: 'Mystery'})
              }>
              <View style={styles.category}>
                <Image
                  source={require('../assets/icons/mistery.png')}
                  style={styles.categoryicons}
                />
              </View>

              <Text>Mystery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() =>
                this.props.navigation.navigate('List', {category: 'Horror'})
              }>
              <View style={styles.category}>
                <Image
                  source={require('../assets/icons/horror.png')}
                  style={styles.categoryicons}
                />
              </View>
              <Text>Horror</Text>
            </TouchableOpacity>
          </View>
          <View >
          <View style={styles.titleSection}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#212121'}}>
              New Arrivals
            </Text>
            <TouchableOpacity>
              <Text style={{fontSize: 15, color: '#8B8D92'}}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.arrivalswrap}>
            <View style={{ gap: 20 }}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => this.props.navigation.navigate('Details')}>
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
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => this.props.navigation.navigate('Details')}>
              <ImageBackground
                source={require('../assets/images/background.jpg')}
                style={styles.imagebackgroundshadow}>
                <Image
                  source={require('../assets/images/bumi-manusia.jpg')}
                  style={styles.sizebook}
                />
              </ImageBackground>
            </TouchableOpacity>
            <FavoriteButton gaya={{top: 10, right: 15}} />
          </View>
          </View>
        </View>
      </ScrollView>
    );
  }
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
    // width: width,
    // paddingHorizontal: 10,
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
  sizebook:{
    width: 120, height: 170
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
