import {View, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import TabItem from '../TabItem';
import { WARNA_DISABLE } from '../../utils/constant';

const {width} = Dimensions.get('window');

const BottomNavigator = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabItem
            key={index}
            isFocused={isFocused}
            options={options}
            onPress={onPress}
            onLongPress={onLongPress}
            label={label}
          />
        );
      })}
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    borderTopWidth:0.3,
    borderTopColor: WARNA_DISABLE,
    justifyContent: 'space-between',
    paddingHorizontal: 55,
    paddingVertical: 15,
  }
});
