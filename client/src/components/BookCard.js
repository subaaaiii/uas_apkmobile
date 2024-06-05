import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FavoriteButton from './FavoriteButton';
import {categoryColors} from '../utils/colors';

const BookCard = ({title, author, categories, onPress, image, star, favorite,bookId}) => {
  // const star = 3.5;
  return (
    <View style={styles.thirdSection}>
      <View>
        <ImageBackground
          source={{uri: image.toString()}}
          style={styles.imagebackground}
          blurRadius={70}>
          <Image
            source={{uri: image.toString()}}
            style={{width: 70, height: 110}}
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
          <Text style={{fontSize: 16, fontWeight: '500', color: '#F5F5F5'}}>
            {title}
          </Text>
          <FavoriteButton
            gaya={{top: 0, right: 0, padding: 2, borderRadius: 7}}
            size={{width: 20, height: 20}}
            favorite={favorite}
            bookId={bookId}
          />
        </View>
        <View style={{marginTop: 7}}>
          <Text style={{fontSize: 12, color: '#F5F5F5'}}>By {author}</Text>
        </View>
        {/* category */}
        <View style={{flexDirection: 'row', marginTop: 10}}>
          {categories.map((category, index) => (
            <Text
              key={index}
              style={[
                styles.minicategory,
                {backgroundColor: categoryColors[category.name]},
              ]}>
              {category.name}
            </Text>
          ))}
        </View>
        <View style={{ marginTop: 10, flexDirection: 'row' }}>
        {Array.from({ length: Math.floor(star) }, (_, index) => (
          <Image
            key={index}
            source={require('../assets/icons/IconStar.png')}
            style={{ width: 12, height: 12, marginRight: 3 }}
          />
        ))}
        {star % 1 !== 0 && (
          <Image
            source={require('../assets/icons/IconStar-half.png')}
            style={{ width: 6, height: 11, marginRight: 3 }}
          />
        )}
      </View>
        <View style={{marginTop: 12}}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.primerbutton}>See Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#043657',
  },
  thirdSection: {
    marginTop: 20,
    padding: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#0E5381',
    borderRadius: 10,
    overflow: 'hidden',
  },
  categorySection: {
    height: 440,
    padding: 30,
    backgroundColor: '#f5f5f5',
  },
  imagebackground: {
    padding: 10,
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
    fontSize: 10,
    marginRight: 5,
    color: '#F5F5F5',
  },
  primerbutton: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 12,
    color: '#F5F5F5',
    backgroundColor: '#F08F1D',
    alignSelf: 'flex-end',
  },
});

export default BookCard;
