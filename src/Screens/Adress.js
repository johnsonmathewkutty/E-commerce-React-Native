import React,{useEffect,useState}from "react";
import { View,Text,StyleSheet,FlatList,TouchableOpacity, Alert} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import  Icon  from "react-native-vector-icons/MaterialIcons";
import { getadress,setdefaultaddress,removeadress} from '../Redux/Adressreducer'
import { useNavigation } from "@react-navigation/native";

const Adress=()=>{
    const dispatch=useDispatch()
    const userId=useSelector(state=>state.Cartdatas.userid)
    const adressdatas=useSelector(state=>state.Adressdatas.adressdata)
    const defaultadress=useSelector(state=>state.Adressdatas.defaultadress)
    const navigation=useNavigation()
    if(defaultadress.length>0){
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
                    <Icon size={24} name="arrow-back" color={'#000'} onPress={()=>Alert.alert('pelase select the adress or add new adress')}/>
                </View>
            )
        })
    }
   const radiobuttonhandle=(item)=>{
    dispatch(setdefaultaddress({item,userId}))
   }
   const handleremove=(item)=>{
   dispatch(removeadress({userId,item}))
   setTimeout(() => {
    dispatch(getadress(userId))
   },2000);
   }
    return(
<View style={styles.container}>
  <TouchableOpacity style={styles.Addbutton} onPress={()=>navigation.navigate('Addnewadress')}>      
<Icon name="add-box" size={30} color={'blue'}/>
<Text style={styles.Addtext}>Add New Adress</Text>
</TouchableOpacity>
   <FlatList 
   data={adressdatas}
   renderItem={({item})=>(
    <View style={styles.innerview}>
      <View>
        {item.select ==true ?(
             <TouchableOpacity  style={styles.radiobutton}>
              <View style={styles.radioinner}/>
                 </TouchableOpacity>
        ):(
            <TouchableOpacity  style={styles.radiobutton} onPress={()=>radiobuttonhandle(item)}>
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
     <TouchableOpacity style={styles.editbutton}onPress={()=>handleremove(item)}>
        <Text style={{color:'#fff',fontWeight:'600'}}>Remove</Text>
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
     fontWeight:'700'
    },
    detailstext:{
        fontSize:17,
        marginTop:5,
        color:'#191919',
    },
    phno:{
        fontSize:16,
        marginTop:5,
        color:'#191919'
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
      alignItems:'center'
    },
    radioinner:{
        width:12,
        height:12,
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'blue'
    },
    editbutton:{
        width:60,
        height:30,
        backgroundColor:'red',
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10,
        marginTop:60
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
        color:'blue'
    }
})