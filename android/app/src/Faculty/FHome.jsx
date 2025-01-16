import { Alert, StyleSheet, Text, View, FlatList, Dimensions, PixelRatio, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FChat from './FChat';  // Make sure you have FChat component
import FNotification from './FNotification';  // Make sure you have FNotification component
import FSetting from './FSetting';  // Make sure you have FSetting component

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const FHome = () => {
  const Tab = createBottomTabNavigator();

  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facultyDoc = await firestore().collection('faculty').doc('T002').get();

        const classCollection = await firestore().collection('faculty').doc('T002').collection('class').get();

        if (facultyDoc.exists) {
          const data = { id: facultyDoc.id, ...facultyDoc.data() };
          setFacultyData([data]);
        } else {
          Alert.alert('Error', 'Faculty document does not exist.');
        }

        if (!classCollection.empty) {
          const classList = classCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setClassData(classList); // Set all classes
        } else {
          Alert.alert('Error', 'No classes found.');
        }
      } catch (error) {
        Alert.alert('Error', 'Error fetching faculty or class data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator initialRouteName="FHome">
      <Tab.Screen name="FHome" options={{ headerShown: false }}>
        {() => (
          <View style={styles.Container}>
            <View>
              <FlatList
                data={facultyData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (


                  <View style={styles.FacultyContainer}>

                    {/* Faculty name ,email and phone */}
                    <Text style={styles.facultyData}>Name:{item.name}</Text>
                    <Text style={styles.facultyData}>Email:{item.email}</Text>
                    <Text style={styles.facultyData}>Phone:{item.phone}</Text>
                  </View>
                )}
              />
            </View>

            <Text style={styles.headingText}>Upcoming Classes: </Text>

            <FlatList
              data={classData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (

                <View style={styles.ClassContainer}>

                  {/* Batch and Subject */}
                  <View>
                    <View style={styles.FieldContainer}>
                      <Text style={styles.FieldText} >Batch:{item.batch}</Text>
                      <Text style={styles.FieldText} >Subject:{item.subject}</Text>
                    </View>
                  </View>

                  {/* Time and Room number  */}

                  <View>
                    <View style={styles.FieldContainer}>
                      <Text style={styles.FieldText} >Time:{item.time}</Text>
                      <Text style={styles.FieldText} >Room Number:{item.room}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.attendanceContainer}
                      onPress={() => navigation.navigate('FAttendance')}
                    >
                      <Text style={styles.attendanceText}>Take Attendance</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </Tab.Screen>

      <Tab.Screen name="FChat" component={FChat} />
      <Tab.Screen name="FNotification" component={FNotification} />
      <Tab.Screen name="FSetting" component={FSetting} />
    </Tab.Navigator>
  );
};

export default FHome;

const styles = StyleSheet.create({
  Container: {
    flex: normalize(1),
  },
  FacultyContainer: {
    marginTop: normalize(15),
  },
  facultyData: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: normalize(16),
  },
  ClassContainer: {
    borderWidth: 1,
    marginTop: normalize(25),
    height: normalize(65),
  },
  FieldContainer: {
    flexDirection: 'row',

  },
  FieldText: {
    fontWeight: 'bold',
    width: '55%',
    padding: normalize(5),
  },

  headingText: {
    fontWeight: 'bold',
    fontSize: normalize(15),
    marginTop: normalize(25),
  },
  attendanceContainer: {
    borderWidth: normalize(1),
    width: '45%',
    marginLeft: normalize(5),
    backgroundColor:'#14213d'
  },
  attendanceText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#fff'
  },

});

