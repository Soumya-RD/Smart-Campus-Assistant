import { Alert, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'



const FHome = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoding] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facultyCollection = await firestore().collection('faculty').get();
        const data = facultyCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFacultyData(data);
        setLoding(false);

      } catch (error) {
        Alert.alert('Error', 'Error fetching faculty data.');
        setLoding(false);
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
    <View>
      <FlatList
        data={facultyData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default FHome

const styles = StyleSheet.create({})