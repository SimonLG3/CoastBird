import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import Colours from './src/utilities/Colour';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AccountCreated({ navigation }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        // Update the background image to use wallpaper1.png
        source={require('../assets/wallpaper1.png')}
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.largeTextFont}>Account Created Successfully</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Main')}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  // containers
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Text fonts, buttons & others
  largeTextFont: {
    fontSize: 36,
    fontWeight: '600',
    color: Colours.LIGHT_CREAM,
    alignSelf: 'center',
    marginBottom: 80
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colours.LIGHT_CREAM,
    height: '8.5%',
    width: '70%',
    marginTop: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: Colours.NAVY_BLUE,
    fontSize: 22,
    fontWeight: '600',
  },
});
