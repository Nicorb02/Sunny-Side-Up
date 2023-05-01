import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity , Modal, TextInput, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather"
import { Swipeable } from "react-native-gesture-handler";
import { SoapRegular } from '../../assets/fonts/expo-fonts'
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
const NotesScreen = () => {
    const [notes, setNotes] = useState([])

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [addNoteModal, setAddNoteModal] = useState(false)
    const [editNoteModal, setEditNoteModal] = useState(false)

    const [editItem, setEditItem] = useState({_id: null})

    let count = notes.length

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

    const loadItemsFromServer = async () => {
        const { userData, jwtToken } = await getUserDataAndToken();
        const response = await fetch(buildPath('/api/searchNote'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ _id: userData.id, title: '', content: '', jwtToken})
        });

        const data = await response.json();

        if (data.error === '')
        {
            console.log('load success')
            setNotes(data.results)
        }
        else
        {
            console.log('load fail')
        }
    }

    const deleteNote = async (itemId) => {
        const { userData, jwtToken } = await getUserDataAndToken();
        const response = await fetch(buildPath('/api/delNote'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ _id: userData.id, itemId, jwtToken })
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
    };
    
    const editNote = async () => {
        const { userData, jwtToken } = await getUserDataAndToken();
        const response = await fetch(buildPath('/api/editNote'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ _id: userData.id, itemId: editItem._id, newTitle: title, newContent: content, jwtToken })
        });

        const data = await response.json();
        if (data.error === '')
        {
            console.log('edit successful')
            loadItemsFromServer()
            setEditNoteModal(false)  
        }
        else
        {
            console.log('edit failed')
        }
    }

    const addNote = async () => {
        const { userData, jwtToken } = await getUserDataAndToken();
        const response = await fetch(buildPath('/api/addNote'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ _id: userData.id, title, content, jwtToken })
        });

        const data = await response.json();
        if (data.error === '')
        {
            console.log('add successful')
            loadItemsFromServer()
            setAddNoteModal(false)  
        }
        else
        {
            console.log('add failed')
        }
    }

    const openAddModal = () => {
        setAddNoteModal(true)
    }

    const openEditModal = (item) => {
        setEditItem(item);
        setTitle(item.title)
        setContent(item.content)
        setEditNoteModal(true)
    }

    const displayNotes = () => {
        if (notes.length == 0)
            return(
                <View style={{alignItems: "center", justifyContent: "center", marginTop: 300}}>
                    <Text>You have no notes</Text>
                </View>
            )
        else
            return(
                <FlatList data={notes} renderItem={renderItems} keyExtractor={(note) => note._id} />
            )
    }
    
    const clearInput = () => {
        setTitle('')
        setContent('')
    }
    const renderItems = ({ item }) => (
        <Swipeable
            renderRightActions={() => (
            <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteNote(item._id)}
            >
            <Icon name="trash-2" size={30} color="#fff"/>
            </TouchableOpacity>
            )}
        >
            <TouchableOpacity onPress={() => {
                openEditModal(item)
            }}>
                <Card style={{marginVertical: 5,borderRadius: 5, borderWidth: 0.3, borderColor: '#343434', backgroundColor: '#f7fff7'}}>
                    <View style={{flexDirection: 'row', alignItems:'center', padding: 10}}>
                        <View>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>{item.content}</Text>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        </Swipeable>
    );

    useEffect(() => {
        loadItemsFromServer()
    }, [])
    // reset everything when modals are closed
    useEffect(() => {
        if (!editNoteModal && !addNoteModal)
        {
            clearInput()
        }
      }, [addNoteModal, editNoteModal])

      const [fontsLoaded] = useFonts({
        SoapRegular,
      });
    
      if (!fontsLoaded) {
        return null;
      }
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection:"row", justifyContent:'space-between', alignItems: "center", marginRight: 25}}>
                <Text style={styles.header}>Notes</Text>
                <View>
                    <TouchableOpacity onPress={() => {
                        openAddModal()
                    }}>
                    <Icon name="plus" size={45} color='#e94d0b'/>

                    </TouchableOpacity>
                </View>
            </View>

            {
                displayNotes()
            }


            <Modal animationType="slide" visible={addNoteModal}>
                <View style={styles.root}>
                    <View style={{flexDirection:"row", justifyContent:'space-between', alignItems: "center", marginHorizontal: 15}}>
                        <TouchableOpacity onPress={() => {
                            setAddNoteModal(false)
                        }}>
                            {/* <Icon name="chevron-left" size={40} color="#ff9900"/> */}
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
                            <TextInput placeholder="Title" value={title} onChangeText={title => setTitle(title)} autoCapitalize="none" fontSize="32" fontWeight='bold' placeholderTextColor="#D3D3D3"/>
                            <TextInput placeholder="Content" value={content} scrollEnabled={true} onChangeText={content => setContent(content)} autoCapitalize="none" multiline={true} fontSize="16" style={{marginBottom: 100}} placeholderTextColor="#D3D3D3"/>
                        </View>
                        <View style={{marginTop: 30, justifyContent: "center", alignItems: 'center', backgroundColor: '#fff', width: 300}}>
                            <Text style={{color: 'red'}}></Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" visible={editNoteModal}>
                <View style={styles.root}>
                    <View style={{flexDirection:"row", justifyContent:'space-between', alignItems: "center", marginHorizontal: 15}}>
                        <TouchableOpacity onPress={() => {
                            setEditNoteModal(false)
                        }}>
                            {/* <Icon name="chevron-left" size={40} color="#ff9900"/> */}
                        <Text style={{color: '#ff9900', fontSize: 20}}>Cancel</Text>
                            
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            editNote()
                        }}>
                            <Text style={{color: '#ff9900', fontSize: 20}}>Done</Text>
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
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        marginBottom: 50,
        backgroundColor: '#fff'
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
    title: {
        fontSize: 20,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: '#343434'
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
        width: 100,
      },
      deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
})
export default NotesScreen;