// In App.js in a new project

import * as React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import Dashboard from '../screens/Dashboard';
import CategoriesList from '../screens/CategoriesList';
import ItemList from '../screens/ItemList';
import CheckoutPage from '../screens/CheckoutPage';
import PaymentScreen from '../screens/PaymentScreen';
import StatusScreen from '../screens/StatusScreen';
import AddressSelectionScreen from '../screens/AddressSelectionScreen';
import OrderScreen from '../screens/OrderScreen';

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
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="StatusScreen" component={StatusScreen} />
        <Stack.Screen
          name="AddressSelectionScreen"
          component={AddressSelectionScreen}
        />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
