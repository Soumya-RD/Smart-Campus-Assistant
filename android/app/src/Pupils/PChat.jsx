import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Dimensions, PixelRatio } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const isValidEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

const { width: screenWidth } = Dimensions.get('window');
const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const PChat = () => {
  const [message, setMessage] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true); 
  const flatListRef = useRef(null); 

  
  const sendMessage = async () => {
    if (message.trim() === '' || receiverEmail.trim() === '') {
      return; 
    }

    if (!isValidEmail(receiverEmail)) {
      setIsEmailValid(false);
      return;
    }

    setIsEmailValid(true);

    setLoading(true);

    const currentUser = auth().currentUser;
    const newMessage = {
      text: message,
      senderId: currentUser.uid,
      senderEmail: currentUser.email,  
      receiverEmail: receiverEmail,
      timestamp: firestore.FieldValue.serverTimestamp(),
    };

    try {
      await firestore().collection('messages').add(newMessage);
      setMessage(''); 
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  
  const clearChat = async () => {
    try {
      const currentUser = auth().currentUser;
      const messagesQuery = firestore().collection('messages').where('senderId', '==', currentUser.uid);
      const snapshot = await messagesQuery.get();

      snapshot.forEach(async (doc) => {
        await doc.ref.delete(); 
      });

      setMessages([]); 
      setReceiverEmail(''); 
    } catch (error) {
      console.error('Error clearing chat: ', error);
    }
  };

 
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((querySnapshot) => {
        const newMessages = [];
        querySnapshot.forEach((doc) => {
          newMessages.push(doc.data());
        });
        setMessages(newMessages);
      });

    return () => unsubscribe();
  }, []);

  
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.Container}>
      <View style={styles.topContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Your Message, Your Way</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter receiver's email address..."
            placeholderTextColor="#000"
            style={styles.input}
            value={receiverEmail}
            onChangeText={setReceiverEmail}
          />
          {!isEmailValid && <Text style={styles.errorText}>Invalid email format</Text>}
          <View style={styles.messageConatiner}>
            <TextInput
              placeholder="Typing..."
              placeholderTextColor="#000"
              style={styles.messageBox}
              value={message}
              onChangeText={setMessage}
            />
          </View>
          <TouchableOpacity style={styles.buttonContainer} onPress={sendMessage} disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Sending...' : 'Start Conversation'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.chatContainer}>
        <FlatList
          ref={flatListRef} 
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>From: {item.senderEmail}</Text> 
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.messageText}>To: {item.receiverEmail}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.buttomContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearChat}>
          <Text style={styles.clearText}>Clear Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PChat;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: '#fff',
    padding: normalize(15),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: normalize(15),
    marginHorizontal: normalize(10),
  },
  textContainer: {
    marginHorizontal: normalize(60),
    backgroundColor: '#000',
    marginVertical: normalize(10),
    borderRadius: normalize(10),
  },
  text: {
    fontWeight: 'bold',
    fontSize: normalize(16),
    textAlign: 'center',
    color: '#fff',
    paddingVertical: normalize(8),
  },
  inputContainer: {},
  input: {
    borderWidth: 1,
    marginHorizontal: normalize(10),
    borderRadius: normalize(5),
    paddingHorizontal: normalize(15),
    color: '#000',
    marginVertical: normalize(5),
  },
  errorText: {
    color: 'red',
    fontSize: normalize(12),
    textAlign: 'center',
  },
  buttonContainer: {

    height: normalize(40),
    marginHorizontal: normalize(80),
    marginVertical: normalize(12),
    borderRadius: normalize(10),
    backgroundColor: '#073b4c',
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: normalize(10),
    color: '#fff',
  },
  chatContainer: {
    height: '50%',
    marginHorizontal: normalize(10),
    backgroundColor: '#caf0f8',
    borderRadius: normalize(10),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  messageBubble: {
    padding: normalize(10),
    backgroundColor: '#001524',
    borderRadius: normalize(10),
    marginVertical: normalize(10),
    marginHorizontal: normalize(10),
  },
  messageText: {
    color: '#fff',
    fontSize: normalize(14),
  },
  buttomContainer: {
    backgroundColor: '#fff',
    padding: normalize(15),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: normalize(15),
    marginHorizontal: normalize(10),
  },
  messageConatiner: {
    marginVertical: normalize(10),
  },
  messageBox: {
    borderWidth: 1,
    borderRadius: normalize(10),
    paddingHorizontal: normalize(15),
    color: '#000',
    marginHorizontal: normalize(10),

  },

  clearButton: {
    backgroundColor: '#ff6347',
    paddingVertical: normalize(10),
    borderRadius: normalize(10),
    marginHorizontal: normalize(60),
  },
  clearText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
