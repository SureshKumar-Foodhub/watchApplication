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
        color: '#fff',
        fontSize: 13,
    },
})

export default CurrentTime;
