import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, PixelRatio } from 'react-native'
import React from 'react'
const { width: screenWidth } = Dimensions.get('window');
const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const AChat = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Your Message,Your way</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput placeholder='Enter email address here...' placeholderTextColor="#000" style={styles.input} />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Start Conversion</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chatContainer}>

      </View>
      <View style={styles.messageConatiner}>
        <TextInput placeholder='Typing...' placeholderTextColor='#000' style={styles.messageBox} />
      </View>
      <TouchableOpacity style={styles.sendButton}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AChat

const styles = StyleSheet.create({
  // :normalize(),
  Container: {
    flex: 1,

  },
  textContainer: {
    marginHorizontal: normalize(60),
    height: '6%',
    backgroundColor: '#000',
    marginVertical: normalize(20),
    borderRadius: normalize(10),
  },
  text: {
    fontWeight: 'bold',
    fontSize: normalize(16),
    textAlign: 'center',
    color: '#fff',
    paddingVertical: normalize(8),

  },
  inputContainer: {

  },
  input: {
    borderWidth: 1,
    marginHorizontal: normalize(20),
    borderRadius: normalize(5),
    paddingHorizontal: normalize(15),
  },
  buttonContainer: {
    borderWidth: 1,
    height: normalize(35),
    marginHorizontal: normalize(110),
    marginVertical: normalize(16),
    borderRadius: normalize(10),
    backgroundColor: '#073b4c',
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: normalize(5),
    color: '#fff',

  },
  chatContainer: {
    borderWidth: 1,
    height: '50%',
    marginHorizontal: normalize(10),
    backgroundColor: '#caf0f8',
    borderRadius: normalize(10),
  },
  messageConatiner: {
    marginVertical: normalize(10),

  },
  messageBox: {
    borderWidth: 1,
    marginHorizontal: normalize(10),
    borderRadius: normalize(20),
    paddingHorizontal: normalize(15),
  },
  sendButton: {
    borderWidth: 1,
    borderRadius: normalize(15),
    marginHorizontal: normalize(80),
    height: normalize(35),
    backgroundColor: '#132a13',

  },
  sendText: {
    fontWeight: '800',
    textAlign: 'center',
    paddingVertical: normalize(6),
    color: '#fff',

  }

})