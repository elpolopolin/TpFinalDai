import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Alert, Button } from 'react-native';
import Navegacion from '../../components/Navegacion';
import Boton from '../../components/Boton';

const Screen01 = () => {
  var mail; var contra;

  async function logear() {
    
    if (mail == null) {
      Alert.alert('AsyncStorage Vacio')
    } else {
      Alert.alert('Mail: ' + mail + ' // Contra: ' + contra)
    }
  }

  useEffect(() => {

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Navegacion></Navegacion>
      <Button onPress={() => logear()} title="Ver AsyncStorage"> </Button>
    </SafeAreaView>
  );
};

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
  tabla: {
    width: '100%'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
    textAlign: 'center',
    fontSize: 10,
  },
});

export default Screen01;
