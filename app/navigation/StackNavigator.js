// In App.js in a new project

import * as React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import Dashboard from '../screens/Dashboard';
import CategoriesList from '../screens/CategoriesList';
import ItemList from '../screens/ItemList';
import CheckoutPage from '../screens/CheckoutPage';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'#e22e2d'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CategoriesList" component={CategoriesList} />
        <Stack.Screen name="ItemList" component={ItemList} />
        <Stack.Screen name="CheckoutPage" component={CheckoutPage} />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
