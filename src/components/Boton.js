import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Boton({ accion, styles, text }) {
  return (
    <>
      <TouchableOpacity
        style={styles}
        onPress={accion}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#FFF",
  },
});
