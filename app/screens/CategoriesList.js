import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Images from "../utils/Images";
import { COLORS } from "../utils/Constant";

const CategoriesList = (props) => {
  const itemDetails = props.route?.params?.itemDetails;

  const handleBackPress = () => {
    props.navigation.goBack();
  };
  const handleNavigation = useCallback(
    (item) => {
      props.navigation.navigate("OrderScreen", { itemDetails: itemDetails });
    },
    [props.navigation]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          marginHorizontal: 5,
        }}
        onPress={handleBackPress}
      >
        <Image
          style={{ height: 15, width: 15, tintColor: COLORS.themeColor }}
          source={Images.Previous}
        />
        <Text style={styles.header}>For you</Text>
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.card}>
          {itemDetails?.image != null && itemDetails?.image != undefined ? (
            <Image source={itemDetails?.image} style={styles.image} />
          ) : null}

          <View
            style={{
              position: "absolute",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: 75,
            }}
          >
            <Text style={styles.itemName}>{itemDetails?.store}</Text>
            <Text style={{ marginHorizontal: 1, color: "#fff" }}>|</Text>
            <Text style={styles.itemName}>{itemDetails?.duration}</Text>
            <Text style={{ marginHorizontal: 1, color: "#fff" }}>|</Text>
            <Text style={styles.itemName}>{itemDetails?.ratings}</Text>
            <Image source={Images.Star} style={{ height: 10, width: 10 }} />
          </View>

          <Text
            style={{
              color: "#ffffff",
              fontWeight: "bold",
              textAlign: "center",
              top: -5,
            }}
          >
            {itemDetails?.title}
          </Text>
          <Text
            style={{
              color: "#ffffff",
              fontWeight: "bold",
              textAlign: "center",
              top: -5,
            }}
          >
            £ {itemDetails?.price}
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={handleNavigation}>
            <Text
              style={{
                color: COLORS.themeColor,
                fontSize: 12,
                textAlign: "center",
                top: -5,
                fontWeight: "500",
              }}
            >
              Click here to proceed...
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 5,
  },
  time: {
    color: "#fff",
    fontSize: 18,
    position: "absolute",
    right: 10,
    top: 10,
  },
  card: {
    backgroundColor: "#1C1C1C",
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 10,
    alignItems: "center",
  },
  image: {
    top: -25,
    width: 90,
    height: 100,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    top: -50,
    left: 20,
    backgroundColor: COLORS.themeColor,
    borderRadius: 3,
    marginHorizontal: 10,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    color: "#fff",
    fontSize: 18,
  },
  itemName: {
    color: "#959ca6",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  orderButton: {
    backgroundColor: COLORS.themeColor,
    borderRadius: 10,
    padding: 10,
    width: width * 0.8,
    alignItems: "center",
    marginVertical: 10,
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CategoriesList;
