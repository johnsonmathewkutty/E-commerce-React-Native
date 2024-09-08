import { View, Text,StyleSheet,TextInput,TouchableOpacity,
  KeyboardAvoidingView,ScrollView,Alert,TouchableWithoutFeedback,Keyboard} from 'react-native'
import React, { useEffect,useState,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { getaddress,saveaddress} from '../Redux/Addressreducer'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import  Icon from 'react-native-vector-icons/MaterialIcons'
import Toast from 'react-native-toast-message'

const Addnewadress = ({route}) => {
  const fullname=useSelector(state=>state.Adressdatas.fullname)
  const phonenumber=useSelector(state=>state.Adressdatas.phonenumber)
    const dispatch=useDispatch()
    const userId=useSelector(state=>state.Cartdatas.userid)

    const[name,setname]=useState(fullname)
    const[phno,setphno]=useState(phonenumber)
    const[buildingname,setbuildingname]=useState('')
    const[street,setstreet]=useState('')
    const[landmark,setlandmark]=useState('')
    const[pincode,setpincode]=useState('')
    const[city,setcity]=useState('')

    const navigation=useNavigation()
    const {from} =route.params;

    const myname=useRef(null)
    const myphno=useRef(null)
    const mybuildingname=useRef(null)
    const mystreet=useRef(null)
    const mylandmark=useRef(null)
    const mypincode=useRef(null)
    const mycity=useRef(null)


    const[fullnameview,setfullnameview]=useState(false)
    const[phnoview,setphnoview]=useState(false)
    const[buildingnameview,setbuildingnameview]=useState(false)
    const[streetview,setstreetview]=useState(false)
    const[landmarkview,setlandmarkview]=useState(false)
    const[pincodeview,setpincodeview]=useState(false)
    const[cityview,setcityview]=useState(false)

    const [errors, setErrors] = useState({});

    
    useEffect(()=>{
      navigation.setOptions({
        headerStyle:{
          borderWidth:1,
           borderColor:'#B2BEB5'
        },
        title:'Your addresses',
        headerTitleStyle:{
          fontFamily:'NotoSansSundanese-Bold',
        }
      })
      fullnameviewhandle(name)
      phnoviewhandle(phno)
    },[])


    const handleclearbutton = (field) => {
      switch (field) {
        case 'name':
         myname.current.clear()
         myname.current.focus()
         fullnameviewhandle(myname)
          break;
        case 'phno':
         myphno.current.clear();
         myphno.current.focus()
         phnoviewhandle(myphno)
          break;
        case 'buildingname':
          mybuildingname.current.clear();
          mybuildingname.current.focus()
          buildingnameviewhandle(mybuildingname)
          break;
        case 'street':
          mystreet.current.clear();
          mystreet.current.focus(),
          streetviewhandle(mystreet)
          break;
        case 'landmark':
          mylandmark.current.clear();
          mylandmark.current.focus()
          landmarkviewhandle(mylandmark)
          break;
        case 'pincode':
          mypincode.current.clear();
          mypincode.current.focus()
          pincodeviewhandle(mypincode)
          break;
        case 'city':
          mycity.current.clear();
          mycity.current.focus()
          cityviewhandle(mycity)
          break;
        default:
          break;
      }
    };
    




const fullnameviewhandle=(text)=>{
  if(text.length>0){
    setfullnameview(true)
    setname(text)
  }
  else{
    setfullnameview(false)
  }
}

const phnoviewhandle=(text)=>{
  setphno(text)
if(text.length>0){
  setphnoview(true)
}else
{
  setphnoview(false)
}
}


const buildingnameviewhandle=(text)=>{
  setbuildingname(text)
if(text.length>0){
  setbuildingnameview(true)
}else
{
  setbuildingnameview(false)
}
}


const streetviewhandle=(text)=>{
  setstreet(text)
if(text.length>0){
  setstreetview(true)
}else
{
  setstreetview(false)
}
}


const landmarkviewhandle=(text)=>{
  setlandmark(text)
if(text.length>0){
  setlandmarkview(true)
}else
{
  setlandmarkview(false)
}
}



const pincodeviewhandle=(text)=>{
  setpincode(text)
if(text.length>0){
  setpincodeview(true)
}else
{
  setpincodeview(false)
}
}


const cityviewhandle=(text)=>{
  setcity(text)
if(text.length>0){
  setcityview(true)
}else
{
  setcityview(false)
}
}





const validate = () => {
  let valid = true;
  let errors = {};

  if (!name) {
      errors.fullname = "Name is required";
      valid = false;
  }

  if (!phno || !/^\d{10}$/.test(phno)) {
      errors.phno = "Valid phone number is required";
      valid = false;
  }

  if (!buildingname) {
      errors.buildingname = "Building name is required";
      valid = false;
  }

  if (!street) {
      errors.street = "Street is required";
      valid = false;
  }

  if(!landmark){
    errors.landmark="landmark is required"
    valid=false
  }

  if (!city) {
      errors.city = "City is required";
      valid = false;
  }

  if (!pincode || !/^\d{6}$/.test(pincode)) {
      errors.pincode = "Valid pincode is required";
      valid = false;
  }

  setErrors(errors); // Set all the collected errors
  return valid; // Return whether the form is valid or not
};


const handleButtonPress = () => {
  
  if (!validate()) {
    Toast.show({
      type:'error',
      text1:'Some of the fields are empty',
      visibilityTime:4000
    })
  } else {
    const id = uuidv4(); 
      const items={id,name,buildingname,street,landmark,city,pincode,phno}
    dispatch(saveaddress({userId,items}))
    Toast.show({
      type:'success',
      text1:'Address added sucessfully',
      visibilityTime:3000
    })
      navigation.navigate('Orderdetails',{from:from})
   
  }
};




  return (
    <View
    style={styles.container}
  >
    <ScrollView keyboardShouldPersistTaps='handled'>
      <Text style={styles.headtext}>Add a new address </Text>
      <Text style={styles.subtext}>full name(First and Last name)</Text>
   <View style={styles.inputmaincontainer}>
     <TextInput style={styles.textinput}
     value={name}
     onChangeText={(text)=>fullnameviewhandle(text)}
     clearButtonMode='never'
   ref={myname}
     />
     {fullnameview &&
     <TouchableOpacity activeOpacity={0.6} onPress={()=>{handleclearbutton('name')}}>
            <Icon name="close" size={25} color="black"/>
          </TouchableOpacity>
    }
     </View>
     {errors.fullname && 
                <View style={styles.errorContainer}>
                    <Icon name="error" size={20} color="red" />
                    <Text style={styles.errorText}>{errors.fullname}</Text>
                </View>
            }

    <Text style={styles.subtext}>Mobile number</Text>
    <View style={styles.inputmaincontainer}>
      <TextInput style={styles.textinput}
     value={phno}
     clearButtonMode='never'
     ref={myphno}
     onChangeText={(text)=>phnoviewhandle(text)}
     />
   {phnoview &&
     <TouchableOpacity activeOpacity={0.6} onPress={()=>handleclearbutton('phno')}>
            <Icon name="close" size={25} color="black" />
          </TouchableOpacity>
    } 
     </View>
     {errors.phno && 
                <View style={styles.errorContainer}>
                    <Icon name="error" size={20} color="red" />
                    <Text style={styles.errorText}>{errors.phno}</Text>
                </View>
            }
     <Text style={styles.subtext}>Flat,House no..,Buliding,company</Text>
     <View style={styles.inputmaincontainer}>
     <TextInput style={styles.textinput}
     value={buildingname}
     onChangeText={(text)=>buildingnameviewhandle(text)}
        autoCapitalize='words'
        ref={mybuildingname}
        clearButtonMode='never'
     />
     {buildingnameview &&
     <TouchableOpacity activeOpacity={0.6} onPress={()=>handleclearbutton('buildingname')}>
            <Icon name="close" size={25} color="black" />
          </TouchableOpacity>
     }
     </View>
     {errors.buildingname && 
                <View style={styles.errorContainer}>
                    <Icon name="error" size={19} color="red" />
                    <Text style={styles.errorText}>{errors.buildingname}</Text>
                </View>
            }
     <Text style={styles.subtext}>Area,Street,Sector,Village</Text>
     <View style={styles.inputmaincontainer}>
     <TextInput style={styles.textinput}
     value={street}
     onChangeText={(text)=>streetviewhandle(text)}
        autoCapitalize='words'
        ref={mystreet}
     />
     {streetview &&
     <TouchableOpacity activeOpacity={0.6} onPress={()=>handleclearbutton('street')}>
            <Icon name="close" size={25} color="black" />
          </TouchableOpacity>
     }
     </View>
     {errors.street && (
                <View style={styles.errorContainer}>
                    <Icon name="error" size={20} color="red" />
                    <Text style={styles.errorText}>{errors.street}</Text>
                </View>
            )}
     <Text style={styles.subtext}>Landmark</Text>
     <View style={styles.inputmaincontainer}>
      <TextInput style={styles.textinput}
     value={landmark}
     onChangeText={(text)=>landmarkviewhandle(text)}
        autoCapitalize='words'
        ref={mylandmark}
     />
     {landmarkview &&
     <TouchableOpacity activeOpacity={0.6} onPress={()=>handleclearbutton('landmark')}>
            <Icon name="close" size={25} color="black" />
          </TouchableOpacity>
     }
     </View>
     {errors.landmark && 
                <View style={styles.errorContainer}>
                    <Icon name="error" size={20} color="red" />
                    <Text style={styles.errorText}>{errors.landmark}</Text>
                </View>
            }

     <View style={styles.textinputcontainer}>
      <View style={{width:'48%'}}>
     <Text style={styles.subtext}>Pincode</Text>
     <View style={styles.inputmaincontainer}>
      <TextInput style={styles.textinput2}
     value={pincode}
     onChangeText={(text)=>pincodeviewhandle(text)}
        autoCapitalize='words'
        ref={mypincode}
     />
     {pincodeview &&
     <TouchableOpacity activeOpacity={0.6} onPress={()=>handleclearbutton('pincode')}>
            <Icon name="close" size={25} color="black" />
          </TouchableOpacity>
    }
     </View>
     {errors.pincode && 
                <View style={styles.errorContainer}>
                    <Icon name="error" size={20} color="red" />
                    <Text style={styles.errorText}>{errors.pincode}</Text>
                </View>
            }
     </View>
     <View style={{width:'48%'}}>
      <Text style={styles.subtext}>Town/City</Text>
      <View style={styles.inputmaincontainer}>
      <TextInput style={styles.textinput2}
     value={city}
     onChangeText={(text)=>cityviewhandle(text)}
        autoCapitalize='words'
        ref={mycity}
     />
      {cityview &&
     <TouchableOpacity activeOpacity={0.6} onPress={()=>handleclearbutton('city')}>
            <Icon name="close" size={25} color="black" />
          </TouchableOpacity>}
     </View>
     {errors.city && 
                <View style={styles.errorContainer}>
                    <Icon name="error" size={20} color="red" />
                    <Text style={styles.errorText}>{errors.city}</Text>
                </View>
            }
     </View>
     </View>
     <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={()=>{handleButtonPress()}}>
        <Text style={styles.buttontext}>Add New Adress</Text>
     </TouchableOpacity>
     </ScrollView>
    </View>
  )
}

export default Addnewadress


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    textinput:{
        width:'95%',
        height:50,
        paddingLeft:15,
        fontSize:16,
        fontFamily:'NotoSansSundanese-SemiBold',
    },
    button:{
        height:50,
        width:'90%',
        alignSelf:'center',
        backgroundColor:'#00cc00',
        alignItems:'center',
        justifyContent:'center',
        marginTop:40,
        borderRadius:8,
        marginBottom:20
    },
    buttontext:{
        color:'#fff',
        fontSize:18,
        fontWeight:'800'
    },
    headtext:{
      fontSize:23,
      fontFamily:'NotoSansSundanese-Bold',
      color:'#3b312f',
      marginTop:20,
      marginLeft:15
    },
    subtext:{
      fontSize:17,
      fontFamily:'NotoSansSundanese-Bold',
      color:'#3b312f',
      marginLeft:15,
      marginTop:15
    },
    textinputcontainer:{
      flexDirection:'row',
      width:'100%',
      justifyContent:'center'
    },
    textinput2:{
      width:'94%',
      height:50,
    },
    inputmaincontainer:{
      flexDirection:'row',
      width:'95%',
      height:50,
      borderRadius:10,
      borderWidth:1,
      alignSelf:'center',
       borderColor:'#B2BEB5',
       alignItems:'center',
         paddingRight:20,
         marginTop:3,
         justifyContent:'space-between',
      },
      errorText:{
        color:'#EE4B2B',
         fontFamily:'NotoSansSundanese-Bold',
       fontSize:15,
       marginLeft:2
      },
      errorContainer: {
        flexDirection: 'row',
        marginTop:4,
        marginLeft:18
    },
})