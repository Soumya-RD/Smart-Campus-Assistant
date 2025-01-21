

//Project Code
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import Welcom from './android/app/src/Screen/Welcom';
import AdminSignUp from './android/app/src/Admin/AdminSignUp';
import AdminSignIn from './android/app/src/Admin/AdminSignIn';
import FSignIn from './android/app/src/Faculty/FSignIn';
import FHome from './android/app/src/Faculty/FHome';
import FAttendance from './android/app/src/Faculty/FAttendance';
import SSignUp from './android/app/src/Supporters/SSignUp';
import SSignIn from './android/app/src/Supporters/SSignIn';
import PSignUp from './android/app/src/Pupils/PSignUp';
import PSignIn from './android/app/src/Pupils/PSignIn';
import PHome from './android/app/src/Pupils/PHome';



const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcom'>
        <Stack.Screen name='Welcom' component={Welcom} options={{ headerShown: false }} />


        {/* Admin */}
        <Stack.Screen name='AdminSignUp' component={AdminSignUp} options={{ headerShown: false }} />
        <Stack.Screen name='AdminSignIn' component={AdminSignIn} options={{ headerShown: false }} />

        {/* faculty */}

        <Stack.Screen name='FSignIn' component={FSignIn} options={{ headerShown: false }} />
        <Stack.Screen name='FHome' component={FHome} options={{ headerShown: false }} />
        <Stack.Screen name='FAttendance' component={FAttendance} options={{ headerShown: false }} />


        {/* Supporters */}
        <Stack.Screen name='SSignIn' component={SSignIn} options={{ headerShown: false }} />
        <Stack.Screen name='SSignUp' component={SSignUp} options={{ headerShown: false }} />


        {/* Pupils */}
        <Stack.Screen name='PSignIn' component={PSignIn} options={{ headerShown: false }} />
        <Stack.Screen name='PSignUp' component={PSignUp} options={{ headerShown: false }} />
        <Stack.Screen name='PHome' component={PHome} options={{ headerShown: false }} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})