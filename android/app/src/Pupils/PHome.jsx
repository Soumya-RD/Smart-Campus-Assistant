import { Alert, Dimensions, PixelRatio, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PChat from './PChat';
import PPay from './PPay';
import PSetting from './PSetting';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const PHome = () => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const route = useRoute();
  const { registation, batch } = route.params;

  const [atnData, setAtnData] = useState(null);
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const studentDocument = await firestore()
          .collection(batch)
          .doc(registation)
          .get();

        if (studentDocument.exists) {
          const data = { id: studentDocument.id, ...studentDocument.data() };
          setAtnData([data]);
        } else {
          Alert.alert('Error', 'Student data not found.');
        }


        const timetableSnapshot = await firestore()
          .collection('timeTable')
          .doc(batch)
          .get();

        if (timetableSnapshot.exists) {
          const timetableDetails = timetableSnapshot.data();
          const timetableArray = Object.values(timetableDetails);
          setTimetableData(timetableArray);
        } else {
          Alert.alert('Error', 'Timetable not found for this batch.');
        }
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch data.');
      }
    };

    fetchData();
  }, [batch, registation]);

  const getStatusColor = (status) => {
    if (status === 'Absent') {
      return { color: '#e74c3c' };
    } else if (status === 'Present') {
      return { color: '#2ecc71' };
    } else {
      return { color: '#95a5a6' };
    }
  };

  const renderTimetable = () => {
    return timetableData.map((item, index) => (
      <View key={index} style={styles.timetableRow}>
        <Text style={styles.timetableText}>Subject: {item.subject}</Text>
        <Text style={styles.timetableText}>Time: {item.time}</Text>
        <Text style={styles.timetableText}>Room: {item.roomNumber}</Text>
        <Text style={styles.timetableText}>Faculty: {item.faculty}</Text>
      </View>
    ));
  };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={() => (
          <View style={styles.container}>
            <View style={styles.studentInfoContainer}>
              <FlatList
                data={atnData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.cardContainer}>
                    <View style={styles.topContainer}>
                      <View style={styles.textContainer}>
                        <Text style={styles.studentText}>Batch: {batch}</Text>
                        <Text style={styles.studentText}>Registration: {registation}</Text>
                        <Text style={styles.studentText}>Name: {item.name}</Text>
                      </View>
                      <Image style={styles.imageContainer} />
                    </View>

                    <TouchableOpacity
                      style={[styles.statusButton, { backgroundColor: getStatusColor(item.attendanceStatus).color }]}
                    >
                      <Text style={styles.statusText}>Current Status: {item.attendanceStatus}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>

            <View style={styles.timetableTextContainer}>
              <Text style={styles.timetableTitle}>Class Timetable</Text>
            </View>

            <View style={styles.timetableContainer}>
              <Text style={[styles.timetableText, { textAlign: 'center', fontWeight: 'bold' }]}>M T W T F S</Text>
              <View style={styles.timetableRow} >
                <View >
                  <Text style={styles.timetableText}>Subject: CD </Text>
                  <Text style={styles.timetableText}>Time: 10:00</Text>

                </View>
                <View>
                  <Text style={styles.timetableText}>Room: 233</Text>
                  <Text style={styles.timetableText}>Faculty: Swarnalata Rath </Text>
                </View>
              </View>


            </View>
            <View style={styles.timetableContainer}>
              <Text style={[styles.timetableText, { textAlign: 'center', fontWeight: 'bold' }]}>M T W T F S</Text>
              <View style={styles.timetableRow} >
                <View >
                  <Text style={styles.timetableText}>Subject: SE </Text>
                  <Text style={styles.timetableText}>Time: 11:00</Text>

                </View>
                <View>
                  <Text style={styles.timetableText}>Room: 233</Text>
                  <Text style={styles.timetableText}>Faculty: Prangya Srichandan </Text>
                </View>
              </View>


            </View>

            {/* To-Do Button */}
            <TouchableOpacity
              style={styles.todoButton}
              onPress={() => navigation.navigate('PTodo', { registation: registation, batch: batch })}
            >
              <Icon name="check-circle" size={30} color="#fff" />
            </TouchableOpacity>

          </View>
        )}
      />
      <Tab.Screen name="Chat" component={PChat} />
      <Tab.Screen name="EduPay" component={PPay} />
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
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(40),
    borderWidth: 1,
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
  timetableTextContainer: {
    marginTop: normalize(20),
    backgroundColor: '#1b4332',
    padding: normalize(15),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  timetableTitle: {
    fontSize: normalize(20),
    fontWeight: '700',
    marginBottom: normalize(10),
    textAlign: 'center',
    color: '#d9ed92'
  },
  timetableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: normalize(8),
    padding: normalize(10),
    paddingHorizontal: normalize(20),

  },
  timetableText: {
    fontSize: normalize(14),
    fontWeight: 'normal',
    marginVertical: normalize(5),
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
