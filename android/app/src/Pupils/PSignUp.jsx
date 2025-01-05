import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const PSignUp = ({ navigate }) => {


  const Navigation = useNavigation();

  const [registation, setRegistation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const [display, setDisplay] = useState('true');


  const clearFields = () => {
    setRegistation('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConformPassword('');
  }
  return (
    <View style={styles.Container}>
      {/* Image */}
      <View>
        <Image source={require('./studentLandScap.png')} style={styles.Image} />
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
        <TouchableOpacity style={styles.signUpView}>
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
    </View>
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
    borderColor:'#450920',
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
    borderColor:'#780000',
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
    borderColor:'#609947'
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
    borderColor:'#bfdbf7'
  },
  signInText: {
    fontWeight: 'bold',
    padding: 6,
    paddingLeft: 20,
    fontSize: 17,
    color: '#fff'
  },

})