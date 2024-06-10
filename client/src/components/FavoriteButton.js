import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { API_URL } from '../utils/constant';

const FavoriteButton = ({ gaya, size, favorite, bookId, refetchData, userId }) => {
  const [backgroundColor, setBackgroundColor] = useState('#4085B4');

  const removeFavorite = async () => {
    try {
      await axios.delete(`${API_URL}/favorite/${userId}/${bookId}`);
      setBackgroundColor('#4085B4')
      await refetchData();
    } catch (error) {
      console.log(error)
    }
  };
  const makeFavorite = async () => {
    try {
      await axios.post(`${API_URL}/favorite`, {
        id_user: userId,
        id_book: bookId,
      });
      console.log(userId)
      setBackgroundColor('#FF69B4');
      await refetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (favorite) {
      setBackgroundColor('#FF69B4')
    }
    else {
      setBackgroundColor('#4085B4')
    }
  }, [favorite]);

  return (
    <TouchableOpacity
      style={[{
        backgroundColor: backgroundColor,
        position: 'absolute',
        padding: 4,
        borderRadius: 8,
        overflow: 'hidden',

      }, gaya]}
      onPress={backgroundColor == '#FF69B4' ? removeFavorite : makeFavorite} refetchData >
      <Image
        source={require('../assets/icons/IconLove.png')}
        style={[{ width: 25, height: 25 }, size]}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;
