import React, { useEffect, useState} from "react";
import { View,Text,StyleSheet,FlatList,TouchableOpacity,Image,Button,ActivityIndicator, ScrollView} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation,useIsFocused} from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import firestore from '@react-native-firebase/firestore'
import  Icon  from "react-native-vector-icons/MaterialIcons";

import { getcartdata,addquantity,decreasequantity,deleteitem,buynowaction,setloading, totalpriceaction} from "../Redux/Cartreducer";
import { getDefaultaddress } from "../Redux/Addressreducer";


function Cart(){
  const userId=useSelector(state=>state.Cartdatas.userid)
   const cartdatas=useSelector(state=>state.Cartdatas.cartdata)
   const loading=useSelector(state=>state.Cartdatas.loading)
   const defaultaddress=useSelector(state=>state.Adressdatas.defaultaddress)
   const totalprice=useSelector(state=>state.Cartdatas.totalprice)
   const item=useSelector(state=>state.Cartdatas.item)
   const data=useSelector(state=>state.Datainfo.datas)
   const dispatch=useDispatch()
   const navigation=useNavigation()
   useEffect(() => {
      dispatch(getcartdata(userId))
    dispatch(getDefaultaddress(userId))
    // dispatch(totalpriceaction())
  }, [loading]);

  useEffect(() => {
    // Re-fetch the total price whenever cart data changes
    dispatch(totalpriceaction());
  }, [cartdatas, dispatch]);

 const additem=(items)=>{
   dispatch(addquantity({items,userId}))
}

const removeitem=(items)=>{
dispatch(decreasequantity({items,userId}))
}
const deleteitems=(items)=>{
  dispatch(deleteitem({items,userId}))
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
      
     const handlebuynow=(item)=>{
     if(defaultaddress && defaultaddress.length>0){
      navigation.navigate('Orderdetails',{from:'cart'})
     }else{
      navigation.navigate('Addnewaddress',{from:'cart'})
     }
     }

     if(loading){
      return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <ActivityIndicator size={50} color={'blue'} style={{width:100,height:100,backgroundColor:'#fff'}}/>
        </View>
      )
     }
    return(
      <View style={styles.container}>
        <FlatList
        data={cartdatas}
        renderItem={({item, index})=>(
          <TouchableOpacity onPress={()=>navigation.navigate('Itemdetails')}>
         <View style={styles.subcontainer}>
          <View style={styles.imagcontainer}>
         <Image source={{uri:item.image}} style={styles.image}/>
         <View style={styles.quantitycontainer}>
          
              <TouchableOpacity onPress={()=>{
                if(item.quantity>1){
                  removeitem(item)
                }else{
                  deleteitems(item)
                }
                }}>
                <View style={styles.quantityvaluebuttondec}>
                <Text style={styles.quantitytext}>-</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.quantityvalue}>
              <Text style={styles.quantitytext}>{item.quantity}</Text>
              </View>
             
              <TouchableOpacity onPress={()=>additem(item)}>
              <View style={styles.quantityvaluebuttonadd}>
                <Text style={styles.quantitytext}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detailscontainer}>
            <Text style={styles.titletext}>{item.title}</Text>
            <View style={styles.ratingcontainer}>
            <Rating imageSize={20}
           startingValue={3}
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
              <TouchableOpacity style={styles.button} onPress={()=>{deleteitems(item)}}>
              <Icon name="delete" size={23} color={'#000'}/>
                <Text style={styles.buttontext}>Delete</Text>
               </TouchableOpacity>            
              </View>
          </View>
         </View>
         </TouchableOpacity>
        )}
        ListFooterComponent={()=>(
          <View>
          <View style={styles.pricemaincontainer}>
               <View style={styles.containerprice}>
               <View>
               <Text style={styles.priceheadtext}>Price Details</Text>
                 <Text style={styles.pricesubtext}>price ({item} item)</Text>
                 <Text style={styles.pricesubtext}>Delivery charges</Text>
                 <Text style={styles.pricesubtext}>Total Amount</Text>
                 </View>
               <View style={{justifyContent:'center'}}>
                 <Text style={styles.pricesubtextleft}>$ {totalprice}</Text>
                 <Text style={styles.deliverytext}>FREE Delivery</Text>
                 <Text style={styles.totalpricetext}>$ {totalprice}</Text>
               </View>
             </View>
             </View>
             <View style={styles.securecontainer}>
              <View>
             <Icon name="security"  size={30} color={'#478778'}/>
             </View>
             <View>
              <Text style={styles.securetext}>safe and secure payments.Easy</Text>
              <Text style={styles.securetext}>returns 100% Authentic product</Text>
              </View>
             </View>
             </View>
        )}
        />
          <View style={styles.pricebuttoncontainer}>
          <View>
          <Text style={styles.btnpricetext}>$ {totalprice}</Text>
          </View>
          <View>
          <TouchableOpacity style={styles.buybutton} onPress={()=>handlebuynow()}>
            <Text style={styles.buybuttontext}>Buy Now</Text>
          </TouchableOpacity>
          </View>
      </View>
     
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
      width:105,
      marginTop:20,
      height:30,
      borderColor:'#ACACAC',
    },
    quantityvaluebuttondec:{
    borderWidth:1,
     width:35,
     alignItems:'center',
     justifyContent:'center',
     backgroundColor:'#F2F2F2',
     borderColor:'#ACACAC',
     borderTopLeftRadius:5,
     borderBottomLeftRadius:5,
     borderRightWidth:0
    },
    quantityvaluebuttonadd:{
      borderWidth:1,
      width:35,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#F2F2F2',
      borderColor:'#ACACAC',
      borderTopRightRadius:5,
      borderBottomRightRadius:5,
      borderLeftWidth:0
     },

    quantityvalue:{
      borderWidth:1,
     width:35,
     alignItems:'center',
     justifyContent:'center',
     backgroundColor:'#F2F2F2',
     borderColor:'#ACACAC',
    },
    buttoncontainer:{
       marginTop:24,
       marginLeft:90
    },
    titletext:{
      fontSize:18,
      color:'#2E2E2E',
     fontFamily:'NotoSansSundanese-Medium '
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
     color:'#000',
    },
    button:{
      width:100,
      height:35,
     backgroundColor:'#FFFFF0',
     borderRadius:6,
     justifyContent:'center',
     alignItems:'center',
     marginRight:10,
     flexDirection:'row',
     borderColor:'#478778',
     borderWidth:1
    },
    buttontext:{
      color:'#000',
      fontSize:16,
      fontWeight:'700',
      marginLeft:5
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
    fontFamily:'NotoSansSundanese-SemiBold'
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
      fontSize:16,
      marginTop:5,
      color:'#000',
      fontWeight:'400',
      fontFamily:'NotoSansSundanese-Regular'
    },
   containerprice:{
    width:'93%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:13
   },
   pricemaincontainer:{
    width:'98%',
    height:180,
    backgroundColor:'#fff',
    borderRadius:5,
    alignItems:'center',
    alignSelf:'center',
   },
   priceheadtext:{
    fontSize:20,
    color:'#404040',
    fontWeight:'700',
    marginBottom:10
   },
   pricesubtext:{
    fontSize:17,
    color:'#478778',
    fontWeight:'600',
    marginTop:13,
   },
   pricesubtextleft:{
    fontSize:18,
    color:'#000',
    fontWeight:'600',
    marginTop:39
   },
   deliverytext:{
    fontSize:17,
    color:'green',
    fontWeight:'500',
    marginTop:16,
    fontFamily:'NotoSansSundanese-SemiBold'
   },
   totalpricetext:{
     fontSize:18,
     color:'#000',
     fontWeight:'500',
     marginTop:16
   },
   securecontainer:{
    flexDirection:'row',
    width:'100%',
    height:85,
    justifyContent:'center',
    alignItems:'center'
   },
   securetext:{
     fontSize:16,
     fontWeight:'600',
     marginLeft:13,
     color:'#478778',
   },
   pricebuttoncontainer:{
    width:'100%',
    height:65,
    backgroundColor:'#fff',
    borderTopWidth:1,
    borderColor:'#eee',
    borderBottomWidth:1,
    justifyContent:'space-between',
    flexDirection:'row',
    paddingLeft:20,
    paddingRight:20,
    alignItems:'center'
   },
   buybutton:{
    width:160,
    height:40,
    borderRadius:6,
    backgroundColor:'#00cc00',
    alignItems:'center',
    justifyContent:'center'
   },
   buybuttontext:{
    color:'#fff',
    fontSize:20,
    fontWeight:'700'
   },
   btnpricetext:{
    fontSize:23,
    fontWeight:'700',
    color:'#000'
   },
  
})


export default Cart;