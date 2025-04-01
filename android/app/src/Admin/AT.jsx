import { StyleSheet, Text, View, FlatList, Alert, Dimensions, PixelRatio } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const { width: ScreenWidth } = Dimensions.get('window');
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const AT = () => {
  const route = useRoute();
  const { tid } = route.params;

  const [facultyData, setFacultyData] = useState([]);

  const handleFacultySearch = async () => {
    try {

      const facultyCollection = firestore().collection('faculty');
      const snapshot = await facultyCollection.where('tid', '==', tid).get();

      if (!snapshot.empty) {
        const facultyList = snapshot.docs.map(doc => doc.data());
        setFacultyData(facultyList);
      } else {
        Alert.alert('No Data', 'No faculty found with the provided TID.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while searching for faculty.');
    }
  };


  useEffect(() => {
    handleFacultySearch();
  }, [tid]);

  const renderItem = ({ item }) => (
    <View style={styles.facultyItem}>
      <Text style={styles.item}>{`Name: ${item.name}`}</Text>
      <Text style={styles.item}>{`TID: ${item.tid}`}</Text>
      <Text style={styles.item}>{`Department: ${item.department}`}</Text>
      <Text style={styles.item}>{`Email: ${item.email}`}</Text>
      <Text style={styles.item}>{`Phone: ${item.phone}`}</Text>
      <Text style={styles.item}>{`Join Date: ${item.join}`}</Text>
      <Text style={styles.item}>{`Aadhar Number: ${item.Aadhar}`}</Text>
      <Text style={styles.item}>{`Gender: ${item.gender}`}</Text>
      <Text style={styles.item}>{`Highest Qualification: ${item.higherQualification}`}</Text>
      <Text style={styles.item}>{`Experience: ${item.experience}`}</Text>
      <Text style={styles.item}>{`Disability: ${item.disability}`}</Text>
      <Text style={styles.item}>{`State: ${item.state}`}</Text>
      <Text style={styles.item}>{`Nationality: ${item.nationality}`}</Text>

    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Faculty Data</Text>
      <FlatList
        data={facultyData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.tid || index.toString()}
        ListEmptyComponent={<Text>No faculty found</Text>}
      />
    </View>
  );
};

export default AT;

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
  facultyItem: {
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
