import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, Alert } from 'react-native';
import Colours from './src/utilities/Colour';
import { TextInput, GestureHandlerRootView } from 'react-native-gesture-handler';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Signin({ navigation }) {
    {/* Firebase related code */}
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User has been logged in.', user);
        navigation.navigate('MainScreen');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error', error.message);
      });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
            <Text style={styles.signInTextLarge}>Welcome back</Text>
            <Text style={styles.signInTextSmall}>Sign into your account</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <View style={styles.bottomTextContainer}>
                <Text style={styles.dontHaveAnAccountText}>Don't have an account?</Text>
                <Text style={styles.signUpTextBold}>SIGN UP</Text>
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
    marginBottom: 50,
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
    marginTop: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: Colours.NAVY_BLUE,
    fontSize: 22,
    fontWeight: '700',
  },
  dontHaveAnAccountText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colours.LIGHT_CREAM,
  },
  signUpTextBold: {
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 5,
    color: Colours.LIGHT_CREAM,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colours.LIGHT_CREAM,
    alignSelf: 'center',
    marginVertical: 5,
  },
  icons: {
    alignSelf: 'center',
    marginBottom: 35,
    marginRight: 5
  },
});
