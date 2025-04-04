import { StyleSheet, Text, View, FlatList, Alert, Dimensions, PixelRatio } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const { width: ScreenWidth } = Dimensions.get('window');
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const AS = () => {
  const route = useRoute();
  const { sid } = route.params;

  const [staffData, setStaffData] = useState([]);

  const handleStaffSearch = async () => {
    try {
      const staffCollection = firestore().collection('supstaff');
      const snapshot = await staffCollection.where('sid', '==', sid).get();

      if (!snapshot.empty) {
        const staffList = snapshot.docs.map(doc => doc.data());
        setStaffData(staffList);
      } else {
        Alert.alert('No Data', 'No staff found with the provided SID.');
      }
    } catch (error) {
      console.error('Error searching support staff:', error);
      Alert.alert('Error', 'An error occurred while searching for staff.');
    }
  };


  useEffect(() => {
    handleStaffSearch();
  }, [sid]);

  const renderItem = ({ item }) => (
    <View style={styles.staffItem}>
      <Text style={styles.item}>{`Name: ${item.name}`}</Text>
      <Text style={styles.item}>{`SID: ${item.sid}`}</Text>
      <Text style={styles.item}>{`Role: ${item.role}`}</Text>
      <Text style={styles.item}>{`Joining: ${item.join}`}</Text>
      <Text style={styles.item}>{`Blood: ${item.blood}`}</Text>
      <Text style={styles.item}>{`Phone: ${item.phone}`}</Text>
      <Text style={styles.item}>{`City: ${item.city}`}</Text>


    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Support Staff Data</Text>
      <FlatList
        data={staffData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.sid || index.toString()}
        ListEmptyComponent={<Text>No support staff found</Text>}
      />
    </View>
  );
};

export default AS;

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
  staffItem: {
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
