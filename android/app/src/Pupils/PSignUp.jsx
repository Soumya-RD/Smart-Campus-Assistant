import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert, Dimensions, PixelRatio } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const PSignUp = ({ navigate }) => {


  const Navigation = useNavigation();

  const [registation, setRegistation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [batch, setBatch] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const clearFields = () => {
    setRegistation('');
    setEmail('');
    setPhone('');
    setPassword('');
    setBatch('');
    setName('');
  }

  // Sign up function
  const handleSignUp = async () => {
    if (!registation || !email || !phone || !password || !batch) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }



    try {

      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      if (userCredential.user) {
        await userCredential.user.sendEmailVerification();
        Alert.alert('Verification Email Sent', 'Please check your email to verify your account.');
      }
      if (!/^\d{10}$/.test(phone)) {
        setMessage('Phone number exactly 10 digits');
      }
      const saveData = await firestore().collection('Student').add({
        name: name,
        email: email,
        registation: registation,
        phone: phone,
        batch: batch,
        CreatedAt: firestore.FieldValue.serverTimestamp(),

      });
      setMessage('User Data save successfully !');
      Navigation.navigate('PSignIn');
      setRegistation('');
      setEmail('');
      setPhone('');
      setPassword('');
      setBatch('');
      setName('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }
  return (
    <View style={styles.Container}>
      {/* Image */}

      <Image source={require('./studentSignIn.jpg')} style={styles.imageConatiner} />


      {/* Name */}
      <View style={styles.inputContainer}>
        <TextInput placeholder=' username'
          style={styles.input}
          placeholderTextColor='#000'
          value={name}
          onChangeText={setName}

        />
      </View>

      {/* Registation Number */}
      <View style={styles.inputContainer} >

        <TextInput placeholder='registation number'
          style={styles.input}
          placeholderTextColor='#000'
          value={registation}
          onChangeText={setRegistation}
          keyboardType='numeric'

        />
      </View>
      {/* conform password */}
      <View style={styles.inputContainer}>
        <TextInput placeholder='batch'
          style={styles.input}
          placeholderTextColor='#000'
          value={batch}
          onChangeText={setBatch}
          secureTextEntry={true}
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <TextInput placeholder='email'
          style={styles.input}
          placeholderTextColor='#000'
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>


      {/* Phone Number */}
      <View style={styles.inputContainer}>
        <TextInput placeholder='phone number'
          style={styles.input}
          placeholderTextColor='#000'
          value={phone}
          onChangeText={setPhone}
          keyboardType='phone-pad'
        />
      </View>


      {/* password */}
      <View style={styles.inputContainer}>
        <TextInput placeholder='password'
          style={styles.input}
          placeholderTextColor='#000'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}


        />
      </View>
      <View style={styles.ButtomConatiner}>
        {/* clear button */}
        <TouchableOpacity style={[styles.buttonConatiner, { backgroundColor: '#6a040f', marginHorizontal: normalize(10), }]} onPress={clearFields}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>

        {/* SignUp Button */}
        <TouchableOpacity style={[styles.buttonConatiner, { backgroundColor: '#003049', marginHorizontal: normalize(5), }]} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
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

      {/* Sign in  */}
      <View style={styles.ButtomConatiner}>
        <Text style={styles.signInText}>Already have an account ?</Text>
        <TouchableOpacity style={[styles.buttonConatiner, { backgroundColor: '#081c15' }]} onPress={() => Navigation.navigate('PSignIn')} >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default PSignUp

const styles = StyleSheet.create({
  // :normalize(),
  Container: {
    flex: normalize(1),

  },
  imageConatiner: {
    width: '40%',
    height: '15%',
    marginHorizontal: normalize(15),
    marginVertical: normalize(15),
  },
  inputContainer: {
    borderBottomWidth: 1,
    marginVertical: normalize(7),
    width: '90%',
    marginHorizontal: normalize(15),
  },
  input: {

  },
  OrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalize(100),
    marginVertical: normalize(20),
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
  ButtomConatiner: {
    flexDirection: 'row',
    marginVertical: normalize(25),
  },
  buttonConatiner: {
    borderWidth: 1,
    width: '45%',
    height: normalize(35),
    borderRadius: normalize(5),
  },
  buttonText: {
    textAlign: 'center',
    padding: normalize(5),
    fontWeight: 'bold',
    color: '#fff'
  },
  signInText: {
    fontWeight: 'bold',
    fontSize: normalize(14),
    marginHorizontal: normalize(15),
  }

})

