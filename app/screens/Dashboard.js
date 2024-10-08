import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Images from "../utils/Images";
import { COLORS } from "../utils/Constant";
import CurrentTime from "./CurrentTime";

const DATA = [
  {
    id: "1",
    title: "Pizza",
    image: Images.Pizza,
    backgroundColor: "#a8cc40",
    price: 150,
    store: "Tiger Bite",
    duration: "20 min",
    ratings: "4.5",
  },
  {
    id: "2",
    title: "Past Order",
    image: Images.Sandwich,
    backgroundColor: COLORS.themeColor,
    price: 50,
    store: "Asad's Hot Chicken",
    duration: "25 min",
    ratings: "4.7",
  },
  {
    id: "3",
    title: "Healthy Meals",
    image: Images.Meal,
    backgroundColor: "#eba75b",
    price: 100,
    store: "Asad's Hot Chicken",
    duration: "40 min",
    ratings: "4.9",
  },
  {
    id: "4",
    title: "Burger",
    image: Images.BurgerNew,
    backgroundColor: "#e47d8d",
    price: 120,
    store: "Dixy Chicken",
    duration: "15 min",
    ratings: "4.2",
  },
  {
    id: "5",
    title: "Meat",
    image: Images.Meat,
    backgroundColor: "#67c7d1",
    price: 180,
    store: "Stoke City",
    duration: "10 min",
    ratings: "4.1",
  },
];

const Dashboard = (props) => {
  const handleNavigation = useCallback(
    (item) => {
      props.navigation.navigate("CategoriesList", { itemDetails: item });
    },
    [props.navigation]
  );
  const Item = ({
    title,
    image,
    price,
    store,
    duration,
    ratings,
    backgroundColor,
  }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.item, { backgroundColor }]}
      onPress={() =>
        handleNavigation({
          title,
          image,
          price,
          store,
          duration,
          ratings,
          backgroundColor,
        })
      }
    >
      <Image
        style={{
          position: "absolute",
          top: -20,
          height: 60,
          width: 60,
          marginStart: 5,
        }}
        source={image}
      />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CurrentTime />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>For you</Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            image={item.image}
            price={item.price}
            store={item.store}
            ratings={item.ratings}
            duration={item.duration}
            backgroundColor={item.backgroundColor}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const { width } = Dimensions.get("window");
const itemHeight = width * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    marginStart: 10,
  },
  list: {
    alignItems: "center",
    paddingTop: 20,
  },
  item: {
    width: width * 0.8,
    height: itemHeight,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    paddingRight: 7,
  },
  image: {
    justifyContent: "center",
  },
  imageStyle: {
    borderRadius: 10,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    textAlign: "right",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Dashboard;
