import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, PixelRatio, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window')
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));


const Welcom = ({ Navigate }) => {

    const Navigation = useNavigation();
    const handleStudentSignIn = () => {
        Navigation.navigate('PSignIn');
        Alert.alert('Warning', 'Please use class names in the format: mca1st, mca2nd, btech4th, etc.');

    }
    return (
        <View style={styles.container}>
            <View style={styles.textConatiner}>
                <Text style={styles.text}>Once a part of</Text>
                <Text style={styles.text}>NMIET </Text>
                <Text style={styles.text}>forever connected as one </Text>
                <Text style={styles.text}>community !</Text>
            </View>


            <View style={styles.cardContainer} >
                <TouchableOpacity style={styles.card} onPress={() => Navigation.navigate('AdminSignIn')}>
                    <Image source={require('./admin.png')} style={styles.image} />
                    <Text style={styles.CardText}>Admins </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => Navigation.navigate('FSignIn')} >
                    <Image source={require('./teacher.jpg')} style={styles.image} />
                    <Text style={styles.CardText}>Faculty</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={() => Navigation.navigate('SSignIn')}>
                    <Image source={require('./NonTeaching.jpg')} style={styles.image} />
                    <Text style={styles.CardText}>Supporters </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={handleStudentSignIn} >
                    <Image source={require('./StudentCard.jpg')} style={styles.image} />
                    <Text style={styles.CardText}>Pupils</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
};

export default Welcom;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edf2f4'
    },
    textConatiner: {
        marginVertical: normalize(40),
    },
    text: {
        fontWeight: 'bold',
        fontSize: normalize(17),
        textAlign: 'center'
    },
    cardContainer: {
        flexDirection: 'row',
        width: '90%',
        marginVertical: normalize(15),



    },
    card: {
        width: '40%',
        backgroundColor: '#264653',
        marginHorizontal: normalize(25),
        borderRadius: normalize(5),
        height: '100%',
        alignItems: 'center',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 10,
        shadowRadius: 10,
        elevation: 5,

    },
    image: {

        height: normalize(75),
        width: '65%',
        height: normalize(90),
        marginVertical: normalize(30),
        borderRadius: normalize(5),

    },

    CardText: {
        backgroundColor: '#edede9',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '60%',
        fontSize: normalize(15),
        marginVertical: normalize(10),
        borderRadius: normalize(5),

    },

});
