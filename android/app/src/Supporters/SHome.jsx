import { Alert, StyleSheet, Text, View, FlatList, Dimensions, PixelRatio, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SChat from './SChat';
import SNotification from './SNotification';
import SSetting from './SSetting';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const SHome = () => {
  const route = useRoute();
  const { sid } = route.params;
  const Tab = createBottomTabNavigator();

  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [leaveRequest, setLeaveRequest] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffSnapshot = await firestore()
          .collection('supstaff')
          .where('sid', '==', sid)
          .get();

        if (!staffSnapshot.empty) {
          const staffList = staffSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setStaffData(staffList);
        } else {
          Alert.alert('Error', 'No staff data found.');
        }

      } catch (error) {
        Alert.alert('Error', 'Error fetching staff data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sid]);

  const handleLeaveRequest = () => {
    Alert.alert('Leave Requested', 'Your leave request has been submitted.');
    setLeaveRequest(false);
  };

  const filteredStaffData = staffData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator initialRouteName="SHome" tabBarOptions={{
      activeTintColor: '#4CAF50',
      inactiveTintColor: '#888',
      style: { backgroundColor: '#fff', borderTopWidth: 0 }
    }}>
      <Tab.Screen name="SHome" options={{ headerShown: false }} component={() => (
        <View style={styles.Container}>

          <View style={styles.header}>
            <Text style={styles.headerTitle}>College Account Manager</Text>
          </View>



          <TextInput placeholder='search staff' style={styles.searchInput} placeholderTextColor="#000"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />



          <FlatList
            data={filteredStaffData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.staffContainer}>
                <Text style={styles.role}>{item.role}</Text>
                <Text style={styles.staffData}>Staff Id: {item.sid}</Text>
                <Text style={styles.staffData}>Name: {item.name}</Text>
              </View>
            )}
          />


          {leaveRequest && (
            <View style={styles.leaveRequestContainer}>
              <Button title="Submit Leave Request" onPress={handleLeaveRequest} />
              <Button title="Cancel" onPress={() => setLeaveRequest(false)} />
            </View>
          )}


          <View style={styles.quickAccessContainer}>
            <TouchableOpacity style={styles.quickButton}>
              <Text style={styles.quickButtonText}>Money Receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.quickButton, { backgroundColor: '#780000' }]} onPress={() => setLeaveRequest(true)}>
              <Text style={styles.quickButtonText}>Request Leave</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.qrCode}>
            <TouchableOpacity>
              <Image source={require('./qr.png')} style={styles.image} />
            </TouchableOpacity>
          </View>
          {/* To-Do Button */}
          <TouchableOpacity
            style={styles.todoButton}
            onPress={() => navigation.navigate('STodo', { sid: sid })}
          >
            <Icon name="check-circle" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      )} />


      <Tab.Screen name="Chat" component={SChat} options={{ headerShown: false }} />
      <Tab.Screen name="Notification" component={SNotification} options={{ headerShown: false }} initialParams={{ staffName: staffData.length > 0 ? staffData[0].name : '' }} />
      <Tab.Screen name="Setting" component={SSetting} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,

  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingVertical: normalize(15),
    marginVertical: normalize(10),
    marginHorizontal: normalize(10),
    borderRadius: normalize(8),

  },
  headerTitle: {
    fontSize: normalize(22),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  searchContainer: {
    backgroundColor: '#fff',
    padding: normalize(15),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: normalize(10),
    marginVertical: normalize(5),
  },
  searchInput: {
    height: normalize(40),
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: normalize(8),
    fontSize: normalize(15),
    marginHorizontal: normalize(20),
    paddingHorizontal: normalize(10),
  },
  staffContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: normalize(10),
    marginVertical: normalize(10),
    padding: normalize(15),
    borderRadius: normalize(10),
  },
  role: {
    fontWeight: 'bold',
    fontSize: normalize(20),
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: normalize(5),
  },
  staffData: {
    marginVertical: normalize(5),
    fontWeight: '500',
    fontSize: normalize(14),
    color: '#333',
    marginHorizontal: normalize(15),
  },
  quickAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: normalize(15),
  },
  quickButton: {
    backgroundColor: '#003049',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(30),
    borderRadius: normalize(8),
  },
  quickButtonText: {
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  qrCode: {
    marginTop: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: normalize(150),
    height: normalize(150),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: normalize(10),
    marginVertical: normalize(10),
    padding: normalize(15),
    borderRadius: normalize(10),
  },
  leaveRequestContainer: {
    marginTop: normalize(20),
    padding: normalize(10),
    backgroundColor: '#fff',
    borderRadius: normalize(10),
    elevation: 5,
  },
  todoButton: {
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
});

export default SHome;
