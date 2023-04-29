import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Dimensions, Image, StyleSheet } from 'react-native';
import { Icon } from "react-native-vector-icons/Feather";
import ScheduleScreen from "./ScheduleScreen";
import NotesScreen from "./NotesScreen";
import ProfileScreen from "./ProfileScreen";
import ContactsScreen from "./ContactsScreen";
import TodoScreen from "./TodoScreen";

const home = require('../../assets/home.png')
const profile = require('../../assets/profile.png')
const contacts = require('../../assets/contacts.png')
const todo = require('../../assets/todo.png')
const notes = require('../../assets/notes.png')

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const Tab = createBottomTabNavigator();

const NavBar = ({ navigation }) => {
    return (
        <Tab.Navigator 
        screenOptions={{
          header: () => null,
          tabBarShowLabel: false, 
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            backgroundColor: '#fff',
            borderRadius: 10,
            height: 90, 
            paddingBottom: 15
          }
        }}
      >
        <Tab.Screen name='Home' 
          component={ScheduleScreen} 
          options={{ 
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image  source={home} 
                  resizeMode='contain'
                  style={[
                    styles.image, {tintColor: focused ? '#e94d0b' : '#343434'}
                ]} 
                />
                <Text style={{color: focused ? '#e94d0b' : '#fff', fontSize: 12}}>Home</Text>
              </View>
            ),
          }}
        />
        
        <Tab.Screen name='Notes' 
          component={NotesScreen} 
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={notes} 
                  resizeMode='contain'
                  style={[
                    styles.image, {tintColor: focused ? '#e94d0b' : '#343434'}
                ]} 
                />
                <Text style={{color: focused ? '#e94d0b' : '#fff', fontSize: 12}}>Notes</Text>
              </View>
            ),
          }}
        />
        {/* <Tab.Screen  
          name='Profile' 
          component={ProfileScreen} 
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center',}}>
                  <Image  source={profile} 
                  resizeMode='contain'
                  style={[
                      styles.image, {tintColor: focused ? '#e94d0b' : '#343434'}
                  ]} 
                  />
                <Text style={{color: focused ? '#e94d0b' : '#fff', fontSize: 12}}>Profile</Text>
              </View>
            ),
          }}
        /> */}
         <Tab.Screen name='To do' 
          component={TodoScreen} 
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                 <Image source={todo} 
                  resizeMode='contain'
                  style={[
                    styles.image, {tintColor: focused ? '#e94d0b' : '#343434'}
                ]} 
                />
                <Text style={{color: focused ? '#e94d0b' : '#fff', fontSize: 12}}>To Do</Text>
              </View>
            ),
          }}
        />
         <Tab.Screen name='Contacts' 
          component={ContactsScreen} 
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={contacts} 
                  resizeMode='contain'
                  style={[
                    styles.image, {tintColor: focused ? '#e94d0b' : '#343434'}
                ]} 
                />
                <Text style={{color: focused ? '#e94d0b' : '#fff', fontSize: 12}}>Contacts</Text>
              </View>
            ),
          }}
        />
        
      </Tab.Navigator>


    )
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    margin: 5,
    
  }
  
})

export default NavBar;