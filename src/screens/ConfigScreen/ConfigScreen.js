
    import { useState, useEffect } from 'react';
    import { Text, View, Button, TextInput, ScrollView } from 'react-native';
    import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebase/config";
    import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
    import { signOut } from 'firebase/auth';
    import { Vibration } from 'react-native';

    export default function ConfigScreen({ navigation, route }) {
    const userData = route.params.userData;
    const reloadUser = route.params.reloadUser;
    const [Telefono, setTelefono] = useState(0);

    useEffect(() => {
        NumeroUser()
          .then((telefonoUser) => {
            setTelefono(telefonoUser);
          })
          .catch((error) => {
            console.error('Error al obtener el número de teléfono:', error);
            
          });
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

      const addNumeroTelefono = async () => {
        if (Telefono.trim() === "") {
          console.error("El número de teléfono no puede estar vacío");
          Vibration.vibrate()
          return;
        }
      
        // Verifica que el número de teléfono cumple con el formato requerido
        const telefonoRegex = /^11\d{8}$/;
        if (!telefonoRegex.test(Telefono)) {
          console.error("El número de teléfono debe comenzar con '11' y tener 8 dígitos adicionales");
          alert("El número de teléfono debe comenzar con '11' y tener 8 dígitos adicionales")
          Vibration.vibrate()
          return;
        }
        // Consulta para verificar si ya existe un número de teléfono para este usuario
        const telefonoQuery = query(collection(FIRESTORE_DB, 'Telefonos'), where('idUser', '==', userData.id));
        const telefonoQuerySnapshot = await getDocs(telefonoQuery);
      
        if (telefonoQuerySnapshot.empty) {
          // No se encontró ningún número de teléfono, así que crea uno nuevo
          try {
            await addDoc(collection(FIRESTORE_DB, 'Telefonos'), {
              NumeroTelefono: Telefono,
              idUser: userData.id,
              name: userData.fullName,
            });
            setTelefono(""); // Limpia el campo de entrada
            console.log("Número de teléfono guardado exitosamente");
          } catch (error) {
            console.error('Error al agregar el documento: ', error);
            Vibration.vibrate()
          }
        } else {
          // Ya existe un número de teléfono para este usuario, actualízalo
          const telefonoId = telefonoQuerySnapshot.docs[0].id; // asumiendo que solo hay un documento
          try {
            await updateDoc(doc(FIRESTORE_DB, 'Telefonos', telefonoId), {
              NumeroTelefono: Telefono,
            });
            setTelefono(""); // Limpia el campo de entrada
            console.log("Número de teléfono actualizado exitosamente");
          } catch (error) {
            Vibration.vibrate()
            console.error('Error al actualizar el número de teléfono: ', error);
          }
        }
        
      };


    const handleLogout = async () => {
        try {
        await signOut(FIREBASE_AUTH);
        reloadUser(); // Actualiza user a null, se recarga y ya está unlogged.
        } catch (error) {
        console.error('Error signing out:', error);
        }
    };

    

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text>Home Screen</Text>
        <Text>User ID: {userData.id}</Text>
        <Text>User Email: {userData.email}</Text>
        <Text>User Full Name: {userData.fullName}</Text>
        <Button title="Logout" onPress={handleLogout} />
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, margin: 10 }}
            placeholder="Número de teléfono"
            value={Telefono}
            onChangeText={text => setTelefono(text)}
        />
        <Button title="Guardar Número de Teléfono" onPress={addNumeroTelefono} />
        </View>
    );
    }