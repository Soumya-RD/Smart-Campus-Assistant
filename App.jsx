

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
import FChat from './android/app/src/Faculty/FChat';
import FNotification from './android/app/src/Faculty/FNotification';
import FSetting from './android/app/src/Faculty/FSetting';
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
        <Stack.Screen name='Welcom' component={Welcom} />
       

        {/* Admin */}
        <Stack.Screen name='AdminSignUp' component={AdminSignUp} />
        <Stack.Screen name='AdminSignIn' component={AdminSignIn} />

        {/* faculty */}

        <Stack.Screen name='FSignIn' component={FSignIn} />
        <Stack.Screen name='FHome' component={FHome} />
        <Stack.Screen name='FAttendance' component={FAttendance} />
        <Stack.Screen name='FNotification' component={FNotification} />
        <Stack.Screen name='FSetting' component={FSetting} />
        <Stack.Screen name='FChat' component={FChat} />

        {/* Supporters */}
        <Stack.Screen name='SSignIn' component={SSignIn} />
        <Stack.Screen name='SSignUp' component={SSignUp} />


        {/* Pupils */}
        <Stack.Screen name='PSignIn' component={PSignIn} />
        <Stack.Screen name='PSignUp' component={PSignUp} />
        <Stack.Screen name='PHome' component={PHome} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})