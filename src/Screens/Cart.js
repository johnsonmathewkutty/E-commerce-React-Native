import React, { useEffect } from "react";
import { View,Text,StyleSheet,FlatList } from "react-native";
import { useSelector } from "react-redux";


function Cart(){
   const cartdatas=useSelector(state=>state.Cartdatas)
    return(
        <View style={styles.container}>
        <FlatList
        data={cartdatas.cartdata}
        renderItem={({item, index})=>(
         <View>
             <Text>{item.title}</Text>
             <Text>{item.quantity}</Text>
         </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        />
     </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1
    }
})


export default Cart;