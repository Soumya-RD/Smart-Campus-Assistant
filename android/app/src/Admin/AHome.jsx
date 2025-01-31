import { StyleSheet, Text, View, Dimensions, PixelRatio, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AChat from './AChat';
import ANotification from './ANotification';
import ASetting from './ASetting';
import AT from './AT';
import AS from './AS';




const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window')
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));
const AHome = () => {
  const Tab = createBottomTabNavigator();

  return (

    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        options={{ headerShown: false }}
        component={() => (
          <View style={styles.container}>
            <View style={styles.detailsContainer}>
              <View style={styles.details}>
                <Text style={styles.text}>Name :Jagannath Samal</Text>
                <Text style={styles.text}>Email :nm@jagannathsamal88gmail.com </Text>
              </View>
              <View >
                <Image source={require('./admin.png')} style={styles.imageContainer} />

              </View>
            </View>
            <View style={styles.searchContainer}>
              <View style={styles.mettingContainer}>
                <Text style={styles.heading}>Create a meeting :</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.sendLinkText}>Send link ... </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.inputContainer, { height: normalize(140) }]}>
                <Text style={styles.heading}>Search student:</Text>
                <TextInput placeholder='batch' placeholderTextColor='#000' style={styles.input} />
                <TextInput placeholder='registation number' placeholderTextColor='#000' style={styles.input} />
                <TouchableOpacity style={styles.searchButton}>
                  <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.heading}>Search faculty:</Text>
                <TextInput placeholder='tid' placeholderTextColor='#000' style={styles.input} />
                <TouchableOpacity style={styles.searchButton}>
                  <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.heading}>Search support staff:</Text>
                <TextInput placeholder='sid' placeholderTextColor='#000' style={styles.input} />
                <TouchableOpacity style={styles.searchButton}>
                  <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        )}
      />
      <Tab.Screen name='Chat' component={AChat}  options={{ headerShown: false }} />
      <Tab.Screen name='Notification' component={ANotification}  options={{ headerShown: false }} />
      <Tab.Screen name='Setting' component={ASetting}  options={{ headerShown: false }}/>

    </Tab.Navigator>

  );
};

export default AHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007f5f'
  },
  detailsContainer: {
    shadowColor: '#fff',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: normalize(15),
    marginHorizontal: normalize(20),
    height: '20%',
    borderRadius: normalize(10),
    flexDirection: 'row',
    backgroundColor: '#f4f3ee'
  },

  details: {
    width: '65%',
    marginHorizontal: normalize(5),
    marginVertical: normalize(30),
  },
  text: {
    fontWeight: 'bold',
    fontSize: normalize(15),
    marginVertical: normalize(5),

  },
  imageContainer: {
    borderWidth: 1,
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
    marginVertical: normalize(20),
  },
  searchContainer: {


  },
  heading: {
    fontWeight: 'bold',
    fontSize: normalize(15),
    marginHorizontal: normalize(10),
  },
  mettingContainer: {
    marginVertical: normalize(15),
    marginHorizontal: normalize(20),
    height: normalize(90),
    backgroundColor: '#f2f4f3',
    borderRadius: normalize(10),
  },
  sendLinkText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
  button: {
    marginHorizontal: normalize(90),
    height: normalize(35),
    borderRadius: normalize(10),
    marginVertical: normalize(25),
    paddingVertical: normalize(7),
    backgroundColor: '#283618'
  },
  inputContainer: {

    marginVertical: normalize(10),
    marginHorizontal: normalize(20),
    height: normalize(110),
    borderRadius: normalize(5),
    backgroundColor: '#f6fff8'
  },
  searchText: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: normalize(5),
    color: '#fff'
  },
  searchButton: {

    marginVertical: normalize(10),
    marginHorizontal: normalize(90),
    height: normalize(30),
    borderRadius: normalize(5),
    backgroundColor: '#023047'
  },
  input: {
    borderBottomWidth: 1,
    width: '90%',
    marginHorizontal: normalize(15),
  }

});
