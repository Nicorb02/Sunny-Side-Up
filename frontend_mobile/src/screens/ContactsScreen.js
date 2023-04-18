import React, {useState} from "react";
import { Card, Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/Feather"

import { TextInput } from "react-native-paper";

const ContactsScreen = () => {
    const [contacts, setContacts] = useState([
        {id: 0, name: "Person", phone: "1234567890", email: "person@email.com"},
        {id: 1, name: "Person", phone: "1234567890", email: "person@email.com"},
        {id: 2, name: "Person", phone: "1234567890", email: "person@email.com"},
        {id: 3, name: "Person", phone: "1234567890", email: "person@email.com"},
        {id: 4, name: "Person", phone: "1234567890", email: "person@email.com"},
        {id: 5, name: "Person", phone: "1234567890", email: "person@email.com"},
        {id: 6, name: "Person", phone: "1234567890", email: "person@email.com"},
        {id: 7, name: "Person", phone: "1234567890", email: "person@email.com"},
        {id: 8, name: "Person", phone: "1234567890", email: "person@email.com"},
        {id: 9, name: "Person", phone: "1234567890", email: "person@email.com"},
        {id: 10, name: "Person", phone: "1234567890", email: "person@email.com"},
        {id: 11, name: "Person", phone: "1234567890", email: "person@email.com"},
        {id: 12, name: "Person", phone: "1234567890", email: "person@email.com"},
        {id: 13, name: "Person", phone: "1234567890", email: "person@email.com"},
    ])

    const [contactName, setContactName] = useState('')
    const [contactPhone, setContactPhone] = useState('')
    const [contactEmail, setContactEmail] = useState('')

    const [contactNameError, setContactNameError] = useState(false)
    const [contactPhoneError, setContactPhoneError] = useState(false)
    const [contactEmailError, setContactEmailError] = useState(false)
    const [inputValid, setInputValid] = useState(false)
    
    const [editItem, setEditItem] = useState(null);

    const [addContactModal, setAddContactModal] = useState(false)
    const [editContactModal, setEditContactModal] = useState(false)
    let count = contacts.length

    const addContact = () => {
        contacts.push(
            {
                id: count,
                name: contactName,
                phone: contactPhone,
                email: contactEmail
            })
            setAddContactModal(false)   
            count++
    }

    const displayContacts = () => {
        if (contacts.length == 0)
            return(
                <View style={{alignItems: "center", justifyContent: "center", marginTop: 300}}>
                    <Text>You have no contacts</Text>
                </View>
            )
        else
            return(
                <FlatList data={contacts} renderItem={renderItems} keyExtractor={(contact) => contact.id.toString()} />
            )
    }

    const clearInput = () => {
        setContactName('')
        setContactEmail('')
        setContactPhone('')
    }

    const checkInputValidity = () => {
        console.log(contactName)
        console.log(contactEmail)
        console.log(contactPhone)

        // const contactNameEmpty = contactName.length === 0;
        // const contactPhoneEmpty = contactPhone.length === 0;
        // const contactNameEmpty = contactName.length === 0;

        // const isInputValid = !contactNameEmpty && /** */

        // setInputValid(isInputValid);
        // setContactNameError(contactNameEmpty);
        // setContactPhoneError(contactPhoneEmpty);
        // setContactEmailError(contactNameEmpty);
    }

    const renderItems = ({ item }) => (
        <TouchableOpacity onPress={() => {
            openEditModal(item)
        }}>
            <Card style={{margin: 10}}>
                <View style={{flexDirection: 'row', alignItems:'center', padding: 10}}>
                    <Avatar.Text label={item.name[0]} size={50} style={{backgroundColor:'#ff9900'}}/>
                    <View>
                        <Text style={styles.item}>{item.name}</Text>
                        <Text style={styles.item}>{item.phone}</Text>
                        <Text style={styles.item}>{item.email}</Text>
                        <Text style={styles.item}>{item.id}</Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );

    const deleteContact = (id) => {
        setContacts((prevData) => prevData.filter((item) => item.id !== id));
        setEditContactModal(false);
    };

    const editContact = () => {
        setContacts((prevData) =>
        prevData.map((item) =>
        item.id === editItem.id
          ? { ...item, name: contactName, email: contactEmail, phone: contactPhone }
          : item
        )
        );
        setEditContactModal(false);
    };  
    
    const openEditModal = (item) => {
        setEditItem(item);
        setContactName(item.name)
        setContactEmail(item.email)
        setContactPhone(item.phone)
        console.log(item)
        // console.log(item.name)
        // console.log(item.email)
        // console.log(item.phone)
        setEditContactModal(true)
    }

    

    return(
        <SafeAreaView style={styles.container}>

            <View style={{flexDirection:"row", justifyContent:'space-between', alignItems: "center", marginRight: 25}}>
                <Text style={styles.title}>Contacts</Text>
                <View>
                    <TouchableOpacity onPress={() => {
                        clearInput()

                        setAddContactModal(true)
                    }}>
                    <Icon name="plus"  size={45} color='#e94d0b'/>

                    </TouchableOpacity>
            </View>
            </View>

            {
                displayContacts()
            }
            
            


            <Modal animationType="slide" visible={addContactModal}>
                <View style={styles.root}>
                    <Text style={styles.title}>Add New Contact</Text>
                    <Avatar.Text label={contactName ? contactName[0].toUpperCase() : null} size={100} style={{backgroundColor:'#ff9900'}}/>
                    <View style={{width: '100%', marginTop: 20}}>
                        <TextInput style={styles.input} mode="outlined" label="Name" value={contactName} onChangeText={contactName => setContactName(contactName)} autoCapitalize="none" error={contactNameError}/>
                        <TextInput style={styles.input} mode="outlined" label="Email" value={contactEmail} onChangeText={contactEmail => setContactEmail(contactEmail)} autoCapitalize="none" error={contactEmailError}/>
                        <TextInput style={styles.input} mode="outlined" label="Phone" value={contactPhone} onChangeText={contactPhone => setContactPhone(contactPhone)} autoCapitalize="none" error={contactPhoneError}/>
                    </View>
                    <View style={{width: '100%', marginVertical: 100}}>
                        <CustomButton text="Add Contact" onPress={() => {
                            // checkInputValidity()
                            // if (inputValid)
                                addContact() 
                        }}/>
                        <CustomButton text="Cancel" onPress={() =>{
                            setAddContactModal(false)
                        }} type="TERTIARY"/>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" visible={editContactModal}>
                <View style={styles.root}>
                    <Text style={styles.title}>Edit Contact</Text>
                    <Avatar.Text label={contactName ? contactName[0].toUpperCase() : null} size={100} style={{backgroundColor:'#ff9900'}}/>
                    <View style={{width: '100%', marginTop: 20}}>
                        <TextInput style={styles.input} mode="outlined" label="Name" value={contactName} onChangeText={contactName => setContactName(contactName)} autoCapitalize="none" error={contactNameError}/>
                        <TextInput style={styles.input} mode="outlined" label="Email" value={contactEmail} onChangeText={contactEmail => setContactEmail(contactEmail)} autoCapitalize="none" error={contactEmailError}/>
                        <TextInput style={styles.input} mode="outlined" label="Phone" value={contactPhone} onChangeText={contactPhone => setContactPhone(contactPhone)} autoCapitalize="none" error={contactPhoneError}/>
                    </View>
                    <View style={{width: '100%', marginVertical: 100}}>
                        <CustomButton text="Apply Changes" onPress={() => {
                            // checkInputValidity()
                            // if (inputValid)
                            editContact()
                        }}/>
                            <CustomButton text="Delete Contact" onPress={() =>{
                                deleteContact(editItem.id)
                            }} type="DELETE"/>
                        <CustomButton text="Cancel" onPress={() =>{
                            setEditContactModal(false)
                        }} type="TERTIARY"/>
                        {/* <View style={{marginTop: 100}}> */}
                        {/* </View> */}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
      marginBottom: 50

    },
    item: {
        paddingLeft: 10,
        fontSize: 15,
    },
    root: {
        alignItems: 'center',
        padding: 10,
        marginVertical: 50
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        margin: 15,
        color: '#343434'
    },
    dateContainer: {
        flexDirection:'row', 
        justifyContent:"center",
        alignItems: "center", 
        width: '100%',
        padding: 10,

    },
    text: {
        fontSize: 16,

    },
    input: {
        marginVertical: 5, 
        backgroundColor: '#fff'
    }
  });

export default ContactsScreen;
