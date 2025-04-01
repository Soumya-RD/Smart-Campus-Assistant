import { StyleSheet, Text, View, Dimensions, PixelRatio, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'


const { width: screenWidth } = Dimensions.get('window');
const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const FNotification = ({ route }) => {
  const { facultyName } = route.params;
  return (
    <View style={styles.Container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Reach Your Audience Instantly </Text>
        <Text style={styles.heading}>Send a Notification and Spark Immediate Action!</Text>
      </View>
      <Text style={styles.name}>Name  : {facultyName} </Text>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText} >Notification Box</Text>
        <TextInput placeholder='Write the message ...' style={styles.input} placeholderTextColor='#000' />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Send</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FNotification

const styles = StyleSheet.create({

  Container: {
    flex: 1,

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
    height: '15%'
  },
  heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: normalize(14),
    paddingVertical:normalize(5)

  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: normalize(15),
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
    marginHorizontal: normalize(10),
  },
  notificationText: {
    fontWeight: 'black',
    fontSize: normalize(15),
    textAlign: 'center',
    
  },
  input: {
    borderWidth: 1,
    height: '30%',
    marginVertical: normalize(30),
    borderRadius: normalize(10),
    paddingHorizontal: normalize(10),
    color:'#000'
  },
  button: {
    borderWidth: 1,
    height: normalize(40),
    marginHorizontal: normalize(70),
    borderRadius: normalize(10),
    backgroundColor: 'darkgreen'
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: normalize(15),
    paddingVertical: normalize(8),
    color: '#fff'
  }


})