import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LoginScreen, HomeScreen, RegistrationScreen, ConfigScreen, MesageScreen } from './src/screens';
import { decode, encode } from 'base-64';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from './firebase-config';


if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  let reloadUser = () => {
    setUser(null);
  }



  // Lógica de auto login
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
      {user ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
              } else if (route.name === 'Config') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} initialParams={{ userData: user, reloadUser: reloadUser }} />
          <Tab.Screen name="Config" component={ConfigScreen} initialParams={{ userData: user, reloadUser: reloadUser }}/>
          <Tab.Screen name="Mesages" component={MesageScreen} initialParams={{ userData: user, reloadUser: reloadUser }}/>
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
