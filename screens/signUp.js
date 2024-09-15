import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, Alert } from 'react-native';
import Colours from './src/utilities/Colour';
import { TextInput, GestureHandlerRootView } from 'react-native-gesture-handler';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignUp({ navigation }) {
  {/* Firebase related code */}
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User account created & signed in', user);
        navigation.navigate('AccountCreated');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error', error.message);
      });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  {/* User Interface */}
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/wallpaper1.png')}
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.signInTextLarge}>Welcome</Text>
            <Text style={styles.signInTextSmall}>Create an account</Text>
            <TextInput
              style={styles.userInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.userInput, styles.passwordInput]}
                placeholder="Password"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.visibilityToggle}
                onPress={togglePasswordVisibility}
              >
                <Ionicons style={styles.icons}
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  color={Colours.NAVY_BLUE}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.userInput, styles.passwordInput]}
                placeholder="Confirm Password"
                secureTextEntry={!isConfirmPasswordVisible}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={styles.visibilityToggle}
                onPress={toggleConfirmPasswordVisibility}
              >
                <Ionicons style={styles.icons}
                  name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  color={Colours.NAVY_BLUE}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Create account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <View style={styles.bottomTextContainer}>
                <Text style={styles.alreadyHaveAnAccountText}>Already have an account?</Text>
                <Text style={styles.signInTextFontBold}>SIGN IN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </GestureHandlerRootView>
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
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 40,
  },
  signInTextLarge: {
    fontSize: 42,
    fontWeight: '800',
    alignSelf: 'flex-start',
    color: Colours.LIGHT_CREAM,
    marginLeft: 34,
  },
  signInTextSmall: {
    fontSize: 24,
    fontWeight: '400',
    alignSelf: 'flex-start',
    color: Colours.LIGHT_CREAM,
    marginLeft: 36,
    marginBottom: 45,
  },
  userInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: 325,
    alignSelf: 'center',
    alignItems: 'flex-start',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: Colours.LIGHT_CREAM,
  },
  passwordWrapper: {
    width: 325,
    position: 'relative',
  },
  visibilityToggle: {
    position: 'absolute',
    right: 10,
    top: 20,
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: Colours.LIGHT_CREAM,
    height: '8%',
    width: '65%',
    marginTop: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: Colours.NAVY_BLUE,
    fontSize: 22,
    fontWeight: '700',
  },
  alreadyHaveAnAccountText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colours.LIGHT_CREAM,
  },
  signInTextFontBold: {
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 5,
    color: Colours.LIGHT_CREAM,
  },
  icons: {
    alignSelf: 'center',
    marginBottom: 35,
    marginRight: 5
  },
});
