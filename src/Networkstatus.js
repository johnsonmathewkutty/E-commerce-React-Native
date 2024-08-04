import { View, Text,StyleSheet,Image,TouchableOpacity} from 'react-native'
import React,{useEffect,useState} from 'react'

import {useNetInfo} from '@react-native-community/netinfo';
import Netinfo from '@react-native-community/netinfo'
const Networkstatus = () => {
  const { isConnected, isInternetReachable } = useNetInfo();
 console.log(isConnected)
 console.log(isInternetReachable)
    // useEffect(() => {
    //     // const unsubscribe = useNetInfo.addEventListener(state => {
    //     //   setIsConnected(state.isConnected);
    //     //   console.log(state.isConnected)
    //     //   console.log(state.type)
    //     });
    
    //     // // Clean up subscription on unmount
    //     // return () => unsubscribe();
    //   }, []);

      const checkNetworkStatus =() => {
        Netinfo.fetch().then(state => {
          console.log("Connection type", state.type);
          console.log("Is connected?", state.isConnected);
        });
      };

  return (
  isConnected ? ( <View style={[styles.maincontainer,StyleSheet.absoluteFillObject]}>
      <View style={styles.imgcontainer}>
        <Image source={require('../src/images/NetworkError.jpg') } style={styles.img}/>
      </View>
      <Text style={styles.maintext}>No connection</Text>
      <Text style={styles.subtext}>Please check your internet connectivity and try again</Text>
      <TouchableOpacity style={styles.button} onPress={checkNetworkStatus()}>
        <Text style={styles.btntext}>Retry</Text>
      </TouchableOpacity>
    </View> )
    : null
  )
}

export default Networkstatus


const styles=StyleSheet.create({
    maincontainer:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    imgcontainer:{
      width:'100%',
      height:250,
      alignItems:'center'
    },
    img:{
      width:'100%',
      height:'100%'
    },
    maintext:{
      fontSize:30,
      color:'#3b312f',
      fontFamily:'NotoSansSundanese-Bold',
      marginTop:20
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
    }
})