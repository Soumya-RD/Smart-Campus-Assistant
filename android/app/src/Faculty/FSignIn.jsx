import { Alert, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInput } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth';
import { Dimensions, PixelRatio } from 'react-native';
import { useNavigation } from '@react-navigation/native';


// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));



const FSignIn = ({ Navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Navigation = useNavigation();


  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Signed in successfully. ');
      Navigation.navigate('FHome');
      setEmail('');
      setPassword('');
    }
    catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    }
  }


  const resetPassword = async () => {
    if (email) {
      try {
        await auth().sendPasswordResetEmail(email);
        Alert.alert('Email send', 'Please check your email.');
      }
      catch (error) {
        Alert.alert('Error', 'Unable to send reset email .Try again.');
      }
    }
    else {
      Alert.alert('Error', 'Please enter your email first.');
    }
  }
  return (
    <KeyboardAwareScrollView style={styles.ScreenView}>
      <Image source={require('./FSignIn.jpg')} style={styles.Image} />
      <View style={styles.TextInputView}>
        {/* Faculty Email  */}
        <TextInput placeholder='Email'
          style={styles.TextInput}
          value={email}
          onChangeText={setEmail}
        />
        {/* Faculty password */}
        <TextInput placeholder='Password'
          style={styles.TextInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>


      <View style={styles.ButtomView}>

        {/* Reset Password */}
        <TouchableOpacity onPress={resetPassword} style={styles.resetPasswordView}>
          <Text style={styles.ButtomText}> Reset Password</Text>
        </TouchableOpacity>

        {/* Sign In */}
        <TouchableOpacity onPress={handleSignIn} style={styles.signInView}>
          <Text style={styles.ButtomText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default FSignIn

const styles = StyleSheet.create({
  ScreenView: {
    flex: 1,
    backgroundColor: '#a2d2ff'
  },
  Image: {
    height: '90%',
    width: '80%',
    marginLeft: normalize(35),
    marginTop: normalize(50),
    borderRadius: normalize(15),
    borderWidth: 3,
    borderColor: '#5f0f40',

  },
  TextInputView: {
    alignItems: 'center',
    marginTop: normalize(20)
  },
  TextInput: {
    borderWidth: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '80%',
    height: normalize(40),
    marginTop: normalize(15),
    borderRadius: normalize(10),
    backgroundColor: '#fdfcdc'

  },
  ButtomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: normalize(25),

  },
  resetPasswordView: {
    borderWidth: 1,
    height: normalize(35),
    width: normalize(125),
    marginLeft: normalize(50),
    borderRadius: normalize(5),
    backgroundColor: '#9a031e',
    borderColor: '#390099'
  },
  signInView: {
    borderWidth: 1,
    height: normalize(35),
    width: normalize(120),
    marginRight: normalize(50),
    borderRadius: normalize(5),
    backgroundColor: '#1d3557',
    borderColor: '#ffb703'
  },
  ButtomText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: normalize(14),
    padding: normalize(5),
    color: '#fff'
  }


})