import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
const PSignIn = ({Navigate}) => {

  const [registation, setRegistation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Navigation=useNavigation();

  const forgetPasswordFields = () => {
   

  }
  return (
    <View style={styles.Container}>
      {/* Image */}
      <View>
        <Image source={require('./studentSignIn.jpg')} style={styles.Image} />
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





      {/* password */}
      <View style={styles.TextInputView}>
        <TextInput placeholder='Password'
          style={styles.TextInput}
          value={password}
          onChangeText={setPassword}


        />
      </View>



      <View style={styles.ButtomView}>
        {/* ForgetPassword button */}
        <TouchableOpacity style={styles.forgetPasswordView} onPress={forgetPasswordFields}>
          <Text style={styles.forgetPasswordText}>forgetPassword</Text>
        </TouchableOpacity>

        {/* SignIn Button */}
        <TouchableOpacity style={styles.signInView}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up  */}
      <View style={{ flexDirection: 'row', marginTop: 35 }}>
        <Text style={styles.signUpSentence}>Create a new account ?</Text>
        <TouchableOpacity style={styles.signUpView} onPress={()=>Navigation.navigate('PSignUp')} >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PSignIn

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#bfdbf7'
  },
  Image: {
    height: 200,
    width: 250,
    borderWidth: 1,
    borderRadius: 15,
    marginLeft: 75,
    marginTop: 30,
    marginBlock: 30,
    borderColor: '#5f0f40',
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
  forgetPasswordView: {
    borderWidth: 1,
    width: 140,
    height: 35,
    marginLeft: 60,
    borderRadius: 5,
    backgroundColor: '#d90429',
    borderColor: '#780000',
  },
  forgetPasswordText: {
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    padding: 4,
    color: '#fff',
   
  },
  signInView: {
    borderWidth: 1,
    width: 100,
    height: 35,
    marginLeft: 50,
    borderRadius: 5,
    backgroundColor: '#132a13',
    borderColor: '#609947'
  },
  signInText: {
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    padding: 4,
    color: '#fff'
  },
  signUpSentence: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 40,
    marginTop: 5,

  },
  signUpView: {
    borderWidth: 1,
    width: 100,
    height: 40,
    borderRadius: 5,
    marginLeft: 15,
    backgroundColor: '#023047',
    borderColor: '#bfdbf7'
  },
  signUpText: {
    fontWeight: 'bold',
    padding: 6,
    paddingLeft: 20,
    fontSize: 17,
    color: '#fff'
  },

})