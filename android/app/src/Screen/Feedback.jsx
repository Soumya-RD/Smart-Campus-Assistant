import { StyleSheet, Text, View, Dimensions, PixelRatio, ScrollView } from 'react-native';
import React from 'react';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const Feedback = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Send Feedback for Smart Campus Application</Text>
            <Text style={styles.date}>Effective Date: April 25, 2025</Text>

            <Text style={styles.body}>
                {'\n'}Thank you for using the Smart Campus app! We value your feedback and are committed to improving your experience. If you have suggestions, ideas, or any comments about the app, please feel free to share them with us. Your feedback is important in helping us enhance the app's features and functionality.

                {'\n\n'}How to Send Feedback:

                {'\n'}1. <Text style={styles.bold}>Feature Suggestions:</Text> {'\n'}If you have any ideas on how we can improve the app's features or add new ones, please let us know! We’re always looking for ways to make the app more useful and user-friendly.

                {'\n'}2. <Text style={styles.bold}>Bug Reports:</Text> {'\n'}If you have encountered any bugs or technical issues while using the app, please provide details about the issue. This could include error messages, app crashes, or problems with specific features. Your help will enable us to fix bugs more efficiently.

                {'\n'}3. <Text style={styles.bold}>General Comments:</Text> {'\n'}We’re also open to hearing your general thoughts on the app, whether positive or constructive. Let us know what you like about the app, or what could be improved to enhance your overall experience.

                {'\n\n'}How to Submit Your Feedback:

                {'\n'}1. Open the Send Feedback section within the app.

                {'\n'}2. Select the type of feedback you want to send (e.g., Suggestion, Bug Report, General Comments).

                {'\n'}3. Provide a brief description of your feedback. For bug reports, please include any relevant details such as the steps to reproduce the issue and screenshots if possible.

                {'\n'}4. Press Submit to send your feedback directly to our team.

                {'\n\n'}Contact Us for Immediate Assistance:

                {'\n'}If you need urgent support or prefer to contact us directly, you can reach us through the following:

                {'\n'}Email: <Text style={styles.link}>dsoumyaranjan026@gmail.com</Text>

                {'\n'}Phone: (+91) 8260651813

                {'\n\n'}We appreciate your input and look forward to hearing from you!

                {'\n\n'}Thank You for Your Feedback!

                {'\n'}Your suggestions help us make Smart Campus a better app. We are constantly working to enhance your experience, and your feedback is an essential part of that process.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: normalize(16),
        paddingBottom: normalize(30),
    },
    title: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        marginBottom: 8,
    },
    date: {
        fontSize: normalize(14),
        color: 'gray',
        marginBottom: 12,
    },
    body: {
        fontSize: normalize(14),
        lineHeight: 20,
    },
    bold: {
        fontWeight: 'bold',
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default Feedback;
