import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
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
  const [teacherId, setTeacherId] = useState('');
  const [loading, setLoading] = useState(false);
  const [facultyData, setFacultyData] = useState([]);

  const navigation = useNavigation();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facultyCollection = await firestore().collection('faculty').get();
        const data = facultyCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFacultyData(data);
      } catch (error) {
        Alert.alert('Error', 'Error fetching faculty data.');
      }
    };
    fetchData();
  }, []);

  const handleSignIn = async () => {
    if (!email || !password || !teacherId) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    const isTeacherValid = facultyData.some(teacher => teacher.id === teacherId);
    if (!isTeacherValid) {
      Alert.alert('Error', 'Invalid Teacher ID.');
      return;
    }

    setLoading(true);

    try {
      const teacherQuery = await firestore()
        .collection('faculty')
        .where('email', '==', email)
        .get();

      if (teacherQuery.empty) {
        setLoading(false);
        Alert.alert('Access Denied', 'This email is not authorized as a faculty.');
        return;
      }

      const teacherData = teacherQuery.docs[0].data();
      if (teacherData.password !== password) {
        setLoading(false);
        Alert.alert('Error', 'Incorrect password. Please try again.');
        return;
      }

      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('FHome', { tid: teacherId });
      setEmail('');
      setPassword('');
      setTeacherId('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Incorrect password. Please try again.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleResetPassword = async () => {
    if (!email || !isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Email Sent', 'Please check your email.');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.Container}>
      <Image source={require('./FSignIn.jpg')} style={styles.ImageContainer} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="teacher Id"
          style={styles.input}
          placeholderTextColor='#000'
          value={teacherId}
          onChangeText={setTeacherId}
        />
        <TextInput
          placeholder="email"
          style={styles.input}
          placeholderTextColor='#000'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          placeholderTextColor='#000'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.signInButton}>
        <TouchableOpacity onPress={handleSignIn} >
          <Text style={styles.SignInText}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.orContainer}>
        <View style={styles.line1}></View>
        <Text style={styles.text}>OR</Text>
        <View style={styles.line2}></View>
      </View>
      <View style={styles.buttomContainer}>
        <View style={styles.forgotPasswordConatiner}>
          <Text style={styles.forgotPasswordText}>Forgot password ?</Text>
        </View>
        <View style={styles.clickContainer} >
          <TouchableOpacity onPress={handleResetPassword} >
            <Text style={styles.ClickText}>Click here</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ImageContainer: {
    width: '40%',
    height: '15%',
    borderRadius: normalize(5),
    marginHorizontal: normalize(20),
    marginVertical: normalize(15),
  },
  inputContainer: {
    alignItems: 'center',
    marginVertical: normalize(20),
  },
  input: {
    borderBottomWidth: 1,
    width: '90%',
    marginVertical: normalize(10),
  },
  signInButton: {
    borderWidth: 1,
    height: normalize(45),
    borderRadius: normalize(5),
    backgroundColor: '#073b4c',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(85),
  },
  SignInText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: normalize(14),
    color: '#fff',
    paddingVertical: normalize(7),
  },
  orContainer: {
    flexDirection: 'row',
    width: '80%',
    marginHorizontal: normalize(40),
    marginVertical: normalize(25),
  },
  line1: {
    borderBottomWidth: 1,
    width: '45%',

  },
  line2: {
    borderBottomWidth: 1,
    width: '45%',
    marginHorizontal: normalize(10),
  },
  text: {
    fontWeight: 'bold',
    fontSize: normalize(15),
    width: '12%',
    textAlign: 'center'
  },
  buttomContainer: {
    flexDirection: 'row',
    marginVertical: normalize(20),
  },
  forgotPasswordConatiner: {
    width: '50%',

  },
  forgotPasswordText: {
    fontWeight: 'bold',
    fontSize: normalize(15),
    textAlign: 'right'
  },
  clickContainer: {

  },
  ClickText: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: normalize(15),
    marginHorizontal: normalize(20),
  }
});

export default FSignIn;
