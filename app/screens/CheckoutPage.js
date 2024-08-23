import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Images from "../utils/Images";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import InputSpinner from "react-native-input-spinner";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { hostURL } from "../utils/Constant";
const CheckoutPage = (props) => {
  const checkoutItem = props.route?.params?.order;
  let initialDeliveryFee = 2;
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateOpen, setFromDateOpen] = useState(false);
  const [toDate, setToDate] = useState(new Date());
  const [toDateOpen, setToDateOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(checkoutItem?.price);
  const [finalPrice, setFinalPrice] = useState(checkoutItem?.price);
  const [deliveryFee, setDeliveryFee] = useState(2);
  const [days, setDays] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleBackPress = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    var date1 = new Date(fromDate);
    var date2 = new Date(toDate);
    // Calculate the difference in milliseconds
    var diffDays = Math.abs(date2 - date1);
    // Convert milliseconds to days
    var differenceDays = Math.ceil(diffDays / (1000 * 60 * 60 * 24));
    setDays(differenceDays);
    if (differenceDays != 0) {
      setDeliveryFee(differenceDays * initialDeliveryFee);
    } else {
      setDeliveryFee(initialDeliveryFee);
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    setFinalPrice(price + deliveryFee);
  }, [price]);

  const handleCheckOutApi = () => {
    fetch(hostURL + "meal-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: "bala@foodhub.com",
        start_date: moment(fromDate).format("YYYY-MM-DD"),
        end_date: moment(toDate).format("YYYY-MM-DD"),
        total_amount: finalPrice,
        total_items: quantity,
        amount_paid: finalPrice,
        payment_type: "COD",
        time_slot_id: selectedIndex,
        meal_subscription_items: [
          {
            item_id: checkoutItem?.id,
            price: finalPrice,
            quantity: quantity,
          },
        ],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        props.navigation.navigate("Dashboard");
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={{
          uri: checkoutItem?.image,
        }}
        style={{
          height: 220,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <TouchableOpacity onPress={handleBackPress}>
            <Image
              tintColor={"#ffffff"}
              style={{ height: 40, width: 40 }}
              source={Images.Previous}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#ffffff",
              alignItems: "center",
              alignSelf: "center",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Image
              tintColor={"#e22e2d"}
              style={{ height: 20, width: 20 }}
              source={Images.Favourite}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#000000", fontSize: 18, fontWeight: "bold" }}>
          {checkoutItem?.name}
        </Text>
        <Text style={{ color: "#e22e2d", fontSize: 18, fontWeight: "bold" }}>
          £ {checkoutItem?.price}
        </Text>
      </View>
      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              marginTop: 20,
              color: "#000000",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Description
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: "#000000",
              fontSize: 16,
              fontStyle: "italic",
            }}
          >
            {checkoutItem?.description}
          </Text>

          <View style={{ marginTop: 20 }}>
            <SegmentedControl
              tabStyle={{ height: 100 }}
              values={["Lunch", "Dinner"]}
              selectedIndex={selectedIndex}
              onChange={(event) => {
                setSelectedIndex(event?.nativeEvent?.selectedSegmentIndex);
              }}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <Text
              style={{ color: "#000000", fontWeight: "bold", fontSize: 18 }}
            >
              Select Date
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 15,
              paddingHorizontal: 10,
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => setFromDateOpen(true)}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text style={{ color: "#000000", fontSize: 16 }}>
                  Starts From
                </Text>
                <Image
                  tintColor={"#e22e2d"}
                  style={{ height: 15, width: 15, marginStart: 10 }}
                  source={Images.Edit}
                />
              </TouchableOpacity>
              <Text style={{ color: "#000000", marginTop: 10, fontSize: 16 }}>
                {moment(fromDate).format("YYYY-MM-DD")}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setToDateOpen(true)}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text style={{ color: "#000000", fontSize: 16 }}>To End</Text>
                <Image
                  tintColor={"#e22e2d"}
                  style={{ height: 15, width: 15, marginStart: 10 }}
                  source={Images.Edit}
                />
              </TouchableOpacity>
              <Text style={{ color: "#000000", marginTop: 10, fontSize: 16 }}>
                {moment(toDate).format("YYYY-MM-DD")}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <Text
              style={{ color: "#000000", fontWeight: "bold", fontSize: 18 }}
            >
              Quantity
            </Text>
            <InputSpinner
              style={{ width: 170 }}
              max={10}
              min={0}
              step={1}
              colorLeft={"#e22e2d"}
              colorRight={"#e22e2d"}
              value={quantity}
              onChange={(num) => {
                setQuantity(num);
                setPrice(num * checkoutItem?.price);
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#000000", fontSize: 16 }}>Subtotal</Text>
            <Text tyle={{ color: "#000000", fontSize: 16 }}>
              {price ? price : 0}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#000000", fontSize: 16 }}>
              Delivery Fee ({days}) Days
            </Text>
            <Text tyle={{ color: "#000000", fontSize: 16 }}>
              {quantity != 0 ? deliveryFee : 0}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#000000", fontSize: 16 }}>Total</Text>
            <Text tyle={{ color: "#000000", fontSize: 16 }}>
              {quantity != 0 ? finalPrice : 0}
            </Text>
          </View>

          <DatePicker
            modal
            open={fromDateOpen}
            date={fromDate}
            onConfirm={(date) => {
              setFromDateOpen(false);
              setFromDate(date);
            }}
            onCancel={() => {
              setFromDateOpen(false);
            }}
          />
          <DatePicker
            modal
            open={toDateOpen}
            date={toDate}
            onConfirm={(date) => {
              setToDateOpen(false);
              setToDate(date);
            }}
            onCancel={() => {
              setToDateOpen(false);
            }}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => handleCheckOutApi()}
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
          backgroundColor: quantity == 0 ? "lightgrey" : "#e22e2d",
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold" }}>
          Checkout £{quantity != 0 ? finalPrice : 0}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default CheckoutPage;
