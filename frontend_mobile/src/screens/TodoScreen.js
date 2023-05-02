import React,{useState, useEffect} from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from "react-native";
import  Icon  from "react-native-vector-icons/Feather";
import { Swipeable } from "react-native-gesture-handler";
import { Card, Checkbox } from "react-native-paper";
import {SoapRegular} from '../../assets/fonts/expo-fonts'
import { useFonts } from "expo-font";
import CustomInput from "../components/CustomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoScreen = () => {
    const [title, setTitle] = useState('')

    const [todo, setTodo] = useState([])
    const [todoError, setTodoError] = useState(false)

    const storage = require('../tokenStorage.js');

    // retrieve user data and current jwt from local storage
    const getUserDataAndToken = async () => {
      const userDataString = await AsyncStorage.getItem('user_data');
      const userData = JSON.parse(userDataString);
      const jwtToken = await storage.retrieveToken();
      
      return { userData, jwtToken };
    }

    const app_name = 'ssu-testing'        // testing server

    const buildPath = (route) =>
    {
        return 'https://' + app_name + '.herokuapp.com' + route;
    }


    const displayTodo = () => {
        if (todo.length == 0)
            return(
                <View style={{alignItems: "center", justifyContent: "center", marginTop: 300}}>
                    <Text>You have no tasks</Text>
                </View>
            )
        else
            return(
                <FlatList data={todo} renderItem={renderItems} keyExtractor={(item) => item.title} />
            )
    }

    const loadItemsFromServer = async () => {
        const { userData, jwtToken } = await getUserDataAndToken();
        const response = await fetch(buildPath('/api/readToDo'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ _id: userData.id, jwtToken})
        });

        const data = await response.json();

        if (data.error === '')
        {
            console.log('load success')
            setTodo(data.results)
        }
        else
        {
            console.log('load fail')
        }
        

    }

    const addTask = async () => {
        const { userData, jwtToken } = await getUserDataAndToken();
        const response = await fetch(buildPath('/api/addToDo'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ _id: userData.id, title, jwtToken })
        });

        const data = await response.json();
        if (data.error === '')
        {
            console.log('add successful')
            setTitle('')
            setTodoError(false)
            loadItemsFromServer()
        }
        else
        {
            console.log('add failed')
            setTodoError(true)
        }
    }

    const deleteTask = async (title) => {
        const { userData, jwtToken } = await getUserDataAndToken();
        const response = await fetch(buildPath('/api/delToDo'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ _id: userData.id, title, jwtToken })
        });

        const data = await response.json();
        if (data.error === '')
        {
            console.log('delete successful')
            loadItemsFromServer()
        }
        else
        {
            console.log('delete failed')
        }
    }

    const handleCheck = async (item) => {
        if (item.complete == 1)
        {
            const { userData, jwtToken } = await getUserDataAndToken();
            const response = await fetch(buildPath('/api/incompleteToDo'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ _id: userData.id, title: item.title, jwtToken })
            });
    
            const data = await response.json();
            if (data.error === '')
            {
                console.log('edit successful')
                loadItemsFromServer()
            }
            else
            {
                console.log('edit failed')
            }
        }
        else
        {
            const { userData, jwtToken } = await getUserDataAndToken();
            const response = await fetch(buildPath('/api/completeToDo'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ _id: userData.id, title: item.title, jwtToken })
            });
    
            const data = await response.json();
            if (data.error === '')
            {
                console.log('edit successful')
                loadItemsFromServer()
            }
            else
            {
                console.log('edit failed')
            }
        }
    };

    const renderItems = ({ item }) => (
        <Swipeable
            renderRightActions={() => (
            <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTask(item.title)}
            >
            <Icon name="trash-2" size={30} color="#fff"/>
            </TouchableOpacity>
            )}
        >
            <View>
                <View style={{marginVertical: 5,borderRadius: 5, borderWidth: 0.3, borderColor: '#343434', backgroundColor: '#f7fff7'}}>
                    <View style={{flexDirection: 'row', alignItems:'center', justifyContent: "space-between", padding: 10}}>

                            <Text style={item.complete ? styles.strikeThrough : styles.title}>{item.title}</Text>
                            {/* <View style={{borderWidth: 1, borderColor: 'red'}}> */}
                                <Checkbox.IOS
                                status={item.complete ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    handleCheck(item)
                                }}
                                borderColor='black'
                                borderWidth={1}
                                color='green'

                                />

                                {/* </View> */}


                    </View>
                </View>
            </View>
        </Swipeable>
    );
    useEffect(() => {
        loadItemsFromServer()
    }, [])
    const [fontsLoaded] = useFonts({
        SoapRegular,
      });
    
    if (!fontsLoaded) {
    return null;
    }
    
    return(
        <SafeAreaView style={styles.container}>

            <View style={{marginHorizontal: 10}}>
                
            <Text style={styles.header}>To do</Text>
            <View style={{flexDirection:"row", justifyContent:'space-between', alignItems: "center", marginRight: 25}}>
            <View style={{width: '90%'}}>
                {/* <TextInput style={styles.input} mode="flat" label="Title" value={title} onChangeText={title => setTitle(title)} autoCapitalize="none" /> */}
                {/* <CustomInput placeholder="Title" value={title} setValue={setTitle}/> */}
                <TextInput 
            style={todoError ? styles.inputContainerError : styles.inputContainer} 
            placeholder="Title"
            placeholderTextColor='#c2c2c2'
            value={title}
            onChangeText={setTitle}
            autoCapitalize='none'
            />
            </View>
            <View style={{padding: 10}}>
                    <TouchableOpacity onPress={addTask}>
                        <Icon name="plus" size={45} color='#e94d0b'/>
                    </TouchableOpacity>
                </View>
            </View>
        
            {
                displayTodo()
            }
            {/* <Modal animationType="slide" visible={false}>
                    <View style={styles.root}>
                        <View style={{flexDirection:"row", justifyContent:'space-between', alignItems: "center", marginHorizontal: 15}}>
                            <TouchableOpacity onPress={() => {
                                setAddNoteModal(false)
                            }}>
                                <Icon name="chevron-left" size={40} color="#ff9900"/>
                            <Text style={{color: '#ff9900', fontSize: 20}}>Cancel</Text>
                                
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                addNote()
                            }}>
                                <Text style={{color: '#ff9900', fontSize: 20}}>Add</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.lowerContent}>

                            <View style={{width: '100%', paddingVertical: 20, paddingHorizontal: 20}}>
                                <TextInput placeholder="Title" value={title} onChangeText={title => setTitle(title)} autoCapitalize="none" fontSize="32" fontWeight='bold'/>
                                <TextInput placeholder="Content" value={content} scrollEnabled={true} onChangeText={content => setContent(content)} autoCapitalize="none" multiline={true} fontSize="16" style={{marginBottom: 100}}/>
                            </View>
                            <View style={{marginTop: 30, justifyContent: "center", alignItems: 'center', backgroundColor: '#fff', width: 300}}>
                                <Text style={{color: 'red'}}></Text>
                            </View>
                        </View>
                    </View>
                </Modal> */}
                </View>
          </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        marginBottom: 50,
        backgroundColor: '#fff',
        flexDirection: "column",
    },
    item: {
        padding: 5,
        paddingHorizontal: 10,
        fontSize: 12,
    },
    header: {
        fontSize: 34,
        fontWeight: 'bold',
        margin: 15,
        color: '#343434',
        fontFamily: 'SoapRegular'
    },
    input: {
        marginVertical: 5, 
        backgroundColor: '#fff',
        
    },
    title: {
        fontSize: 20,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: '#343434'
    },
    strikeThrough: {
        fontSize: 20,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: '#343434',
        textDecorationLine: 'line-through',
    },
    root: {
        flexDirection: "column",
        height: '100%',
        marginTop: 50

    },
    content: {
        alignItems: 'center',
        padding: 0,
        marginVertical: 50
    },
    lowerContent: {
        alignItems: 'left',
        padding: 0,
        marginVertical: 0
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        width: 75,
      },
      inputContainer: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#343434',
        borderWidth: 1,
        borderRadius: 10,

        padding: 10,
        marginVertical: 5,
    },
      inputContainerError: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,

        padding: 10,
        marginVertical: 5,
    },
})
export default TodoScreen;