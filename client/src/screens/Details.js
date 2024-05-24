import * as React from 'react';
import {ScrollView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Details = ({route}) =>{
  const navigation = useNavigation();
  const { id } = route.params;
  console.log(id)
    return (
      <View style={{flex: 1, backgroundColor:'#427D9D'}}>
        {/* Header */}
          <View style={styles.HeadersContainer}>
          <TouchableOpacity style={styles.BackButton} onPress={() => navigation.goBack()}>
            <Image 
              source={require('../assets/icons/IconBack.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>

            <Text style={styles.Headers}>Details</Text>
            <Text style={{ flexBasis: 100 }}></Text>
          </View>
          {/* Header */}

        <ScrollView>
          <View style={styles.TopContainer}>
            <View style>
                {/* 1st section */}
                <View style={{marginTop: -130}}>
                    <View style={styles.ContentContainer}>
                        <Image 
                            source={require('../assets/images/lumpu.jpeg')}
                            style={styles.BookCover}
                        />
                    </View>
                    <View style={styles.ContentContainer}>
                        <Text style={styles.Author}>Tere Liye</Text>
                        <Text style={styles.Title}>Lumpu</Text>
                    </View>

                    <View style={{ flexDirection: 'row', margin: 20,  marginBottom:5, justifyContent: 'center', borderTopWidth: 2, borderColor: 'lightgray'}} />

                </View>
                {/* 1st section */}

                {/* 2nd section */}
                <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'center'}}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>About Book</Text>
                    </View>
                </View>

                <View>
                    <View style={{flexDirection: 'row', margin: 20, justifyContent: 'space-evenly', backgroundColor: '#DDF2FD', borderRadius: 15, marginTop: 10}}>
                        <View style={{padding: 20, alignItems: 'center'}}>
                            <Text style={styles.BookInfoValue}>4.5</Text>
                            <Text style={styles.BookInfo}>Rating</Text>
                        </View>
                        <View style={{padding: 20, alignItems: 'center'}}>
                            <Text style={styles.BookInfoValue}>289</Text>
                            <Text style={styles.BookInfo}>Pages</Text>
                        </View>
                        <View style={{padding: 20, alignItems: 'center'}}>
                            <Text style={styles.BookInfoValue}>Soft</Text>
                            <Text style={styles.BookInfo}>Cover</Text>
                        </View>
                        <View style={{padding: 20, alignItems: 'center'}}>
                            <Text style={styles.BookInfoValue}>2019</Text>
                            <Text style={styles.BookInfo}>Year</Text>
                        </View>
                    </View>
                </View>

                <View style={{margin: 20, marginTop: 10}}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black'}}>Description</Text>
                  <Text style={{ fontSize: 14, color: 'grey', fontWeight: '400', marginTop: 5}}>Kisah belasan tahun di klan Nebula dan akhir cerita di novel Nebula. Sebuah pengkhianatan yang dilakukan oleh Selena justru mengakibatkan kedua sahabatnya, yakni Mata mengorbankan dirinya, sementara Tazk kehilangan kekuatan yang dimilikinya sebab telah dimusnahkan oleh Lumpu. Tamus yang saat itu berada di tempat kejadian dan mempunyai tujuan yang sama, segera melindungi dirinya dengan mengungsi ke Distrik Gunung-Gunung Terlarang.</Text>
                </View>
              
              {/* 2nd section */}
            </View>
            
          </View>

          </ScrollView>
            <View style={styles.FooterContainer}>
              <Text style={styles.Footer}>Read Now</Text>
            </View>
          

      </View>
      
    );
  }

const styles = StyleSheet.create({
    
    TopContainer:{
      backgroundColor: 'white', 
      borderTopRightRadius: 25, 
      borderTopLeftRadius: 25, 
      marginTop: 150,
      paddingBottom:50
    },

    // Header
    Headers: {
        fontSize: 20, 
        color: 'white', 
        padding: 10, 
        flexBasis: 110, 
        textAlign: 'center'
      },
      BackButton: {
        padding: 10, 
        flexBasis: 100, 
        alignItems: 'center'
      },
      HeadersContainer: { 
        paddingVertical: 10, 
        backgroundColor:'#427D9D', 
        flexDirection: 'row', 
        justifyContent:'space-between'
      },

    //1st Section
    BookCover:{
        width: 160,
        height: 230,
        borderRadius: 15
    },
    ContentContainer:{
        margin:5,
        alignItems: 'center',
    },
    Title: {
      fontSize: 24, 
      fontWeight: 'bold', 
      color: 'black'
    },
    Author: {
      fontSize: 14, 
      fontWeight: 'bold'
    },

    //2nd Section
    BookInfo: {
      fontSize: 12, 
      fontWeight: 'bold', 
      color: 'grey' 
    },

    BookInfoValue: {
      fontSize: 18, 
      fontWeight: 'bold', 
      color: 'black'
    },
    //Footer
    FooterContainer: {
      padding: 30, 
      alignItems: 'center', 
      backgroundColor:'#427D9D', 
      // margin: 5
    },

    Footer: {
      fontWeight: 'bold', 
      color: 'white', 
      fontSize: 16
    }
})

export default Details;