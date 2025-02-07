import { Alert, Dimensions, PixelRatio, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PChat from './PChat';
import PNotification from './PNotification';
import PSetting from './PSetting';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const PHome = () => {
  const Tab = createBottomTabNavigator();
  const route = useRoute();
  const { reg, batch } = route.params;

  const [atnData, setAtnData] = useState(null);
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentDocument = await firestore()
          .collection(batch)
          .doc(reg)
          .get();

        if (studentDocument.exists) {
          const data = { id: studentDocument.id, ...studentDocument.data() };
          setAtnData([data]);
        } else {
          Alert.alert('Error', 'Student data not found.');
        }

        // Fetch timetable for the batch


      } catch (error) {
        Alert.alert('Error', 'Unable to fetch data.');
      }
    };

    fetchData();
  }, [batch, reg]);

  const getStatusColor = (status) => {
    if (status === 'Absent') {
      return { color: '#e74c3c' };
    } else if (status === 'Present') {
      return { color: '#2ecc71' };
    } else {
      return { color: '#95a5a6' };
    }
  };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={() => (
          <View style={styles.container}>
            {/* Student Information Section */}
            <View style={styles.studentInfoContainer}>
              <FlatList
                data={atnData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.cardContainer}>
                    <View style={styles.topContainer}>
                      <View style={styles.textContainer}>
                        <Text style={styles.studentText}>Batch: {batch}</Text>
                        <Text style={styles.studentText}>Registration: {reg}</Text>
                        <Text style={styles.studentText}>Name: {item.name}</Text>
                      </View>
                      <Image source={require('./me.jpg')} style={styles.imageContainer} />
                    </View>

                    {/* Attendance Status Section */}
                    <TouchableOpacity
                      style={[styles.statusButton, { backgroundColor: getStatusColor(item.attendanceStatus).color }]}
                    >
                      <Text style={styles.statusText}>Current Status: {item.attendanceStatus}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>

            {/* Timetable Section */}
            <View style={styles.timetableContainer}>
              <Text style={styles.timetableTitle}>College Timetable</Text>

            </View>
          </View>
        )}
      />
      <Tab.Screen name="Chat" component={PChat} />
      <Tab.Screen name="Notification" component={PNotification} />
      <Tab.Screen name="Setting" component={PSetting} />
    </Tab.Navigator>
  );
};

export default PHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f4',
    padding: normalize(15),
  },
  studentInfoContainer: {
    marginBottom: normalize(20),
    backgroundColor: '#fff',
    padding: normalize(15),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardContainer: {
    marginBottom: normalize(20),
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(10),
  },
  textContainer: {
    flex: 1,
  },
  studentText: {
    fontSize: normalize(16),
    fontWeight: '500',
    marginBottom: normalize(5),
  },
  imageContainer: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
  },
  statusButton: {
    marginTop: normalize(15),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  timetableContainer: {
    marginTop: normalize(20),
    backgroundColor: '#fff',
    padding: normalize(15),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  timetableTitle: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    marginBottom: normalize(10),
  },
  timetableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: normalize(8),
  },
  timetableText: {
    fontSize: normalize(14),
    fontWeight: 'normal',
  },
});
