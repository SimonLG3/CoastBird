import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import Colours from './src/utilities/Colour';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function About() {
  return (
    <ImageBackground
      source={require('../assets/wallpaper1.png')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Ionicons name="information-circle-outline" size={78} color={Colours.LIGHT_CREAM} style={styles.icon} />
          <Text style={styles.description}>
            This application is in its early stages and new features will be added over time
            to further improve the functionality and user experience.
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 40,
  },
  description: {
    fontSize: 24,
    color: Colours.LIGHT_CREAM,
    textAlign: 'center',
    marginBottom: 130,
  },
});
