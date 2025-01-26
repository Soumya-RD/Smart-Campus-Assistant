import { Alert, StyleSheet, Text, View, FlatList, Dimensions, PixelRatio, TouchableOpacity, } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FChat from './FChat';
import FNotification from './FNotification';
import FSetting from './FSetting';
import { useRoute } from '@react-navigation/native';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const FHome = () => {
  const route = useRoute();
  const { tid } = route.params;
  const Tab = createBottomTabNavigator();

  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState([]);
  const [batch, setBatch] = useState([]);
  const [subject, setSubject] = useState([]);
  const [teacherId, setTeacherId] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facultySnapshot = await firestore()
          .collection('faculty')
          .where('tid', '==', tid)
          .get();

        if (!facultySnapshot.empty) {
          const facultyList = facultySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setFacultyData(facultyList);
          setBatch(batch);
        } else {
          Alert.alert('Error', 'No faculty data found.');
        }

        const classSnapshot = await firestore()
          .collection('faculty')
          .doc(tid)
          .collection('class')
          .get();

        if (!classSnapshot.empty) {
          const classList = classSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const sortedClassList = classList.sort((a, b) => {
            const timeA = a.time.split(':').map(Number);
            const timeB = b.time.split(':').map(Number);
            if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0];
            return timeA[1] - timeB[1];
          });
          setSubject(subject);
          setClassData(sortedClassList);
          setTeacherId(tid);
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
  }, [tid]);
  const handleAtn = (batch, subject, event) => {
    event.persist();
    navigation.navigate('FAttendance', { batch: batch, subject: subject, teacherId: teacherId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator initialRouteName="FHome">
      <Tab.Screen name="FHome" options={{ headerShown: false }} component={() => (
        <View style={styles.Container}>
          <View>
            <FlatList
              data={facultyData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.FacultyContainer}>

                  <Text style={styles.facultyData}>Id: {item.tid}</Text>
                  <Text style={styles.facultyData}>Name:{item.name}</Text>
                </View>
              )}
            />
          </View>

          <Text style={styles.headingText}>Upcoming Classes: </Text>
          <View>
            <FlatList
              data={classData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.ClassContainer}>
                  <View style={styles.FieldContainer}>
                    <Text style={styles.FieldText}>Batch: {item.batch}</Text>
                    <Text style={styles.FieldText}>Subject: {item.subject}</Text>
                  </View>
                  <View style={styles.FieldContainer}>
                    <Text style={styles.FieldText}>Time: {item.time}</Text>
                    <Text style={styles.FieldText}>Room Number: {item.room}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.attendanceContainer}
                    onPress={(event) => handleAtn(item.batch, item.subject, event)}
                  >
                    <Text style={styles.attendanceText}>Take Attendance</Text>
                  </TouchableOpacity>

                </View>
              )}
            />
          </View>

        </View>
      )} />
      <Tab.Screen name="Chat" component={FChat} options={{ headerShown: false }} />
      <Tab.Screen name="Notification" component={FNotification} options={{ headerShown: false }} />
      <Tab.Screen name="Setting" component={FSetting} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default FHome;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: normalize(10),
  },
  FacultyContainer: {
    marginVertical: normalize(20),
  },
  facultyData: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: normalize(16),
    marginVertical: normalize(3),

  },

  headingText: {
    fontWeight: 'bold',
    fontSize: normalize(16),
    marginVertical: normalize(15),

  },
  ClassContainer: {
    borderWidth: 1,
    height: normalize(100),
    marginVertical: normalize(15),
    borderRadius: 5
  },
  FieldContainer: {
    flexDirection: 'row',
    marginVertical: normalize(5),
    marginHorizontal: normalize(5),
  },
  FieldText: {
    fontWeight: 'bold',
    width: '50%',
    padding: normalize(5),
  },
  attendanceContainer: {
    borderWidth: normalize(1),
    width: '45%',
    height: normalize(30),
    backgroundColor: '#14213d',
    marginHorizontal: normalize(100),
    marginVertical: normalize(10),
    paddingVertical: normalize(5),
    borderRadius: normalize(5),
  },
  attendanceText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
