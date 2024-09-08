import React,{useEffect,useState,useLayoutEffect}from "react";
import { View,Text,StyleSheet,FlatList,TouchableOpacity, Alert,BackHandler} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import  Icon  from "react-native-vector-icons/MaterialIcons";
import { getaddress,setdefaultaddress,removeaddress} from '../Redux/Addressreducer'
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const Adress=({route})=>{
    const dispatch=useDispatch()
    const userId=useSelector(state=>state.Cartdatas.userid)
    const addressdatas=useSelector(state=>state.Adressdatas.addressdata)
    const defaultaddress=useSelector(state=>state.Adressdatas.defaultaddress)
    const navigation=useNavigation()
    const {from}=route.params;
    useEffect(()=>{
        const handleBackaction=()=>{
            if(defaultaddress.length>0){
                navigation.navigate('Orderdetails',{from:''})
                return true;
            }else{
                Toast.show({
                    type:'error',
                    text1:'Select or Add New Address',
                    visibilityTime:3000
                  })
                return true
            }
           }
           setTimeout(() => {
            BackHandler.addEventListener('hardwareBackPress',handleBackaction)
            return()=>{
             BackHandler.removeEventListener('hardwareBackPress',handleBackaction)
            }
           }, 2000);
    },[defaultaddress,navigation])

      
    if(defaultaddress.length>0){
        navigation.setOptions({
            headerLeft:()=>(
                <View>
                    <Icon name="arrow-back" size={24} color={'#000'} onPress={()=>navigation.goBack()}/>
                </View>
            )
        })
    }else{
        navigation.setOptions({
            headerLeft:()=>(
                <View>
                    <Icon size={24} name="arrow-back" color={'#000'} onPress={()=>
                    Toast.show({
                    type:'error',
                    text1:'Select or Add New Address',
                    visibilityTime:3000
                  })}/>
                </View>
            )
        })
    }

   const radiobuttonhandle=(item)=>{
    dispatch(setdefaultaddress({item,userId}))
   }
   const handleremove=(item)=>{
   dispatch(removeaddress({userId,item}))
   setTimeout(() => {
    dispatch(getaddress(userId))
   },2000);
   }
    return(
<View style={styles.container}>
  <TouchableOpacity activeOpacity={0.8} style={styles.Addbutton} onPress={()=>navigation.navigate('Addnewaddress',{from:from})}>      
<Icon name="add-box" size={30} color={'blue'}/>
<Text style={styles.Addtext}>Add New Adress</Text>
</TouchableOpacity>
   <FlatList 
   data={addressdatas}
   renderItem={({item})=>(
    <View style={styles.innerview}>
      <View>
        {item.select == true ?(
             <TouchableOpacity activeOpacity={0.6} style={styles.radiobutton}>
              <View style={styles.radioinner}/>
                 </TouchableOpacity>
        ):(
            <TouchableOpacity activeOpacity={0.6}  style={styles.radiobutton} onPress={()=>radiobuttonhandle(item)}>
            <View/>
                </TouchableOpacity>
        )}
        </View>
     <View style={styles.textcontainer}>
        <Text style={styles.nametext}>{item.name}</Text>
        <Text style={styles.detailstext}>{item.bulidingname},
        {item.street},{item.city},{item.state}-{item.pincode}</Text>
        <Text style={styles.phno}>ph no:{item.phno}</Text>
     </View>
     <View>
     <TouchableOpacity activeOpacity={0.8} style={styles.editbutton}onPress={()=>handleremove(item)}>
        <Icon name="delete" size={35} />
     </TouchableOpacity>
     </View>
    </View>
    )}/>
</View>
    )
}


export default Adress;


const styles=StyleSheet.create({
    container:{
        flex:1
    },
    innerview:{
        height:140,
        width:'95%',
        backgroundColor:'#fff',
        alignSelf:'center',
        margin:10,
        borderRadius:8,
        flexDirection:'row'
    },
    textcontainer:{
        width:'70%',
       paddingLeft:15,
       paddingTop:15
    },
    nametext:{
     fontSize:21,
     color:'#000',
     fontFamily:'NotoSansSundanese-SemiBold',
    },
    detailstext:{
        fontSize:17,
        marginTop:5,
        color:'#191919',
        fontFamily:'NotoSansSundanese-Regular',
    },
    phno:{
        fontSize:16,
        marginTop:5,
        color:'#191919',
        fontFamily:'NotoSansSundanese-Regular',
    },
    radiobutton:{
        width:22,
        height:22,
        borderWidth:2,
        borderRadius:20,
        marginLeft:8,
        marginTop:20,
      borderColor:'blue',
      justifyContent:'center',
      alignItems:'center',
    },
    radioinner:{
        width:12,
        height:12,
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'blue'
    },
    editbutton:{
        marginLeft:25,
        marginTop:50
    },
    Addbutton:{
        flexDirection:'row',
        width:'98%',
        height:50,
        backgroundColor:'#fff',
        borderRadius:8,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:5,
    },
    Addtext:{
        fontSize:20,
        fontWeight:'900',
        marginLeft:10,
        color:'blue',
        fontFamily:'NotoSansSundanese-Bold',
    }
})