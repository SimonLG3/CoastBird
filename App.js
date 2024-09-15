import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Loggedin from './screens/loggedin';
import SignIn from './screens/signIn';
import SignUp from './screens/signUp';
import AccountCreated from './screens/accountCreated';
import Main from './screens/main';
import Settings from './screens/settings';
import About from './screens/about';
import ForgotPassword from './screens/forgotPassword'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colours from './screens/src/utilities/Colour';
import SignedOut from './screens/signedOut';
import AccountDeleted from './screens/accountDeleted';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab settings
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Main') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Saved Beaches') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colours.LIGHT_CREAM,
        tabBarInactiveTintColor: Colours.LIGHT_CREAM,
        tabBarStyle: {
          height: '7%',
          backgroundColor: Colours.NAVY_BLUE,
        },
      })}
    >
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: { backgroundColor: Colours.NAVY_BLUE },
          headerTintColor: Colours.LIGHT_CREAM,
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
}

// Firebase settings
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Navigation settings
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignedOut" component={SignedOut} options={{ headerShown: false }} />            
            <Stack.Screen name="AccountDeleted" component={AccountDeleted} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
                headerStyle: { backgroundColor: Colours.NAVY_BLUE },
                headerTintColor: Colours.LIGHT_CREAM,
                headerTitleAlign: 'left',
                title: 'Back',
              }} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainScreen" component={MyTabs} options={{ headerShown: false }} />
            <Stack.Screen name="AccountCreated" component={AccountCreated} options={{ headerShown: false }} />
            <Stack.Screen name="Loggedin" component={Loggedin} />
            <Stack.Screen
              name="About"
              component={About}
              options={{
                headerStyle: { backgroundColor: Colours.LIGHT_CREAM },
                headerTintColor: Colours.NAVY_BLUE,
                headerTitleAlign: 'left',
                title: 'Back',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
