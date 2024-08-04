import React from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native";

import Icon  from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

function Profile(){
    const fullname=useSelector(state=>state.Adressdatas.fullname)
    const navigation=useNavigation()

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
    })
    return(
        <View style={styles.container}>
           <View style={styles.accountcontainer}>
               <Icon name="account-circle" size={60} color={'#4682B4'} style={{marginLeft:10}}/>
                 <Text style={styles.username}>{fullname}</Text>
                 <TouchableOpacity>
                    <Text>View Profile</Text>
                 </TouchableOpacity>
           </View>
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    accountcontainer:{
     flexDirection:'row',
     height:100,
     alignItems:'center'
    },
    username:{
        fontSize:25,
        paddingTop:5,
        paddingLeft:5,
        fontFamily:'NotoSansSundanese-Bold',
        color:'#3b312f',
    }
})


export default Profile;