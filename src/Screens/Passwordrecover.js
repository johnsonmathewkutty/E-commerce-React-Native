import React, { useState } from "react";
import { Text, View,TextInput,StyleSheet ,TouchableOpacity, Keyboard,ActivityIndicator} from "react-native";


import auth from '@react-native-firebase/auth'
import Toast from 'react-native-toast-message';

const Passwordrecover=({navigation})=>{
    const[email,setemail]=useState('')
    const [emailvalid,setemailvalid]=useState(true)
    const [loading,setloading]=useState(true)
    const sendhandle=async()=>{
        Keyboard.dismiss()
        setloading(false)
        if(email.length>0){
            if(emailvalid){
                try{
      const response= await auth().sendPasswordResetEmail(email)
      setloading(true)
      Toast.show({
        type:'success',
        text1:'Link sended sucessfull',
        visibilityTime:1000
      })
     }
    catch(error){
        let errormessage='An unknown error occurred'
        switch(error.code){
            case 'auth/invalid-email':
                errormessage = 'Invalid email address';
                break;
         case 'auth/user-not-found':
               errormessage = 'User not found';
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
                }
            }else{
                setloading(true)
                Toast.show({
                    type:'error',
                    text2:'Enter data on correct format',
                    visibilityTime:3000
                  }) 
            }
        }else{
            setloading(true)
            Toast.show({
                type:'error',
                text2:'some of the fields are empty',
                visibilityTime:3000
              })
        }
    }
    const handleemailvalidation=(text)=>{
        setemail(text)
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(regex.test(text)|| text.length==0){
            setemailvalid(true)
        }else{
            setemailvalid(false)
        }
    }

    const Apploader=()=>{
        return(
          <View style={[styles.loadercontainer,StyleSheet.absoluteFillObject]}>
            <ActivityIndicator size={80}/>
          </View>
        )
      }

    return(
        <View style={styles.maincontainer} >
            <View style={styles.subcontainer}>
                <Text style={styles.headtext}>Forgot Password</Text>
                <TextInput
      placeholderTextColor={'#478778'}
      placeholder='Email' 
      value={email}
      style={styles.textinput}
      onChangeText={(text)=>handleemailvalidation(text)}/>
      {!emailvalid ?  <Text style={styles.validtext}>Please enter a valid email address</Text> : null}
       <Text style={styles.subtext}>We’ll send a link to this email  if it matches an existing account.</Text>
     <TouchableOpacity activeOpacity={0.8} style={styles.buttonsend} onPress={()=>sendhandle()}>
        <Text style={styles.sendtext}>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Login')}>
            <Text style={styles.buttontextsback}>Back</Text>
        </TouchableOpacity>
            </View>
            {!loading && <Apploader/>}
        </View>
    )
}

export default Passwordrecover;

const styles=StyleSheet.create({
maincontainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
},
textinput:{
    width:'90%',
    height:50,
    borderRadius:8,
    borderWidth:1,
    paddingLeft:10,
    borderColor:'green',
    marginTop:15,
    color:'#000',
    alignSelf:'center'
},
subcontainer:{
    width:'95%',
    height:370,
    borderWidth:1,
    borderColor:'#B2BEB5',
    borderRadius:6,
   alignItems:'center',
   justifyContent:'center'
},
buttontextsback:{
    fontSize:18,
    fontWeight:'500',
    color:'#478778',
    marginTop:20
},
buttonsend:{
    width:'90%',
    height:50,
    backgroundColor:'#7BD78A',
    borderRadius:8,
    marginTop:20,
    justifyContent:'center',
    alignItems:'center'
},
sendtext:{
    color:'#fff',
    fontSize:20,
    fontWeight:'700',
},
headtext:{
    fontSize:30,
    color:'#3b312f',
     fontFamily:'NotoSansSundanese-Bold',
     marginBottom:20
},
subtext:{
    fontSize:15,
    fontFamily:'NotoSansSundanese-Bold',
    color:'#4682B4',
    marginTop:20,
    marginLeft:12,
    marginRight:12,
},
validtext:{
    color:'#EE4B2B',
     fontFamily:'NotoSansSundanese-Regular',
   marginTop:3,
   marginRight:95
  },
   loadercontainer:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.3)',
    zIndex:1
  },
})