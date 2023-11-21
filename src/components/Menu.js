import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import BotonReutilizable from "./BotonReutilizable";

export default function Menu({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.container2}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Configuracion")}>
          <Text style={{ color: "white", fontSize: 13 }}>Config</Text>
        </Pressable>
      </View>

      <View style={styles.container2}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("EmergenciaScreen")} >
          <Text style={{ color: "white", fontSize: 13 }}>Emergencia</Text>
        </Pressable>


      </View>


      <View style={styles.container2}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("CambioDeImagenDeFondo")}>
          <Text style={{ color: "white", fontSize: 13 }}>Cambio Fondo</Text>
        </Pressable>
      </View>

      <View style={styles.container2}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("AcercaDe")}>
          <Text style={{ color: "white", fontSize: 13 }}>Acerca De</Text>
        </Pressable>
      </View>

      <View style={styles.container2}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("MultimediaScreen")}>
          <Text style={{ color: "white", fontSize: 13 }}>Multimedia</Text>
        </Pressable>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 65
  },
  container2: {
    width: "20%",
    borderWidth: 1,

  },
  button: {
    backgroundColor: "purple",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});