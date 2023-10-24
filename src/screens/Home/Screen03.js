import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Navegacion from '../../components/Navegacion'
import { useNavigation } from '@react-navigation/native';

const Screen03 = () => {
  const navigationHook = useNavigation();  
  const handleLogOutClick = () => {   
    navigationHook.navigate('LoginScreen') 
  }
  return (
    <SafeAreaView style={styles.container}>
      <Navegacion></Navegacion>
      <TouchableOpacity style={styles.button} onPress={handleLogOutClick}>
          <Text style={styles.text}>LOGOUT</Text>
        </TouchableOpacity>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    height: '100%',
    bottom: 0,
    width: '80%',
    alignSelf: 'center'
  },
  button: {
    borderWidth: 0.2,
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 10,
    },
    padding: 5,
    backgroundColor: "rgba(0,0,0,1)",
    alignItems: "center",
    width: '60%',
    alignSelf: 'center',
    top: '80%',
  },
  text: {
    color: "#FFF",
  },
});


export default Screen03