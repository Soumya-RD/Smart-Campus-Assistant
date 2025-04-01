import { StyleSheet, Text, View, ScrollView, Dimensions, PixelRatio } from 'react-native';
import React from 'react';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const Help = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Help & Support for Smart Campus Application</Text>
                <Text style={styles.date}>Effective Date: April 25, 2025</Text>

                <Text style={styles.text}>
                    Welcome to Smart Campus Help & Support. We are committed to providing you with a seamless experience on our mobile application. If you have any questions or require assistance, please review the sections below or reach out to our support team.
                </Text>

                <Text style={styles.sectionTitle}>1. General Help</Text>
                <Text style={styles.text}>
                    Smart Campus is designed to help students and faculty manage their academic and campus-related activities. If you're new to the app, here are some general tips to get started:
                </Text>
                <Text style={styles.listItem}>- Explore the main dashboard for an overview of all campus activities.</Text>
                <Text style={styles.listItem}>- Create a user account to access features like course schedules, notifications, and more.</Text>
                <Text style={styles.listItem}>- Use the search bar to find your courses, professors, or campus services easily.</Text>

                <Text style={styles.sectionTitle}>2. Account & Registration</Text>
                <Text style={styles.text}>
                    If you're having trouble creating an account or logging in, please check the following:
                </Text>
                <Text style={styles.listItem}>- Ensure your email address is valid and entered correctly.</Text>
                <Text style={styles.listItem}>- If you forgot your password, use the "Forgot Password" option to reset it.</Text>
                <Text style={styles.listItem}>- For any login issues, contact our support team at dsoumyaranjan026@gmail.com.</Text>

                <Text style={styles.sectionTitle}>3. App Features</Text>
                <Text style={styles.text}>
                    Smart Campus includes various features to help students and staff manage their daily tasks. Some key features include:
                </Text>
                <Text style={styles.listItem}>- Course Management: View your schedule, course materials, and assignments.</Text>
                <Text style={styles.listItem}>- Notifications: Get real-time updates on campus events, class cancellations, and deadlines.</Text>
                <Text style={styles.listItem}>- Campus Map: Use our interactive campus map to locate buildings, rooms, and facilities.</Text>

                <Text style={styles.sectionTitle}>4. Privacy & Security</Text>
                <Text style={styles.text}>
                    We take your privacy seriously. Here's how we protect your data:
                </Text>
                <Text style={styles.listItem}>- Your personal information is securely stored and never shared with third parties without your consent.</Text>
                <Text style={styles.listItem}>- For more details, please review our Privacy Policy.</Text>
                <Text style={styles.text}>
                    If you have concerns about privacy or security, please contact us immediately at dsoumyaranjan026@gmail.com.
                </Text>

                <Text style={styles.sectionTitle}>5. Technical Support</Text>
                <Text style={styles.text}>
                    If you're encountering any technical issues or bugs within the app:
                </Text>
                <Text style={styles.listItem}>- Ensure your app is up to date by checking for updates in the app store.</Text>
                <Text style={styles.listItem}>- Restart the app to fix minor glitches.</Text>
                <Text style={styles.listItem}>- If the issue persists, please contact our technical support team via email at dsoumyaranjan026@gmail.com.</Text>

                <Text style={styles.sectionTitle}>6. Contact Us</Text>
                <Text style={styles.text}>
                    If you have any further questions or need personalized assistance, feel free to reach out to us:
                </Text>
                <Text style={styles.listItem}>- Email: dsoumyaranjan026@gmail.com</Text>
                <Text style={styles.listItem}>- Phone: (+91) 8260651813</Text>

                <Text style={styles.text}>We’re here to help!</Text>
            </ScrollView>
        </View>
    );
}

export default Help;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    title: {
        fontSize: normalize(24),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    date: {
        fontSize: normalize(16),
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
    },
    text: {
        fontSize: normalize(14),
        lineHeight: normalize(20),
        marginBottom: 10,
        color: '#333',
    },
    listItem: {
        fontSize: normalize(14),
        marginLeft: 20,
        color: '#333',
    },
});
