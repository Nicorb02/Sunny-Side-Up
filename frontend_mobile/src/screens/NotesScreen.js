import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity , Modal, TextInput, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather"
import { Swipeable } from "react-native-gesture-handler";
    
const NotesScreen = () => {
    const [notes, setNotes] = useState([
        { id: 0, title: 'Notes', content: 'Content'},
        { id: 1, title: 'Shopping list', content: 'shopping list content'},
        { id: 2, title: 'discussion', content: 'discussion content'},
        { id: 3, title: 'Another Note', content: 'this is a very long note description to mess that card upthis is a very long note description to mess that card up'},
        { id: 4, title: 'Notes', content: 'Content'},
        { id: 5, title: 'Shopping list', content: 'shopping list content'},
        { id: 6, title: 'discussion', content: 'discussion content'},
        { id: 7, title: 'Another Note', content: 'Another note content'},
        { id: 8, title: 'Notes', content: 'Content'},
        { id: 9, title: 'Shopping list', content: 'shopping list content'},
        { id: 10, title: 'discussion', content: 'discussion content'},
    ])

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [addNoteModal, setAddNoteModal] = useState(false)
    const [editNoteModal, setEditNoteModal] = useState(false)

    const [editItem, setEditItem] = useState({id: null})

    let count = notes.length



    const deleteNote = (id) => {
        setNotes((prevData) => prevData.filter((note) => note.id !== id));
    };
    
    const editNote = () => {
        setNotes((prevData) =>
        prevData.map((item) =>
        item.id === editItem.id
          ? { ...item, title: title, content: content }
          : item
        )
        );
        setEditNoteModal(false);
    }

    const addNote = () => {
        notes.push(
            {
                id: count,
                title: title,
                content: content,
            })
            setAddNoteModal(false)   
            count++
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
                <FlatList data={notes} renderItem={renderItems} keyExtractor={(note) => note.id.toString()} />
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
            onPress={() => deleteNote(item.id)}
            >
            <Icon name="trash-2" size={30} color="#fff"/>
            </TouchableOpacity>
            )}
        >
            <TouchableOpacity onPress={() => {
                openEditModal(item)
            }}>
                <Card style={{marginVertical: 5,borderRadius: 5, borderWidth: 0.3, borderColor: '#343434', backgroundColor: '#fff'}}>
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
    // reset everything when modals are closed
    useEffect(() => {
        if (!editNoteModal && !addNoteModal)
        {
            clearInput()
        }
      }, [addNoteModal, editNoteModal])


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
                            <TextInput placeholder="Title" value={title} onChangeText={title => setTitle(title)} autoCapitalize="none" fontSize="32" fontWeight='bold'/>
                            <TextInput placeholder="Content" value={content} scrollEnabled={true} onChangeText={content => setContent(content)} autoCapitalize="none" multiline={true} fontSize="16" style={{marginBottom: 100}}/>
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
        color: '#343434'
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