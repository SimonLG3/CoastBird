import * as React from 'react';
import { StyleSheet, Text, View,} from 'react-native';



export default function Loggedin() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You have logged in successfully.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  wrapper: {
    paddingTop: 5,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  button: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#ff7f50',
    marginBottom: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 25
  },
});