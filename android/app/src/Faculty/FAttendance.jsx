import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, PixelRatio, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const FAttendance = () => {
  const route = useRoute();
  const { batch } = route.params;
  const { teacherId } = route.params;
  const { subject } = route.params;
  const navigation = useNavigation();
  const [atnData, setAtnData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentCollection = await firestore().collection(batch).get();

        const classCollection = await firestore()
          .collection('faculty')
          .doc(teacherId)
          .collection('class')
          .doc(subject)
          .get();

        if (!studentCollection.empty) {
          const studentData = studentCollection.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

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
  }, [batch, teacherId, subject]);

  const handleAttendance = (studentId, status) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]: status,
    }));
  };

  const handleSubmitAttendance = async () => {
    const allStudentsMarked = atnData.every((student) => attendanceStatus[student.id]);
    if (!allStudentsMarked) {
      Alert.alert('Error', 'Please mark attendance for all students.');
      return;
    }

    try {
      setIsLoading(true);  // Set loading state to true when submitting

      const presentStudents = atnData.filter((student) => attendanceStatus[student.id] === 'Present');
      const absentStudents = atnData.filter((student) => attendanceStatus[student.id] === 'Absent');

      const attendanceReport = {
        totalPresent: presentStudents.length,
        totalAbsent: absentStudents.length,
        presentList: presentStudents.map((student) => student.id),
        date: new Date(),
      };

      // Get the current date and time for the document ID
      const now = new Date();
      const documentId = now.toISOString();  // Get the current timestamp in ISO format

      // Save the attendance report in Firestore with the timestamp as the document ID
      await firestore().collection(batch).doc('atn').collection('attendance').doc(documentId).set(attendanceReport);

      // Update the individual student documents with their attendance status
      for (const student of atnData) {
        const status = attendanceStatus[student.id];
        await firestore()
          .collection(batch)
          .doc(student.id)
          .update({
            attendanceStatus: status,
            lastUpdated: new Date(),
          });
      }

      // Reset the attendanceStatus to clear the marked attendance
      setAttendanceStatus({});

      setIsLoading(false);  // Set loading state to false after submission
      Alert.alert('Success', 'Attendance report has been successfully stored and student statuses updated.');

    } catch (error) {
      setIsLoading(false);  // Set loading state to false if an error occurs
      Alert.alert('Error', 'There was an error while saving the attendance report.');
    }
  };

  // Mark all students as present
  const markAllPresent = () => {
    const updatedStatus = {};
    atnData.forEach(student => {
      updatedStatus[student.id] = 'Present';
    });
    setAttendanceStatus(updatedStatus);
  };

  // Mark all students as absent
  const markAllAbsent = () => {
    const updatedStatus = {};
    atnData.forEach(student => {
      updatedStatus[student.id] = 'Absent';
    });
    setAttendanceStatus(updatedStatus);
  };

  return (
    <View style={styles.container}>
      {/* Card Header with Shadow */}
      <View style={styles.card}>
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
      </View>

      {/* Mark All Present/Absent Buttons */}
      <View style={styles.markAllButtonsContainer}>
        <TouchableOpacity style={styles.markAllButton} onPress={markAllPresent}>
          <Text style={styles.markAllButtonText}>Mark All Present</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.markAllButton} onPress={markAllAbsent}>
          <Text style={styles.markAllButtonText}>Mark All Absent</Text>
        </TouchableOpacity>
      </View>

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
                style={[
                  styles.Pbutton, 
                  attendanceStatus[item.id] === 'Present' && { backgroundColor: 'green' }, // Mark present button with green
                  !attendanceStatus[item.id] && { backgroundColor: 'white' }, // Reset to white if no status
                ]}
                onPress={() => handleAttendance(item.id, 'Present')}
              >
                <Text style={styles.text}>P</Text>
              </TouchableOpacity>

              {/* "Absent" button */}
              <TouchableOpacity
                style={[
                  styles.Abutton,
                  attendanceStatus[item.id] === 'Absent' && { backgroundColor: 'red' }, // Mark absent button with red
                  !attendanceStatus[item.id] && { backgroundColor: 'white' }, // Reset to white if no status
                ]}
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
        {isLoading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <Text style={styles.submitText}>Submit Attendance</Text>
        )}
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
  card: {
    backgroundColor: '#2d6a4f',
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(20),
    marginVertical: normalize(20),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  classContainer: {
    flexDirection: 'row',
    marginVertical: normalize(10),
  },
  fieldContainer: {
    width: '60%',
    marginHorizontal: normalize(5),
  },
  field: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    color: '#fff',
  },
  markAllButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: normalize(15),
  },
  markAllButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(8),
    alignItems: 'center',
  },
  markAllButtonText: {
    color: '#fff',
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#edf2f4',
    marginVertical: normalize(10),
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
    height: normalize(40),
  },
  Pbutton: {
    borderWidth: 1,
    width: '35%',
    height: normalize(30),
    borderRadius: normalize(15),
    marginVertical: normalize(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Abutton: {
    borderWidth: 1,
    width: '35%',
    height: normalize(30),
    marginHorizontal: normalize(15),
    marginVertical: normalize(5),
    borderRadius: normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
