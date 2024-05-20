import * as React from 'react';
import {ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  
  render() {
    return (
      <ScrollView style={styles.Profile}>
  
        {/* Header */}
        <View style={styles.HeadersContainer}>
        <TouchableOpacity style={styles.BackButton} onPress={() => this.props.navigation.goBack()}>
          <Image 
            source={require('../assets/icons/IconBack.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>

          <Text style={styles.Headers}>Profile</Text>
          <Text style={{ flexBasis: 100 }}></Text>
        </View>
        {/* Header */}

        {/* 1st section */}
        <View>
          <ImageBackground
            source={require('../assets/images/bg.png')}
            resizeMode="cover"
            style={{flex: 1}}
            imageStyle={styles.ImageBackground}
            >
              <View style={styles.Container}>
              <View style={styles.ContentContainer}>
                <Image 
                  source={require('../assets/images/Cat.jpg')}
                  style={styles.ProfilePicture}
                />
              </View>
              <View style={styles.ContentContainer}>
                <Text style={{fontSize: 20, color:'white'}}>Naufal Duta</Text>
              </View>

              <View style={{ flexDirection: 'row', margin: 20 }}>
                <View style={{ flexDirection: 'row', borderRightWidth: 0.5, padding: 10, borderColor: 'white'}}>
                  <Text style={styles.FollowValue}>4</Text>
                  <Text style={styles.Follow}>Followers</Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                  <Text style={styles.FollowValue}>12</Text>
                  <Text style={styles.Follow}>Following</Text>
                </View> 
              </View>
            </View>
          </ImageBackground>
          
        </View>
        {/* 1st section */}

        {/* 2nd section */}
        <View>

          <View style={{padding: 10, paddingLeft: 20, paddingTop: 20}}>
            <View style={{ borderBottomWidth: 1, borderColor: 'lightgrey', flexDirection: 'row'}}> 
              <View style={{marginRight: 3}}>
                <Image 
                  source={require('../assets/images/user.png')}
                  style={styles.UserDataIcon}
                />
              </View>
              <View>
                <Text style={styles.UserDataHeader}>Username</Text>
                <Text style={styles.UserData}>naufalduta22</Text>
              </View>
            </View>
          </View>

          <View style={{padding: 10, paddingLeft: 20}}>
            <View style={{ borderBottomWidth: 1, borderColor: 'lightgrey', flexDirection: 'row'}}> 
              <View style={{marginRight: 3}}>
                <Image 
                  source={require('../assets/images/email.png')}
                  style={styles.UserDataIcon}
                />
              </View>
              <View>
                <Text style={styles.UserDataHeader}>Email</Text>
                <Text style={styles.UserData}>naufaldutam@gmail.com</Text>
              </View>
            </View>
          </View>
          
          <View style={{padding: 10, paddingLeft: 20}}>
            <View style={{ borderBottomWidth: 1, borderColor: 'lightgrey', flexDirection: 'row'}}> 
              <View style={{marginRight: 3}}>
                <Image 
                  source={require('../assets/images/smartphone-call.png')}
                  style={styles.UserDataIcon}
                />
              </View>
              <View>
                <Text style={styles.UserDataHeader}>Phone</Text>
                <Text style={styles.UserData}>+6281235132111</Text>
              </View>
            </View>
          </View>

          <View style={{padding: 10, paddingLeft: 20}}>
            <View style={{ flexDirection: 'row' }}> 
              <View style={{marginRight: 3}}>
                <Image 
                  source={require('../assets/images/calendar.png')}
                  style={styles.UserDataIcon}
                />
              </View>
              <View>
                <Text style={styles.UserDataHeader}>Date of Birth</Text>
                <Text style={styles.UserData}>May 9th, 2003</Text>
              </View>
            </View>
          </View>
          
        </View>
        {/* 2nd section */}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  Profile:{
    flex: 1,
  },
  Container:{
    alignItems: 'center',
  },

  // Header
  Headers: {
    fontSize: 20, 
    color: 'white', 
    padding: 10, 
    flexBasis: 100, 
    textAlign: 'center'
  },
  BackButton: {
    padding: 10, 
    flexBasis: 100, 
    alignItems: 'center'
  },
  HeadersContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 10, 
    backgroundColor:'#164863', 
    flexDirection: 'row', 
    justifyContent:'space-between'
  },

  //1st Section
  ImageBackground: {
    borderBottomRightRadius: 15, 
    borderBottomLeftRadius: 15
  },
  ProfilePicture:{
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 3
  },
  ContentContainer:{
    margin:5,
  },
  Follow: {
    fontSize: 12, 
    color:'white',
    margin: 5, 
    textAlignVertical: 'center'
  },
  FollowValue: {
    fontSize: 16, 
    color:'white', 
    margin: 5, 
    fontWeight: 'bold'
  },

  //2nd Section
  UserData: {
    fontSize: 16, 
    color:'grey', 
    margin: 5, 
    fontWeight: 'bold', 
    marginBottom: 30
  },
  UserDataHeader: {
    fontSize: 13, 
    fontFamily:'', 
    color:'grey', 
    margin: 5
  },
  UserDataIcon: {
    width: 22, 
    height: 22, 
    margin: 5
  }
  
})

export default Profile;