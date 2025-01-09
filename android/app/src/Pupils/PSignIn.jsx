import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert, Dimensions, PixelRatio } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));
const PSignIn = () => {
  const [registation, setRegistation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Navigation = useNavigation();

  // Forget Password Functionality
  const forgetPasswordFields = async () => {
    if (email) {
      try {
        await auth().sendPasswordResetEmail(email);
        Alert.alert('Success', 'Password reset email sent');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Error', 'Please enter your email address');
    }
  };

  const handleSignIn = async () => {
    if (!email || !password || !registation) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', `Welcome back, Registration No:${registation}`);
      Navigation.navigate('PHome');
      setEmail('');
      setRegistation('');
      setPassword('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.Container}>
      {/* Image */}
      <View>
        <Image source={require('./studentSignIn.jpg')} style={styles.Image} />
      </View>

      {/* Registration Number */}
      <View style={styles.TextInputView}>
        <TextInput
          placeholder="Registration Number"
          style={styles.TextInput}
          value={registation}
          onChangeText={setRegistation}
        />
      </View>

      {/* Email */}
      <View style={styles.TextInputView}>
        <TextInput
          placeholder="Email"
          style={styles.TextInput}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password */}
      <View style={styles.TextInputView}>
        <TextInput
          placeholder="Password"
          style={styles.TextInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.ButtomView}>
        {/* Forget Password button */}
        <TouchableOpacity style={styles.forgetPasswordView} onPress={forgetPasswordFields}>
          <Text style={styles.forgetPasswordText}>Forget Password</Text>
        </TouchableOpacity>

        {/* SignIn Button */}
        <TouchableOpacity style={styles.signInView} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up */}
      <View style={{ flexDirection: 'row', marginTop: 35 }}>
        <Text style={styles.signUpSentence}>Create a new account ?</Text>
        <TouchableOpacity style={styles.signUpView} onPress={() => Navigation.navigate('PSignUp')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PSignIn;

const styles = StyleSheet.create({
  Container: {
    flex: normalize(1),
    backgroundColor: '#bfdbf7',
  },
  Image: {
    height: normalize(200),
    width: normalize(250),
    borderWidth: normalize(1),
    borderRadius: normalize(15),
    marginLeft: normalize(60),
    marginTop: normalize(30),
    marginBlock: normalize(30),
    borderColor: '#5f0f40',
  },
  TextInputView: {
    borderWidth: normalize(1),
    marginTop: normalize(10),
    width: '85%',
    borderRadius: normalize(10),
    marginLeft: normalize(30),
    backgroundColor: '#ccd5ae',
    borderColor: '#450920',

  },
  TextInput: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: normalize(10),
    height: normalize(40),

  },
  ButtomView: {
    flexDirection: 'row',
    marginTop: normalize(30),
  },
  forgetPasswordView: {
    borderWidth: normalize(1),
    width: '35%',
    height: normalize(40),
    marginLeft: normalize(45),
    borderRadius: normalize(5),
    backgroundColor: '#d90429',
    borderColor: '#780000',
  },
  forgetPasswordText: {
    fontWeight: 'bold',
    fontSize: normalize(15),
    textAlign: 'center',
    padding: normalize(5),
    color: '#fff',
  },
  signInView: {
    borderWidth: normalize(1),
    width: '40%',
    height: normalize(40),
    marginLeft: normalize(15),
    borderRadius: normalize(5),
    backgroundColor: '#132a13',
    borderColor: '#609947',
  },
  signInText: {
    fontWeight: 'bold',
    fontSize: normalize(15),
    textAlign: 'center',
    padding: normalize(6),
    color: '#fff',
  },
  signUpSentence: {
    fontWeight: 'bold',
    fontSize: normalize(17),
    marginLeft: normalize(40),
    marginTop: normalize(5),
  },
  signUpView: {
    borderWidth: normalize(1),
    width: '30%',
    height: normalize(40),
    borderRadius: normalize(5),
    marginLeft: normalize(15),
    backgroundColor: '#023047',
    borderColor: '#bfdbf7',
  },
  signUpText: {
    fontWeight: 'bold',
    padding: normalize(6),
    textAlign:'center',
    fontSize: normalize(15),
    color: '#fff',
  },
});
