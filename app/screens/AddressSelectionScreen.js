import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import Images from "../utils/Images";
import { COLORS } from "../utils/Constant";
import CurrentTime from "./CurrentTime";

const AddressSelectionScreen = (props) => {
  const itemDetails = props.route?.params?.itemDetails;
  const [selectedAddress, setSelectedAddress] = useState("Home");

  const addresses = [
    {
      label: "Home",
      address: "ROTATE 1 Bath Place, Rivington St, London EC2A 3DA, UK",
    },
    {
      label: "Work",
      address: "120 Goldhawk Rd, London W12 8HD, UK",
    },
  ];

  const selectAddress = (label) => setSelectedAddress(label);

  const handleNextPress = () => {
    const address = addresses.find((item) => item.label === selectedAddress);
    props.navigation.navigate("PaymentScreen", {
      itemDetails: { ...itemDetails, address: address },
    });
  };

  const handleBackPress = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CurrentTime />
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 5,
        }}
        onPress={handleBackPress}
      >
        <Image
          style={{ height: 15, width: 15, tintColor: COLORS.themeColor }}
          source={Images.Previous}
        />
        <Text style={styles.header}>Address</Text>
      </TouchableOpacity>

      <ScrollView>
        {addresses.map(({ label, address }) => (
          <TouchableOpacity
            activeOpacity={1}
            key={label}
            style={styles.addressContainer}
            onPress={() => selectAddress(label)}
          >
            <View style={styles.addressInfo}>
              <Text style={styles.addressLabel}>{label}</Text>
              <Text style={styles.addressText}>{address}</Text>
            </View>
            <View
              style={[
                styles.circle,
                {
                  backgroundColor:
                    selectedAddress === label ? COLORS.greenColor : "grey",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              {selectedAddress === label && (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 10,
                    backgroundColor: "white",
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={handleNextPress} style={styles.nextButton}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
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
    marginStart: 5,
  },
  time: {
    color: "#fff",
    fontSize: 18,
    position: "absolute",
    right: 10,
    top: 10,
  },
  addressContainer: {
    backgroundColor: "#363636",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  addressInfo: {
    flex: 1,
  },
  addressLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  addressText: {
    color: "#B0B0B0",
    marginTop: 5,
    fontSize: 14,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#333",
  },
  nextButton: {
    backgroundColor: COLORS.themeColor,
    borderRadius: 20,
    padding: 7,
    margin: 10,
  },
  nextText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    //fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 5,
  },
});

export default AddressSelectionScreen;
