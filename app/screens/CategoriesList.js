import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Images from "../utils/Images";

const CategoriesList = (props) => {
  const itemDetails = props.route?.params?.itemDetails;

  // const handleItemNavigation = (productItem) => {
  //   props.navigation.navigate("ItemList", { productItem: productItem });
  // };

  const handleBackPress = () => {
    props.navigation.goBack();
  };
  
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginStart: 5,
        }}
        onPress={handleBackPress}
      >
        <Image style={{ height: 20, width: 20 }} source={Images.BackIcon} />
        <Text
          style={{
            color: "#000000",
            fontSize: 18,
            fontWeight: "bold",
            marginStart: 10,
          }}
        >
          Categories
        </Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={{ marginTop: 10, marginHorizontal: 10 }}></View>
      </ScrollView>
    </View>
  );
};
export default CategoriesList;
