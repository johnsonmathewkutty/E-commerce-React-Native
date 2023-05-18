import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


const Register = ({navigation}) => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const registerin=()=>{
        if(email!='' && password!=''){
       auth().createUserWithEmailAndPassword(email,password).then((res)=>{
        Alert.alert('account created sucessfully,you can login now')
       })
       .catch((Error)=>{
        Alert.alert(Error.message)
       })
        }
        else{
            Alert.alert('fields are empty')
        }
    }
   
  return (
    <View style={styles.logincontainer}>
      <Text style={styles.texthead}>Register</Text>
      <Text style={styles.subtext}>Create a new account</Text>
      <TextInput
      placeholder='Email'
      value={email}
      onChangeText={(text)=>setemail(text)}
      style={styles.textinput}/>
       <TextInput
      placeholder='Password'
      value={password}
      onChangeText={(text)=>setpassword(text)}
      secureTextEntry={true}
      style={styles.textinput}/>
      <TouchableOpacity style={styles.buttonlogin} onPress={registerin}>
        <Text style={styles.logintext}>Register</Text>
      </TouchableOpacity>
      <View style={styles.signupcontainer}>
        <Text style={styles.signuptext}>Already have an account?</Text>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Text style={styles.buttontextsignup}>Sign in</Text>
        </TouchableOpacity>
      </View>
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