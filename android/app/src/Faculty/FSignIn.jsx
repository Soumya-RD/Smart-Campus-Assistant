import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-gesture-handler';
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
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    setLoading(true);
    try {
      //  Faculty signIn is not properly setup  
      // const teacherDoc = await firestore().collection('faculty').doc(email).get();
      // const passwordDoc = await firestore().collection('faculty').doc(password).get();
      // if (!teacherDoc.exists || !passwordDoc.exists) {
      //   setLoading(false);
      //   Alert.alert('Access Denied', 'This email or password is not authorized as a faculty.');
      //   return;
      // }
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('FHome');
      setEmail('');
      setPassword('');
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

  const resetPassword = async () => {
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
    <KeyboardAwareScrollView style={styles.ScreenView}>
      <Image source={require('./FSignIn.jpg')} style={styles.Image} />
      <View style={styles.TextInputView}>
        <TextInput
          placeholder="Email"
          style={styles.TextInput}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.TextInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.ButtomView}>
        <TouchableOpacity onPress={resetPassword} style={styles.resetPasswordView}>
          <Text style={styles.ButtomText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignIn}
          style={[styles.signInView, loading && { opacity: 0.5 }]}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.ButtomText}>Sign In</Text>}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  ScreenView: {
    flex: 1,
    backgroundColor: '#c0fdfb',
  },
  Image: {
    height: '90%',
    width: '80%',
    marginLeft: normalize(35),
    marginTop: normalize(50),
    borderRadius: normalize(15),
    borderWidth: normalize(2),
    borderColor: '#4f000b'
  },
  TextInputView: {
    alignItems: 'center',
    marginTop: normalize(20),
  },
  TextInput: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '80%',
    height: normalize(40),
    marginTop: normalize(15),
    borderRadius: normalize(10),
    backgroundColor: '#efd6ac',
    borderWidth: normalize(1),
    borderColor:'#6e1423'
    

  },
  ButtomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: normalize(25),
  },
  resetPasswordView: {

    height: normalize(35),
    width: normalize(125),
   
    marginLeft: normalize(50),
    borderRadius: normalize(5),
    backgroundColor: '#9a031e',


  },
  signInView: {
    height: normalize(35),
    width: normalize(120),
    
    marginRight: normalize(50),
    borderRadius: normalize(5),
    backgroundColor: '#283618',

  },
  ButtomText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: normalize(14),
    padding: normalize(5),
    color: '#fff',
  },
});

export default FSignIn;
