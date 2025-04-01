import React from 'react';
import { View, Button, Alert, Dimensions, PixelRatio, StyleSheet, TouchableOpacity, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


const { width: screenWidth } = Dimensions.get('window');
const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const ASetting = () => {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Welcom');
    } catch (error) {
      console.error('Error signing out: ', error.message);
      Alert.alert('Error', `Failed to sign out: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Account</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>General</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Billing and payments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Manage all history</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Your data in SmartCampus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Try experimental new features</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.heading}>Preferences</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Downloads</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Accessbility</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttomContainer}>
        <Text style={styles.heading}>Help and policy</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Help')}>
          <Text style={styles.text}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TnC')}>
          <Text style={styles.text}>Term and Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Feedback')}>
          <Text style={styles.text}>Send feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
          <Text style={styles.text}>About</Text>
        </TouchableOpacity>
      </View>

      <View >
        <TouchableOpacity style={styles.logout} onPress={logout}>
          <Text style={styles.signoutText}>Signout</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: normalize(20),

  },
  topContainer: {
    backgroundColor: '#fff',
    padding: normalize(15),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: normalize(10),
    marginVertical: normalize(5),
  },
  middleContainer: {
    backgroundColor: '#fff',
    padding: normalize(15),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: normalize(10),
    marginVertical: normalize(5),
  },
  buttomContainer: {
    backgroundColor: '#fff',
    padding: normalize(15),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: normalize(10),
    marginVertical: normalize(5),

  },
  heading: {
    fontWeight: 'bold',
    fontSize: normalize(18),
    marginVertical: normalize(5),
    marginHorizontal: normalize(5),
  },
  button: {

  },
  text: {

    fontWeight: 'black',
    fontSize: normalize(15),
    marginVertical: normalize(5),
    marginHorizontal: normalize(20),
  },
  logout: {
    marginHorizontal: normalize(80),
    marginVertical: normalize(30),
    borderRadius: normalize(5),
    backgroundColor: 'darkred',
    height: normalize(40),
    paddingVertical: normalize(5),
  },
  signoutText: {
    fontWeight: '600',
    fontSize: normalize(15),
    marginVertical: normalize(5),
    marginHorizontal: normalize(20),
    textAlign: 'center',
    color: '#fff'
  }
});

export default ASetting;
