import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, PixelRatio } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const FAttendance = () => {
  const [atnData, setAtnData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student data
        const studentCollection = await firestore().collection('mca2nd').get();

        // Fetch class data for faculty T002, class c02
        const classCollection = await firestore()
          .collection('faculty')
          .doc('T002')
          .collection('class')
          .doc('c02')
          .get();

        if (!studentCollection.empty) {
          const studentData = studentCollection.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Sorting students by registration number
          const sortedData = studentData.sort((a, b) => a.registrationNumber - b.registrationNumber);
          setAtnData(sortedData);
        } else {
          Alert.alert('No Data', 'No student data found.');
        }

        if (!classCollection.empty) {
          const classList = { id: classCollection.id, ...classCollection.data() };
          setClassData([classList]);
        } else {
          Alert.alert('Error', 'No class data found.');
        }
      } catch (error) {
        Alert.alert('Error', 'Data not found.');
      }
    };
    fetchData();
  }, []);

  const handleAttendance = (studentId, status) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]: status, // Update the attendance status for the student
    }));
  };

  const handleSubmitAttendance = async () => {
    try {
      // Count the number of Present and Absent students
      const presentStudents = atnData.filter((student) => attendanceStatus[student.id] === 'Present');
      const absentStudents = atnData.filter((student) => attendanceStatus[student.id] === 'Absent');

      const attendanceReport = {
        totalPresent: presentStudents.length,
        totalAbsent: absentStudents.length,
        presentList: presentStudents.map((student) => student.id), // List of students marked as present
        date: new Date(),
      };

      // Save the attendance report to the attendance collection
      await firestore().collection('attendance').add(attendanceReport);

      Alert.alert('Success', 'Attendance report has been successfully stored.');
    } catch (error) {
      Alert.alert('Error', 'There was an error while saving the attendance report.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Display Class Information */}
      <FlatList
        data={classData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.classContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.field}>Batch: {item.batch}</Text>
              <Text style={styles.field}>Subject: {item.subject}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.field}>Time: {item.time}</Text>
              <Text style={styles.field}>Room: {item.room}</Text>
            </View>
          </View>
        )}
      />

      {/* Display Students and their Attendance Buttons */}
      <FlatList
        data={atnData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.studentText}>
              {item.reg} - {item.name}
            </Text>
            <View style={styles.attendanceButtons}>
              {/* "Present" button */}
              <TouchableOpacity
                style={[styles.Pbutton, attendanceStatus[item.id] === 'Present' && { backgroundColor: 'green' }]}
                onPress={() => handleAttendance(item.id, 'Present')}
              >
                <Text style={styles.text}>P</Text>
              </TouchableOpacity>

              {/* "Absent" button */}
              <TouchableOpacity
                style={[styles.Abutton, attendanceStatus[item.id] === 'Absent' && { backgroundColor: 'red' }]}
                onPress={() => handleAttendance(item.id, 'Absent')}
              >
                <Text style={styles.text}>A</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Submit Attendance Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAttendance}>
        <Text style={styles.submitText}>Submit Attendance</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FAttendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#edf6f9',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(5),
  },
  classContainer: {
    paddingHorizontal: normalize(10),
    borderRadius: normalize(10),
    backgroundColor: '#073b4c',
    flexDirection: 'row',
    width: '95%',
    paddingVertical: normalize(10),
    marginVertical: normalize(5),
    marginHorizontal: normalize(10),

  },
  fieldContainer: {
    marginBottom: normalize(10),
    width: '60%',
  },
  field: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    paddingHorizontal: normalize(5),
    paddingVertical: normalize(5),
    color: '#fff'

  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(15),
    paddingVertical: normalize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: normalize(8),
  },
  studentText: {
    flex: 1,
    fontSize: normalize(14),
    fontWeight: 'bold',
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(10),

  },
  attendanceButtons: {
    flexDirection: 'row',
    width: '25%',
    height: normalize(30),
  },
  Pbutton: {
    borderWidth: 1,
    width: '35%',
    borderRadius: normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // default background color
  },
  Abutton: {
    borderWidth: 1,
    width: '35%',
    marginLeft: normalize(15),
    borderRadius: normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // default background color
  },
  text: {
    fontWeight: 'bold',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(5),
    color: 'black',
  },
  submitButton: {
    marginTop: normalize(20),
    backgroundColor: '#4CAF50',
    paddingVertical: normalize(10),
    borderRadius: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
});
