import { StyleSheet, Text, View,TextInput,TouchableOpacity,Keyboard,ActivityIndicator} from 'react-native'
import React, { useState } from 'react'

import auth from '@react-native-firebase/auth'
import Toast from 'react-native-toast-message';

import { firestoreuserid} from '../Redux/Cartreducer'
import { useDispatch } from 'react-redux'
import { getLogindetails } from "../Redux/Addressreducer";

const Login = ({navigation}) => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [loading,setloading]=useState(true)
    const dispatch=useDispatch()

    const login=async()=>{
      setloading(false)
        if(email !='' && password !=''){
            try{
 const response= await auth().signInWithEmailAndPassword(email,password)
 Toast.show({
  type:'success',
  text1:'Login sucessfull',
  visibilityTime:1000
})
setloading(true)
       const userId=response.user.uid
       dispatch(firestoreuserid(userId))
       dispatch(getLogindetails(userId))
    navigation.navigate('Bottomtabs', {
        screen: 'Home'
      })
   }
   catch(Error){
    let errormessage='An unknown error occurred'
    switch(Error.code){
      case 'auth/invalid-email':
        errormessage = 'Invalid email address';
        break;
        case 'auth/user-disabled':
          errormessage = 'User disabled';
          break;
        case 'auth/user-not-found':
          errormessage = 'User not found';
          break;
        case 'auth/wrong-password':
          errormessage = 'Incorrect password';
          break;
          case 'auth/network-request-failed':
            errormessage = 'Required internet';
            break;
            case 'auth/unknown':
              errormessage='error occured please try again';
              break;
          default:
            errormessage = Error.message;
    }
    setloading(true)
    Toast.show({
      type:'error',
      text1:errormessage,
      visibilityTime:4000
    })
    setemail('')
    setpassword('')
   }
}
else{
  setloading(true)
   Toast.show({
    type:'error',
    text1:'Field are Empty',
    visibilityTime:3000,
   })
}
    }

  
   
    const loginhandle=()=>{
      Keyboard.dismiss()
      login()
     
    }
    const HandleEmailvalidation=()=>{
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(regex.test(email)|| email.length==0){
        return(
         <Text></Text>
      )    
      }else{
        return(
     <Text style={styles.validtext}>Please enter a valid email address</Text>
      )
      }
    }

    const HandlePasswordvalidation = () => {
      const minLength = password.length >=8 
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    if(!minLength && password.length!=0){
      return(
      <Text style={styles.validtext}>Password must be contain 8 characters</Text>
    )}
    else if(!hasLowercase && password.length!=0){
      return(
      <Text style={styles.validtext}>Password must contain at least one small letter</Text>
    )}
   else if(!hasUppercase && password.length!=0){
    return(
    <Text style={styles.validtext}>Password must contain at least one capital letter</Text>
  )}
  else if(!hasDigit && password.length!=0){
    return(
    <Text style={styles.validtext}>Password must contain at least one digit</Text>
  )}
  else if(!hasSpecialChar && password.length!=0){
    return(
    <Text style={styles.validtext}>Password must be contain at least one special character</Text>
  )}
  else{
    return(
      null
    )}
  } 
   const Apploader=()=>{
    return(
      <View style={[styles.loadercontainer,StyleSheet.absoluteFillObject]}>
        <ActivityIndicator size={80}/>
      </View>
    )
  }

  return (
    <View style={styles.logincontainer}>
      <Text style={styles.texthead}>Sign in</Text>
      <Text style={styles.subtext}>Sign into your account</Text>
      <View style={styles.textinputcontainer}>
      <TextInput
      placeholderTextColor={'#478778'}
      placeholder='Email' 
      value={email}
      style={styles.textinput}
      onChangeText={(text)=>setemail(text)}/>
    <HandleEmailvalidation/>
       <TextInput
  placeholder='Password'
  placeholderTextColor={'#478778'}
  value={password}
  secureTextEntry={true}
  onChangeText={(text)=>setpassword(text)}
  style={styles.textinput}/>
  <HandlePasswordvalidation/>
  <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate('Passwordrecover')}>
  <Text style={styles.forgotbtn}>forgot password ?</Text>
  </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={1} style={styles.buttonlogin} onPress={()=>loginhandle()}>
        <Text style={styles.logintext}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signupcontainer}>
        <Text style={styles.signuptext}>Don't have an account?</Text>
        <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate('Register')}>
            <Text style={styles.buttontextsignup}>Sign up</Text>
        </TouchableOpacity>
      </View>
      {!loading && <Apploader/>}
    </View>
  )
}

export default Login

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
        marginTop:15,
        color:'#000',
        alignSelf:'center',
        fontFamily:'NotoSansSundanese-Regular',
    },
    texthead:{
        fontSize:25,
        fontWeight:'700',
        color:'#7BD78A',
        marginBottom:2,
    },
    subtext:{
        fontSize:19,
        fontWeight:'600',
        color:'#478778',
    },
    buttonlogin:{
        width:200,
        height:50,
        backgroundColor:'#7BD78A',
        borderRadius:8,
        marginTop:20,
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
        marginTop:20,
    },
    signuptext:{
        fontSize:18,
        color:'#478778',
        fontFamily:'NotoSansSundanese-SemiBold'
    },
    buttontextsignup:{
        fontSize:18,
        marginLeft:5,
        fontWeight:'500',
        color:'#478778'
    },
  
  validtext:{
    color:'#EE4B2B',
     fontFamily:'NotoSansSundanese-Regular',
   marginTop:3,
   marginLeft:35
  },
  textinputcontainer:{
    width:'100%',
    marginTop:40
  },
  loadercontainer:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.3)',
    zIndex:1
  },
  forgotbtn:{
    alignSelf:'flex-end',
    marginRight:35,
    fontSize:18,
    color:'#4682B4',
     fontFamily:'NotoSansSundanese-SemiBold',
     marginTop:5
  }
})