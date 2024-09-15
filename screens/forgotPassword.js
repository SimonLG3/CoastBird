import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ImageBackground } from 'react-native';
import Colours from './src/utilities/Colour';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    if (email === '') {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Password Reset', 'A password reset link has been sent to your email.');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error', error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/wallpaper1.png')}
        style={styles.background}
      >
        <View style={styles.contentContainer}>
          <Ionicons 
            name="lock-closed-outline" 
            size={105} 
            color={Colours.LIGHT_CREAM} 
            style={styles.icon}
          />
          <Text style={styles.instructionText}>
            Enter your email address below and you'll be sent a link to reset your password.
          </Text>
          <TextInput
            style={styles.userInput}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 30,
  },
  instructionText: {
    fontSize: 18,
    color: Colours.LIGHT_CREAM,
    textAlign: 'center',
    marginBottom: 30,
  },
  userInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: Colours.LIGHT_CREAM,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: Colours.LIGHT_CREAM,
    height: '10%',
    width: '60%',
    marginTop: 18,
    marginBottom: 60,
    borderRadius: 20,
  },
  buttonText: {
    color: Colours.NAVY_BLUE,
    fontSize: 18,
    fontWeight: '700',
  },
});
