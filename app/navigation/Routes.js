import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import {
  navigationDeferred,
  navigationReference,
} from "../utils/navigationUtil";

const Routes = () => {
  const routeNameRef = React.useRef();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer
        ref={navigationReference}
        onReady={() => {
          routeNameRef.current =
            navigationReference.current.getCurrentRoute().name;
          navigationDeferred.resolve();
        }}
      >
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default Routes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
