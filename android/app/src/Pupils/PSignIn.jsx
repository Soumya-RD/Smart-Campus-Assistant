import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert, Dimensions, PixelRatio } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const PSignIn = () => {
  const [batch, setBatch] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reg, setReg] = useState('');
  const [loading, setLoading] = useState(false); 
  const Navigation = useNavigation();

 
  const forgetPasswordFields = async () => {
    if (email) {
      try {
        setLoading(true); 
        await auth().sendPasswordResetEmail(email);
        Alert.alert('Success', 'Password reset email sent');
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false); 
      }
    } else {
      Alert.alert('Error', 'Please enter your email address');
    }
  };

  const handleSignIn = async () => {
    if (!email || !password || !batch || !reg) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true); 
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', 'welcome NMIETian');
      Navigation.navigate('PHome', { reg: reg, batch: batch });
      setEmail('');
      setBatch('');
      setPassword('');
      setReg('');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.Container}>
      {/* Image */}
      <Image source={require('./studentSignIn.jpg')} style={styles.ImageContainer} />

      {/* Batch */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="batch"
          style={styles.input}
          placeholderTextColor='#000'
          value={batch}
          onChangeText={setBatch} 
        />
      </View>

      {/* Registration Number */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="registration number"
          style={styles.input}
          placeholderTextColor='#000'
          value={reg}
          onChangeText={setReg}
          keyboardType='numeric' 
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="email"
          style={styles.input}
          placeholderTextColor='#000'
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
          placeholderTextColor='#000'
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
          <Text style={styles.buttonText}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.OrContainer}>
        <View style={styles.Or}></View>
        <View style={styles.OrView}>
          <Text style={styles.OrText}>OR</Text>
        </View>
        <View style={styles.Or1}></View>
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
    fontWeight: 'bold',
  },
  ButtomContainer: {
    flexDirection: 'row',
  },
  buttonConatiner: {
    width: '40%',
    height: normalize(35),
    borderWidth: normalize(1),
    borderRadius: normalize(5),
    marginHorizontal: normalize(17),
    marginVertical: normalize(35),
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: normalize(5),
    color: '#fff',
  },
  OrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalize(100),
  },
  Or: {
    borderBottomWidth: 1,
    width: '30%',
  },
  Or1: {
    borderBottomWidth: 1,
    width: '30%',
  },
  
  OrText: {
    fontWeight: 'bold',
    fontSize: normalize(15),
    marginHorizontal: normalize(22),
  },
  SignUpConatiner: {
    flexDirection: 'row',
    marginVertical: normalize(20),
  },
  signUpText: {
    fontWeight: 'bold',
    fontSize: normalize(14),
    marginHorizontal: normalize(30),
  },
  signUpView: {
    borderWidth: normalize(1),
    width: '40%',
    height: normalize(35),
    borderRadius: normalize(5),
    backgroundColor: '#073b4c',
  },
});
