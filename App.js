import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen/RegistrationScreen';
import Screen01 from './src/screens/Home/Screen01';
import Screen02 from './src/screens/Home/Screen02';
import Screen03 from './src/screens/Home/Screen03';
import { decode, encode } from 'base-64';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from './src/firebase/config';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  let reloadUser = () => {
    setUser(null)
  }


  {/*LOGICA DE AUTO LOGIN PADREEE */}
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (authUser) => {
      if (authUser) {
        try {
          const userSnapshot = await getDoc(doc(FIRESTORE_DB, 'users', authUser.uid));
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUser(userData);
          }
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home" component={Screen01} initialParams={{ userData: user, reloadUser: reloadUser }} />
          
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
        <Stack.Screen name="Screen02" component={Screen02}></Stack.Screen>
        <Stack.Screen name="Screen03" component={Screen03}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}