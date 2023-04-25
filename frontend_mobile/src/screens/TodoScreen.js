import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import  Icon  from "react-native-vector-icons/Feather";

const TodoScreen = () => {
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection:"row", justifyContent:'space-between', alignItems: "center", marginRight: 25}}>
                <Text style={styles.title}>To do</Text>
                <View>
                    <TouchableOpacity >
                        <Icon name="plus" size={45} color='#e94d0b'/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        marginBottom: 50
      },
      item: {
          padding: 2,
          paddingLeft: 10,
          fontSize: 15,
      },
      root: {
          flexDirection: "column",
          justifyContent: "space-between",
          height: '100%'
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
      },
      error: {
          color: 'red'
          
      },
      content: {
          alignItems: 'center',
          padding: 10,
          marginVertical: 50
      },
      buttons: {
          width: '100%', 
          bottom: 5, 
          padding: 10
      },
      deleteButton: {
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
          width: 100,
        },
})
export default TodoScreen;