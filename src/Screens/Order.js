import React from "react";
import { View,Text,StyleSheet } from "react-native";

function Order(){
    return(
        <View style={styles.container}>
            <Text></Text>
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Order;