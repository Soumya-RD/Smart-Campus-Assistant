import { StyleSheet, Text, View, Dimensions, PixelRatio, Alert, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const { width: ScreenWidth } = Dimensions.get('window');
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const STodoAdd = () => {
  const route = useRoute();
  const { sid } = route.params;

  const [todo, setTodo] = useState('');

  const saveTodo = async () => {
    if (todo.trim()) {
      try {

        await firestore().collection('supstaff').doc(sid).collection('todo').add({
          task: todo,
          completed: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        setTodo('');
      } catch (error) {
        Alert.alert('Error', 'Error adding to-do.');
      }
    } else {
      Alert.alert("Warning !", "Please enter a task.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>New To-do</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a new To-do"
          placeholderTextColor="#000"
          style={styles.input}
          value={todo}
          onChangeText={setTodo}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, { opacity: todo.trim() ? 1 : 0.6 }]}
        onPress={saveTodo}
        disabled={!todo.trim()}
      >
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default STodoAdd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: normalize(100),
  },
  header: {
    fontSize: normalize(16),
    textAlign: 'center',
    marginVertical: normalize(15),
    fontWeight: 'bold',
  },
  inputContainer: {
    marginHorizontal: normalize(20),
  },
  input: {
    borderWidth: 1,
    marginVertical: normalize(15),
    borderRadius: normalize(15),
    paddingHorizontal: normalize(10),
    fontSize: normalize(16),
  },
  button: {
    borderWidth: 1,
    marginHorizontal: normalize(110),
    marginVertical: normalize(20),
    height: normalize(35),
    borderRadius: normalize(5),
    backgroundColor: '#073b4c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: normalize(15),
    fontWeight: '500',
    color: '#fff',
  },
});
