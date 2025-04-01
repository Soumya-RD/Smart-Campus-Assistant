import { StyleSheet, Text, View, Dimensions, PixelRatio, Alert, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth, height: ScreenHeight } = Dimensions.get('window');
const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const AdminSignIn = () => {
  const [aid, setAid] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [adminData, setAdminData] = useState([]);

  const navigation = useNavigation();
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminCollection = await firestore().collection('admin').get();
        const data = adminCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAdminData(data);
      } catch (error) {
        Alert.alert('Error', 'Error fetching admin data.');
        return;
      }
    };
    fetchData();
  }, []);

  const handleSignIn = async () => {
    if (!aid || !email || !password) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    const isAdminValid = adminData.some(admin => admin.id === aid);
    if (!isAdminValid) {
      Alert.alert('Error', 'Invalid Admin ID.');
      return;
    }

    setLoadingSignIn(true);
    try {
      const adminQuery = await firestore().collection('admin').where('email', '==', email).get();
      if (adminQuery.empty) {
        setLoadingSignIn(false);
        Alert.alert('Access Denied', 'This email is not authorized as admin.');
        return;
      }
      const admin = adminQuery.docs[0].data();
      if (admin.password !== password) {
        setLoadingSignIn(false);
        Alert.alert('Error', 'Incorrect password. Please try again.');
        return;
      }
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('AHome', { aid: aid });
      setEmail('');
      setPassword('');
      setLoadingSignIn(false);
      setAdminData('');
      setAid('');
    } catch (error) {
      setLoadingSignIn(false);
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
    setLoadingReset(true);
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Email send', 'Please check your email.');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('./admin.png')} style={styles.image} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='aid'
          placeholderTextColor='#000'
          value={aid}
          onChangeText={setAid}
          style={styles.input}
        />
        <TextInput
          placeholder='email'
          placeholderTextColor='#000'
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder='password'
          placeholderTextColor='#000'
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.signinButton}>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.signInText}>
            {loadingSignIn ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.orContainer}>
        <View style={styles.line}></View>
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line2}></View>
      </View>
      <View style={styles.buttomContainer}>
        <Text style={styles.text}>Forget password ?</Text>
        <TouchableOpacity onPress={handleResetPassword}>
          <Text style={styles.clickText}>
            {loadingReset ? 'Email sending...' : 'Click here'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminSignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ffffff',
  },
  image: {
    width: '30%',
    height: normalize(95),
    marginHorizontal: normalize(20),
    marginVertical: normalize(25),
  },
  inputContainer: {},
  input: {
    borderBottomWidth: 1,
    marginHorizontal: normalize(20),
    marginVertical: normalize(10),
    color: '#000'
  },
  signinButton: {
    borderWidth: 1,
    marginHorizontal: normalize(90),
    height: normalize(40),
    marginVertical: normalize(25),
    borderRadius: normalize(5),
    backgroundColor: '#023047',
  },
  signInText: {
    textAlign: 'center',
    fontSize: normalize(15),
    paddingVertical: normalize(7),
    fontWeight: 'bold',
    color: '#fff',
  },
  orContainer: {
    flexDirection: 'row',
    width: '80%',
    marginHorizontal: normalize(35),
    marginVertical: normalize(20),
  },
  line: {
    borderBottomWidth: 1,
    width: '40%',
  },
  line2: {
    borderBottomWidth: 1,
    width: '40%',
  },
  orText: {
    width: '20%',
    textAlign: 'center',
    fontSize: normalize(15),
    fontWeight: 'bold',
  },
  buttomContainer: {
    flexDirection: 'row',
    marginVertical: normalize(15),
  },
  text: {
    width: '60%',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: normalize(15),
  },
  clickText: {
    fontWeight: 'bold',
    fontSize: normalize(15),
    color: 'red',
  },
});
