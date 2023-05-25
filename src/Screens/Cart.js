import React, { useEffect, useState} from "react";
import { View,Text,StyleSheet,FlatList,TouchableOpacity,Image,Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation,useIsFocused} from "@react-navigation/native";
import  Icon  from "react-native-vector-icons/MaterialIcons";
import { Rating } from "react-native-ratings";
import firestore from '@react-native-firebase/firestore'

import { getcartdata } from "../Redux/Cartreducer";

function Cart(){
  const userId=useSelector(state=>state.Cartdatas.userid)
   const cartdatas=useSelector(state=>state.Cartdatas.cartdata)
   const dispatch=useDispatch()
   const navigation=useNavigation()
   useEffect(() => {
    dispatch(getcartdata(userId))
  }, [cartdatas]);

  const additem=async(items)=>{
 const user=await firestore().collection('users').doc(userId).get()
 let tempdata=user.data().cart;
  tempdata.map((itm)=>{
if(itm.id==items.id){
    itm.quantity=itm.quantity +1
}
  })
  firestore().collection('users').doc(userId).update({
    cart:tempdata
   })
}

const removeitem=async(items)=>{
  const user=await firestore().collection('users').doc(userId).get()
  let tempdata=user.data().cart;
   tempdata.map((itm)=>{
    if(itm.quantity>1){
 if(itm.id==items.id){
     itm.quantity=itm.quantity -1
 }
}
   })
   firestore().collection('users').doc(userId).update({
     cart:tempdata
    })
}
const deleteitem=async(index)=>{
  const user=await firestore().collection('users').doc(userId).get()
  let tempdata=user.data().cart;
  tempdata.splice(index,1)
  firestore().collection('users').doc(userId).update({
    cart:tempdata
   })
}
     if(userId==''){
      return(
        <View style={styles.emptycontainer}>
        <View style={styles.imagecontainerempty}>
        <Image source={require('../images/cartimage.webp')} style={styles.emptyimage}/>
        </View>
       <Text style={styles.emptytext}>Missing Cart Items</Text>
       <Text style={styles.emptysubtext}>Login to see the items you added previously</Text>
      <TouchableOpacity style={styles.buttonempty} onPress={()=>navigation.navigate('Login')}>
        <Text style={styles.emptybuttontext}>Login</Text>
      </TouchableOpacity>
      </View>
      )
     }
     if(cartdatas.length<=0 && userId != ''){
      return(
        <View style={styles.emptycontainer}>
          <View style={styles.imagecontainerempty}>
          <Image source={require('../images/cartimage.webp')} style={styles.emptyimage}/>
          </View>
         <Text style={styles.emptytext}>your cart is empty !</Text>
         <Text style={styles.emptysubtext}>Add item to it now</Text>
        <TouchableOpacity style={styles.buttonempty} onPress={()=>navigation.navigate('Bottomtabs',
        {screen:'Home',
        params:{email:'',password:''}
        }
        )}>
          <Text style={styles.emptybuttontext}>Continue Shopping</Text>
        </TouchableOpacity>
        </View>
      )
     }
    return(
        <View style={styles.container}>
        <FlatList
        data={cartdatas}
        renderItem={({item, index})=>(
         <View style={styles.subcontainer}>
          <View style={styles.imagcontainer}>
         <Image source={{uri:item.image}} style={styles.image}/>
         <View style={styles.quantitycontainer}>
              <TouchableOpacity onPress={()=>{
                if(item.quantity>1){
                  removeitem(item)
                }else{
                  deleteitem(index)
                }
                }}>
                <Text style={styles.quantitytext}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantitytext}>{item.quantity}</Text>
              <TouchableOpacity onPress={()=>additem(item)}>
                <Text style={styles.quantitytext}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detailscontainer}>
            <Text style={styles.titletext}>{item.title}</Text>
            <View style={styles.ratingcontainer}>
            <Rating imageSize={20}
           startingValue={item.rating.rate}
             readonly
            />
            <Text style={styles.ratingtext}>({item.rating.count})</Text>
            </View>
            <View style={styles.pricecontainer}>
              <Text style={styles.priceoffer}>30%</Text>
              <Text style={styles.pricetext}>$499</Text>
              <Text style={styles.offerprice}>${item.price}</Text>
            </View>
            <View style={styles.buttoncontainer}>
              <TouchableOpacity style={styles.button} onPress={()=>deleteitem(index)}>
                <Text style={styles.buttontext}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button1}>
                <Text style={styles.buttontext}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
         </View>
        )}
        />
     </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1
    },subcontainer:{
      width:'97%',
      height:230,
      borderWidth:1,
      borderRadius:8,
      alignSelf:'center',
      margin:5,
      backgroundColor:'#fff',
      borderColor:'#fff',
      flexDirection:'row'
    },
    imagcontainer:{
      width:110,
      height:150,
      marginLeft:8,
      marginTop:20
    },
    image:{
      width:'92%',
      height:'85%',
    
    },
    detailscontainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    ratingcontainer:{
      flexDirection:'row',
      marginTop:10,
      marginRight:50
    },
    pricecontainer:{
      flexDirection:'row',
      marginTop:10,
      marginRight:25
    },
    quantitycontainer:{
      flexDirection:'row',
      borderWidth:1,
      width:100,
      justifyContent:'space-evenly',
      marginTop:20,
      height:30,
      borderRadius:5,
      backgroundColor:'#F2F2F2',
      borderColor:'#ACACAC',
    },
    buttoncontainer:{
       flexDirection:'row',
       marginTop:15
    },
    titletext:{
      fontSize:18,
      fontWeight:'600',
      color:'#2E2E2E',
      fontFamily:'inherit'
    },
    ratingtext:{
      marginLeft:6,
      color:'green',
      fontWeight:'600',
      fontSize:16
    },
    priceoffer:{
      fontSize:18,
      fontWeight:'700',
      color:'#008000',
      marginRight:8
    },
    pricetext:{
      fontSize:18,
  marginRight:8,
  fontWeight:'700',
  color:'#878787',
  textDecorationLine:'line-through'
    },
    offerprice:{
      fontSize:20,
      marginLeft:5,
      fontWeight:'700',
      color:'#212121'
    },
    quantitytext:{
      fontSize:22,
      fontWeight:'700',
     marginTop:-1,
    },
    button:{
      width:100,
      height:35,
     backgroundColor:'#FF0000',
     borderRadius:6,
     justifyContent:'center',
     alignItems:'center',
     marginRight:10
    },
    buttontext:{
      color:'#fff',
      fontSize:18,
      fontWeight:'700'
    },
    button1:{
      width:100,
      height:35,
     backgroundColor:'#00cc00',
     borderRadius:6,
     justifyContent:'center',
     alignItems:'center'
    },
    emptytext:{
    fontSize:24,
    fontWeight:'600',
    color:'#212121',
    fontFamily:'aira,sans-serif'
    },
    emptycontainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#fff'
    },
    buttonempty:{
      width:200,
      height:50,
      backgroundColor:'#00cc00',
      alignItems:'center',
      justifyContent:'center',
      marginTop:15,
      borderRadius:10
    },
    emptybuttontext:{
      color:'#fff',
      fontSize:18,
      fontWeight:'900'
    },
    imagecontainerempty:{
      width:'90%',
      height:'40%',
     
    },
    emptyimage:{
      width:'90%',
      height:'90%',
      alignSelf:'center'
    },
    emptysubtext:{
      fontSize:17,
      marginTop:5,
      color:'#000',
      fontWeight:'400',
      fontFamily:'aira,sans-serif'
    },
   
})


export default Cart;