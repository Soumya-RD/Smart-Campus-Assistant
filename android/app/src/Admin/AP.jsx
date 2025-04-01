import { StyleSheet, Text, View, FlatList, Alert, Dimensions, PixelRatio } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window')
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));


const AP = () => {
  const route = useRoute();
  const { batch, registation } = route.params;

  const [students, setStudents] = useState([]);

  const handleStudentSearch = async () => {
    try {
      const studentCollection = firestore().collection('Student');
      let query = studentCollection;

      if (batch) {
        query = query.where('batch', '==', batch);
      }

      if (registation) {
        query = query.where('registation', '==', registation);
      }

      const snapshot = await query.get();

      if (!snapshot.empty) {
        const studentData = snapshot.docs.map(doc => doc.data());
        setStudents(studentData);
      } else {
        Alert.alert('No Data', 'No student found matching the search criteria.');
      }
    } catch (error) {
      console.log('Error searching students: ', error);
      Alert.alert('Error', 'An error occurred while searching for students.');
    }
  };

  useEffect(() => {
    handleStudentSearch();
  }, [batch, registation]);

  const renderItem = ({ item }) => (
    <View style={styles.studentItem}>
      <Text style={styles.item}>{`Name: ${item.name}`}</Text>
      <Text style={styles.item}>{`Batch: ${item.batch}`}</Text>
      <Text style={styles.item}>{`Registration No: ${item.registation}`}</Text>
      <Text style={styles.item}>{`Email: ${item.email}`}</Text>
      <Text style={styles.item}>{`Blood: ${item.blood}`}</Text>
      <Text style={styles.item}>{`City: ${item.city}`}</Text>
      <Text style={styles.item}>{`DOB: ${item.dob}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Data</Text>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.registation || index.toString()}
        ListEmptyComponent={<Text>No students found</Text>}
      />
    </View>
  );
};

export default AP;
// :normalize(),
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    fontSize: normalize(20),
    fontWeight: '700',
    backgroundColor: '#fff',
    padding: normalize(15),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: normalize(20),
    marginVertical: normalize(25),
    textAlign: 'center',




  },
  studentItem: {
    backgroundColor: '#fff',
    padding: normalize(15),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: normalize(20),
    marginVertical: normalize(15),

  },
  item: {
    fontWeight: 'black',
    fontSize: normalize(15),
    padding: normalize(5),
  }
});
