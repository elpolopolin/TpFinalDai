import { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebase/config";

export default function MesageScreen({  route }) { 
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [todosUpdated, setTodosUpdated] = useState(0);
    const userData = route.params.userData;

    const addTodo = async () => {
        if (todo.trim() === '') return;
    
        try {
          await addDoc(collection(FIRESTORE_DB, 'todos'), {
            todo: todo,
            idUser: userData.id,
            name: userData.fullName,
          });
          setTodo(''); // Limpia el campo de entrada
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      }
    
      const deleteMessage = async (messageId) => {
        try {
          const messageDocRef = doc(FIRESTORE_DB, 'todos', messageId);
          await deleteDoc(messageDocRef);
        } catch (error) {
          console.error('Error deleting message: ', error);
        }
      }
    
      const fetchTodos = () => {
        const todosRef = collection(FIRESTORE_DB, 'todos');
    
        const unsubscribe = onSnapshot(todosRef, (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setTodos(newData);
        });
        // Devuelve una función para cancelar la suscripción cuando el componente se desmonte.
        return unsubscribe;
      };
    
      useEffect(() => {
        const unsubscribe = fetchTodos();
        // Devuelve una función para cancelar la suscripción cuando el componente se desmonte.
        return () => {
          unsubscribe();
        };
      }, []);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
       <View style={{ flex: 1, backgroundColor: "pink" }}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, marginBottom: 10, textAlign: 'center' }}>
            Mensajes
          </Text>
          <TextInput
            style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
            placeholder="Escribe un mensaje"
            value={todo}
            onChangeText={(text) => setTodo(text)}
          />
          <Button title="Submit" onPress={addTodo} />
        </View>
        <ScrollView style={{ flex: 1, padding: 16 }}>
          {todos.map((message, index) => (
            <View
              key={message.id}
              style={{
                marginVertical: 8,
                backgroundColor: message.idUser === userData.id ? '#FFDEB9' : '#C7ECFF',
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 18 }}>
                <Text style={{ color: "#AC0300", fontWeight: "bold" }}>{message.name}:</Text> {message.todo}
              </Text>
              {message.idUser === userData.id && (
                <Button title="Eliminar" onPress={() => deleteMessage(message.id)} />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
        </View>
    )
}