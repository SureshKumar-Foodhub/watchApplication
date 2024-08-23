import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';

const Routes = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'red',
      }}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default Routes;
