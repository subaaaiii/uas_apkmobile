import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../utils/constant';
import { ActivityIndicator } from 'react-native-paper';

const Details = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const { id } = route.params;

  const [book, setBook] = useState([]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`${API_URL}/books/${id}`);
      setBook(response.data.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#427D9D', justifyContent: 'center' }}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color='white' />
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: '#427D9D', justifyContent: 'center' }}>
          < View style={styles.HeadersContainer}>
            <TouchableOpacity
              style={styles.BackButton}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/icons/IconBack.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>

            <Text style={styles.Headers}>Details</Text>
            <Text style={{ flexBasis: 100 }}></Text>
          </View>

          <ScrollView>
            <View style={styles.TopContainer}>
              <View style>
                {/* 1st section */}
                <View style={{ marginTop: -130 }}>
                  <View style={styles.ContentContainer}>
                    <Image
                      source={{ uri: book.images_link }}
                      style={styles.BookCover}
                    />
                  </View>
                  <View style={styles.ContentContainer}>
                    <Text style={styles.Author}>{book.author}</Text>
                    <Text style={styles.Title}>{book.name}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      margin: 20,
                      marginBottom: 5,
                      justifyContent: 'center',
                      borderTopWidth: 2,
                      borderColor: 'lightgray',
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    margin: 15,
                    justifyContent: 'center',
                  }}>
                  <View>
                    <Text
                      style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                      About Book
                    </Text>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      margin: 20,
                      justifyContent: 'space-evenly',
                      backgroundColor: '#DDF2FD',
                      borderRadius: 15,
                      marginTop: 10,
                    }}>
                    <View style={{ padding: 20, alignItems: 'center' }}>
                      <Text style={styles.BookInfoValue}>{book.rating}</Text>
                      <Text style={styles.BookInfo}>Rating</Text>
                    </View>
                    <View style={{ padding: 20, alignItems: 'center' }}>
                      <Text style={styles.BookInfoValue}>{book.pages}</Text>
                      <Text style={styles.BookInfo}>Pages</Text>
                    </View>
                    <View style={{ padding: 20, alignItems: 'center' }}>
                      <Text style={styles.BookInfoValue}>{book.cover}</Text>
                      <Text style={styles.BookInfo}>Cover</Text>
                    </View>
                    <View style={{ padding: 20, alignItems: 'center' }}>
                      <Text style={styles.BookInfoValue}>{book.year}</Text>
                      <Text style={styles.BookInfo}>Year</Text>
                    </View>
                  </View>
                </View>

                <View style={{ margin: 20, marginTop: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                    Description
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'grey',
                      fontWeight: '400',
                      marginTop: 5,
                    }}>
                    {book.description}
                  </Text>
                </View>

              </View>
            </View>
          </ScrollView>
          <View style={styles.FooterContainer}>
            <Text style={styles.Footer}>Read Now</Text>
          </View>

        </View>
      )}
    </View >
  );
};

const styles = StyleSheet.create({
  TopContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 150,
    paddingBottom: 50,
  },

  // Header
  Headers: {
    fontSize: 20,
    color: 'white',
    padding: 10,
    flexBasis: 110,
    textAlign: 'center',
  },
  BackButton: {
    padding: 10,
    flexBasis: 100,
    alignItems: 'center',
  },
  HeadersContainer: {
    paddingVertical: 10,
    backgroundColor: '#427D9D',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  //1st Section
  BookCover: {
    width: 160,
    height: 230,
    borderRadius: 15,
  },
  ContentContainer: {
    margin: 5,
    alignItems: 'center',
  },
  Title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  Author: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  //2nd Section
  BookInfo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'grey',
  },

  BookInfoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  //Footer
  FooterContainer: {
    padding: 30,
    paddingBottom: 17,
    paddingTop: 17,
    alignItems: 'center',
    backgroundColor: '#427D9D',
    // margin: 5
  },

  Footer: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
});

export default Details;
