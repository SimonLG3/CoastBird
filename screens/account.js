import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { getAuth } from 'firebase/auth';
import CustomHeader from '../customHeader';
import Colours from './src/utilities/Colour';

export default function Account() {
  const auth = getAuth();
  const userEmail = auth.currentUser?.email;

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Account" />
      <View style={styles.content}>
        <Text style={styles.label}>Signed in as:</Text>
        <Text style={styles.email}>{userEmail}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.LIGHT_CREAM,
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 20,
    color: Colours.NAVY_BLUE,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: Colours.NAVY_BLUE,
    marginTop: 10,
  },
});