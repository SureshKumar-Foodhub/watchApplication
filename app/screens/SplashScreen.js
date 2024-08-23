import React, { useEffect } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import Images from "../utils/Images";

const SplashScreen = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate("Dashboard");
    }, 2000);
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
      <TouchableOpacity>
        <Image
          source={Images.Foodhub_Logo}
          style={{ width: 120, height: 21 }}
        />
      </TouchableOpacity>
    </View>
  );
};
export default SplashScreen;
