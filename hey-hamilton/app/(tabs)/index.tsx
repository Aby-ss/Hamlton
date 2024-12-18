import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Button, FlatList } from 'react-native';

export default function HomeScreen() {
  const [inputText, setInputText] = React.useState(''); // State for the TextInput value
  const [todoList, setTodoList] = React.useState<string[]>([]); // State for todo list

  // Function to add the entered text to the todo list
  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      setTodoList([...todoList, inputText]); // Append the new todo to the list
      setInputText(''); // Clear the TextInput
    }
  };

  // Function to remove a todo item by index
  const handleRemoveTodo = (index: number) => {
    setTodoList(todoList.filter((_, i) => i !== index)); // Filter out the selected todo
  };

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

      {/* Input and Add Todo Button */}
      <View style={styles.section}>
        <Text style={styles.bold_subheader}>Todo</Text>
        <TextInput
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
          placeholder="Enter your todo"
          onSubmitEditing={handleAddTodo} // Handles pressing 'Enter' on the keyboard
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>

      {/* Render the todo list */}
      <View style={styles.section}>
        <Text style={styles.bold_subheader}>Your Todos</Text>
        {todoList.length > 0 ? (
          <FlatList
            data={todoList}
            keyExtractor={(item, index) => index.toString()} // Unique key for each item
            renderItem={({ item, index }) => (
              <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => handleRemoveTodo(index)}>
                  <Text style={styles.checkmark}>✅</Text>
                </TouchableOpacity>
                <Text style={styles.todoItem}>{item}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noTodoText}>No todos added yet!</Text>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkmark: {
    fontSize: 28,
    marginRight: 10,
    color: 'green',
  },
  todoItem: {
    fontSize: 16,
  },
  noTodoText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    margin: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
