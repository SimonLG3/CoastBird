import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import Colours from './src/utilities/Colour';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AccountDeleted({ navigation }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/wallpaper1.png')}
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.Text}>Account Deleted Successfully</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.buttonText}>Login page</Text>
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
  Text: {
    fontSize: 34,
    fontWeight: '500',
    alignSelf: 'center',
    color: Colours.LIGHT_CREAM,
    marginBottom: 80,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colours.LIGHT_CREAM,
    height: '9.5%',
    width: '70%',
    borderRadius: 20,
  },
  buttonText: {
    color: Colours.NAVY_BLUE,
    fontSize: 23,
    fontWeight: '600',
  },
});
