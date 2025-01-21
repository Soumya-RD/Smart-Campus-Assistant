import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, TextInput, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, PixelRatio } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const FSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [loading, setLoading] = useState(false);
  // New Code
  const [facultyData, setFacultyData] = useState([]);
  // New code

  const navigation = useNavigation();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // New code
  useEffect(() => {
    const fetchData = async () => {
      try {
        const facultyCollection = await firestore().collection('faculty').get();
        const data = facultyCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFacultyData(data);
        return;

      } catch (error) {
        Alert.alert('Error', 'Error fetching faculty data.');
        return;
      }
    };
    fetchData();
  }, []);
  // new Code

  const handleSignIn = async () => {
    if (!email || !password || !teacherId) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    setLoading(true);
    try {

      const teacherQuery = await firestore()
        .collection('faculty')
        .where('email', '==', email)
        .get();


      if (teacherQuery.empty) {
        setLoading(false);
        Alert.alert('Access Denied', 'This email is not authorized as a faculty.');
        return;
      }


      const teacherData = teacherQuery.docs[0].data();
      if (teacherData.password !== password) {
        setLoading(false);
        Alert.alert('Error', 'Incorrect password. Please try again.');
        return;
      }


      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('FHome', { tid: teacherId });
      // setEmail('');
      // setPassword('');
      // setTeacherId('');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Incorrect password. Please try again.');
      } else {
        Alert.alert('Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email || !isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Email Sent', 'Please check your email.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.Container}>
      <Image source={require('./FSignIn.jpg')} style={styles.ImageContainer} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="teacher id"
          style={styles.input}
          placeholderTextColor='#000'
          value={teacherId}
          onChangeText={setTeacherId}
        />
        <TextInput
          placeholder="email"
          style={styles.input}
          placeholderTextColor='#000'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          placeholderTextColor='#000'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.ButtomContainer}>
        <TouchableOpacity onPress={handleResetPassword}
          style={styles.resetPasswordButton}>
          <Text style={styles.ButtonText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignIn}
          style={styles.signInButton}
        >
          <Text style={styles.ButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({

  Container: {
    flex: 1,

  },
  ImageContainer: {
    width: '30%',
    height: normalize(100),
    borderRadius: normalize(5),
    marginHorizontal: normalize(20),
    marginVertical: normalize(15),
  },
  inputContainer: {
    alignItems: 'center',
    marginVertical: normalize(20),
  },
  input: {
    borderBottomWidth: 1,
    width: '90%',
    fontWeight: 'bold',
    marginVertical: normalize(10),

  },
  ButtomContainer: {
    flexDirection: 'row',
    marginVertical: normalize(15),

  },
  resetPasswordButton: {
    width: '40%',
    height: normalize(40),
    borderRadius: normalize(5),
    backgroundColor: '#9d0208',
    marginHorizontal: normalize(25),
    borderWidth: 1
  },
  signInButton: {
    width: '40%',
    height: normalize(40),
    borderRadius: normalize(5),
    backgroundColor: '#073b4c',
    borderWidth: 1
  },
  ButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: normalize(14),

    color: '#fff',
    paddingVertical: normalize(7),


  },

});

export default FSignIn;
