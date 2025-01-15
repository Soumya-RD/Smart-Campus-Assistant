import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AdminSignUp from '../Admin/AdminSignUp';
const Welcom = ({ Navigate }) => {
    const Navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={[styles.welcomeText, { marginTop: 30 }]}>Once a part of</Text>
            <Text style={styles.collegeNameText}>NMIET </Text>
            <Text style={styles.welcomeText}>forever connected as one </Text>
            <Text style={styles.extraText}>community !</Text>

            <View style={styles.middleView} >
                <TouchableOpacity style={styles.adminView} onPress={() => Navigation.navigate(AdminSignUp)}>
                    <Image source={require('./admin.png')} style={styles.adminImage} />
                    <Text style={styles.CardText}>Admins </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.teacherView} onPress={() => Navigation.navigate('FSignIn')} >
                    <Image source={require('./teacher.jpg')} style={styles.teacherImage} />
                    <Text style={styles.CardText}>Faculty</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomView} >
                <TouchableOpacity style={styles.SupportStaffView} onPress={() => Navigation.navigate('SSignUp')}>
                    <Image source={require('./NonTeaching.jpg')} style={styles.SupportStaffImage} />
                    <Text style={styles.CardText}>Supporters </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pupilsView} onPress={() => Navigation.navigate('PSignIn')} >
                    <Image source={require('./StudentCard.jpg')} style={styles.pupilsImage} />
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
    welcomeText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5
    },
    collegeNameText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    extraText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    middleView: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 50
    },
    adminView: {
        // borderWidth: 1,
        width: 150,
        height: 200,
        borderRadius: 10,
        padding: 25,
        backgroundColor: '#264653'
    },
    adminImage: {
        height: 100,
        width: 100,
        borderRadius: 15,

    },
    teacherView: {
        // borderWidth: 1,
        width: 150,
        marginLeft: 15,
        borderRadius: 15,
        padding: 25,
        backgroundColor: '#264653',
    },
    teacherImage: {
        height: 100,
        width: 100,
        borderRadius: 15,

    },
    bottomView: {
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 50
    },
    SupportStaffView: {
        // borderWidth: 1,
        width: 150,
        height: 200,
        borderRadius: 15,
        padding: 25,
        backgroundColor: '#264653',
    },
    SupportStaffImage: {
        height: 100,
        width: 100,
        borderRadius: 15,


    },
    pupilsView: {
        // borderWidth:1,
        width: 150,
        marginLeft: 15,
        borderRadius: 15,
        padding: 25,
        backgroundColor: '#264653',
    },
    pupilsImage: {
        height: 100,
        width: 100,
        borderRadius: 15,

    },
    CardText: {
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center',
        marginTop: 25,
        borderRadius: 5,
        paddingBottom: 3,
        backgroundColor: '#edede9',

    }

});
