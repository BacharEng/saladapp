import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SqlLiteComponent = () => {
  return (
    <View style={styles.container}>
      <Text>SQlite</Text>
    </View>
  );
};

export default SqlLiteComponent;

const styles = StyleSheet.create({
  lottieStyle: {
    width: 300,
    height: 400,
  },
  container: {
    flex: 1,
    backgroundColor: "#00cc99",
    alignItems: "center",
    justifyContent: "center",
  },
});
