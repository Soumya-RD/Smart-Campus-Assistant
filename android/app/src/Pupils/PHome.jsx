import { Alert, Dimensions, PixelRatio, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PChat from './PChat';
import PNotification from './PNotification';
import PSetting from './PSetting';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native-gesture-handler';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window')
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const PHome = () => {
  const Tab = createBottomTabNavigator();
  const route = useRoute();
  const { reg } = route.params;

  const [atnData, setAtnData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentDocument = await firestore().collection('mca2nd').where('reg', '==', reg).get();
        if (studentDocument.exist) {
          const data = { id: studentDocument.id, ...studentDocument.data() };
          setAtnData([data]);
        }
      } catch (error) {
        Alert.alert('Error', 'Data not found.');
      }
    };
    fetchData();

  }, [])

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Tab.Screen
        name=" "
        component={() => (

          <FlatList
            data={atnData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View>

                <Text>{item.attendanceStatus}</Text>
              </View>
            )}
          />

        )}
      />
      <Tab.Screen name="Chat" component={PChat} />
      <Tab.Screen name="Notification" component={PNotification} />
      <Tab.Screen name="Setting" component={PSetting} />
    </Tab.Navigator>
  );
}

export default PHome;

const styles = StyleSheet.create({});
