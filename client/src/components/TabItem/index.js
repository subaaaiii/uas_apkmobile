import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  IconHome,
  IconHomeActive,
  IconSearch,
  IconSearchActive,
  IconWishlistActive,
  IconWishlist,
} from '../../assets';
import {WARNA_UTAMA, WARNA_DISABLE} from '../../utils/constant';

const TabItem = ({isFocused, options, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'Home')
      return isFocused ? (
        <IconHomeActive width={25} height={25} />
      ) : (
        <IconHome width={25} height={25} />
      );
    if (label === 'Explore')
      return isFocused ? (
        <IconSearchActive width={25} height={25} />
      ) : (
        <IconSearch width={25} height={25} />
      );
    if (label === 'Wishlist')
      return isFocused ? (
        <IconWishlistActive width={25} height={25} />
      ) : (
        <IconWishlist width={25} height={25} />
      );
    return <IconHome />;
  };
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text style={{color: isFocused ? WARNA_UTAMA : WARNA_DISABLE}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
    container: {
        alignItems : 'center',
        alignSelf: 'center'
    }
});
