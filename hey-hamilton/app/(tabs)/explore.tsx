import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

// Notion API Key and Database ID
const NOTION_SECRET = "NOTION-INTEGRATION-SECRET";
const DATABASE_ID = "81905f0c5b474254b19e8cf84fb2e83d";

export default function TabTwoScreen() {
  const [columns, setColumns] = useState<string[]>([]); // Store column names
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch database schema from Notion API
  useEffect(() => {
    const fetchDatabaseColumns = async () => {
      try {
        const response = await fetch(
          `https://api.notion.com/v1/databases/${DATABASE_ID}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${NOTION_SECRET}`,
              'Content-Type': 'application/json',
              'Notion-Version': '2022-06-28', // Use the latest API version
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch database columns');
        }

        const data = await response.json();
        const properties = Object.keys(data.properties); // Extract column names
        setColumns(properties); // Update state with column names
        setLoading(false); // Mark loading as complete
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDatabaseColumns();
  }, []);

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

      {/* Database Columns Section */}
      <View style={styles.section}>
        <Text style={styles.bold_subheader}>Notion Database Columns</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <View>
            {columns.length > 0 ? (
              columns.map((column, index) => (
                <Text key={index} style={styles.columnText}>
                  • {column}
                </Text>
              ))
            ) : (
              <Text style={styles.noDataText}>No columns found!</Text>
            )}
          </View>
        )}
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
  columnText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
