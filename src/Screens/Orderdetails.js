import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,FlatList,Image } from "react-native";

import Icon  from "react-native-vector-icons/MaterialIcons";
import { itemdetails } from "../Redux/Datainforeducer";
import { useDispatch } from "react-redux";


const Orderdetails=({route,navigation})=>{
    const {item,status}=route.params;
    const dispatch=useDispatch()
    const Failedview=()=>{
        return(
            <View style={styles.container}>
            <View style={styles.reasonview}>
                <View style={styles.reasoninnerview}>
                <Text style={styles.reasonheadtext}>Order not placed.Try ordering again</Text>
                <Text style={styles.reasonsubtext}>Due to an error with the payment,this order could
                    not be placed.please place a new order
                </Text>
                <Text style={styles.reasonsubtext}>Payment was not successful.Please contact your
                    bank for any more deducted
                </Text>
                <TouchableOpacity style={styles.reasonbtn} onPress={()=> {dispatch(itemdetails(item)),navigation.navigate('Order Summary',{from:''})}}>
                    <Text style={styles.reasonbtntext}>Place order again</Text>
                </TouchableOpacity>
                </View>
            </View>
               
                 <View style={styles.itemview}>
                  <View style={styles.idview}>
                    <Text style={styles.idtext}>Order ID - {item.id}</Text>
                  </View>
                  <View style={styles.itemdetailsview}>
                    <View style={styles.itemtextview}>
                        <Text style={styles.itemheadtext}>{item.title}</Text>
                        <Text style={styles.itemprice}>${item.price}</Text>
                    </View>
                    <View style={styles.imagecontainer}>
                        <Image source={{uri:item.image}} style={styles.itemimg}/>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.chatbtn}>
                  <Icon name="chat" size={25} color={'#34495e'}/>
                    <Text style={styles.chatbtntext}>Chat with us</Text>
                    </TouchableOpacity>  
                 </View>

            </View>
        )
    }
    return(
        <View style={styles.container}>
        {status=='failed' && <Failedview/>}
        </View>
    )
}



const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ecf0f1'
    },
    reasonview:{
        width:'100%',
        height:270,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    reasoninnerview:{
        width:'95%',
        height:'90%',
        backgroundColor:'#eaf2f8',
        borderRadius:10,
        padding:15,
        justifyContent:'center'
    },
    reasonheadtext:{
        fontSize:17,
         fontFamily:'NotoSansSundanese-Bold',
        color:'#0d0301'
    },
    reasonsubtext:{
 fontFamily:'NotoSansSundanese-Medium',
   fontSize:16,
   marginTop:15,
   color:'#707b7c'
    },
    reasonbtntext:{
        fontFamily:'NotoSansSundanese-Bold',
        color:'#2e86c1'
    },
    reasonbtn:{
        width:150,
        height:35,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6,
        marginTop:20
    },
    itemview:{
        width:'100%',
        height:300,
        marginTop:10
    },
    idview:{
        width:'100%',
        height:50,
        backgroundColor:'#fff',
        justifyContent:'center',
        paddingLeft:10
    },
    idtext:{
        fontFamily:'NotoSansSundanese-Bold',
        fontSize:13,
        color:'#B6B6B6' 
    },
    itemdetailsview:{
      width:'100%',
      height:200,
      backgroundColor:'#fff',
      marginTop:1,
      flexDirection:'row',
    },
    imagecontainer:{
        width:'35%',
        height:'95%',
        alignItems:'center',
        justifyContent:'center'
    },
    itemimg:{
        width:'70%',
        height:'70%'
    },
    itemtextview:{
     width:'65%',
     height:'100%',
    },
    itemheadtext:{
    fontFamily:'NotoSansSundanese-Bold',
   fontSize:17,
   marginTop:35,
   marginLeft:10,
   color:'#17202a'
    },
    itemprice:{
        fontFamily:'NotoSansSundanese-SemiBold',
   fontSize:17, 
    color:'#17202a',
    marginTop:15,
    marginLeft:20,
    },
    chatbtn:{
        width:'100%',
        height:50,
        backgroundColor:'#fff',
        justifyContent:'center',
        marginTop:1,
        alignItems:'center',
        flexDirection:'row'
    },
    chatbtntext:{
        fontFamily:'NotoSansSundanese-Bold',
        fontSize:16, 
        marginLeft:10,
        color:'#5d6d7e'
    }

})


export default Orderdetails;