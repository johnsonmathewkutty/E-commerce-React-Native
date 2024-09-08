
import { View, Text,StyleSheet,TextInput,TouchableOpacity,
    KeyboardAvoidingView,ScrollView,Alert,TouchableWithoutFeedback,Keyboard,Image} from 'react-native'
  import React, { useEffect,useState,useRef} from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import { useNavigation } from '@react-navigation/native'
  
  import {editaddress} from '../Redux/Addressreducer'
  import 'react-native-get-random-values';
  import { v4 as uuidv4 } from 'uuid';
  import  Icon from 'react-native-vector-icons/MaterialIcons'
  import Toast from 'react-native-toast-message'
import { text } from 'express'
  



const Editprofile=()=>{
    const fullname=useSelector(state=>state.Adressdatas.fullname)
    const phonenumber=useSelector(state=>state.Adressdatas.phonenumber)
    const Email=useSelector(state=>state.Adressdatas.email)
    const defaultaddress=useSelector(state=>state.Adressdatas.defaultaddress)
    const data=defaultaddress[0] || {}
      const dispatch=useDispatch()
      const userId=useSelector(state=>state.Cartdatas.userid)
  
      const[name,setname]=useState(fullname)
      const[phno,setphno]=useState(phonenumber)
      const[email,setemail]=useState(Email)
      const[buildingname,setbuildingname]=useState(data.buildingname)
      const[street,setstreet]=useState(data.street)
      const[landmark,setlandmark]=useState(data.landmark)
      const[pincode,setpincode]=useState(data.pincode)
      const[city,setcity]=useState(data.city)
  
      const navigation=useNavigation()
  
      const myname=useRef(null)
      const myphno=useRef(null)
      const myemail=useRef(null)
      const mybuildingname=useRef(null)
      const mystreet=useRef(null)
      const mylandmark=useRef(null)
      const mypincode=useRef(null)
      const mycity=useRef(null)
    
  
      const[fullnameview,setfullnameview]=useState(false)
      const[phnoview,setphnoview]=useState(false)
      const [emailview,setemailview]=useState(false)
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
          title:'Edit Profile',
          headerTitleStyle:{
            fontFamily:'NotoSansSundanese-Bold',
          }
        })
        fullnameviewhandle(name)
        phnoviewhandle(phno)
        emailviewhandle(email)
        buildingnameviewhandle(buildingname)
        streetviewhandle(street)
        landmarkviewhandle(landmark)
        pincodeviewhandle(pincode)
        cityviewhandle(city)
      },[])
  
  
      const handleclearbutton = (field) => {
        switch (field) {
          case 'name':
           myname.current.clear()
           myname.current.focus()
            break;
          case 'phno':
           myphno.current.clear();
           myphno.current.focus()
            break;
            case 'email':
                myemail.current.clear();
                myemail.current.focus()
                 break;
          case 'buildingname': 
            mybuildingname.current.clear()
            mybuildingname.current.focus()
            break;
          case 'street':
            mystreet.current.clear();
            mystreet.current.focus()
            break;
          case 'landmark':
            mylandmark.current.clear();
            mylandmark.current.focus()
            break;
          case 'pincode':
            mypincode.current.clear();
            mypincode.current.focus()
            break;
          case 'city':
            mycity.current.clear();
            mycity.current.focus()
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

  const emailviewhandle=(text)=>{
    setemail(text)
  if(text.length>0){
    setemailview(true)
  }else
  {
    setemailview(false)
  }
  }
  
  
  const buildingnameviewhandle=(text)=>{
    setbuildingname(text)
  if(text && text.length>0){
    setbuildingnameview(true)
  }else
  {
    setbuildingnameview(false)
  }
  }
  
  
  const streetviewhandle=(text)=>{
    setstreet(text)
  if(text && text.length>0){
    setstreetview(true)
  }else
  {
    setstreetview(false)
  }
  }
  
  
  const landmarkviewhandle=(text)=>{
    setlandmark(text)
  if(text && text.length>0){
    setlandmarkview(true)
  }else
  {
    setlandmarkview(false)
  }
  }
  
  
  
  const pincodeviewhandle=(text)=>{
    setpincode(text)
  if(text && text.length>0){
    setpincodeview(true)
  }else
  {
    setpincodeview(false)
  }
  }
  
  
  const cityviewhandle=(text)=>{
    setcity(text)
  if(text && text.length>0){
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
    if (!email || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(phno)) {
        errors.phno = "Valid Email id is required";
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
      dispatch(editaddress({userId,items,name,phno,email}))
      Toast.show({
        type:'success',
        text1:'Profile Edited sucessfully',
        visibilityTime:3000
      })
     
    }
  };
  
  
  
    return(
        <View style={styles.maincontainer} >
            <ScrollView keyboardShouldPersistTaps='handled'>
            <Text style={styles.profileheadtext}>Edit Profile</Text>
            <View style={styles.imgcontainer}>
                <Image source={require('../images/accountcircle.jpg')} style={styles.img}/>
            </View>
      <View >
        <Text style={styles.subtext}>full name</Text>
     <View style={styles.inputmaincontainer}>
       <TextInput style={styles.textinput}
       value={name}
       onChangeText={(text)=>fullnameviewhandle(text)}
       clearButtonMode='never'
     ref={myname}
       />
       {fullnameview &&
       <TouchableOpacity onPress={()=>handleclearbutton('name')}>
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
       <TouchableOpacity onPress={()=>handleclearbutton('phno')}>
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
              <Text style={styles.subtext}>Email id</Text>
      <View style={styles.inputmaincontainer}>
        <TextInput style={styles.textinput}
       value={email}
       clearButtonMode='never'
       ref={myemail}
       onChangeText={(text)=>emailviewhandle(text)}
       />
     {emailview &&
       <TouchableOpacity onPress={()=>handleclearbutton('email')}>
              <Icon name="close" size={25} color="black" />
            </TouchableOpacity>
      } 
       </View>
       {errors.email && 
                  <View style={styles.errorContainer}>
                      <Icon name="error" size={20} color="red" />
                      <Text style={styles.errorText}>{errors.email}</Text>
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
       <TouchableOpacity onPress={()=>handleclearbutton('buildingname')}>
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
       <TouchableOpacity onPress={()=>handleclearbutton('street')}>
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
       <TouchableOpacity onPress={()=>handleclearbutton('landmark')}>
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
       <TouchableOpacity onPress={()=>handleclearbutton('pincode')}>
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
       <TouchableOpacity onPress={()=>handleclearbutton('city')}>
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
       <TouchableOpacity style={styles.button} onPress={()=>{handleButtonPress()}}>
          <Text style={styles.buttontext}>Update Profile</Text>
       </TouchableOpacity>
       
      </View>
      </ScrollView>
        </View>
    )
}

export default Editprofile;

  
  const styles=StyleSheet.create({
    maincontainer:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center'
    },
    profileheadtext:{
        fontSize:23,
        fontFamily:'NotoSansSundanese-SemiBold',
        marginTop:30,
        color: '#17202a',
        textAlign:'center'
    },
    imgcontainer:{
        width:'100%',
        height:200,
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width:'60%',
        height:'85%'
    },
      container:{
          flex:1,
          backgroundColor:'#fff'
      },
      textinput:{
          width:'95%',
          height:50,
          fontSize:16,
          fontFamily:'NotoSansSundanese-SemiBold',
          paddingTop:20
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
        marginTop:45
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
        height:30,
        alignSelf:'center',
         borderColor:'#B2BEB5',
         alignItems:'center',
           paddingRight:20,
           justifyContent:'space-between',
           borderBottomWidth:1,
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