import React,{useEffect, useState} from "react";
import { View,StyleSheet,TouchableOpacity,TextInput,FlatList,Image,Text,ScrollView,TouchableHighlight, Alert} from "react-native";

import { useNavigation,useFocusEffect } from "@react-navigation/native";
import  Icon  from "react-native-vector-icons/MaterialIcons";
import { searchbarAsync,itemdetails } from "../Redux/Datainforeducer";
import { additemcount,cartdataadd,getcartdata} from "../Redux/Cartreducer";
import { getDefaultadress} from '../Redux/Adressreducer'

import { Provider, useDispatch, useSelector } from "react-redux";
import { AirbnbRating,Rating } from "react-native-ratings";
import firestore from '@react-native-firebase/firestore'
import Cart from "./Cart";


const Itemdetails=()=>{
   const dispatch=useDispatch()
   const userId=useSelector(state=>state.Cartdatas.userid)
 const searchtext=useSelector(state=>state.Datainfo.searchdata)
 const itemdata=useSelector(state=>state.Datainfo.itemdatas)
 const cartcounts=useSelector(state=>state.Cartdatas.cartcount)
 const defaultadress=useSelector(state=>state.Adressdatas.defaultadress)
  const navigation=useNavigation()
  const[search,setsearch]=useState(false)
  const[display,setdisplay]=useState(false)
  const[countchange,setcountchange]=useState(false)
  useEffect(()=>{
    dispatch(additemcount(userId)),
    dispatch(getcartdata(userId)),
    dispatch(getDefaultadress(userId))
    Headershow()
    navigation.setOptions({
      headerLeft:()=>(
        <TouchableOpacity onPress={()=>navigation.navigate('Bottomtabs',{screen:'Home'})}>
        <Icon name="arrow-back" size={24} color={'#000'}/>
      </TouchableOpacity>  
      )
    })
  },[cartcounts,itemdata,countchange])
 
  const Headershow=()=>{
    if(cartcounts>0){
    navigation.setOptions({
      headerRight:()=>(
        <View style={styles.headericon} >
          <TouchableOpacity style={styles.searchicon} onPress={handlesearchbar} >
            <Icon name="search" size={38}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Bottomtabs',
          {screen:'Cart',}
          )}>
            <Icon name="shopping-cart" size={34}/>
            <View style={styles.cartcount}>
                <Text style={styles.textcartcount}>{cartcounts}</Text>
              </View>
          </TouchableOpacity>
        </View>
      ),
    
    })
  }
  else{
    navigation.setOptions({
      headerRight:()=>(
        <View style={styles.headericon} >
          <TouchableOpacity style={styles.searchicon} onPress={handlesearchbar} >
            <Icon name="search" size={38}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Bottomtabs',
          {screen:'Cart',
          params:{previousScreen:'previousscreen'}
          })}>
            <Icon name="shopping-cart" size={34}/>
          </TouchableOpacity>
        </View>
      ),
    
    })
  }
  }
  const handlesearchbar=()=>{
    navigation.setOptions({
      headerRight:()=>(
         <View style={styles.searchbar}>
          <TextInput
          placeholder="search"
          onChangeText={(text)=>{
            dispatch(searchbarAsync(text))
            setsearch(true)
          }}
          />
          <TouchableOpacity onPress={()=>{handleclose()
          setsearch(false)}}>
            <Icon name="close" size={24}/>
          </TouchableOpacity>
         </View>
      )
    })
}
  const handleclose=()=>{
    if(cartcounts>0){ 
       navigation.setOptions({
        headerRight:()=>(
          <View style={styles.headericon} >
            <TouchableOpacity style={styles.searchicon} onPress={()=>{handlesearchbar() }} >
              <Icon name="search" size={38}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Bottomtabs',
            {screen:'Cart',
            params:{previousScreen:'previousscreen'}})}>
              <Icon name="shopping-cart" size={34}/>
              <View style={styles.cartcount}>
                <Text style={styles.textcartcount}>{cartcounts}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ),
        })}
      else{
        navigation.setOptions({
          headerRight:()=>(
            <View style={styles.headericon} >
              <TouchableOpacity style={styles.searchicon} onPress={()=>{handlesearchbar() }} >
                <Icon name="search" size={38}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('Bottomtabs',
              {screen:'Cart',
              params:{previousScreen:'previousscreen'}})}>
                <Icon name="shopping-cart" size={34}/>
              </TouchableOpacity>
            </View>
          ),
          })
      }
  
  }
  const additemdetails=(item)=>{
    dispatch(itemdetails(item))
   }
 
  if(search){
    return(
    <View style={styles.container}>
 <FlatList
            data={searchtext}
            renderItem={({item})=>(
           <TouchableOpacity onPress={()=>
          (additemdetails(item),setsearch(false),handleclose())} 
           >
         <View style={styles.searchmaincontainer}>
           
            <View style={styles.imgcontainer}>
             <Image source={{uri:item.image}} style={styles.img} />
            </View>
            <View style={styles.detailscontainer}>
                <Text style={styles.titletext}>{item.title}</Text>
                {/* <AirbnbRating
                defaultRating={item.rating.rate}
                size={22}
                isDisabled/> */}
                <Rating
                readonly
                imageSize={28}
                startingValue={item.rating.rate}
                style={styles.rating}
                />
                <View style={styles.ratingcount}>
                <Text style={styles.ratetext}>{item.rating.rate}</Text>
                <Text>({item.rating.count})</Text>
                </View>
                <Text style={styles.price}>${item.price}</Text>
            </View>
           
         </View>
         </TouchableOpacity>
            )}/>
</View>
    )
      
}
    const Details=()=>{
      if(display){
      return(
        <FlatList
        data={itemdata}
        renderItem={({item})=>(
    <View style={styles.detailedcontainer}>
    <Text style={styles.detailheadtext}>Highlights:</Text>
    <Text style={styles.detailtext}>{item.description}</Text>
    <TouchableOpacity onPress={()=>setdisplay(false)}>
        <Text  style={styles.buttontextdetail}>Read Less</Text>
      </TouchableOpacity>
  </View>
    )}/>
      )
    }
    else{
        return(
         
          <FlatList
          data={itemdata}
          renderItem={({item})=>(
          <View style={styles.maindetailcontainer}>
      <View style={styles.detailcontainer}>
      <Text style={styles.detailheadtext}>Highlights:</Text>
      <Text style={styles.detailtext}>{item.description}</Text>
    </View>
    <TouchableOpacity onPress={()=>setdisplay(true)}>
        <Text style={styles.buttontextdetail}>Read More</Text>
      </TouchableOpacity>
      </View>
      )}/>
        )

    }
  }
 
const addcartitem=(item)=>{
  if(userId==''){
    Alert.alert('Login to continue')
    navigation.navigate('Login')
  }else{
    dispatch(cartdataadd({item,userId}))
  }
  
    setTimeout(() => {
      setcountchange(true)
    },1000);
}

const handlebuynow=()=>{
  if(defaultadress.length>0){
    navigation.navigate('Orderdetails',{from:''})
  }else{
    navigation.navigate('Addnewadress')
    
  }
}
  return(
    <View style={styles.container}>
      <FlatList
      data={itemdata}
      renderItem={({item})=>(
        <View style={styles.maincontainer}>
          <View style={styles.imagecontainer}>
          <Image source={{uri:item.image}} style={styles.images}/>
          </View>
          <Text style={styles.texttitle}>{item.title}</Text>
          <View style={styles.ratingcontainer}>
       <Rating
          imageSize={23}
          startingValue={item.rating.rate}
        />
        <Text style={styles.ratingtext}>Rating {item.rating.count}</Text>
          </View>
        <Text style={styles.extraoffertext}>Top Discount of the sale</Text>
          <View style={styles.pricecontainer}>
          <Text style={styles.offertext} >30%</Text>
            <Text style={styles.textprice} >$499</Text>
            <Text style={styles.pricetext}>${item.price}</Text>
          </View>
          <Text style={styles.textpack}>+ $29 Secured Packaging Fee</Text>
          <View style={styles.infocontainer}>
            <View style={styles.infoinnercontainer}>
              <Icon name="home" size={25} color={'blue'}/>
              <Text style={styles.infotext}>7 Days Service Center Replace...</Text>
            </View>
            <View style={styles.infoinnercontainer}>
            <Icon name="money" size={25} color={'#008000'}/>
              <Text style={styles.infotext}>Cash on Delivery available</Text>
            </View>
            <View style={styles.infodeliverycontainer}>
            <Icon name="delivery-dining" size={27} color={'black'}/>
              <Text style={styles.infotext}>Free Delivery</Text>
            </View>
          </View>
           <Details/>
           < View style={styles.buttoncontainer}>
           <TouchableOpacity style={styles.buttonaction} onPress={()=>addcartitem(item)}>
            <Text style={styles.buttontext}>Add To Cart</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.buttonaction}onPress={()=>handlebuynow()}>
            <Text style={styles.buttontext}>Buy Now</Text>
           </TouchableOpacity></View>
          
            </View>
      )}/>
    </View>
  )
      }



const styles=StyleSheet.create({
  container:{
    flex:1,
  },
  headericon:{
 flexDirection:'row',
 marginRight:25
  },
  searchicon:{
    marginRight:10
  },
  searchbar:{
    width:'100%',
    height:45,
    borderWidth:2,
    borderRadius:10,
    borderColor:'#00D100',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    paddingRight:5,
    paddingLeft:5
  },
  container:{
    flex:1,
    backgroundColor:'#fff'
},
imgcontainer:{
    width:'50%',
    height:220,
    justifyContent:'center',
    alignItems:'center'
},
img:{
    width:'70%',
    height:'65%',
},
searchmaincontainer:{
    flexDirection:'row',
    borderWidth:5,
    flex:1,
    margin:10,
    borderRadius:10,
    backgroundColor:'#fff',
    borderColor:'#fff',
},
titletext:{
   fontSize:20,
   fontFamily:'inherit',
   color:'#2E2E2E',
   fontWeight:'600',
},
detailscontainer:{
    alignItems:'flex-start',
    flex:1,
    paddingTop:28
},
price:{
    fontSize:25,
    marginTop:13,
    color:'#2E2E2E',
    fontWeight:'700'
},
rating:{
    marginTop:10,

},
ratingcount:{
    flexDirection:'row',
    paddingTop:2
},
ratetext:{
   marginRight:100,
   color:'green',
   fontWeight:'900'
},
imagecontainer:{
  width:'98%',
  height:350,
  justifyContent:'center',
  alignItems:'center',
 borderWidth:3,
 borderColor:'#eee',
 marginLeft:4
},
images:{
  width:'50%',
  height:'75%',
},
texttitle:{
  color:'#262626',
  fontSize:18,
  margin:12
},
ratingcontainer:{
  flexDirection:'row',
  marginLeft:12,
  marginTop:10
},
ratingtext:{
marginLeft:10,
color:'green',
fontSize:17,
fontWeight:'700'
},
pricecontainer:{
  marginTop:8,
  borderRadius:3,
  flexDirection:'row',
  alignItems:'center',
},
pricetext:{
  fontSize:28,
  marginLeft:15,
  fontWeight:'700',
  color:'#212121'
},
textprice:{
  fontSize:23,
  marginLeft:10,
  fontWeight:'700',
  color:'#878787',
  textDecorationLine:'line-through'
},
offertext:{
  marginLeft:10,
  fontSize:21,
  fontWeight:'700',
  color:'#008000'
},
extraoffertext:{
  fontSize:16,
  color:'#008000',
  fontWeight:'500',
  marginTop:30,
  marginLeft:15,
  backgroundColor:'#90ee90',
  width:180,
},
textpack:{
  fontSize:16,
  color:'#212121',
  fontWeight:'500',
  marginLeft:10
},
infocontainer:{
  width:'100%',
  height:80,
  marginTop:25,
  borderWidth:2,
  borderColor:'#f2f2f2',
  flexDirection:'row',
  alignItems:'center',
  backgroundColor:'#f0f8ff',
  justifyContent:'space-around'
},
infoinnercontainer:{
  width:120,
  height:65,
  alignItems:'center',
  justifyContent:'center',
  borderRightWidth:3,
  borderRightColor:'#fff',
  paddingRight:10
},
infodeliverycontainer:{
  width:100,
  height:65,
  alignItems:'center',
  justifyContent:'center',
  
},
infotext:{
   color:'#212121',
   textAlign:'center',
   fontSize:13
},
detailcontainer:{
  margin:8,
  height:70,
  marginBottom:25
},
detailedcontainer:{
  width:'98%',
  height:300,
  marginTop:25,
  padding:15,
  borderWidth:3,
  borderColor:'#eee',
  alignSelf:'center'
},
maindetailcontainer:{
  height:150,
  width:'98%',
  marginTop:25,
  borderWidth:3,
  borderColor:'#eee',
  alignSelf:'center'
},
buttontextdetail:{
  color:'blue',
  marginLeft:10
},
detailtext:{
  marginTop:5,
  fontSize:18,
  color:'#262626',
},
detailheadtext:{
  fontSize:20,
  color:'#262626',
  fontWeight:'700'
},
buttonaction:{
  width:'90%',
  height:50,
  backgroundColor:'#00cc00',
  alignSelf:'center',
  marginTop:20,
  borderRadius:8,
  alignItems:'center',
  justifyContent:'center',
},
buttontext:{
 color:'#fff',
 fontSize:20,
 fontWeight:'700'
},
buttoncontainer:{
  marginBottom:50
},
cartcount:{
  width:20,
  height:20,
  borderRadius:50,
  backgroundColor:'#00cc00',
  position:'absolute',
  right:-3,
  top:-4,
  alignItems:'center'
},
textcartcount:{
  color:'#fff',
  fontSize:15,
  fontWeight:'900'
}
})


export default Itemdetails;