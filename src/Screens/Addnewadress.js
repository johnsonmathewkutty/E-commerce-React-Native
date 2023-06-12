import { View, Text,StyleSheet,TextInput,TouchableOpacity,KeyboardAvoidingView,ScrollView,Alert} from 'react-native'
import React, { useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getadress,saveadress} from '../Redux/Adressreducer'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const Addnewadress = ({navigation}) => {
    const dispatch=useDispatch()
    const userId=useSelector(state=>state.Cartdatas.userid)
    const[name,setname]=useState('')
    const[buildingname,setbuildingname]=useState('')
    const[street,setstreet]=useState('')
    const[city,setcity]=useState('')
    const[state,setstate]=useState('')
    const[pincode,setpincode]=useState('')
    const[phno,setphno]=useState('')
    const[select,setselect]=useState(false)
   
  
    const handleButtonPress = () => {
        if (!name||!buildingname||!street||!city||!state ||!pincode ||!phno) {
          Alert.alert('Error', 'Please enter the values');
        } else {
          const id = uuidv4(); 
            const items={id,name,buildingname,street,city,state,pincode,phno,select}
          dispatch(saveadress({userId,items}))
          navigation.navigate('Orderdetails',{from:''})
        }
      };
  return (
    <KeyboardAvoidingView
    style={styles.container}
  >
    <ScrollView>
     <TextInput style={styles.textinput}
     placeholder='Full name'
     value={name}
     onChangeText={(text)=>setname(text)}
     autoCapitalize="words"
     />
      <TextInput style={styles.textinput}
     placeholder='House No,Building Name'
     value={buildingname}
     onChangeText={(text)=>setbuildingname(text)}
     />
     <TextInput style={styles.textinput}
     placeholder='Street'
     value={street}
     onChangeText={(text)=>setstreet(text)}
     />
     <TextInput style={styles.textinput}
     placeholder='City'
     value={city}
     onChangeText={(text)=>setcity(text)}
     />
      <TextInput style={styles.textinput}
     placeholder='State'
     value={state}
     onChangeText={(text)=>setstate(text)}
     />
      <TextInput style={styles.textinput}
     placeholder='Pincode'
     value={pincode}
     onChangeText={(text)=>setpincode(text)}
     />
      <TextInput style={styles.textinput}
     placeholder='Phone Number'
     value={phno}
     maxLength={10}
     keyboardType='phone-pad'
     onChangeText={(text)=>setphno(text)}
     />
     <TouchableOpacity style={styles.button} onPress={()=>{handleButtonPress()}}>
        <Text style={styles.buttontext}>Add New Adress</Text>
     </TouchableOpacity>
     </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Addnewadress


const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    textinput:{
        width:'90%',
        height:50,
        borderRadius:5,
        borderWidth:1,
        alignSelf:'center',
        marginTop:13,
        marginBottom:18,
        paddingLeft:10,
        borderColor:'green'
    },
    button:{
        height:50,
        width:'90%',
        alignSelf:'center',
        backgroundColor:'#00cc00',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        borderRadius:8
    },
    buttontext:{
        color:'#fff',
        fontSize:18,
        fontWeight:'800'
    }
})