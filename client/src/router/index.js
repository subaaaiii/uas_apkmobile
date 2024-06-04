import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import {Home, Details, Profile, SplashScreen, List, AdminBook, FormBook, Explore} from '../screens';
import { BottomNavigator } from '../components';

const Stack = createNativeStackNavigator ();
const Tab = createBottomTabNavigator();


const MainNav = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Explore' component={Explore}/>
      <Tab.Screen name='Wishlist' component={List}/>
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SplashScreen' component={SplashScreen}/>
        <Stack.Screen name='MainNav' component={MainNav}/>
        <Stack.Screen name='Details' component={Details}/>
        <Stack.Screen name='Profile' component={Profile}/>
        <Stack.Screen name='List' component={List}/>
        <Stack.Screen name='FormBook' component={FormBook}/>
      </Stack.Navigator>
  )
}

export default Router