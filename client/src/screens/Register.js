import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Modal,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, StackActions } from '@react-navigation/native';
import { API_URL } from '../utils/constant';
import DateTimePicker from '@react-native-community/datetimepicker';

const Signup = () => {
    const navigation = useNavigation();
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setconfPassword] = useState('');
    const [phone, setPhone] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Date of Birth')

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'IOS');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
        setText(fDate)
        setUser({ ...user, dateofbirth: fDate })
        console.log(fDate)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const goToLogin = () => {
        navigation.dispatch(StackActions.replace('Login'));
    };

    const handleSignup = async () => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email.toLocaleLowerCase(),
                    password: password,
                    confPassword: confPassword,
                    phone: phone,
                    dateofbirth: date
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                goToLogin();
            } else {
                setModalVisible(true);
                setErrorText(data.message);
            }
        } catch (error) {
            console.error('Network error:', error);
            setErrorText('Network error, please try again.');
            setModalVisible(true);
        }
    };

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.TitleWelcome}>Welcome</Text>
                <Text style={styles.TitleDetails}>Please enter your details</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={username}
                        placeholder="Username"
                        keyboardType="name"
                        autoCapitalize="words"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPhone}
                        value={phone}
                        placeholder="Phone Number (Ex: 621234)"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        style={[styles.input, {marginVertical: 15, paddingHorizontal: 5, marginRight: 45,}]}
                        onPress={() => showMode('date')}
                    >
                        <Text style={[styles.input, {color: 'black'}]}>
                            {text}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setconfPassword}
                        value={confPassword}
                        placeholder="Confirm Your Password"
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <View
                    style={{
                        marginTop: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                    <Text>Already have an Account </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: 'blue' }}>Click Here</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />)}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{errorText}</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setModalVisible(false);
                            }}>
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logo: {
        width: 222,
        height: 105,
        marginTop: 70,
    },
    container: {
        marginTop: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: '100%',
        height: '80%',
    },
    TitleWelcome: {
        fontFamily: 'TitilliumWeb-Black',
        color: 'black',
        letterSpacing: 1,
        fontSize: 30,
        paddingTop: 16,
        paddingLeft: 47,
    },
    TitleDetails: {
        fontFamily: 'TitilliumWeb-Regular',
        paddingLeft: 47,
        color: 'black',
        marginBottom: 50,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
        marginLeft: 45,
        marginRight: 45,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 15,
        marginLeft: 15,
    },
    input: {
        width: '70%',
    },
    button: {
        marginTop: 40,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 15,
        marginLeft: 45,
        marginRight: 45,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'TitilliumWeb-Bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: 'black',
        borderRadius: 15,
        padding: 10,
        elevation: 2,
    },
    modalButtonText: {
        color: 'white',
        fontFamily: 'TitilliumWeb-Bold',
        textAlign: 'center',
    },
});