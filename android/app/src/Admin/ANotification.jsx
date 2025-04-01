import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Dimensions, PixelRatio } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');
const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const ANotification = () => {
  const route = useRoute();
  const { adminName } = route.params;

  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() === '') {
      Alert.alert('Error', 'Please write a message to send.');
    } else {
      Alert.alert('Notification Sent', `Message: ${message}`);
      setMessage('');
    }
  };

 
  useEffect(() => {
    console.log('Admin Name:', adminName); 
  }, [adminName]);

  return (
    <View style={styles.Container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Reach Your Audience Instantly</Text>
        <Text style={styles.heading}>Send a Notification and Spark Immediate Action!</Text>
      </View>

    
      <Text style={styles.name}>Name: {adminName || 'Loading...'}</Text> 
      
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>Notification Box</Text>
        <TextInput
          placeholder="Write the message ..."
          style={styles.input}
          placeholderTextColor="#000"
          value={message}
          onChangeText={setMessage}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.text}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ANotification;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: normalize(10),
  },
  headingContainer: {
    backgroundColor: '#fff',
    padding: normalize(15),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: normalize(25),
    marginHorizontal: normalize(10),
  },
  heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: normalize(14),
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: normalize(15),
    marginVertical: normalize(10),
  },
  notificationContainer: {
    backgroundColor: '#fff',
    padding: normalize(15),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: normalize(25),
  },
  notificationText: {
    fontWeight: 'black',
    fontSize: normalize(15),
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    height: normalize(120),
    marginVertical: normalize(15),
    borderRadius: normalize(10),
    paddingHorizontal: normalize(10),
    color: '#000',
    textAlignVertical: 'top',
  },
  button: {
    height: normalize(40),
    marginHorizontal: normalize(70),
    borderRadius: normalize(10),
    backgroundColor: 'darkgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: normalize(15),
    paddingVertical: normalize(8),
    color: '#fff',
  },
});
