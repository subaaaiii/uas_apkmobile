import axios from 'axios';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useEffect, useState} from 'react';
import React from 'react';
import {API_URL, WARNA_UTAMA, WARNA_DISABLE} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

const FormBook = ({route}) => {
  const {id} = route.params || {id: null};
  const navigation = new useNavigation();
  const [user, setUser] = useState([]);
  const [book, setBook] = useState({
    name: '',
    author: '',
    category1: '',
    category2: '',
    category3: '',
    image: 'lumpu.jpg',
    rating: 0, // Default value changed to 0
    pages: 0, // Default value changed to 0
    cover: '',
    year: 0, // Default value changed to 0
    description: '',
  });
  const [dropDown, setDropDown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [field, setField] = useState(false);
  const [photo, setPhoto] = React.useState(null);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`${API_URL}/books/${id}`);
      setBook(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Userid = 1; // Sementara, kalo yg login user dgn id = 1
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${Userid}`);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBook();
    }
    fetchCategories();
    fetchUser();
  }, []);

  const insertToFormData = () => {
    const formData = new FormData();

    formData.append('name', book.name);
    formData.append('author', book.author);
    formData.append('category1', book.category1);
    formData.append('category2', book.category2);
    formData.append('category3', book.category3);
    formData.append('rating', book.rating.toString());
    formData.append('pages', book.pages.toString());
    formData.append('cover', book.cover);
    formData.append('year', book.year.toString());
    formData.append('description', book.description);

    if (photo && photo.uri) {
      const uriParts = photo.uri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('image', {
        uri: photo.uri,
        name: photo.fileName,
        type: `image/${fileType}`,
      });
    }
    return formData;
  };
  const handleSubmit = async () => {
    try {
      const formData = insertToFormData();
      const response = await axios.post(`${API_URL}/books`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Data buku berhasil disimpan:', response.data);
      navigation.navigate('Wishlist', {refresh: true});
    } catch (error) {
      console.error('Gagal menyimpan data buku:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = insertToFormData();
      formData.append('id', id);
      const response = await axios.patch(`${API_URL}/books`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Data buku berhasil disimpan:', response.data);
      navigation.navigate('Wishlist', {refresh: true});
    } catch (error) {
      console.error('Gagal menyimpan data buku:', error);
    }
  };

  toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  renderDropdownContent = field => {
    console.log('field', field);
    const remainingCategories = categories.filter(category => {
      return ![book.category1, book.category2, book.category3].includes(
        category.name,
      );
    });
    return (
      <View style={styles.dropdownContent}>
        <TouchableOpacity
          style={{flex: 1, alignSelf: 'flex-end', paddingHorizontal: 10}}
          onPress={() => toggleDropdown()}>
          <Text>X</Text>
        </TouchableOpacity>
        <Text>Choose Category:</Text>
        <View style={styles.categoryFilter}>
          {remainingCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.minicategory, {backgroundColor: 'blue'}]}
              onPress={() => {
                setBook({...book, [field]: category.name});
                toggleDropdown();
              }}>
              <Text style={{color: '#f9f9f9'}}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  const handleInputImage = () => {
    launchImageLibrary({noData: true}, response => {
      console.log(response.assets[0]);
      if (response) {
        setPhoto(response.assets[0]);
      }
    });
  };
  return (
    <ScrollView>
      <View style={styles.topbar}>
        <TouchableOpacity
          style={styles.BackButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icons/IconBackUtama.png')}
            style={{width: 30, height: 20}}
          />
        </TouchableOpacity>
        <View>
          <Text style={{fontSize: 20, color: WARNA_UTAMA, fontWeight: '500'}}>
            {id ? 'Edit Book' : 'Add Book'}
          </Text>
        </View>
        <TouchableOpacity
          style={{borderRadius: 50, overflow: 'hidden'}}
          onPress={() => navigation.navigate('Profile', {id: Userid})}>
          <Image
            source={require('../../assets/images/Cat.jpg')}
            style={{width: 45, height: 45}}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.inputcontainer, {marginTop: 20}]}>
        <View style={styles.inputwrap}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonBuku.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Title</Text>
            <TextInput
              placeholder="Insert book title..."
              placeholderTextColor={WARNA_DISABLE}
              style={styles.editInput}
              defaultValue={id ? book.name : ''}
              onChangeText={text => setBook({...book, name: text})}
            />
          </View>
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <View style={styles.inputwrap}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonAuthor.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Author</Text>
            <TextInput
              placeholder="Insert author name..."
              placeholderTextColor={WARNA_DISABLE}
              style={styles.editInput}
              defaultValue={id ? book.author : ''}
              onChangeText={text => setBook({...book, author: text})}
            />
          </View>
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <View style={styles.inputwrap}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonCategories.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Categories</Text>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <View style={styles.categoriesInput}>
                  {book.category1 ? (
                    <Text>{book.category1}</Text>
                  ) : (
                    <Text style={{color: WARNA_DISABLE}}>
                      Select category...
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      toggleDropdown();
                      setField('category1');
                    }}
                    style={styles.selectbutton}>
                    <Text style={{color: '#ececec'}}>Select</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <View style={styles.categoriesInput}>
                  {book.category2 ? (
                    <Text>{book.category2}</Text>
                  ) : (
                    <Text style={{color: WARNA_DISABLE}}>
                      Select category...
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      toggleDropdown();
                      setField('category2');
                    }}
                    style={styles.selectbutton}>
                    <Text style={{color: '#ececec'}}>Select</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <View style={styles.categoriesInput}>
                  {book.category3 ? (
                    <Text>{book.category1}</Text>
                  ) : (
                    <Text style={{color: WARNA_DISABLE}}>
                      Select category...
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      toggleDropdown();
                      setField('category3');
                    }}
                    style={styles.selectbutton}>
                    <Text style={{color: '#ececec'}}>Select</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <View style={styles.inputwrap}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonImage.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Image</Text>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <View style={styles.imageInput}>
                  <View style={styles.imageinputcontainer}>
                    <Image
                      source={
                        photo && photo.uri
                          ? {uri: photo.uri}
                          : book.images_link
                          ? {uri: book.images_link}
                          : require('../../assets/images/noimage.png')
                      }
                      style={{width: 100, height: 140, borderRadius: 5}}
                    />
                  </View>
                  <Text>
                    {photo && photo.uri
                      ? photo.fileName
                      : id && (book.image = 'noimage.png')
                      ? 'add image'
                      : id && book.image
                      ? 'image available'
                      : 'no image...'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleInputImage();
                    }}
                    style={styles.selectbutton}>
                    <Text style={{color: '#ececec'}}>Select</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <View style={styles.inputwrap}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonRating.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Rating</Text>
            <TextInput
              placeholder="Rating 0-5.."
              placeholderTextColor={WARNA_DISABLE}
              style={styles.editInput}
              keyboardType="numeric"
              defaultValue={id ? book.rating.toString() : ''}
              onChangeText={text => setBook({...book, rating: text})}
            />
          </View>
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <View style={styles.inputwrap}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonPage.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Pages</Text>
            <TextInput
              placeholder="Insert total pages..."
              placeholderTextColor={WARNA_DISABLE}
              style={styles.editInput}
              keyboardType="numeric"
              defaultValue={id ? book.pages.toString() : ''}
              onChangeText={text => setBook({...book, pages: text})}
            />
          </View>
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <View style={styles.inputwrap}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonBuku.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Cover</Text>
            <TextInput
              placeholder="Insert cover type..."
              placeholderTextColor={WARNA_DISABLE}
              style={styles.editInput}
              defaultValue={id ? book.cover : ''}
              onChangeText={text => setBook({...book, cover: text})}
            />
          </View>
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <View style={styles.inputwrap}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonYear.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Year</Text>
            <TextInput
              placeholder="Insert publish year..."
              placeholderTextColor={WARNA_DISABLE}
              style={styles.editInput}
              keyboardType="numeric"
              defaultValue={id ? book.year.toString() : ''}
              onChangeText={text => setBook({...book, year: text})}
            />
          </View>
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <View style={styles.inputwrap}>
          <View style={{marginRight: 3}}>
            <Image
              source={require('../../assets/images/ikonDescription.png')}
              style={styles.UserDataIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.UserDataHeader}>Description</Text>
            <TextInput
              placeholder="Insert description..."
              placeholderTextColor={WARNA_DISABLE}
              multiline={true}
              numberOfLines={4}
              style={[
                styles.editInput,
                {textAlignVertical: 'top', height: 100},
              ]}
              defaultValue={id ? book.description : ''}
              onChangeText={text => setBook({...book, description: text})}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.savebutton}
        onPress={id ? handleUpdate : handleSubmit}>
        <Text style={{color: '#f9f9f9'}}>Save</Text>
      </TouchableOpacity>
      {dropDown && renderDropdownContent(field)}
    </ScrollView>
  );
};

export default FormBook;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  BackButton: {
    alignItems: 'center',
  },
  editInput: {
    height: 40,
    backgroundColor: '#ececec',
    paddingHorizontal: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  categoriesInput: {
    height: 40,
    backgroundColor: '#ececec',
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  imageInput: {
    backgroundColor: '#ececec',
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  UserDataIcon: {
    width: 22,
    height: 22,
    margin: 5,
  },
  dropdownContent: {
    position: 'absolute',
    top: 280,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    zIndex: 1,
    maxHeight: 200,
    maxWidth: 300,
    paddingTop: 10,
    paddingBottom: 30,
  },
  categoryFilter: {
    marginTop: 8,
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dropdownText: {
    color: '#333',
    fontSize: 16,
  },
  minicategory: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 12,
    marginRight: 5,
    color: '#F5F5F5',
    marginBottom: 5,
  },
  selectbutton: {
    backgroundColor: '#444444',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
  },
  savebutton: {
    marginTop: 15,
    marginLeft: 15,
    paddingHorizontal: 8,
    paddingVertical: 10,
    width: 100,
    backgroundColor: 'green',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: WARNA_DISABLE,
  },
  inputwrap: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    flexDirection: 'row',
  },
  inputcontainer: {padding: 10, paddingLeft: 20, paddingTop: 10},
  imageinputcontainer: {
    width: 100,
    height: 140,
    borderRadius: 5,
    shadowColor: '#444444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});