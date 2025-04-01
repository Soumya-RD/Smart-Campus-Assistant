import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
  PanResponder,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const { width: screenWidth } = Dimensions.get('window');
const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));


const PTodo = () => {
  const route = useRoute();
  const { registation, batch } = route.params;
  const navigation = useNavigation();
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTodoId, setEditTodoId] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [dragEnabled, setDragEnabled] = useState(false);
  const panResponderRefs = useRef([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todoCollection = await firestore()
          .collection(batch)
          .doc(registation)
          .collection('ptodo')
          .orderBy('createdAt', 'desc')
          .get();

        const todoList = todoCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTodo(todoList);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch todos');
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [registation, batch]);

  const deleteTodo = async (id) => {
    try {
      await firestore()
        .collection(batch)
        .doc(registation)
        .collection('ptodo')
        .doc(id)
        .delete();

      setTodo((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete todo');
    }
  };

  const handleEditTodo = (todo) => {
    setEditTodoId(todo.id);
    setNewTask(todo.task);
  };

  const saveEditedTodo = async () => {
    if (newTask.trim()) {
      try {
        await firestore()
          .collection(batch)
          .doc(registation)
          .collection('ptodo')
          .doc(editTodoId)
          .update({
            task: newTask,
          });

        setTodo((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === editTodoId ? { ...todo, task: newTask } : todo
          )
        );
        setNewTask('');
        setEditTodoId(null);
      } catch (error) {
        Alert.alert('Error', 'Failed to update todo');
      }
    } else {
      Alert.alert('Input Error', 'Task cannot be empty');
    }
  };

  const handleMoveItem = (fromIndex, toIndex) => {
    const updatedTodos = [...todo];
    const [movedItem] = updatedTodos.splice(fromIndex, 1);
    updatedTodos.splice(toIndex, 0, movedItem);
    setTodo(updatedTodos);

    updatedTodos.forEach((item, index) => {
      firestore()
        .collection(batch)
        .doc(registation)
        .collection('ptodo')
        .doc(item.id)
        .update({
          order: index,
        });
    });
  };

  const handleCompleteTodo = async (id, completed) => {
    try {
      await firestore()
        .collection(batch)
        .doc(registation)
        .collection('ptodo')
        .doc(id)
        .update({
          completed: !completed,
        });

      setTodo((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update todo status');
    }
  };

  const createPanResponder = (index) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => dragEnabled,
      onPanResponderMove: (evt, gestureState) => {
        const moveY = gestureState.moveY - gestureState.y0;
        const itemHeight = normalize(100);
        const newIndex = Math.floor(moveY / itemHeight);

        if (newIndex !== index && newIndex >= 0 && newIndex < todo.length) {
          handleMoveItem(index, newIndex);
        }
      },
      onPanResponderRelease: () => {
        panResponderRefs.current[index] && panResponderRefs.current[index].setOffset({
          x: 0,
          y: 0,
        });
      },
    });
  };

  const renderTodo = ({ item, index }) => {
    const panResponder = createPanResponder(index);
    return (
      <Animated.View
        style={[
          styles.todoItem,
          item.completed && styles.completedTodo,
        ]}
        {...panResponder.panHandlers}
      >
        <Text
          style={[
            styles.todoText,
            item.completed && styles.completedText,
          ]}
        >
          {item.task}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => handleCompleteTodo(item.id, item.completed)}
          >
            <Text style={styles.buttonText}>
              {item.completed ? 'Undo' : 'Complete'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditTodo(item)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTodo(item.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  if (loading) {
    return <Text>Loading todos...</Text>;
  }

  return (
    <View style={styles.container}>
      {editTodoId && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            value={newTask}
            onChangeText={setNewTask}
            placeholder="Edit task"
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveEditedTodo}>
            <Text style={styles.buttonText}>Save Edit</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={todo}
        keyExtractor={(item) => item.id}
        renderItem={renderTodo}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('PTodoAdd', { registation: registation, batch: batch })}
      >
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.toggleDragButton}
        onPress={() => setDragEnabled(!dragEnabled)}
      >
        <Text style={styles.buttonText}>{dragEnabled ? 'Disable Drag' : 'Enable Drag'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: normalize(20),

  },
  todoItem: {
    backgroundColor: '#fff',
    padding: normalize(10),
    borderRadius: normalize(15),
    marginHorizontal: normalize(20),
    marginVertical: normalize(10),
    height: normalize(100),
  },
  completedTodo: {
    backgroundColor: '#f2f2f2',
  },
  todoText: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    borderWidth: 1,
    textAlign: 'center',
    marginVertical: normalize(5),
    height: normalize(40),
    padding: normalize(5),
    borderRadius: normalize(10),
    backgroundColor: '#cae9ff',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#a1a1a1',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(10),
  },
  completeButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(10),
  },
  editButton: {
    backgroundColor: '#f39c12',
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(10),
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(10),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editContainer: {
    marginBottom: normalize(20),
    backgroundColor: '#fff',
    padding: normalize(15),
    borderRadius: normalize(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    marginVertical: normalize(15),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(5),
    fontSize: normalize(16),
  },
  saveButton: {
    backgroundColor: '#073b4c',
    paddingVertical: normalize(10),
    borderRadius: normalize(5),
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: normalize(30),
    right: normalize(30),
    backgroundColor: '#2ecc71',
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  toggleDragButton: {
    position: 'absolute',
    bottom: normalize(100),
    right: normalize(30),
    backgroundColor: '#8e44ad',
    width: normalize(150),
    height: normalize(40),
    borderRadius: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});
