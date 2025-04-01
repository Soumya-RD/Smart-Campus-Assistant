

//App.jsx
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import Welcom from './android/app/src/Screen/Welcom';
import AHome from './android/app/src/Admin/AHome';
import AdminSignIn from './android/app/src/Admin/AdminSignIn';
import Metting from './android/app/src/Admin/Metting';
import AT from './android/app/src/Admin/AT';
import AS from './android/app/src/Admin/AS';
import AP from './android/app/src/Admin/AP';
import ATodo from './android/app/src/Admin/ATodo';
import ATodoAdd from './android/app/src/Admin/ATodoAdd';

import FSignIn from './android/app/src/Faculty/FSignIn';
import FHome from './android/app/src/Faculty/FHome';
import FAttendance from './android/app/src/Faculty/FAttendance';
import FTodo from './android/app/src/Faculty/FTodo';
import TodoAdd from './android/app/src/Faculty/TodoAdd';

import SHome from './android/app/src/Supporters/SHome';
import SSignIn from './android/app/src/Supporters/SSignIn';
import STodo from './android/app/src/Supporters/STodo';
import STodoAdd from './android/app/src/Supporters/STodoAdd';

import PSignUp from './android/app/src/Pupils/PSignUp';
import PSignIn from './android/app/src/Pupils/PSignIn';
import PHome from './android/app/src/Pupils/PHome';
import PNotification from './android/app/src/Pupils/PNotification';
import PTodo from './android/app/src/Pupils/PTodo';
import PTodoAdd from './android/app/src/Pupils/PTodoAdd';

import About from './android/app/src/Screen/About';
import TnC from './android/app/src/Screen/TnC';
import Help from './android/app/src/Screen/Help';
import Feedback from './android/app/src/Screen/Feedback';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcom'>
        <Stack.Screen name='Welcom' component={Welcom} options={{ headerShown: false }} />


        {/* Admin */}
        <Stack.Screen name='AdminSignIn' component={AdminSignIn} options={{ headerShown: false }} />
        <Stack.Screen name='AHome' component={AHome} options={{ headerShown: false }} />
        <Stack.Screen name='Metting' component={Metting} options={{ headerShown: false }} />
        <Stack.Screen name='AT' component={AT} options={{ headerShown: false }} />
        <Stack.Screen name='AS' component={AS} options={{ headerShown: false }} />
        <Stack.Screen name='AP' component={AP} options={{ headerShown: false }} />
        <Stack.Screen name='ATodo' component={ATodo} options={{ headerShown: false }} />
        <Stack.Screen name='ATodoAdd' component={ATodoAdd} options={{ headerShown: false }} />
        {/* faculty */}
        <Stack.Screen name='FSignIn' component={FSignIn} options={{ headerShown: false }} />
        <Stack.Screen name='FHome' component={FHome} options={{ headerShown: false }} />
        <Stack.Screen name='FAttendance' component={FAttendance} options={{ headerShown: false }} />
        <Stack.Screen name='FTodo' component={FTodo} options={{ headerShown: false }} />
        <Stack.Screen name='TodoAdd' component={TodoAdd} options={{ headerShown: false }} />

        {/* Supporters */}
        <Stack.Screen name='SSignIn' component={SSignIn} options={{ headerShown: false }} />
        <Stack.Screen name='SHome' component={SHome} options={{ headerShown: false }} />
        <Stack.Screen name='STodo' component={STodo} options={{ headerShown: false }}/>
        <Stack.Screen name='STodoAdd' component={STodoAdd} options={{ headerShown: false }} />
        {/* Pupils */}
        <Stack.Screen name='PSignIn' component={PSignIn} options={{ headerShown: false }} />
        <Stack.Screen name='PSignUp' component={PSignUp} options={{ headerShown: false }} />
        <Stack.Screen name='PHome' component={PHome} options={{ headerShown: false }} />
        <Stack.Screen name='PNotification' component={PNotification} options={{ headerShown: false }} />
        <Stack.Screen name='PTodo' component={PTodo} options={{ headerShown: false }} />
        <Stack.Screen name='PTodoAdd' component={PTodoAdd} options={{ headerShown: false }}/>

        <Stack.Screen name='About' component={About} options={{ headerShown: false }} />
        <Stack.Screen name='TnC' component={TnC} options={{ headerShown: false }} />
        <Stack.Screen name='Help' component={Help} options={{ headerShown: false }} />
        <Stack.Screen name='Feedback' component={Feedback} options={{ headerShown: false }} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})