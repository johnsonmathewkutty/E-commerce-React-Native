import { View, Text ,StyleSheet,FlatList,TouchableOpacity,Image} from 'react-native'
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { AirbnbRating,Rating } from "react-native-ratings";

import { getadress} from '../Redux/Adressreducer';

const Orderdetails = ({navigation,route}) => {
  const itemdata=useSelector(state=>state.Datainfo.itemdatas)
  const cartitemdata=useSelector(state=>state.Cartdatas.itemdetails)
  const defaultadress=useSelector(state=>state.Adressdatas.defaultadress)
  const userId=useSelector(state=>state.Cartdatas.userid)
  const item=useSelector(state=>state.Adressdatas.defaultadress)
  const dispatch=useDispatch()
  const {from} =route.params;
  useEffect(()=>{
dispatch(getadress(userId))
  },[])
 
  const Handleitemdata=()=>{
    if(from =='cart'){
      return (
      <View>
      <FlatList
      data={cartitemdata}
      renderItem={({item})=>(
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
      )}
      keyExtractor={item => item.id.toString()} />
     </View>
      )
    }else{
      return(
        <View>
        <FlatList
        data={itemdata}
        renderItem={({item})=>(
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
        )}
        keyExtractor={item => item.id.toString()} />
       </View>
      )
    }
  }
  return (
    <View style={styles.container}>
     <View style={styles.adresscontainer}>
      <View style={styles.headcontainer}>
        <Text style={styles.headtext}>Deliver to:</Text>
        <TouchableOpacity style={styles.adressbtn} onPress={()=>{navigation.navigate('Adress')}}>
          <Text style={styles.adressbtntext}>Change</Text>
        </TouchableOpacity>
      </View>
     <FlatList
     data={defaultadress}
     renderItem={({item})=>(
      <View style={styles.datasubcontainer}>
       <Text style={styles.nametext}>{item.name}</Text>
       <Text style={styles.textdetails}>{item.buildingname},{item.street},{item.city},{item.state}-
       {item.pincode}</Text>
       <Text style={styles.phnotext}>{item.phno}</Text>
      </View>
     )}/>
     </View>
    <Handleitemdata/>
    </View>
  )
}

export default Orderdetails

const styles=StyleSheet.create({
  container:{
    flex:1
  },
  adresscontainer:{
    width:'100%',
    height:200,
    alignSelf:'center',
    backgroundColor:'#fff',
    marginTop:2
  },
  headcontainer:{
    flexDirection:'row',
    paddingTop:18,
    display:'flex',
    justifyContent:'space-between',
    paddingLeft:15,
    paddingRight:18
  },
  adressbtn:{
    width:90,
    height:40,
  borderWidth:2, 
  borderColor:'#eee',
    alignItems:'center',
    justifyContent:'center',
  },
  adressbtntext:{
    color:'blue',
    fontWeight:'500',
    fontSize:15
  },
  headtext:{
    color:'#212121',
    fontSize:20,
    fontWeight:'800',
    fontFamily:'Arial,sansserif',
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
    marginBottom:5
  },
  textdetails:{
    fontSize:16,
    color:'#212121',
    fontWeight:'400'
  },
  phnotext:{
    color:'#212121',
    marginTop:5,
    fontSize:17
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
 
 
})