// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// // Firebase App Initialization
// import firebase from '@react-native-firebase/app';

// const firebaseConfig = {
//   apiKey: "AIzaSyAFKpeIGjEnQC15QXy0074Cmb6zZOgE_ao",
//   authDomain: "smart-campus-262e3.firebaseapp.com",
//   projectId: "smart-campus-262e3",
//   storageBucket: "smart-campus-262e3.firebasestorage.app",
//   messagingSenderId: "970351393838",
//   appId: "1:970351393838:android:7f0a54914a39784994b3bf",
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const App = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getDatabase();
//   }, []);

//   const getDatabase = async () => {
//     try {
//       const documentSnapshot = await firestore()
//         .collection('testing')
//         .doc('TCnFOCw1TM8qHYACBDdY')
//         .get();

//       if (documentSnapshot.exists) {
//         setData([documentSnapshot.data()]); // Wrap in an array for FlatList compatibility
//       } else {
//         setError('No data found');
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : error ? (
//         <Text style={styles.errorText}>{error}</Text>
//       ) : (
//         <FlatList
//           data={data}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.itemContainer}>
//               <Text style={styles.itemText}>Name: {item.name}</Text>
//               <Text style={styles.itemText}>Age: {item.age}</Text>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f8f9fa',
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//     textAlign: 'center',
//   },
//   itemContainer: {
//     padding: 10,
//     backgroundColor: '#e9ecef',
//     borderRadius: 8,
//     marginVertical: 5,
//     width: '100%',
//   },
//   itemText: {
//     fontSize: 16,
//   },
// });



//Project Code
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Welcom from './android/app/src/Screen/Welcom';
import AdminSignUp from './android/app/src/Admin/AdminSignUp';
import AdminSignIn from './android/app/src/Admin/AdminSignIn';
import FacultySignUp from './android/app/src/Faculty/FacultySignUp';
import FSignIn from './android/app/src/Faculty/FSignIn';
import SSignUp from './android/app/src/Supporters/SSignUp';
import SSignIn from './android/app/src/Supporters/SSignIn';
import PSignUp from './android/app/src/Pupils/PSignUp';
import PSignIn from './android/app/src/Pupils/PSignIn';



const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcom'>
        <Stack.Screen name='Welcom' component={Welcom} />


        {/* Admin */}
        <Stack.Screen name='AdminSignUp' component={AdminSignUp} />
        <Stack.Screen name='AdminSignIn' component={AdminSignIn} />

        {/* faculty */}
        <Stack.Screen name='FacultySignUp' component={FacultySignUp} />
        <Stack.Screen name='FSignIn' component={FSignIn} />

        {/* Supporters */}
        <Stack.Screen name='SSignIn' component={SSignIn} />
        <Stack.Screen name='SSignUp' component={SSignUp} />


        {/* Pupils */}
        <Stack.Screen name='PSignIn' component={PSignIn} />
        <Stack.Screen name='PSignUp' component={PSignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})