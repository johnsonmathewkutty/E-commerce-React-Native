import { StyleSheet, Text, View,TextInput,TouchableOpacity,BackHandler,Keyboard,ActivityIndicator} from 'react-native'
import React, { useState,useCallback} from 'react'

import { useFocusEffect } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import Toast from 'react-native-toast-message';


const Register = ({navigation}) => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [Fullname,setFullname]=useState('')
    const [phnumber,setphnumber]=useState('')
    const [namevalid,setnamevalid]=useState(true)
    const [emailvalid,setemailvalid]=useState(true)
    const [phnovalid,setphnovalid]=useState(true)
    const [passwordvalid,setpasswordvalid]=useState(true)
    const [loading,setloading]=useState(true)
    const handlenamevalidation=(text)=>{
         setFullname(text)
      if(text.length<=2 && text.length>0){
        setnamevalid(false)
} else {
setnamevalid(true)
}
}
const handlephnovalidation=(text)=>{
  setphnumber(text)
const regex = /^(?:\+91|91)?[6789]\d{9}$/; 
if(!regex.test(text) && text.length>0){
setphnovalid(false)
} else {
setphnovalid(true)
}
}

const handleEmailvalidation=(text)=>{
  setemail(text)
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(regex.test(text) || text.length==0){
    setemailvalid(true)
  }else{
    setemailvalid(false)
  }
}

const handlePasswordvalidation = (text) => {
  setpassword(text)
  const valuezero=text.length==0
  const minLength = text.length >=8 
  const hasLowercase = /[a-z]/.test(text);
  const hasUppercase = /[A-Z]/.test(text);
  const hasDigit = /\d/.test(text);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(text);
if(minLength && hasLowercase && hasUppercase && hasDigit && hasSpecialChar || valuezero ){
  setpasswordvalid(true)
} 
else{
setpasswordvalid(false)
}
}
 
    const handleregister=async()=>{
      if(email!='' && password!='' && phnumber!='' && password!=''){
        setloading(false)
        if(namevalid && phnovalid && emailvalid && passwordvalid ){
          Keyboard.dismiss()
          try{
          const res=await auth().createUserWithEmailAndPassword(email,password)
          setloading(true)
        Toast.show({
          type:'success',
          text1:'account created sucessfully',
          text1Style:{
            fontSize:15
          },
        })
       }
       catch(Error){
        let errormessage='an error occured'
        switch(Error.code){
          case 'auth/email-already-in-use':
           errormessage='email address is already in use';
            break;
            case 'auth/network-request-failed':
            errormessage ='Required internet';
              break;
              case 'auth/unknown':
                errormessage='error occured please try again';
                break;
              default:
                errormessage=Error.message
        }
        setloading(true)
        Toast.show({
          type:'error',
          text2:errormessage,
          visibilityTime:3000
        })
       }
        }
        else{
          setloading(true)
          Toast.show({
            type:'error',
            text2:'Enter data on correct format',
            visibilityTime:3000
          })
        }
      }else{
        console.log('its working')
        Toast.show({
          type:'error',
          text2:'some of the fields are empty',
          visibilityTime:3000
        })
      }
       
    }


  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate({
          name:'Login',
          params:{
            Fullname:Fullname,
          phnumber:phnumber
          },
          merge:true
        });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [Fullname, phnumber])
  );
    
  const Apploader=()=>{
    return(
      <View style={[styles.loadercontainer,StyleSheet.absoluteFillObject]}>
        <ActivityIndicator size={80}/>
      </View>
    )
  }
  return (
    <View style={styles.logincontainer}>
      <Text style={styles.texthead}>Register</Text>
      <Text style={styles.subtext}>Create a new account</Text>
      <View style={styles.textinputcontainer}>
      <TextInput
      placeholder='Full name'
      placeholderTextColor={'#478778'}
      value={Fullname}
      onChangeText={(text)=>(handlenamevalidation(text))}
      style={styles.textinput}
       />
       {namevalid ?<Text></Text>:<Text style={styles.validtext}>Please Enter a valid name</Text>}
       <TextInput
      placeholder='Phone Number'
      placeholderTextColor={'#478778'}
      value={phnumber}
      onChangeText={(text)=>(handlephnovalidation(text))}
      style={styles.textinput}
      maxLength={10}
      />
      {phnovalid ? <Text></Text> :<Text style={styles.validtext}>Please enter a valid phone number</Text>}
      <TextInput
      placeholder='Email'
      placeholderTextColor={'#478778'}
      value={email}
      onChangeText={(text)=>(handleEmailvalidation(text))}
      style={styles.textinput}
      />
      {emailvalid ? <Text></Text> : <Text style={styles.validtext}>Please enter a valid email address</Text> }
       <TextInput
      placeholder='Password'
      placeholderTextColor={'#478778'}
      value={password}
      onChangeText={(text)=>(handlePasswordvalidation(text))}
      secureTextEntry={true}
      style={styles.textinput}
    />
     {passwordvalid ? <Text></Text> :<Text style={styles.validtext}>  Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter,
     one digit, and one special character</Text>}
      </View>
      <TouchableOpacity style={styles.buttonlogin} onPress={handleregister}>
        <Text style={styles.logintext}>Register</Text>
      </TouchableOpacity>
      <View style={styles.signupcontainer}>
        <Text style={styles.signuptext}>Already have an account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Login',{
            Fullname:Fullname,
            phnumber:phnumber,
        })}>
            <Text style={styles.buttontextsignup}>Sign in</Text>
        </TouchableOpacity>
      </View>
   {!loading && <Apploader/>} 
    </View> 
  )
}
export default Register

const styles = StyleSheet.create({
    logincontainer:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    textinput:{
        width:'85%',
        height:50,
        borderRadius:8,
        borderWidth:1,
        paddingLeft:10,
        borderColor:'green',
        alignSelf:'center',
    },
    texthead:{
        fontSize:25,
        fontWeight:'700',
        color:'#00D100',
        marginBottom:2
    },
    subtext:{
        fontSize:18,
        fontWeight:'600',
        color:'#478778',
    },
    buttonlogin:{
        width:200,
        height:50,
        backgroundColor:'#00cc00',
        borderRadius:8,
        marginTop:10,
        justifyContent:'center',
        alignItems:'center'
    },
    logintext:{
        color:'#fff',
        fontSize:20,
        fontWeight:'700'
    },
    signupcontainer:{
        flexDirection:'row',
        marginTop:10,
    },
    signuptext:{
        fontSize:18,
        fontWeight:'500',
        color:'#478778'
    },
    buttontextsignup:{
        fontSize:18,
        marginLeft:10,
        fontWeight:'500',
        color:'#478778'
    },
    textinputcontainer:{
        width:'100%',
        marginTop:40
      },
      validtext:{
        color:'#EE4B2B',
         fontFamily:'NotoSansSundanese-Regular',
       marginTop:3,
       marginLeft:35
      },
      loadercontainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.3)',
        zIndex:1
      }
})