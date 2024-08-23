import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import Images from "../utils/Images";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../utils/Constant";

let successInterval = null;

const PaymentScreen = (props) => {
  const itemDetails = props.route?.params?.itemDetails;
  const [paymentStatus, setPaymentStatus] = useState("initial");

  const handleBackPress = () => {
    props.navigation.goBack();
  };

  const handlePayPress = () => {
    let successTime = 0;
    setPaymentStatus("processing");
    successInterval = setInterval(() => {
      setPaymentStatus("success");
      if (successTime >= 1) {
        clearInterval(successInterval);
        props.navigation.navigate("StatusScreen", {itemDetails});
      } else {
        successTime = successTime + 1;
      }
    }, 1000);
  };
  return (
    <View style={styles.container}>
      {paymentStatus === "initial" && (
        <View style={{ flex: 1 }}>
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
            <Text style={styles.headerText}>Pay Using</Text>
          </TouchableOpacity>
          <LinearGradient
            colors={["#363636", "#1C1C1C", "#0f0f0f"]}
            style={{
              justifyContent: "center",
              borderRadius: 15,
              marginTop: 10,
              marginHorizontal: 15,
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Image
              source={Images.Foodhub_Logo}
              style={{ width: 90, height: 16, tintColor: COLORS.themeColor }}
            />
            <Text style={styles.creditsAvailable}>Credits available</Text>
            <Text style={styles.creditAmount}>$ 1550</Text>
          </LinearGradient>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.useCreditsText}>Use Credits</Text>
            <TouchableOpacity onPress={handlePayPress} style={styles.payButton}>
              <Text style={styles.payText}>Pay ${itemDetails?.total}</Text>
              <Image
                style={{
                  height: 12,
                  width: 12,
                  tintColor: "#ffffff",
                  transform: [{ rotate: "180deg" }],
                }}
                source={Images.BackIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {paymentStatus === "processing" && (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={styles.processingText}>Processing payment</Text>
        </View>
      )}

      {paymentStatus === "success" && (
        <View style={styles.successContainer}>
          {/* <View style={styles.successIcon}>
            <Text style={styles.checkMark}>✔</Text>
          </View> */}
          <Image
            source={Images.OrderSuccessful}
            style={{ width: 60, height: 60 }}
          />
          <Text style={styles.successText}>Payment Sucessful</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  headerText: {
    color: "#ffffff",
    fontSize: 16,
    marginStart: 5,
  },
  paymentAppName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  creditsAvailable: {
    color: "#ccc",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 7,
  },
  creditAmount: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 3,
  },
  useCreditsButton: {
    backgroundColor: "#222",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  useCreditsText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 14,
  },
  payButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.themeColor,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  payText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  processingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  processingText: {
    color: "#fff",
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
  },
  successContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  successIcon: {
    backgroundColor: "#0f0",
    borderRadius: 50,
    padding: 20,
  },
  checkMark: {
    color: "#000",
    fontSize: 40,
    fontWeight: "bold",
  },
  successText: {
    color: "#fff",
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
  },
});

export default PaymentScreen;
