import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, PixelRatio } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AdminSignUp from '../Admin/AdminSignUp';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window')
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));


const Welcom = ({ Navigate }) => {
    const Navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.textConatiner}>
                <Text style={styles.text}>Once a part of</Text>
                <Text style={styles.text}>NMIET </Text>
                <Text style={styles.text}>forever connected as one </Text>
                <Text style={styles.text}>community !</Text>
            </View>


            <View style={styles.cardContainer} >
                <TouchableOpacity style={styles.card} onPress={() => Navigation.navigate(AdminSignUp)}>
                    <Image source={require('./admin.png')} style={styles.image} />
                    <Text style={styles.CardText}>Admins </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => Navigation.navigate('FSignIn')} >
                    <Image source={require('./teacher.jpg')} style={styles.image} />
                    <Text style={styles.CardText}>Faculty</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={() => Navigation.navigate('SSignUp')}>
                    <Image source={require('./NonTeaching.jpg')} style={styles.image} />
                    <Text style={styles.CardText}>Supporters </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => Navigation.navigate('PSignIn')} >
                    <Image source={require('./StudentCard.jpg')} style={styles.image} />
                    <Text style={styles.CardText}>Pupils</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
};

export default Welcom;


// :normalize(),
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edf2f4'
    },
    textConatiner: {
        marginVertical: normalize(30),
    },
    text: {
        fontWeight: 'bold',
        fontSize: normalize(17),
        textAlign: 'center'
    },
    cardContainer: {
        flexDirection: 'row',
        width: '95%',
        marginVertical: normalize(20),


    },
    card: {
        width: '40%',
        backgroundColor: '#264653',
        marginHorizontal: normalize(22),
        borderRadius: normalize(15),
        height: '100%'
    },
    image: {

        height: normalize(75),
        width: '55%',
        marginHorizontal: normalize(35),
        marginVertical: normalize(30),
        borderRadius: normalize(5),

    },

    CardText: {
        backgroundColor: '#edede9',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '60%',
        fontSize: normalize(15),
        marginVertical: normalize(20),
        marginHorizontal: normalize(32),

    },

});
