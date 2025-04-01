import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PPay = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>EduPay</Text>
    </View>
  )
}

export default PPay

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    marginVertical: 15
  }
})