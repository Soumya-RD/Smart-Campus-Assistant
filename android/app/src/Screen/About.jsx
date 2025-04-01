import React from 'react';
import { View, Text, StyleSheet, PixelRatio, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const scale = (size) => (screenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const About = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>About the App</Text>
            <Text style={styles.description}>This is a smart campus management app that helps students and faculty members manage their daily tasks.</Text>

            <Text style={styles.details}>Version: 1.0.0</Text>
            <Text style={styles.details}>Developed by: Madlnno Tech</Text>
            <Text style={styles.details}>Contact: dsoumyaranjan026@gmail.com</Text>

        </View>
    );
};

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        padding: normalize(20),
    },
    header: {
        fontSize: normalize(24),
        fontWeight: 'bold',
        marginVertical: normalize(15),

    },
    description: {
        fontSize: normalize(15),
        fontWeight: 'black',
        padding: normalize(5),
        marginVertical: normalize(10),



    },
    details: {
        fontSize: normalize(14),
        marginVertical: normalize(5),
        fontWeight: '700'
    },
   
});

export default About;
