import React, {useState} from "react";
import { Card, Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/Feather"

const ContactsScreen = () => {
    const [contacts, setContacts] = useState([])

    const [contactName, setContactName] = useState('')
    const [contactPhone, setContactPhone] = useState('')
    const [contactEmail, setContactEmail] = useState('')

    const [addContactModal, setAddContactModal] = useState(false)
    
    const addContact = () => {
        contacts.push(
            {
                name: contactName,
                phone: contactPhone,
                email: contactEmail
            }
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
        }
        </ScrollView>

            <Modal animationType="slide" visible={addContactModal}>
                <View style={styles.root}>
                    <Text style={styles.title}>Add New Contact</Text>
                    <Avatar.Text label={contactName ? contactName[0].toUpperCase() : null} size={100} style={{backgroundColor:'#ff9900'}}/>
                        <View style={{width: '100%', marginTop: 20}}>
                        <CustomInput placeholder="Name" value={contactName} setValue={setContactName}/>
                        <CustomInput placeholder="Email" value={contactEmail} setValue={setContactEmail}/>
                        <CustomInput placeholder="Phone" value={contactPhone} setValue={setContactPhone}/>
                    </View>
                    <View style={{width: '100%', marginVertical: 100}}>
                        <CustomButton text="Add Contact" onPress={() => {
                            addContact() 
                            setAddContactModal(false)
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
    circle: {
        // width: 60,
        // height: 60,
        // position: 'absolute',
        // borderRadius: 50,

    },
  });

export default ContactsScreen;
