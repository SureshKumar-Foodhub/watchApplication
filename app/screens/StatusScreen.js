import React, { isValidElement, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import Images from "../utils/Images";

let timeout = null;

const StatusScreen = (props) => {
  const itemDetails = props.route?.params?.itemDetails;
  const [currentStatus, setCurrentStatus] = useState("waiting");
  const [orderStatus, setOrderStatus] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [timeoutSec, setTimeoutSec] = useState(5);
  console.log("iten", itemDetails);

  useEffect(() => {
    if (isValidElement(timeout)) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      if (currentStatus === "waiting") {
        if (orderStatus === 0) {
          setOrderStatus(1);
        } else if (orderStatus === 1) {
          setTimeoutSec(10);
          setCurrentStatus("prepared");
        }
      } else if (currentStatus === "prepared") {
        setTimeoutSec(5);
        setCurrentStatus("pickedup");
      } else if (currentStatus === "pickedup") {
        setTimeoutSec(10);
        setCurrentStatus("ontheway");
      } else if (currentStatus === "ontheway") {
        setCurrentStatus("delivered");
      }
    }, timeoutSec * 1000);
  }, [currentStatus, props.navigation, orderStatus, timeoutSec]);

  const handleGotoHome = () => {
    props.navigation.navigate("SplashScreen");
  };

  const handleBackPress = () => {
    clearTimeout(timeout);
    props.navigation.navigate("SplashScreen");
  };

  const handleCallEnd = () => {
    setShowModal(false);
    setCurrentStatus("ontheway");
  };

  const handleCallStart = () => {
    setShowModal(true);
    clearTimeout(timeout);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={handleBackPress} style={styles.header}>
        <View
          style={{
            width: 17,
            height: 17,
            borderRadius: 15,
            backgroundColor: "#eb4d4b",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{height: 15, width: 15, tintColor: 'white'}}
            source={Images.Previous}
          />
        </View>
        <Image
          style={styles.foodhubLogo}
          source={Images.Foodhub_Logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Order Status */}
      {currentStatus === "waiting" && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Order Received</Text>
          <Text
            style={styles.info}
          >{`${itemDetails?.quantity} * ${itemDetails?.title}, $${itemDetails?.total}`}</Text>
          <Text style={styles.statusNow}>NOW</Text>
          <Text style={styles.subText}>
            {orderStatus === 0
              ? `Awaiting restaurant confirmation.`
              : `Order Accepted`}
          </Text>
        </View>
      )}

      {/* Secondary Status */}
      {currentStatus === "prepared" && (
        <View style={styles.nextStatusContainer}>
          <View style={styles.etaContainer}>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              30
            </Text>
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              MIN
            </Text>
          </View>
          <Text style={styles.nextStatusLabel}>NEXT</Text>
          <Text style={styles.nextSubText}>Food is Being Prepared</Text>
          {/* <Text style={styles.etaText}>ETA: 30 mins</Text> */}
        </View>
      )}

      {currentStatus === "pickedup" && (
        <View style={styles.pickedUpContainer}>
          <Text style={styles.pickedUpLabel}>Order Picked Up</Text>
          <Text style={styles.statusNow}>NOW</Text>
          <Text style={styles.pickedUpSubText}>
            Tasty food en route!{" "}
            <Text style={styles.boldText}>Mohammed Khan</Text> has picked up
            your order.
          </Text>
          {/* <Text style={styles.etaText}>ETA: 15 mins</Text> */}
          <View style={styles.etaContainer}>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              15
            </Text>
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              MIN
            </Text>
          </View>
        </View>
      )}

      {currentStatus === "ontheway" && (
        <View>
          <View style={styles.nextStatusContainer}>
            <Text style={styles.nextStatusLabel}>
              {itemDetails?.address?.address}
            </Text>
            <Text style={styles.nextSubText}>Your order is on the way</Text>
            <Text style={styles.etaText}>
              On time, reaching near you in 12 minutes
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleCallStart}
              style={styles.callButton}
            >
              <Image
                style={{ width: 15, height: 15 }}
                resizeMode="contain"
                tintColor={"#fff"}
                source={Images.CallAnswer}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: "#fff",
                  marginLeft: 5,
                  fontWeight: "bold",
                }}
              >
                Call Delivery Boy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {currentStatus === "delivered" && (
        <View>
          <View style={styles.nextStatusContainer}>
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Order Delivered
            </Text>
            <Text style={styles.nextStatusLabel}>
              Your order has been delivered. Bon apetite!
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.nextStatusContainer}
            onPress={handleGotoHome}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              OK, GOT IT
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "#fff", fontSize: 9, marginTop: 5 }}>
            {"Not Delivered?"}
          </Text>
        </View>
      )}
      <Modal visible={showModal}>
        <View style={styles.callModalContainer}>
          <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
            {"+44 7380308571"}
          </Text>
          <Text style={{ color: "#fff", fontSize: 12, marginTop: 5 }}>
            {"Outgoing Call..."}
          </Text>
          <TouchableOpacity
            onPress={handleCallEnd}
            style={styles.callEndButton}
          >
            <Image
              style={styles.callEnd}
              resizeMode="contain"
              source={Images.CallEnd}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  appTitle: {
    color: "#eb4d4b",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 5,
  },
  time: {
    color: "#fff",
    fontSize: 18,
  },
  statusContainer: {
    backgroundColor: "#1C1C1C",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  statusLabel: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  statusNow: {
    color: "#0080FF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: {
    color: "#B0B0B0",
    fontSize: 16,
  },
  nextStatusContainer: {
    backgroundColor: "#1C1C1C",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  nextStatusLabel: {
    color: "#B0B0B0",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  nextSubText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  etaText: {
    color: "#B0B0B0",
    fontSize: 13,
    marginTop: 5,
  },
  pickedUpContainer: {
    backgroundColor: "#1C1C1C",
    padding: 15,
    borderRadius: 10,
  },
  pickedUpLabel: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  pickedUpSubText: {
    color: "#B0B0B0",
    fontSize: 13,
    marginVertical: 5,
  },
  boldText: {
    color: "#fff",
    fontWeight: "bold",
  },
  foodhubLogo: {
    width: 80,
    height: 28,
    marginLeft: 5,
  },
  info: {
    fontSize: 10,
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  etaContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  callButton: {
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: "#a8cc40",
    flexDirection: "row",
    borderRadius: 15,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  callModalContainer: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  callEnd: {
    width: 50,
    height: 50,
  },
  callEndButton: {
    // padding: 8,
    // borderRadius: 10,
    marginTop: 25,
  },
});

export default StatusScreen;
