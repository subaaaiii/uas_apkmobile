import React, {useState} from 'react';
import {TouchableOpacity, Image, ToastAndroid} from 'react-native';

const FavoriteButton = ({gaya,size}) => {
  const [backgroundColor, setBackgroundColor] = useState('#4085B4');
  const [isPink, setIsPink] = useState(false);

  const makeFavorite = () => {
    if (isPink) {
      setBackgroundColor('#4085B4');
      ToastAndroid.show("Remove from Favorite", ToastAndroid.SHORT); 
    } else {
      setBackgroundColor('#FF69B4');
      ToastAndroid.show("Added to Favorite", ToastAndroid.SHORT);
    }
    setIsPink(!isPink);
  };

  return (
    <TouchableOpacity
      style={[{
        backgroundColor: backgroundColor,
        position: 'absolute',
        padding: 4,
        borderRadius: 8,
        overflow: 'hidden',

      },gaya]}
      onPress={makeFavorite}>
      <Image
        source={require('../assets/icons/IconLove.png')}
        style={[{width: 25, height: 25},size]}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;
