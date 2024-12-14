import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput } from 'react-native';

// Main component that represents the home screen
export default function HomeScreen() {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    // Container for the entire screen with ScrollView for scrolling
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header section with an image */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/adaptive-icon.png')} // Replace with your own image path
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>Good Morning, Rao</Text>
        <Text style={styles.subheader}>Tuesday 3 December, 2024</Text>
      </View>

      {/* Todo Section */}
      <View style={styles.section}>
        <Text style={styles.bold_subheader}>Todo</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="enter your todo"
          keyboardType="numeric"
        />
      </View>
    </ScrollView>
  );
}

// Styles for various components
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures the ScrollView adapts to its content
    backgroundColor: '#f5f5f5', // Light gray background color
    padding: 16, // Padding around the edges
  },
  header: {
    alignItems: 'center', // Center the header content horizontally
    marginBottom: 22, // Spacing below the header
  },
  headerImage: {
    width: 80, // Width of the image
    height: 80, // Height of the image
    borderRadius: 75, // Makes the image circular
    marginTop: 65,
    marginRight: 285,
  },
  headerText: {
    fontSize: 25, // Large font size for the header text
    fontWeight: 'bold', // Bold text
    color: '#333', // Dark gray text color
    marginTop: -65, // Adjust positioning
    marginLeft: 50,
  },
  subheader: {
    fontSize: 15,
    marginLeft: 20,
  },
  bold_subheader: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fc827e', // Light gray background for sections
    marginBottom: 16, // Spacing below each section
    padding: 16,
    marginTop: 15,
    borderRadius: 5,
  },
  paragraph: {
    fontSize: 16, // Normal font size for paragraphs
    color: '#666', // Lighter gray color
    lineHeight: 22, // Better line spacing for readability
  },
  bold: {
    fontWeight: 'bold', // Bold text for emphasis
    color: '#000', // Black text for emphasis
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
});
