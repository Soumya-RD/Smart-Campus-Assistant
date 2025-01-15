import { Alert, StyleSheet, Text, View, FlatList, Dimensions, PixelRatio, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));



const FHome = ({ navigate }) => {
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
    <View style={styles.Conatiner} >
      <View>
        <FlatList
          data={facultyData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.TopConatiner}>
              <Text style={[styles.Text, { textAlign: 'center' }]}>Name: {item.name}</Text>
              <Text style={[styles.Text, { textAlign: 'center' }]}>Email: {item.email}</Text>
              <Text style={[styles.Text, { textAlign: 'center' }]}>Phone: {item.phone}</Text>
            </View>
          )}
        />


      </View>

      <Text style={styles.headingText} >UpComming Classes : </Text>
      <View>
        <FlatList
          data={classData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.BottomConatiner}>


              <View>

                <View style={styles.TextContainer}>
                  <Text style={styles.Text}>Batch:{item.batch}</Text>
                  <Text style={styles.Text}>Subject: {item.subject}</Text>
                </View>
                <TouchableOpacity style={styles.attendanceContainer} onPress={() => navigation.navigate('FAttendance')} >
                  <Text style={styles.attendanceText}>Take Attendance</Text>
                </TouchableOpacity>
              </View>



              <View>
                <View style={styles.TextContainer}>
                  <Text style={[styles.Text, { marginLeft: normalize(40), }]}> Time: {item.time}</Text>
                  <Text style={[styles.Text, { marginLeft: normalize(40), }]}>Room Number: {item.room}</Text>
                </View>
              </View>

            </View>
          )}
        />
      </View>
      <View style={styles.optionConatiner}>

      </View>
    </View>
  );
};

export default FHome;

const styles = StyleSheet.create({

  Conatiner: {
    flex: normalize(1),



  },
  TopConatiner: {
    marginTop: normalize(25),
  },
  Text: {
    fontWeight: 'bold',
    marginTop: normalize(5),
    fontSize: normalize(15),


  },
  BottomConatiner: {
    flexDirection: 'row',
    width: '95%',
    height: normalize(80),
    marginLeft: normalize(10),
    borderWidth: normalize(1),
    marginTop: normalize(25),
    borderRadius: normalize(10)

  },
  headingText: {
    fontWeight: 'bold',
    fontSize: normalize(18),
    marginTop: normalize(15),
    marginLeft: normalize(10),
  },
  attendanceContainer: {
    borderWidth: normalize(1),
    marginLeft: normalize(10),
    height: normalize(25),
    marginTop: normalize(15),
    borderRadius: normalize(5),
    backgroundColor: '#003049'
  },
  attendanceText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    padding: normalize(2),


  },
  optionConatiner: {

  },
  optionButton: {

  },
  optionText: {

  }


});
