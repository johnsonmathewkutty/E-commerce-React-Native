import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,Image } from "react-native";

import Icon  from "react-native-vector-icons/MaterialIcons";
import { useSelector,useDispatch } from "react-redux";
import { useNavigation,CommonActions } from "@react-navigation/native";
import auth from'@react-native-firebase/auth'
import Toast from "react-native-toast-message";
import  {clearuserdatas}  from '../Redux/Cartreducer'

function Profile(){
    const fullname=useSelector(state=>state.Adressdatas.fullname)
    const userId=useSelector(state=>state.Cartdatas.userid)
    const navigation=useNavigation()
    const dispatch = useDispatch();
   navigation.setOptions({
        headerTitleStyle:{
           fontFamily:'NotoSansSundanese-Bold',
           fontSize:23,
        },
    headerLeft:()=>(
     <View>
        <TouchableOpacity onPress={()=>navigation.navigate('Bottomtabs',{
           screen:'Home'
        })}>
        <Icon  name="arrow-back" size={35} color={'#000'}/>
        </TouchableOpacity>
     </View>
    ),
    headerStyle:{
        borderWidth:1
    }
    })
    
    const logout = async () => {
        try {
           await auth().signOut();
           Toast.show({
            type:'success',
            text1:'Logout sucessfull',
            visibilityTime:4000
          })
           dispatch(clearuserdatas());
        //    navigation.dispatch(
        //     CommonActions.reset({
        //       index: 0,
        //       routes: [{ name: 'Home' }],
        //     })
        //   );
        navigation.navigate('Bottomtabs',{screen:'Home'})
        } catch (error) {
          let errormessage='something'
          switch(error.code){
            case  'auth/no-current-user':
          errormessage = 'User not found';
          break;
          default:
          errormessage=error.message
          }
          Toast.show({
            type:'error',
            text1:errormessage,
            visibilityTime:4000
          })
        }
      };
      
     const Uerlogin=()=>{
        return(
            <View style={[styles.logincontainer,StyleSheet.absoluteFillObject]}>
             <View style={styles.imgcontainer}>
                <Image source={require('../images/Loginimage.jpg')}   style={styles.img}/>
             </View>
             <Text style={styles.subtext}>Login for the best experience</Text>
             <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.buttontext}>Login</Text>
             </TouchableOpacity>
            </View>
        )
     }
    
    return(
        <View style={styles.container}>
           <View style={styles.accountcontainer}>
               <Icon name="account-circle" size={60} color={'#4682B4'} style={{marginLeft:10}}/>
               <View>
               <Text style={styles.username}>{fullname}</Text>
               <TouchableOpacity style={styles.prfbtn}>
                    <Text style={styles.pfbtntext}>View Profile</Text>
                    <Icon name="double-arrow" size={22} color={'#7BD78A'} style={{marginTop:0}}/>
                 </TouchableOpacity>
               </View>
           </View>
           <View style={styles.listview}>
           <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Bottomtabs',{
           screen: 'Order'
           })}>
            <Text style={styles.btntext}>Your Orders</Text>
            <Icon name="arrow-forward-ios" size={20} color={'#3b312f'} style={{marginRight:10}}/>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Bottomtabs',{screen:'Cart'})}>
            <Text style={styles.btntext}>Cart</Text>
            <Icon name="arrow-forward-ios" size={20} color={'#3b312f'} style={{marginRight:10}}/>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button}>
            <Text style={styles.btntext}>Customer Care</Text>
            <Icon name="arrow-forward-ios" size={20} color={'#3b312f'} style={{marginRight:10}}/>
           </TouchableOpacity>
           <TouchableOpacity style={styles.buttonlog} onPress={logout}>
            <Text style={styles.btntext}>Logout</Text>
            <Icon name="arrow-forward-ios" size={20} color={'#3b312f'} style={{marginRight:10}}/>
           </TouchableOpacity>
           </View>
           {!userId ? <Uerlogin/> : null}
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    accountcontainer:{
     flexDirection:'row',
     height:100,
     alignItems:'center',
     backgroundColor:'#fff',
     marginTop:15,
     borderRadius:10,
     width:'97%',
     alignSelf:'center',
     borderWidth:1,
      borderColor:'#6082B6'
    },
    username:{
        fontSize:20,
        paddingTop:5,
        paddingLeft:15,
        fontFamily:'NotoSansSundanese-Bold',
        color:'#3b312f',
    },
    pfbtntext:{
        color:'#7BD78A',
        fontSize:17,
        fontFamily:'NotoSansSundanese-Bold',
        marginLeft:20
    },
    prfbtn:{
        flexDirection:'row'
    },
    listview:{
        width:'97%',
        height:223,
        backgroundColor:'#fff',
        marginTop:35,
        borderWidth:1,
        alignSelf:'center',
        borderRadius:10,
        borderColor:'#6082B6',
    },
    button:{
        width:'100%',
        height:50,
        borderBottomWidth:1,
        borderColor:'#6082B6',
        marginTop:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    buttonlog:{
        width:'100%',
        height:50,
        marginTop:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    btntext:{
        fontSize:17,
        fontFamily:'NotoSansSundanese-SemiBold',
        color:'#3b312f',
        marginLeft:15,
    },
    logincontainer:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    imgcontainer:{
        width:'85%',
        height:300,
        alignItems:'center'
    },
    img:{
        width:'90%',
        height:'93%'
    },
   subtext:{
    fontSize:20,
    fontFamily:'NotoSansSundanese-Bold',
    color:'#4682B4',
    marginTop:5,
    textAlign:'center'
   },
   buttontext:{
    color:'#fff',
    fontSize:20,
    fontWeight:'700'
  }, 
   btn:{
    width:200,
    height:50,
    backgroundColor:'#7BD78A',
    borderRadius:8,
    marginTop:30,
    justifyContent:'center',
    alignItems:'center'
  },
})


export default Profile;