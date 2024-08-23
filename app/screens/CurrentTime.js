import moment from "moment";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

const CurrentTime = () => {
  return (
    <View>
      <Text style={styles.timeText}>{moment(new Date()).format("HH:mm")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeText: {
    textAlign: "right",
    marginEnd: 7,
    color: "#fff",
    fontSize: 10,
  },
});

export default CurrentTime;
