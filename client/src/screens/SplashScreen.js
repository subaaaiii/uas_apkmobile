import {StackActions} from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {FullWindowOverlay} from 'react-native-screens';

class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace('MainNav'));
    }, 2000);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            width: FullWindowOverlay,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#043657',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/images/logo.png')}
              style={{width: 200, height: 200}}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default SplashScreen;
