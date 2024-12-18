import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Button, FlatList } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header section */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/adaptive-icon.png')}
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>Good Morning, Rao</Text>
        <Text style={styles.subheader}>Tuesday 3 December, 2024</Text>
      </View>
    </ScrollView>
  );
}


// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 22,
  },
  headerImage: {
    width: 80,
    height: 80,
    borderRadius: 75,
    marginTop: 65,
    marginRight: 285,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginTop: -65,
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
    backgroundColor: '#fc827e',
    marginBottom: 16,
    padding: 16,
    marginTop: 15,
    borderRadius: 5,
  },
});
