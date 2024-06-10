import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FavoriteButton from './FavoriteButton';
import { categoryColors } from '../utils/colors';

const BookCard2 = ({ title, author, categories, onPress, image, star, favorite, bookId, refetchData, searchMode, userId }) => {
  return (
    <View style={[styles.thirdSection, { width: searchMode ? 140 : 'auto' }]}>

      <ImageBackground
        source={{ uri: image.toString() }}
        style={styles.imagebackground}
        blurRadius={70}>
        <Image
          source={{ uri: image.toString() }}
          style={{ width: 70, height: 110 }}
        />
      </ImageBackground>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <Text style={{ fontSize: 14, fontWeight: '400', color: '#F5F5F5' }}>
          {title}
        </Text>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 10, color: '#F5F5F5' }}>By {author}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10, flexWrap: 'wrap' }}>
        {categories.map((category, index) => (
          <Text
            key={index}
            style={[
              styles.minicategory,
              { backgroundColor: categoryColors[category.name] },
            ]}>
            {category.name}
          </Text>
        ))}
      </View>
      <View style={{ marginTop: 5, flexDirection: 'row' }}>
        {Array.from({ length: Math.floor(star) }, (_, index) => (
          <Image
            key={index}
            source={require('../assets/icons/IconStar.png')}
            style={{ width: 10, height: 10, marginRight: 3 }}
          />
        ))}
        {star % 1 !== 0 && (
          <Image
            source={require('../assets/icons/IconStar-half.png')}
            style={{ width: 5, height: 9.5, marginRight: 3 }}
          />
        )}
      </View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.primerbutton}>See Details</Text>
        </TouchableOpacity>
      </View>
      <FavoriteButton
        gaya={{ top: 10, right: 10, padding: 2, borderRadius: 7 }}
        size={{ width: 18, height: 18 }}
        favorite={favorite}
        userId={userId}
        bookId={bookId}
        refetchData={refetchData}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  thirdSection: {
    marginRight: 20,
    padding: 10,
    // flexDirection: 'row',
    // alignSelf: 'center',
    backgroundColor: '#0E5381',
    borderRadius: 10,
    // overflow: 'hidden',
    marginBottom: 20,
    // width: searchMode? 140 : 'auto',
    // height: 'auto',
  },
  categorySection: {
    height: 440,
    padding: 30,
    backgroundColor: '#f5f5f5',
  },
  imagebackground: {
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    overflow: 'hidden',
    // marginRight: 7,
  },
  minicategory: {
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 8,
    marginRight: 5,
    color: '#F5F5F5',
    marginBottom: 5
  },
  primerbutton: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 10,
    color: '#F5F5F5',
    backgroundColor: '#F08F1D',
    alignSelf: 'center',
  },
});

export default BookCard2;
