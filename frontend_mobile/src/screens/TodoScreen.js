import React,{useState, useEffect} from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import  Icon  from "react-native-vector-icons/Feather";
import { Swipeable } from "react-native-gesture-handler";
import { Card, Checkbox } from "react-native-paper";
import {SoapRegular} from '../../assets/fonts/expo-fonts'
import { useFonts } from "expo-font";
const TodoScreen = () => {
    const [todo, setTodo] = useState([
        {id: 0, title: 'task 1', date: new Date(), isComplete: true},
        {id: 1, title: 'task 2', date: new Date(), isComplete: false},
        {id: 2, title: 'task 3', date: new Date(), isComplete: false},
        {id: 3, title: 'task 4', date: new Date(), isComplete: false},
        {id: 4, title: 'task 5', date: new Date(), isComplete: false},
        {id: 5, title: 'task 6', date: new Date(), isComplete: false},
        {id: 6, title: 'task 7', date: new Date(), isComplete: false},
        {id: 7, title: 'task 8', date: new Date(), isComplete: false},
        {id: 8, title: 'task 9', date: new Date(), isComplete: false},
    ])

    const displayTodo = () => {
        if (todo.length == 0)
            return(
                <View style={{alignItems: "center", justifyContent: "center", marginTop: 300}}>
                    <Text>You have no tasks</Text>
                </View>
            )
        else
            return(
                <FlatList data={todo} renderItem={renderItems} keyExtractor={(item) => item.id.toString()} />
            )
    }

    const deleteTask = (id) => {
        setTodo((prevData) => prevData.filter((item) => item.id !== id));
    }

    const handleCheck = (itemId) => {
        const updatedItems = todo.map((item) =>
          item.id === itemId ? { ...item, isComplete: !item.isComplete } : item
        );
        setTodo(updatedItems);
    };

    const renderItems = ({ item }) => (
        <Swipeable
            renderRightActions={() => (
            <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTask(item.id)}
            >
            <Icon name="trash-2" size={30} color="#fff"/>
            </TouchableOpacity>
            )}
        >
            <TouchableOpacity onPress={() => {

            }}>
                <View style={{marginVertical: 5,borderRadius: 5, borderWidth: 0.3, borderColor: '#343434', backgroundColor: '#f7fff7'}}>
                    <View style={{flexDirection: 'row', alignItems:'center', justifyContent: "space-between", padding: 10}}>

                            <Text style={item.isComplete ? styles.strikeThrough : styles.title}>{item.title}</Text>
                            {/* <View style={{borderWidth: 1, borderColor: 'red'}}> */}
                                <Checkbox.IOS
                                status={item.isComplete ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    handleCheck(item.id)
                                }}
                                borderColor='black'
                                borderWidth={1}
                                color='green'

                                />

                                {/* </View> */}


                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
    const [fontsLoaded] = useFonts({
        SoapRegular,
      });
    
    if (!fontsLoaded) {
    return null;
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection:"row", justifyContent:'space-between', alignItems: "center", marginRight: 25}}>
                <Text style={styles.header}>To do</Text>
                <View>
                    <TouchableOpacity >
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
          </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        marginBottom: 50,
        backgroundColor: '#fff',
        marginHorizontal: 10,
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
})
export default TodoScreen;