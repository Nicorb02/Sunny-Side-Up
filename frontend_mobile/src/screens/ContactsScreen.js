import React, {useState} from "react";
import { Card, Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/Feather"

import { TextInput } from "react-native-paper";

const ContactsScreen = () => {
    const [contacts, setContacts] = useState([])

    const [contactName, setContactName] = useState('')
    const [contactPhone, setContactPhone] = useState('')
    const [contactEmail, setContactEmail] = useState('')

    const [addContactModal, setAddContactModal] = useState(false)
    
    const addContact = () => {
        if (!contactName || !contactEmail || !contactPhone)
            console.warn('fill all fields')
        else 
        {
            contacts.push(
                {
                    name: contactName,
                    phone: contactPhone,
                    email: contactEmail
                }
            )
            setAddContactModal(false)
        }
    }

    const renderContacts = () => {
        if (contacts.length == 0)
            return(
                <View style={{alignItems: "center", justifyContent: "center", marginTop: 300}}>
                    <Text>You have no contacts</Text>
                </View>
            )
        else
            return(
                contacts.map(c => {
                    return(
                        <TouchableOpacity>
                            <Card style={{margin: 10}}>
                                <View style={{flexDirection: 'row', alignItems:'center', padding: 10}}>
                                    <Avatar.Text label={c.name[0]} size={50} style={{backgroundColor:'#ff9900'}}/>
                                    <View>
                                        <Text style={styles.item}>{c.name}</Text>
                                        <Text style={styles.item}>{c.phone}</Text>
                                        <Text style={styles.item}>{c.email}</Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )
                })
            )
    }

    const clearInput = () => {
        setContactName('')
        setContactEmail('')
        setContactPhone('')
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
            <ScrollView>
            {

                renderContacts()
                
            }
        </ScrollView>

            <Modal animationType="slide" visible={addContactModal}>
                <View style={styles.root}>
                    <Text style={styles.title}>Add New Contact</Text>
                    <Avatar.Text label={contactName ? contactName[0].toUpperCase() : null} size={100} style={{backgroundColor:'#ff9900'}}/>
                    <View style={{width: '100%', marginTop: 20}}>
                        <TextInput style={styles.input} mode="outlined" label="Name" value={contactName} onChangeText={contactName => setContactName(contactName)} autoCapitalize="none"/>
                        <TextInput style={styles.input} mode="outlined" label="Email" value={contactEmail} onChangeText={contactEmail => setContactEmail(contactEmail)} autoCapitalize="none"/>
                        <TextInput style={styles.input} mode="outlined" label="Phone" value={contactPhone} onChangeText={contactPhone => setContactPhone(contactPhone)} autoCapitalize="none"/>
                    </View>
                    <View style={{width: '100%', marginVertical: 100}}>
                        <CustomButton text="Add Contact" onPress={() => {
                            addContact() 
                        }}/>
                        <CustomButton text="Cancel" onPress={() =>{
                            setAddContactModal(false)
                        }} type="TERTIARY"/>
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
