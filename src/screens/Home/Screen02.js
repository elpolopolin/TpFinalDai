import { SafeAreaView, Text, StyleSheet, Button, Alert } from 'react-native'
import React from 'react'
import Navegacion from '../../components/Navegacion'

const Screen02 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navegacion></Navegacion>
      <Button onPress={() => resetData()} title="Eiminar AsyncStorage"> </Button>
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
});

export default Screen02