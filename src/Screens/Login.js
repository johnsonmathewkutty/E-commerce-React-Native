import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'

import auth from '@react-native-firebase/auth'
import { useDispatch,useSelector } from 'react-redux'
import { firestoreuserid } from '../Redux/Cartreducer'

const Login = ({navigation}) => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const dispatch=useDispatch()
   
    const userid=(userId)=>{
      dispatch(firestoreuserid(userId))
    }
    const login=()=>{
        if(email !='' && password !=''){
   auth().signInWithEmailAndPassword(email,password).then((response)=>{
    Alert.alert('Login sucessfull')
    userid(response.user.uid)
    navigation.navigate('Bottomtabs', {
        screen: 'Home',
        params: { email: email,
                 password:password
        },
      })
   })
   .catch((Error)=>{
    Alert.alert(Error.message)
    setemail('')
    setpassword('')
   })
}
else{
    Alert.alert('fields are empty')
}
    }
   
    const loginhandle=()=>{
         login()
    }
  return (
    <View style={styles.logincontainer}>
      <Text style={styles.texthead}>Sign in</Text>
      <Text style={styles.subtext}>Sign into your account</Text>
      <TextInput
      placeholder='Email'
      value={email}
      style={styles.textinput}
      onChangeText={(text)=>setemail(text)}/>
       <TextInput
      placeholder='Password'
      value={password}
      secureTextEntry={true}
      onChangeText={(text)=>setpassword(text)}
      style={styles.textinput}/>
      <TouchableOpacity style={styles.buttonlogin} onPress={()=>loginhandle()}>
        <Text style={styles.logintext}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signupcontainer}>
        <Text style={styles.signuptext}>Don't have an account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
            <Text style={styles.buttontextsignup}>Sign up</Text>
        </TouchableOpacity>
      </View>
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
        marginTop:30
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
    },
    buttonlogin:{
        width:200,
        height:50,
        backgroundColor:'#00cc00',
        borderRadius:8,
        marginTop:30,
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
        fontWeight:'500'
    },
    buttontextsignup:{
        fontSize:18,
        marginLeft:5,
        fontWeight:'500'
    }
})