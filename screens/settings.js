import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, ImageBackground, Modal, TextInput } from 'react-native';
import { getAuth, signOut, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colours from './src/utilities/Colour';

const wallpaper2 = require('../assets/wallpaper2.png');

const Divider = () => <View style={styles.divider} />;

export default function Settings({ navigation }) {
  const [userEmail, setUserEmail] = useState('');  // Displays the email of the user that they are logged in with.
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  const handleSignOut = () => {
    Alert.alert(
      'Confirm Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          onPress: () => {
            signOut(auth)
              .then(() => {
                console.log('User has signed out successfully');
                navigation.navigate('SignedOut'); 
              })
              .catch((error) => {
                console.log(error);
                Alert.alert('Error', error.message);
              });
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(user.email, password);

      try {
        await reauthenticateWithCredential(user, credential);

        await deleteUser(user);
        console.log('Account has been deleted successfully');
        navigation.navigate('AccountDeleted'); 
      } catch (error) {
        console.log(error);
        Alert.alert('Error', error.message);
      } finally {
        setModalVisible(false);
      }
    }
  };

  const handleAboutPress = () => {
    navigation.navigate('About');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={wallpaper2} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="person-circle" size={72} color={Colours.NAVY_BLUE} />
            <Text style={styles.userEmailText}>{userEmail}</Text>
          </View>

          <View style={styles.settingsView}>
            <Divider />

            {/* Information Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="information-circle" size={24} color={Colours.NAVY_BLUE} />
                <Text style={styles.sectionTitle}>Information</Text>
              </View>
              <Divider />

              <TouchableOpacity onPress={handleAboutPress}>
                <Text style={styles.informationText}>About this application</Text>
              </TouchableOpacity>
            </View>

            {/* Account Management Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="person" size={24} color={Colours.NAVY_BLUE} />
                <Text style={styles.sectionTitle}>Account</Text>
              </View>

              <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                <Text style={styles.signOutButtonText}>Sign Out</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.deleteAccountButton}>
                <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Modal for Password Input */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter password to delete account</Text>
          <Text style={styles.modalTextSmall}>This action can not be undone.</Text>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.modalButtonRed}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.textStyle}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButtonBlue}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.LIGHT_CREAM,
  },
  scrollViewContent: {
    padding: 24,
    flexGrow: 1, // Future-proofs the content for when more options are added to the settings.
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Subject to change as the settings page gets more options.
  },
  settingsView: {
    flex: 1,
  },
  userEmailText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colours.NAVY_BLUE,
    marginTop: 6,
  },
  section: {
    marginTop: 24,
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colours.NAVY_BLUE,
    marginLeft: 10, 
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  signOutButton: {
    backgroundColor: Colours.NAVY_BLUE,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 24,
    alignSelf: 'center',
  },
  signOutButtonText: {
    color: Colours.LIGHT_CREAM,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteAccountButton: {
    backgroundColor: Colours.BLUE,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  deleteAccountButtonText: {
    color: Colours.LIGHT_CREAM,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  informationText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 65,
  },
  divider: {
    height: 1,
    backgroundColor: Colours.BLUE,
    marginVertical: 5,
  },
  // Modal styles
  modalView: {
    margin: 20,
    backgroundColor: Colours.LIGHT_CREAM,
    borderRadius: 25,
    padding: 50,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 20,
    fontWeight:'400'
  },
  modalTextSmall: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 14,
    fontWeight:'700'
  },
  passwordInput: {
    width: 250,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButtonRed: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  modalButtonBlue: {
    backgroundColor: Colours.BLUE,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
