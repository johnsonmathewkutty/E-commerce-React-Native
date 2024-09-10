import { View, Text,StyleSheet,Image,TouchableOpacity} from 'react-native'
import React,{useEffect,useState} from 'react'

import NetInfo from "@react-native-community/netinfo";

const Networkstatus = () => {
  const [isConnect, setIsConnected] = useState(true)
  const [refresh, setRefresh] = useState(false);  
  useEffect(()=>{
    const unsubscribe = NetInfo.addEventListener(state => {
       setIsConnected(state.isConnected)
       if(!state.isConnected){
        setRefresh(true)
       }

    });
    
    // Unsubscribe
    return()=>{
    unsubscribe();
    }
 
   
  },[setIsConnected,setRefresh])

 

  const handlenetworkstatus=()=>{
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected)
      if (state.isConnected) {
        setRefresh(false)
      }
    });

  }
  return (
   !isConnect || refresh ? ( <View style={[styles.maincontainer,StyleSheet.absoluteFillObject]}>
    <View style={styles.headercontainer}>
      <View style={styles.iconcontainer}>
      <Image source={require('../src/images/appicon.png')} style={styles.iconimg}/>
      </View>
        </View>
      <View style={styles.imgcontainer}>
        <Image source={require('../src/images/NoNetwork.jpg') } style={styles.img}/>
      </View>
      <Text style={styles.maintext}>No connection</Text>
      <Text style={styles.subtext}>Please check your internet connectivity and try again</Text>
      <TouchableOpacity activeOpacity={1} style={styles.button} onPress={handlenetworkstatus}>
        <Text style={styles.btntext}>Retry</Text>
      </TouchableOpacity>
    </View> )
    : null
  )
}

export default Networkstatus;


const styles=StyleSheet.create({
    maincontainer:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center'
    },
    imgcontainer:{
      width:'90%',
      height:250,
      alignItems:'center',
      marginTop:110
    },
    img:{
      width:'90%',
      height:'90%'
    },
    maintext:{
      fontSize:30,
      color:'#3b312f',
      fontFamily:'NotoSansSundanese-Bold',
      marginTop:10
    },
    subtext:{
      fontSize:15,
      fontFamily:'NotoSansSundanese-Bold',
      color:'#4682B4',
      marginTop:5,
      marginLeft:30,
      marginRight:30,
      textAlign:'center'
    },
    button:{
      width:200,
      height:50,
      backgroundColor:'#7BD78A',
      borderRadius:8,
      marginTop:30,
      justifyContent:'center',
      alignItems:'center'
    },
    btntext:{
      color:'#fff',
      fontSize:20,
      fontWeight:'700'
    },
    headercontainer:{
      width:'100%',
      height:60,
      backgroundColor:'#7BD78A',
      justifyContent:'center',
    },
    iconcontainer:{
      width:'60%',
      height:50,
    justifyContent:'center',
   marginLeft:15,
    },
    iconimg:{
      width:'80%',
      height:'60%'
    }
})