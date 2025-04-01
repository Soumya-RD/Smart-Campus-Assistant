import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, PixelRatio, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const Metting = () => {
    const navigation = useNavigation();
    const [emails, setEmails] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [message, setMessage] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const emailsCollection = await firestore().collection('emails').get();

                if (!emailsCollection.empty) {
                    const Data = emailsCollection.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setEmails(Data);
                } else {
                    Alert.alert('No Data', 'No student data found.');
                }
            } catch (error) {
                Alert.alert('Error', 'Data not found.');
            }
        };
        fetchData();
    }, []);

    const handleSelect = (emailId) => {
        setSelectedEmails(prevSelected => {
            if (prevSelected.includes(emailId)) {
                return prevSelected.filter(id => id !== emailId);
            } else {
                return [...prevSelected, emailId];
            }
        });
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedEmails.includes(item.id);
        return (
            <View style={styles.emailContainer}>
                <TouchableOpacity
                    style={[styles.itemContainer, isSelected && styles.selectedItem]}
                    onPress={() => handleSelect(item.id)}
                >
                    <Text style={[styles.itemText, isSelected && styles.selectedText]}>{item.email}</Text>
                </TouchableOpacity>
            </View>

        );
    };
    const sendMessage = () => {
        Alert.alert('Success.', 'Metting request provided to all the selected emails with your message.')
        setMessage('');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pick emails for meeting</Text>

            <FlatList
                data={emails}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
            />
            <View style={styles.inputContainer}>
                <TextInput placeholder='Write a message for meeting... ' placeholderTextColor="#000"
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                />
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={sendMessage} >
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: normalize(20),
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        height: normalize(55),
        paddingVertical: normalize(10),
        borderRadius: normalize(10),


    },
    emailContainer: {
        backgroundColor: '#b0c4b1',
        shadowColor: '#orange',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    list: {
        flex: 1,
        marginVertical: normalize(20),
    },
    itemContainer: {
        marginVertical: normalize(5),
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        height: normalize(35),
        padding: normalize(5),
        marginHorizontal: normalize(10),
        paddingHorizontal: normalize(20),
        borderRadius: normalize(5),


    },
    selectedItem: {
        backgroundColor: '#D3F9D8',
    },
    itemText: {
        fontSize: normalize(15),
        fontWeight: 'black',

    },
    selectedText: {
        fontWeight: 'bold',
        color: '#008000',
    },
    buttonContainer: {
        borderWidth: 1,
        height: normalize(40),
        marginVertical: normalize(20),
        marginHorizontal: normalize(50),
        backgroundColor: '#081c15',
        borderRadius: normalize(10),
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: normalize(15),
        textAlign: 'center',
        paddingVertical: normalize(7),
        color: '#fff'

    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: normalize(10),

    },
    input: {
        marginLeft: normalize(20),
    }
});

export default Metting;
