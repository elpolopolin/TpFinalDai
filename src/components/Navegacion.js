import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Boton from "./Boton";
import { useNavigation } from '@react-navigation/native';

export default function Navegacion() {
  const navigationHook = useNavigation();  
  const handleScreen01Click = () => {   navigationHook.navigate('Home') }
  const handleScreen02Click = () => {   navigationHook.navigate('Screen02') }
  const handleScreen03Click = () => {   navigationHook.navigate('Screen03') }
  return (
    <>
        <View style={styles.container}>
          <Boton styles={styles.button} accion={handleScreen01Click} text={'Screen01'}>
          </Boton>
          <Boton styles={styles.button} accion={handleScreen02Click} text={'Screen02'}>
          </Boton>
          <Boton styles={styles.button} accion={handleScreen03Click} text={'Screen03'}>
          </Boton>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'row',
    height: '4%',
    bottom: 0,
    gap: 25,
    alignSelf: 'center',
    marginBottom: '10%',
  },
  button: {
    flex: 1,
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: .5,
    padding: 5,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(250,0,0,1)",
    color: 'white',
  },
  text: {
    color: "#FFF",
  },
});
