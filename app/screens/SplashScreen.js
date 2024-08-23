import React, { useCallback } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import Images from "../utils/Images";

const SplashScreen = (props) => {

  const handleNavigation = useCallback(() => {
    props.navigation.navigate("PaymentScreen");
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={handleNavigation}>
        <Image
          source={Images.Foodhub_Logo}
          style={{ width: 120, height: 21 }}
        />
      </TouchableOpacity>
    </View>
  );
};
export default SplashScreen;
