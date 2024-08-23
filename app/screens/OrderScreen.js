import React, { useState } from "react";
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

const OrderScreen = (props) => {
  const itemDetails = props.route?.params?.itemDetails;
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handlePlaceOrder = (total) => {
    props.navigation.navigate("AddressSelectionScreen", {
      itemDetails: { ...itemDetails, total, quantity },
    });
  };
  const handleBackPress = () => {
    props.navigation.goBack();
  };

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
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decrementQuantity}>
              <Image
                source={Images.Minus}
                style={{ width: 15, height: 15, tintColor: COLORS.themeColor }}
              />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity}>
              <Image
                source={Images.Plus}
                style={{ width: 15, height: 15, tintColor: COLORS.themeColor }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemName}>{itemDetails?.title}</Text>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => handlePlaceOrder(itemDetails.price * quantity)}
          >
            <Text style={styles.orderButtonText}>
              £ {itemDetails.price * quantity} Place order
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
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.themeColor,
    borderRadius: 30,
    marginHorizontal: 10,
    paddingHorizontal: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  quantity: {
    marginHorizontal: 5,
    color: "#fff",
    fontSize: 18,
  },
  itemName: {
    color: "#fff",
    fontSize: 15,
    marginTop: 5,
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

export default OrderScreen;
