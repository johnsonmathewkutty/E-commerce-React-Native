import { View, Text ,StyleSheet,FlatList,TouchableOpacity,Image,ScrollView} from 'react-native'
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { AirbnbRating,Rating } from "react-native-ratings";
import RazorpayCheckout from 'react-native-razorpay';
import { getadress,setdefaultaddress,getDefaultadress} from '../Redux/Addressreducer';
import firestore from '@react-native-firebase/firestore'
import Orderstatus from './Orderstatus';

const Orderdetails = ({navigation,route}) => {
  const itemdata=useSelector(state=>state.Datainfo.itemdatas)
  const cartdatas=useSelector(state=>state.Cartdatas.cartdata)
  const defaultadress=useSelector(state=>state.Adressdatas.defaultadress)
  const userId=useSelector(state=>state.Cartdatas.userid)
  const totalprice=useSelector(state=>state.Cartdatas.totalprice)
  const item=useSelector(state=>state.Cartdatas.item)
  const dispatch=useDispatch()
  const {from} =route.params;
  useEffect(()=>{
dispatch(getadress(userId))
dispatch(getDefaultadress(userId))
  },[defaultadress])
  

  const Handleitemdata=()=>{
    if(from =='cart'){
      return (
      <FlatList
      data={cartdatas}
      renderItem={({item})=>(
        <View>
          <View style={styles.subcontainer}>
          <View style={styles.imagcontainer}>
         <Image source={{uri:item.image}} style={styles.image}/>
         <View style={styles.quantitycontainer}>
          <Text style={styles.quantitytext}>Qty:{item.quantity}</Text>
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
          </View>
        </View>
        </View>
      )}
      keyExtractor={item => item.id.toString()} 
      ListFooterComponent={()=>(
        <View style={styles.pricesubcontainer}>
        <View>
         <Text style={styles.priceheadtext}>Price  details</Text>
         <Text style={styles.subtextprice}>price ({item}item)</Text>
         <Text style={styles.subtextprice}>Delivery charge</Text>
         <Text  style={styles.subtotalprice}>Total Amount</Text>
        </View>
        <View>
        <View style={styles.pricevaluecontainer}>
         <Text style={styles.subtextprice}>$ {totalprice}</Text>
         <Text style={styles.deliverycharge}>Free Delivery</Text>
         <Text style={styles.subtotalprice}>${totalprice}</Text>
        </View>
         </View>
           </View>
      )}/>
      
        )
    }else{
      return(
        <FlatList
        data={itemdata}
        renderItem={({item})=>(
           <View>
            <View style={styles.subcontainer}>
            <View style={styles.imagcontainer}>
           <Image source={{uri:item.image}} style={styles.image}/>
           <View style={styles.quantitycontainer}>
            <Text style={styles.quantitytext}>Qty:{item.quantity}</Text>
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
            </View>
          </View>
          <View style={styles.pricesubcontainer}>
         <View>
          <Text style={styles.priceheadtext}>Price  details</Text>
          <Text style={styles.subtextprice}>price({item.quantity}item)</Text>
          <Text style={styles.subtextprice}>Discount</Text>
          <Text style={styles.subtextprice}>Delivery charge</Text>
          <Text  style={styles.subtotalprice}>Total Amount</Text>
         </View>
         <View style={styles.pricevaluecontainer}>
          <Text style={styles.subtextprice}>$499</Text>
          <Text style={styles.subtextprice}>$256</Text>
          <Text style={styles.deliverycharge}>Free Delivery</Text>
          <Text style={styles.subtotalprice}>${item.price}</Text>
         </View>
          </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()} />
      )
    }
  }
const Handlebottomview=()=>{
  if(from =='cart'){
    return(
        <View style={styles.bottomtab}>
        <View>
          <Text style={styles.bottomprice}>${totalprice}</Text>
          <Text style={styles.bottomtext}>View price details</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.bottombtn}onPress={()=>handlebuynow(item)}>
            <Text style={styles.bottombtntext}>Continue</Text>
          </TouchableOpacity>
        </View>
        </View>
    )
  }else{
    return(
   <FlatList
   data={itemdata}
   renderItem={({item})=>(
    <View style={styles.bottomtab}>
    <View>
      <Text style={styles.bottomprice}>${item.price}</Text>
      <Text style={styles.bottomtext}>View price details</Text>
    </View>
    <View>
      <TouchableOpacity style={styles.bottombtn}onPress={()=>handlebuynow(item)}>
        <Text style={styles.bottombtntext}>Continue</Text>
      </TouchableOpacity>
    </View>
    </View>
   )}/>
    )
  }
}

const handlebuynow=(item)=>{
  defaultadress.forEach((address) => {
    const name = address.name;
    const number=address.phno;
 const price=item.price
  var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.jpg',
    currency: 'USD',
    key: 'rzp_test_PzYwfvHlE9jZGf',
    amount:price*100,
    name:'E-shopping',
    order_id: '',//Replace this with an order_id created using Orders API.
    prefill: {
      contact:number,
      name:name
    },
    theme: {color: '#53a20e'}
  }

  RazorpayCheckout.open(options).then((data) => {
    // handle success
    alert(`Success: ${data.razorpay_payment_id}`);
    navigation.navigate('Orderstatus',{status:'success'})
  }).catch((error) => {
    // handle failure
    alert(`Error: ${'Their are some error occured',error.code} | ${'some error occured',error.description}`);
    navigation.navigate('Orderstatus',{status:'failed'})
  });
});
}
  return (
    
    <View style={styles.container}>
       <View style={styles.maincontainer}>
     <View style={styles.adresscontainer}>
     <FlatList
     data={defaultadress}
     renderItem={({item})=>(
      <View style={styles.datasubcontainer}>
          <View style={styles.headcontainer}>
        <Text style={styles.headtext}>Deliver to:</Text>
        <TouchableOpacity style={styles.adressbtn} onPress={()=>{navigation.navigate('Adress',{from:from}),dispatch(setdefaultaddress({item,userId}))}}>
          <Text style={styles.adressbtntext}>Change</Text>
        </TouchableOpacity>
      </View>
       <Text style={styles.nametext}>{item.name}</Text>
       <Text style={styles.textdetails}>{item.buildingname},{item.street},{item.city},{item.state}-
       {item.pincode}</Text>
       <Text style={styles.phnotext}>{item.phno}</Text>
      </View>
     )}/>
     </View>
    <View style={{ flex: 1 }}>{Handleitemdata()}</View>
   <View>{Handlebottomview()}</View>
   </View>
    </View>
  )
}

export default Orderdetails

const styles=StyleSheet.create({
  container:{
    flex:1,
  },
  adresscontainer:{
    width:'100%',
    height:200,
    alignSelf:'center',
    backgroundColor:'#fff',
    marginTop:2,
    marginBottom:10,
  },
  headcontainer:{
    flexDirection:'row',
    paddingTop:10,
    display:'flex',
    justifyContent:'space-between',
    paddingLeft:5,
    marginBottom:10
  },
  adressbtn:{
    width:90,
    height:40,
  borderWidth:2, 
  borderColor:'#eee',
    alignItems:'center',
    justifyContent:'center',
    marginRight:-8,
  },
  adressbtntext:{
    color:'blue',
    fontWeight:'500',
    fontSize:15
  },
  headtext:{
    color:'#212121',
    fontSize:22,
    fontWeight:'800',
    fontFamily:'Arial,sansserif',
    marginTop:3
  },
  datasubcontainer:{
    width:'80%',
   marginLeft:15,
   marginTop:5
  },
  nametext:{
    fontSize:18,
    fontWeight:'700',
    color:'#212121',
    marginBottom:5,
    marginLeft:5
  },
  textdetails:{
    fontSize:16,
    color:'#212121',
    fontWeight:'400',
    marginLeft:5
  },
  phnotext:{
    color:'#212121',
    marginTop:5,
    fontSize:17,
    marginLeft:5
  },
  subcontainer:{
    width:'100%',
    height:230,
    borderWidth:1,
    alignSelf:'center',
    backgroundColor:'#fff',
    borderColor:'#fff',
    flexDirection:'row',
    marginTop:15
  },
  imagcontainer:{
    width:110,
    height:150,
    marginLeft:15,
    marginTop:25
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
    fontSize:18,
    fontWeight:'700',
    color:'#212121'
  },
pricesubcontainer:{
  width:'100%',
  height:230,
  borderWidth:1,
  backgroundColor:'#fff',
  borderColor:'#fff',
  flexDirection:'row',
  marginTop:15,
  marginBottom:10,
  justifyContent:'space-between',
  paddingLeft:20,
  paddingRight:20,
  paddingTop:20,
  alignItems:'center'
},
maincontainer:{
  flex:1
},
priceheadtext:{
  fontSize:22,
  color:'#000',
  fontWeight:'700',
  marginBottom:20
},
subtextprice:{
fontSize:18,
fontWeight:'500',
marginBottom:10,
},
subtotalprice:{
  fontSize:19,
fontWeight:'500',
color:'#000',
marginTop:10
},
pricevaluecontainer:{
  marginTop:45
},
deliverycharge:{
  fontSize:18,
fontWeight:'500',
marginBottom:10,
color:'#00cc00'
},
bottombtn:{
  width:190,
  height:48,
  backgroundColor:'#00cc00',
  justifyContent:'center',
  alignItems:'center',
  marginRight:12,
  borderRadius:8
},
bottomtab:{
  width:'100%',
  height:60,
  backgroundColor:'#fff',
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  borderTopWidth:2,
  borderTopColor:'#eee'
},
 bottombtntext:{
  color:'#fff',
  fontWeight:'700',
  fontSize:20
 },
 bottomprice:{
  fontSize:24,
  color:'#000',
  fontWeight:'700',
  marginLeft:15
 },
 bottomtext:{
  marginLeft:16,
  color:'blue',
  fontWeight:'700',
  fontSize:15
 }
})