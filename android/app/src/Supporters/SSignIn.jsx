import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, PixelRatio } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const SSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [staffId, setStaffId] = useState('');
  const [loading, setLoading] = useState(false);
  const [staffData, setStaffData] = useState([]);

  const navigation = useNavigation();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffCollection = await firestore().collection('supstaff').get();
        const data = staffCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStaffData(data);
      } catch (error) {
        Alert.alert('Error', 'Error fetching staff data.');
      }
    };
    fetchData();
  }, []);

  const handleSignIn = async () => {
    if (!email || !password || !staffId) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    const isValid = staffData.some(support => support.id === staffId);
    if (!isValid) {
      Alert.alert('Error', 'Invalid Staff ID.');
      return;
    }

    setLoading(true);

    try {
      const staffQuery = await firestore()
        .collection('supstaff')
        .where('email', '==', email)
        .get();

      if (staffQuery.empty) {
        setLoading(false);
        Alert.alert('Access Denied', 'This email is not authorized as a staff.');
        return;
      }

      const staffData = staffQuery.docs[0].data();
      if (staffData.password !== password) {
        setLoading(false);
        Alert.alert('Error', 'Incorrect password. Please try again.');
        return;
      }

      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('SHome', { sid: staffId });
      setEmail('');
      setPassword('');
      setStaffId('');
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Incorrect password. Please try again.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleResetPassword = async () => {
    if (!email || !isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Email Sent', 'Please check your email.');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./s.jpg')} style={styles.image} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="staff ID"
          placeholderTextColor="#000"
          value={staffId}
          onChangeText={setStaffId}
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          placeholderTextColor="#000"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="#000"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.signInContainer}>
        <TouchableOpacity onPress={handleSignIn} disabled={loading}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line1} />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.text}>Forgot password?</Text>
        <TouchableOpacity onPress={handleResetPassword}>
          <Text style={styles.clickText}>Click here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SSignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '40%',
    height: '15%',
    marginVertical: normalize(10),
    marginHorizontal: normalize(20),
  },
  inputContainer: {
    marginVertical: normalize(5),
  },
  input: {
    borderBottomWidth: 1,
    marginHorizontal: normalize(20),
    marginVertical: normalize(10),
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(10),
    color: '#000'
  },
  signInContainer: {
    borderWidth: 1,
    marginHorizontal: normalize(70),
    height: normalize(40),
    marginVertical: normalize(20),
    borderRadius: normalize(5),
    backgroundColor: '#023047',
  },
  signInText: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: normalize(5),
    color: '#fff',
  },
  orContainer: {
    flexDirection: 'row',
    marginVertical: normalize(25),
    width: '90%',
    marginHorizontal: normalize(20),
  },
  orText: {
    fontWeight: 'bold',
    fontSize: normalize(15),
    width: '10%',
    textAlign: 'center',
  },
  line: {
    borderBottomWidth: 1,
    width: '45%',
  },
  line1: {
    borderBottomWidth: 1,
    width: '45%',
  },
  bottomContainer: {
    flexDirection: 'row',
    marginVertical: normalize(25),
  },
  text: {
    fontWeight: 'bold',
    width: '50%',
    textAlign: 'right',
    fontSize: normalize(15),
  },
  clickText: {
    fontWeight: 'bold',
    marginHorizontal: normalize(30),
    color: 'red',
    fontSize: normalize(15),
  },
});
