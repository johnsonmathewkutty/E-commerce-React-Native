import { View, Text,StyleSheet,Image,TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';

import { saveorderdata } from '../Redux/Orderreducer';
import { deleteitem } from '../Redux/Cartreducer';
const Orderstatus = ({route,navigation}) => {
   const {status,data,from}= route.params;
   const userId=useSelector(state=>state.Cartdatas.userid)
   const dispatch=useDispatch()
   useEffect(()=>{
    if(from==''){
        dispatch(saveorderdata({status,data,userId}))
    }else{
        dispatch(saveorderdata({status,data,userId}))
        dispatch(deleteitem({data,userId}))
    }
    
   },[])
   if(status=='success'){
    return (
        <View style={styles.container}>
         <Image source={require('../images/successful.gif')} style={styles.gif}/>
         <Text style={styles.text}>Order placed successfully !!</Text>
         <TouchableOpacity activeOpacity={0.9} style={styles.buttonsuccess} onPress={()=>navigation.navigate('Bottomtabs',{screen:'Home'})}>
            <Text style={styles.btntext}>Back to Home</Text>
            </TouchableOpacity>
        </View>
      )
   }
   if(status=='failed'){
    return (
        <View style={styles.container}>
         <Image source={require('../images/errorfailed.gif')} style={styles.gif}/>
         <Text style={styles.text}>Order Failed !!</Text>
         <TouchableOpacity activeOpacity={0.9} style={styles.buttonfailed} onPress={()=>navigation.navigate('Bottomtabs',{screen:'Home'})}>
            <Text style={styles.btntext}>Back to Home</Text>
            </TouchableOpacity>
        </View>
      )
   }

   if(status=='Cancel'){
    return (
        <View style={styles.container}>
         <Image source={require('../images/successful.gif')} style={styles.gif}/>
         <Text style={styles.text}>Order Cancelled successfully !!</Text>
         <TouchableOpacity activeOpacity={0.9} style={styles.buttonsuccess} onPress={()=>navigation.navigate('Bottomtabs',{screen:'Home'})}>
            <Text style={styles.btntext}>Back to Home</Text>
            </TouchableOpacity>
        </View>
      )
   }
 
}

export default Orderstatus


const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    gif:{
        width:'70%',
        height:'40%',
    },
    text:{
        fontSize:20,
        color:'#000',
        fontWeight:'600',
        marginTop:-15
    },
    buttonsuccess:{
        width:180,
        height:50,
        backgroundColor:'#00cc00',
        borderRadius:6,
        alignItems:'center',
        justifyContent:'center',
        marginTop:25,
    },
    btntext:{
        color:'#fff',
        fontWeight:'900',
        fontSize:18
    },
    buttonfailed:{
        width:180,
        height:50,
        backgroundColor:'red',
        borderRadius:6,
        alignItems:'center',
        justifyContent:'center',
        marginTop:25,
    },
})