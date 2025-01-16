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
  const [conformPassword, setConformPassword] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const clearFields = () => {
    setRegistation('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConformPassword('');
    setName('');
  }

  // Sign up function
  const handleSignUp = async () => {
    if (!registation || !email || !phone || !password || !conformPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (password != conformPassword) {
      Alert.alert('Error', 'Password do not match');
      return;
    }

    // Firebase authentication
    try {
      // Save email and password to the firebase
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);



      // Send verification code 

      if (userCredential.user) {
        await userCredential.user.sendEmailVerification();
        Alert.alert('Verification Email Sent', 'Please check your email to verify your account.');
      }


      // validate mobile number
      if (!/^\d{10}$/.test(phone)) {
        setMessage('Phone number exactly 10 digits');
      }


      // save user data to firestore
      const saveData = await firestore().collection('Student').add({
        name: name,
        email: email,
        registation: registation,
        phone: phone,
        CreatedAt: firestore.FieldValue.serverTimestamp(),

      });
      setMessage('User Data save successfully !');
      Navigation.navigate('PSignIn');
      setRegistation('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConformPassword('');
      setName('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }


  }






  return (
    <View style={styles.Container}>



      {/* Image */}

      <Image source={require('./studentLandScap.png')} style={styles.imageConatiner} />


      {/* Name */}
      <View style={styles.inputContainer}>
        <TextInput placeholder=' username'
          style={styles.input}
          value={name}
          onChangeText={setName}

        />
      </View>


      {/* Registation Number */}
      <View style={styles.inputContainer} >

        <TextInput placeholder='registation number'
          style={styles.input}
          value={registation}
          onChangeText={setRegistation}

        />
      </View>


      {/* Email */}
      <View style={styles.inputContainer}>
        <TextInput placeholder='email'
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>


      {/* Phone Number */}
      <View style={styles.inputContainer}>
        <TextInput placeholder='phone number'
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType='phone-pad'
        />
      </View>


      {/* password */}
      <View style={styles.inputContainer}>
        <TextInput placeholder='password'
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}


        />
      </View>


      {/* conform password */}
      <View style={styles.inputContainer}>
        <TextInput placeholder='conform password'
          style={styles.input}
          value={conformPassword}
          onChangeText={setConformPassword}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.ButtomConatiner}>
        {/* clear button */}
        <TouchableOpacity style={[styles.buttonConatiner,{backgroundColor:'#6a040f'}]} onPress={clearFields}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>

        {/* SignUp Button */}
        <TouchableOpacity style={[styles.buttonConatiner,{backgroundColor:'#003049'}]} onPress={handleSignUp}>
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

  Container: {
    flex: normalize(1),

  },
  imageConatiner: {
    width: '40%',
    height: '15%',
    marginTop: normalize(5),
    marginLeft: normalize(10),
  },
  inputContainer: {
    borderBottomWidth: 1,
    marginTop: normalize(10),
    width: '90%',
    marginLeft: normalize(15),
  },
  input: {

  },
  OrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(25),
  },
  Or: {
    borderBottomWidth: 1,
    width: '30%',
    marginLeft: normalize(40),

  },
  Or1: {
    borderBottomWidth: 1,
    width: '30%',
    marginLeft: normalize(15),

  },
  OrView: {

  },
  OrText: {
    fontWeight: 'bold',
    fontSize: normalize(15),
    marginLeft: normalize(25),

  },
  ButtomConatiner: {
    flexDirection: 'row',
    marginTop: normalize(30),
  },
  buttonConatiner: {
    borderWidth: 1,
    width: '45%',
    height: normalize(30),
    marginLeft: normalize(10),
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
    marginLeft: normalize(20),
  }

})

