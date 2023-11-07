import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Linking } from 'react-native';
import { Button } from 'react-native-web';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function HomeScreen({ route }) {
  const userData = route.params.userData;

  useEffect(() => {
    let telefonoUserr = 0;
    NumeroUser()
          .then((telefonoUser) => {
            telefonoUserr = telefonoUser;
          })
          .catch((error) => {
            console.error('Error al obtener el número de teléfono:', error);
            
          });
    const subscribeToAccelerometer = async () => {
      Accelerometer.setUpdateInterval(100);
      const shakeThreshold = 10; 

      Accelerometer.addListener((data) => {
        const accelerationMagnitude = Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z);

        if (accelerationMagnitude > shakeThreshold) {
          llamarNumero(telefonoUserr);
        }
      });
    };
    subscribeToAccelerometer();

    return () => {
      Accelerometer.removeAllListeners();
    };
  }, []);

  const NumeroUser = async () => {
    const telefonoQuery = query(collection(FIRESTORE_DB, 'Telefonos'), where('idUser', '==', userData.id));
    const telefonoQuerySnapshot = await getDocs(telefonoQuery);
    if (telefonoQuerySnapshot.empty) {
      return ''; 
    } else {
      const telefono = telefonoQuerySnapshot.docs[0].data().NumeroTelefono;
      return telefono;
    }
  };

  const llamarNumero = (numero) => {
    Linking.openURL(`tel:${numero}`);
    console.log("llamando" + numero)
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text>Home screen</Text>
      <Button title="llamar" onPress={() => llamarNumero("1154945700")} />
    </View>
  );
}