import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

// Notion API Key and Database ID
const NOTION_SECRET = "NOTION-INTEGRATION-SECRET";
const DATABASE_ID = "81905f0c5b474254b19e8cf84fb2e83d";

export default function TabTwoScreen() {
  const [columns, setColumns] = useState<string[]>([]); // Store column names
  const [rows, setRows] = useState<any[]>([]); // Store database rows
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch database schema and rows
  useEffect(() => {
    const fetchDatabaseData = async () => {
      try {
        // Fetch database schema
        const schemaResponse = await fetch(
          `https://api.notion.com/v1/databases/${DATABASE_ID}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${NOTION_SECRET}`,
              'Content-Type': 'application/json',
              'Notion-Version': '2022-06-28',
            },
          }
        );

        if (!schemaResponse.ok) throw new Error('Failed to fetch database schema');

        const schemaData = await schemaResponse.json();
        const properties = Object.keys(schemaData.properties); // Extract column names
        setColumns(properties);

        // Fetch database rows (pages)
        const rowsResponse = await fetch(
          `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${NOTION_SECRET}`,
              'Content-Type': 'application/json',
              'Notion-Version': '2022-06-28',
            },
            body: JSON.stringify({
              page_size: 5, // Fetch 5 rows
            }),
          }
        );

        if (!rowsResponse.ok) throw new Error('Failed to fetch database rows');

        const rowsData = await rowsResponse.json();
        setRows(rowsData.results); // Save rows data
        setLoading(false); // Mark loading as complete
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDatabaseData();
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

      {/* Database Rows Section */}
      <View style={styles.section}>
        <Text style={styles.bold_subheader}>Notion Database Rows</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <View>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <View key={index} style={styles.rowContainer}>
                  {columns.map((column) => (
                    <Text key={column} style={styles.rowText}>
                      {column}: {getRowValue(row, column)}
                    </Text>
                  ))}
                  <View style={styles.rowDivider} />
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>No rows found!</Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// Helper function to extract row data for a column
const getRowValue = (row, column) => {
  if (row.properties[column]) {
    const property = row.properties[column];

    // Handle different property types (Title, Text, Select, etc.)
    if (property.type === 'title') {
      return property.title[0]?.plain_text || 'N/A';
    } else if (property.type === 'rich_text') {
      return property.rich_text[0]?.plain_text || 'N/A';
    } else if (property.type === 'select') {
      return property.select?.name || 'N/A';
    } else if (property.type === 'date') {
      return property.date?.start || 'N/A';
    } else if (property.type === 'multi_select') {
      return property.multi_select.map((option) => option.name).join(', ') || 'N/A';
    }
  }

  return 'N/A';
};

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
    backgroundColor: '#9be09b',
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
  rowContainer: {
    marginBottom: 10,
  },
  rowText: {
    fontSize: 14,
    marginVertical: 2,
    color: '#555',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
});
