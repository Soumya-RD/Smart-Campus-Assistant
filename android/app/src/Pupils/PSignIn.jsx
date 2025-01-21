import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert, Dimensions, PixelRatio } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));
const PSignIn = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reg, setReg] = useState('');

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
    if (!email || !password || !username || !reg) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', `Welcome back, ${username}`);
      Navigation.navigate('PHome', { reg: reg });
      // setEmail('');
      // setUsername('');
      // setPassword('');
      // setReg('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.Container}>
      {/* Image */}

      <Image source={require('./studentSignIn.jpg')} style={styles.ImageContainer} />


      {/* name */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      {/* Registration Number */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="registation number"
          style={styles.input}
          value={reg}
          onChangeText={setReg}
          keyboardType='Phone-pad'
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.ButtomContainer}>
        {/* Forget Password button */}
        <TouchableOpacity style={[styles.buttonConatiner, { backgroundColor: '#6a040f' }]} onPress={forgetPasswordFields}>
          <Text style={styles.buttonText}>Forget Password</Text>
        </TouchableOpacity>

        {/* SignIn Button */}
        <TouchableOpacity style={[styles.buttonConatiner, { backgroundColor: '#081c15' }]} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.OrContainer}>
        <View style={styles.Or}>

        </View>
        <View style={styles.OrView}>
          <Text style={styles.OrText}>OR</Text>
        </View>
        <View style={styles.Or1}>

        </View>
      </View>


      {/* Sign Up */}
      <View style={styles.SignUpConatiner}>
        <Text style={styles.signUpText}>Create a new account ?</Text>
        <TouchableOpacity style={styles.signUpView} onPress={() => Navigation.navigate('PSignUp')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PSignIn;

const styles = StyleSheet.create({
  Container: {
    flex: 1,

  },
  ImageContainer: {
    width: '45%',
    height: '15%',
    marginTop: normalize(10),
    marginLeft: normalize(10),

  },
  inputContainer: {
    borderBottomWidth: normalize(1),
    marginTop: normalize(15),
    width: '90%',
    marginLeft: normalize(15),

  },
  input: {

  },
  ButtomContainer: {
    flexDirection: 'row',


  },
  buttonConatiner: {
    width: '40%',
    height: normalize(35),
    borderWidth: normalize(1),
    marginTop: normalize(25),
    marginLeft: normalize(25),
    borderRadius: normalize(5),
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: normalize(5),
    color: '#fff'
  },
  OrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(20),
  },
  Or: {
    borderBottomWidth: 1,
    width: '30%',
    marginLeft: normalize(40),

  },
  Or1: {
    borderBottomWidth: 1,
    width: '30%',
    marginLeft: normalize(25),

  },
  OrView: {

  },
  OrText: {
    fontWeight: 'bold',
    fontSize: normalize(15),
    marginLeft: normalize(25),

  },
  SignUpConatiner: {
    flexDirection: 'row',
    marginTop: normalize(20),
  },
  signUpText: {
    fontWeight: 'bold',
    fontSize: normalize(14),
    marginLeft: normalize(20),
    padding: normalize(5),
  },
  signUpView: {
    borderWidth: normalize(1),
    width: '40%',
    height: normalize(35),
    marginLeft: normalize(25),
    borderRadius: normalize(5),
    backgroundColor: '#073b4c'

  }

});
