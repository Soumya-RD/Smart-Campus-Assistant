import { StyleSheet, Text, View, Dimensions, PixelRatio, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AChat from './AChat';
import ANotification from './ANotification';
import ASetting from './ASetting';
import AT from './AT';
import AS from './AS';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';


const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window')
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const AHome = ({ navigate }) => {


  const route = useRoute();
  const { aid } = route.params;
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();


  const [students, setStudents] = useState([]);
  const [batch, setBatch] = useState('');
  const [regNo, setRegNo] = useState('');
  const [tid, setTid] = useState('');
  const [sid, setSid] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore().collection('admin').doc(aid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setName(userData.name);
          setEmail(userData.email);
        } else {
          Alert.alert('Error', 'User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Unable to fetch user data');
      }
    };

    fetchUserData();
  }, [aid]);

  const handleStudentSearch = async () => {
    if (!batch || !regNo) {
      Alert.alert('Error', 'Fill all the fields.');
    } else {
      navigation.navigate('AP', { batch: batch, registation: regNo });
      setRegNo('');
      setBatch('');
    }
  };

  const handleFacultySearch = async () => {
    if (!tid) {
      Alert.alert('Error', 'Fill tid field.');
    } else {
      navigation.navigate('AT', { tid: tid });
      setTid('');
    }
  };

  const handleStaffSearch = async () => {
    if (!sid) {
      Alert.alert('Error', 'Fill sid field.');
    } else {
      navigation.navigate('AS', { sid: sid });
      setSid('');
    }
  };

  const batchPress = () => {
    Alert.alert('Warning', 'Please use batch names in the format: mca1st, mca2nd, btech4th, etc.');
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={() => (
          <View style={styles.container}>
            <View style={styles.detailsContainer}>
              <View style={styles.details}>
                <Text style={styles.text}>Name : {name}</Text>
                <Text style={styles.text}>Email : {email}</Text>
              </View>
              <View>
                {/* <Image source={require('./admin.png')} style={styles.imageContainer} /> */}
              </View>
            </View>

            <View>
              <View style={styles.mettingContainer}>
                <Text style={styles.heading}>Create a meeting</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Metting')}>
                  <Text style={styles.sendLinkText}>Send link ... </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.searchContainer}>
                <View style={[styles.inputContainer]}>
                  <Text style={styles.heading}>Search student</Text>
                  <TextInput
                    placeholder="batch"
                    placeholderTextColor="#000"
                    style={styles.input}
                    value={batch}
                    onChangeText={setBatch}
                    onPress={batchPress}
                  />
                  <TextInput
                    placeholder="registation number"
                    placeholderTextColor="#000"
                    style={styles.input}
                    onChangeText={setRegNo}
                    value={regNo}
                  />
                  <TouchableOpacity style={styles.searchButton} onPress={handleStudentSearch}>
                    <Text style={styles.searchText}>Search</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.heading}>Search faculty</Text>
                  <TextInput
                    placeholder="enter tid"
                    placeholderTextColor="#000"
                    style={styles.input}
                    onChangeText={setTid}
                    value={tid}
                  />
                  <TouchableOpacity style={styles.searchButton} onPress={handleFacultySearch}>
                    <Text style={styles.searchText}>Search</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.heading}>Search support staff</Text>
                  <TextInput
                    placeholder="enter sid"
                    placeholderTextColor="#000"
                    style={styles.input}
                    onChangeText={setSid}
                    value={sid}
                  />
                  <TouchableOpacity style={styles.searchButton} onPress={handleStaffSearch}>
                    <Text style={styles.searchText}>Search</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.todoButton}
              onPress={() => navigation.navigate('ATodo', { aid: aid })}
            >
              <Icon name="check-circle" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
      <Tab.Screen name="Chat" component={AChat} options={{ headerShown: false }} />
      <Tab.Screen name="Notification" component={ANotification} options={{ headerShown: false }} initialParams={{ adminName: name }} />

      <Tab.Screen name="Setting" component={ASetting} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default AHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: normalize(5),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    marginHorizontal: normalize(10),
    marginVertical: normalize(5),
  },

  details: {
    width: '65%',
    marginHorizontal: normalize(5),
    marginVertical: normalize(30),
  },
  text: {
    fontWeight: '700',
    fontSize: normalize(15),
    marginVertical: normalize(5),
  },
  imageContainer: {
    borderWidth: 1,
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
    marginVertical: normalize(20),
  },

  heading: {
    fontWeight: 'black',
    fontSize: normalize(15),
    marginHorizontal: normalize(10),
    textAlign: 'center',
  },
  mettingContainer: {
    marginVertical: normalize(5),
    marginHorizontal: normalize(20),
    backgroundColor: '#f2f4f3',
    borderRadius: normalize(10),
  },
  sendLinkText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    marginHorizontal: normalize(70),
    height: normalize(40),
    borderRadius: normalize(10),
    marginVertical: normalize(10),
    paddingVertical: normalize(10),
    backgroundColor: '#283618',
  },
  searchContainer: {
    backgroundColor: '#fff',
    padding: normalize(15),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: normalize(10),
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: normalize(10),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: normalize(10),
    marginVertical: normalize(8),
  },
  searchText: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: normalize(5),
    color: '#fff',
  },
  searchButton: {
    marginVertical: normalize(10),
    marginHorizontal: normalize(90),
    height: normalize(30),
    borderRadius: normalize(5),
    backgroundColor: '#023047',
  },
  input: {
    borderBottomWidth: 1,
    width: '90%',
    marginHorizontal: normalize(15),
  },
  todoButton: {
    position: 'absolute',
    bottom: normalize(30),
    right: normalize(30),
    backgroundColor: '#2ecc71',
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});
