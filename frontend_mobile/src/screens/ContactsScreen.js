import React, {useState} from "react";
import { Card, Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import CircleButton from "../components/CircleButton";

const ContactsScreen = () => {
    const [contacts, setContacts] = useState([])

    const [contactName, setContactName] = useState('')
    const [contactPhone, setContactPhone] = useState('')
    const [contactEmail, setContactEmail] = useState('')

    const [addContactModal, setAddContactModal] = useState(false)
    for (let i = 0; i < 10; i++)
    {
        contacts.push(
            {name: 'Person ' + i, email: "email" + i + "@gmail.com", phone: "100000000" + i}
        )
    }
    return(
        <SafeAreaView style={styles.container}>
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
        <CircleButton icon="plus" onPress={() => {
            setAddContactModal(true)
        }}/>

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
                        <CustomButton text="Add Event" onPress={() => {
                            contacts.push(
                                {
                                    name: contactName,
                                    phone: contactPhone,
                                    email: contactEmail
                                }
                            )
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
      padding: 10,

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
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        marginTop: 50,
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

    }   
  });

export default ContactsScreen;
