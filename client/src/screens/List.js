import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import BookCard from '../components/BookCard';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isDropdownOpen: false
    };
  }
  toggleDropdown = () => {
    this.setState(prevState => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  const 

  renderDropdownContent = () => {
    const categories=[
      {name: 'Romance', color: '#4085B4'},
      {name: 'Sci-fi', color: '#ad8cd3'},
      {name: 'Family', color: '#886ed4'},
    ]
    return (
      <View style={styles.dropdownContent}>
        <Text>Filter by kategory:</Text>
        <View style={styles.categoryFilter}>
        {categories.map((category, index) => (
            <Text
              key={index}
              style={[styles.minicategory, {backgroundColor: category.color}]}>
              {category.name}
            </Text>
          ))} 
        </View>
      </View>
    );
  };
  render() {
    const { category } = this.props.route?.params || { category: 'Search' };
    const { isDropdownOpen } = this.state;
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.header}>
          <View style={styles.firstSection}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('../assets/icons/IconBack.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
            <View>
              <Text style={{fontSize: 20, color: '#f5f5f5', fontWeight: '500'}}>
                {category}
              </Text>
            </View>
            <TouchableOpacity>
              <Image
                source={require('../assets/icons/IconNotifikasi.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#f5f5f5',
              borderRadius: 10,
              marginTop: 25,
              color: 'black',
            }}>
            <View
              style={[
                styles.firstSection,
                {marginTop: 0, padding: 10, alignItems: 'center'},
              ]}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../assets/icons/IconSearch.png')}
                  style={{width: 25, height: 25}}
                />
                <TextInput
                  style={{
                    padding: 0,
                    margin: 0,
                    marginLeft: 10,
                    width: '78%',
                    color: '#f5f5f5',
                  }}
                  value={this.state.search}
                  onChangeText={value => this.setState({search: value})}
                  onSubmitEditing={() => {
                    this.setState({searchResult: this.state.search});
                  }}></TextInput>
              </View>
              <TouchableOpacity onPress={this.toggleDropdown}>
                <View
                  style={{
                    backgroundColor: '#0E5381',
                    padding: 5,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}>
                  <Image
                    source={require('../assets/icons/IconFilter.png')}
                    style={{width: 25, height: 25}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            {this.state.searchResult && (
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#f5f5f5'}}>Search Result For </Text>
                <Text style={{color: '#80B4D7', fontWeight: 'bold'}}>
                  "{this.state.searchResult}"
                </Text>
              </View>
            )}
          </View>
          <View style={{width: 'auto'}}>
            <BookCard
              title="Lumpu"
              author="Tere Liye"
              image={require('../assets/images/lumpu.jpg')}
              categories={[
                {name: 'Romance', color: '#4085B4'},
                {name: 'Sci-fi', color: '#ad8cd3'},
                {name: 'Family', color: '#886ed4'},
              ]}
              onPress={() => this.props.navigation.navigate('Details')}
            />
          </View>
          <BookCard
            title="Bumi"
            author="Tere Liye"
            image={require('../assets/images/bumi.jpg')}
            categories={[
              {name: 'Romance', color: '#4085B4'},
              {name: 'Sci-fi', color: '#ad8cd3'},
              {name: 'Family', color: '#886ed4'},
            ]}
            onPress={() => this.props.navigation.navigate('Details')}
          />
          <BookCard
            title="Nebula"
            author="Tere Liye"
            image={require('../assets/images/nebula.jpg')}
            categories={[
              {name: 'Romance', color: '#4085B4'},
              {name: 'Sci-fi', color: '#ad8cd3'},
              {name: 'Family', color: '#886ed4'},
            ]}
            onPress={() => this.props.navigation.navigate('Details')}
          />
          <BookCard
            title="Bulan"
            author="Tere Liye"
            image={require('../assets/images/bulan.jpg')}
            categories={[
              {name: 'Romance', color: '#4085B4'},
              {name: 'Sci-fi', color: '#ad8cd3'},
              {name: 'Family', color: '#886ed4'},
            ]}
            onPress={() => this.props.navigation.navigate('Details')}
          />
          {isDropdownOpen && this.renderDropdownContent()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#043657',
    paddingBottom: 30,
  },

  firstSection: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  thirdSection: {
    marginTop: 30,
    padding: 20,
    flexDirection: 'row',
    backgroundColor: '#0E5381',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imagebackground: {
    padding: 14,
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
    fontSize: 12,
    marginRight: 5,
    color: '#F5F5F5',
  },
  primerbutton: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 16,
    color: '#F5F5F5',
    backgroundColor: '#F08F1D',
    alignSelf: 'flex-end',
  },
  dropdownContent: {
    position: 'absolute',
    top: 130, 
    right: 20, 
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    zIndex: 1, 
    maxHeight: 200,
    maxWidth:300
  },
  categoryFilter:{
    marginTop: 7,
    width:'auto',
    display:'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dropdownItem: {
    paddingVertical: 8,
    marginRight: 50
  },
  dropdownText: {
    color: '#333',
    fontSize: 16,
  },
});
export default List;
