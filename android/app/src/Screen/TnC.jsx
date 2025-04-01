import { StyleSheet, Text, View, Dimensions, PixelRatio, ScrollView } from 'react-native'
import React from 'react'

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window')
const scale = (size) => (ScreenWidth / 375) * size;
const normalize = (size) => PixelRatio.roundToNearestPixel(scale(size));

const TnC = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>
                    Terms and Conditions for Smart Campus Application
                </Text>
                <Text style={styles.date}>Effective Date: April 25, 2025</Text>

                <Text style={styles.text}>
                    Welcome to Smart Campus! These terms and conditions ("Terms") govern your use of the Smart Campus mobile application ("App"), provided by Madloon Tech. By accessing or using the App, you agree to comply with and be bound by these Terms. If you do not agree with any part of these Terms, please do not use the App.
                </Text>

                <Text style={styles.text}>
                    1. <Text style={styles.bold}>Acceptance of Terms</Text> {"\n"}
                    By using the Smart Campus App, you agree to these Terms. We reserve the right to modify, update, or change these Terms at any time without prior notice. You are responsible for reviewing these Terms periodically for any changes.
                </Text>

                <Text style={styles.text}>
                    2. <Text style={styles.bold}>User Accounts</Text> {"\n"}
                    To access certain features of the App, you may be required to create a user account. You agree to provide accurate, current, and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </Text>

                <Text style={styles.text}>
                    3. <Text style={styles.bold}>Use of the App</Text> {"\n"}
                    The Smart Campus App is designed to assist students and staff in managing academic and campus-related activities. You agree to use the App only for lawful purposes and in accordance with these Terms.
                </Text>

                <Text style={styles.text}>
                    4. <Text style={styles.bold}>Privacy Policy</Text> {"\n"}
                    Your use of the App is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal data. By using the App, you consent to the data practices described in the Privacy Policy. Please review it to understand your rights and our practices.
                </Text>

                <Text style={styles.text}>
                    5. <Text style={styles.bold}>Intellectual Property</Text> {"\n"}
                    All content available on the App, including but not limited to text, images, graphics, logos, and software, is the property of Madloon Tech or its licensors and is protected by intellectual property laws. You may not copy, distribute, modify, or create derivative works of any content from the App without prior written permission.
                </Text>

                <Text style={styles.text}>
                    6. <Text style={styles.bold}>Third-Party Links</Text> {"\n"}
                    The App may contain links to third-party websites or services that are not owned or controlled by us. We do not endorse or assume responsibility for any third-party websites, services, or content. You acknowledge and agree that Madloon Tech is not liable for any damage or loss caused by your use of third-party services or content.
                </Text>

                <Text style={styles.text}>
                    7. <Text style={styles.bold}>Termination</Text> {"\n"}
                    We may suspend or terminate your access to the App at our discretion, without notice, for any violation of these Terms or for any other reason. Upon termination, all rights granted to you under these Terms will cease immediately.
                </Text>

                <Text style={styles.text}>
                    8. <Text style={styles.bold}>Disclaimer of Warranties</Text> {"\n"}
                    The App is provided on an "as is" and "as available" basis. We make no warranties or representations regarding the functionality, availability, or reliability of the App. We disclaim all warranties, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </Text>

                <Text style={styles.text}>
                    9. <Text style={styles.bold}>Limitation of Liability</Text> {"\n"}
                    To the fullest extent permitted by law, Madloon Tech shall not be liable for any indirect, incidental, special, or consequential damages, or any loss of profits, data, or use, arising out of or related to your use of the App.
                </Text>

                <Text style={styles.text}>
                    10. <Text style={styles.bold}>Indemnification</Text> {"\n"}
                    You agree to indemnify, defend, and hold harmless Madloon Tech, its affiliates, employees, officers, and agents from any claims, liabilities, damages, or expenses arising from your use of the App or violation of these Terms.
                </Text>

                <Text style={styles.text}>
                    11. <Text style={styles.bold}>Governing Law</Text> {"\n"}
                    These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any legal action or proceeding related to these Terms must be brought in the courts located in India.
                </Text>

                <Text style={styles.text}>
                    12. <Text style={styles.bold}>Contact Us</Text> {"\n"}
                    If you have any questions or concerns about these Terms or the Smart Campus App, please contact us at:
                </Text>

                <Text style={styles.text}>
                    Madloon Tech{"\n"}
                    Email: dsoumyaranjan026@gmail.com{"\n"}
                    Phone: (+91) 8260651813
                </Text>
            </ScrollView>
        </View>
    )
}

export default TnC

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    title: {
        fontSize: normalize(24),
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    date: {
        fontSize: normalize(16),
        fontStyle: 'italic',
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: normalize(14),
        lineHeight: normalize(20),
        marginBottom: 10,
        color: '#333',
    },
    bold: {
        fontWeight: 'bold',
    }
})
