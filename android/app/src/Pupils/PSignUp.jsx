import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert, } from 'react-native'
import React, { useState } from 'react'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const PSignUp = ({ navigate }) => {


  const Navigation = useNavigation();

  const [registation, setRegistation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const [display, setDisplay] = useState('true');
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
      const saveData = await firestore().collection('p5rH4GSCmfEv3U5q58VJ').add({
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
    <KeyboardAwareScrollView style={styles.Container}>



      {/* Image */}
      <View>
        <Image source={require('./studentLandScap.png')} style={styles.Image} />
      </View>

      {/* Name */}
      <View style={styles.TextInputView}>
        <TextInput placeholder='Student Name'
          style={styles.TextInput}
          value={name}
          onChangeText={setName}

        />
      </View>


      {/* Registation Number */}
      <View style={styles.TextInputView}>
        {/* <MaterialIcons name="app-registration" size={24} color="black" /> */}
        <TextInput placeholder='Registation Number'
          style={styles.TextInput}
          value={registation}
          onChangeText={setRegistation}

        />
      </View>


      {/* Email */}
      <View style={styles.TextInputView}>
        <TextInput placeholder='Email'
          style={styles.TextInput}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>


      {/* Phone Number */}
      <View style={styles.TextInputView}>
        <TextInput placeholder='Phone Number'
          style={styles.TextInput}
          value={phone}
          onChangeText={setPhone}
          keyboardType='phone-pad'
        />
      </View>


      {/* password */}
      <View style={styles.TextInputView}>
        <TextInput placeholder='Password'
          style={styles.TextInput}
          value={password}
          onChangeText={setPassword}


        />
      </View>


      {/* conform password */}
      <View style={styles.TextInputView}>
        <TextInput placeholder='Conform Password'
          style={styles.TextInput}
          value={conformPassword}
          onChangeText={setConformPassword}
        />
      </View>
      <View style={styles.ButtomView}>
        {/* clear button */}
        <TouchableOpacity style={styles.clearView} onPress={clearFields}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>

        {/* SignUp Button */}
        <TouchableOpacity style={styles.signUpView} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Sign in  */}
      <View style={{ flexDirection: 'row', marginTop: 35 }}>
        <Text style={styles.signInSentence}>Already have an account ?</Text>
        <TouchableOpacity style={styles.signInView} onPress={() => Navigation.navigate('PSignIn')} >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAwareScrollView>
  )
}

export default PSignUp

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    backgroundColor: '#8d99ae'
  },
  Image: {
    height: 150,
    width: 250,
    borderWidth: 3,
    borderRadius: 15,
    marginLeft: 75,
    marginTop: 30,
    marginBlock: 30,
    borderColor: '#ffb703',
  },
  TextInputView: {

    borderWidth: 1,
    marginTop: 10,
    width: 340,
    borderRadius: 10,
    marginLeft: 30,
    backgroundColor: '#ccd5ae',
    borderColor: '#450920',
  },
  TextInput: {
    fontWeight: 'bold',
    textAlign: 'center',
    // marginLeft:5
  },
  ButtomView: {
    flexDirection: 'row',
    marginTop: 30
  },
  clearView: {
    borderWidth: 1,
    width: 100,
    height: 35,
    marginLeft: 75,
    borderRadius: 5,
    backgroundColor: '#d90429',
    borderColor: '#780000',
  },
  clearText: {
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    padding: 4,
    color: '#fff'
  },
  signUpView: {
    borderWidth: 1,
    width: 100,
    height: 35,
    marginLeft: 50,
    borderRadius: 5,
    backgroundColor: '#132a13',
    borderColor: '#609947'
  },
  signUpText: {
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    padding: 4,
    color: '#fff'
  },
  signInSentence: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 40,
    marginTop: 5,

  },
  signInView: {
    borderWidth: 1,
    width: 100,
    height: 40,
    borderRadius: 5,
    marginLeft: 15,
    backgroundColor: '#003049',
    borderColor: '#bfdbf7'
  },
  signInText: {
    fontWeight: 'bold',
    padding: 6,
    paddingLeft: 20,
    fontSize: 17,
    color: '#fff'
  },

})