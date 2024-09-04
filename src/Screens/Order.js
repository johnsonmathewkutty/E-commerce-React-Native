import React, { useEffect } from "react";
import { View,Text,StyleSheet,FlatList,Image,TouchableOpacity} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import Icon  from "react-native-vector-icons/MaterialIcons";

import { Getorderdata } from "../Redux/Orderreducer";

function Order({navigation}){
    const userId=useSelector(state=>state.Cartdatas.userid)
    const orderdata=useSelector(state=>state.Orderdata.orderdatas)
    const dispatch=useDispatch()
    const reversedData = [...orderdata].reverse();
    useEffect(()=>{
        dispatch(Getorderdata(userId))
    },[orderdata])
     
    const Emptypage=()=>{
     return(
        <View style={[styles.emptycontainer,StyleSheet.absoluteFillObject]}>
          <View style={styles.imagecontainer}>
            <Image source={require('../images/ordernow.jpg')} style={styles.image}/>
          </View>
          <Text style={styles.emptytext}>you haven't placed any order yet!</Text>
          <TouchableOpacity style={styles.btncontainer} onPress={()=>navigation.navigate('Bottomtabs',{screen:'Home'})}>
            <Text style={styles.btntext}>Order now</Text>
          </TouchableOpacity>
        </View>
     )
    }
    const  Loginuser=()=>{
    return(
        <View style={[styles.emptycontainer,StyleSheet.absoluteFillObject]}>
          <View style={styles.imagecontainer}>
            <Image source={require('../images/ordernow.jpg')} style={styles.image}/>
          </View>
          <Text style={styles.headlogintext}>Missing order Details</Text>
          <Text style={styles.sublogintext}>Login to see the orders you already done</Text>
          <TouchableOpacity style={styles.btncontainer} onPress={()=>navigation.navigate('Login')}>
            <Text style={styles.btntext}>Login</Text>
          </TouchableOpacity>
        </View>
    )
    }
    return(
        <View style={styles.container}>
        <FlatList
         data={reversedData}
         renderItem={({item})=>(
         <View>
            {item.status=='failed' &&
            <View style={styles.subcontainer}>
                <View style={styles.imgcontainer}>
                <Image source={{uri:item.image}} style={styles.img}/>
                </View>
                <View style={styles.textcontainer}>
            <Text style={styles.headtextfail}>Order Not Placed</Text>
            <Text style={styles.titletext}>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Order details',{item,status:item.status})}>
                <Icon name="arrow-forward-ios" size={20} color={'#0d0301'}/>
            </TouchableOpacity>
            </View>}
        {item.status=='success' &&
        <View style={styles.subcontainer}>
            <View style={styles.imgcontainer}>
                <Image source={{uri:item.image}} style={styles.img}/>
                </View>
                <View style={styles.textcontainer}>
            <Text style={styles.headtext}>Order Placed</Text>
            <Text style={styles.titletext}>{item.title}</Text>
            </View>
            <TouchableOpacity  onPress={()=>navigation.navigate('Order details',{item,status:item.status})}>
                <Icon name="arrow-forward-ios" size={20} color={'#0d0301'}/>
            </TouchableOpacity>
            </View>}
        </View>
         )
        }
        />
        {orderdata=='' && <Emptypage/>}
        {userId==''  && <Loginuser/>}
        </View>
    )
}


const styles=StyleSheet.create({
    emptycontainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'#fff'
    },
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    subcontainer:{
        width:'100%',
        height:150,
        borderBottomWidth:1,
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#b2babb'
    },
    imgcontainer:{
        width:'35%',
        height:130,
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width:'63%',
        height:'90%'
    },
    textcontainer:{
        width:'55%'
    },
    headtext:{
        fontSize:20,
        fontFamily:'NotoSansSundanese-SemiBold',
        color:'#28b463'
    },
    titletext:{
   fontFamily:'NotoSansSundanese-Medium',
   fontSize:15,
   marginTop:5,
   color:'#707b7c'
    },
    headtextfail:{
        fontSize:20,
        fontFamily:'NotoSansSundanese-SemiBold',
        color:'#f1c40f' 
    },
    image:{
        width:'100%',
        height:'100%'
    },
    imagecontainer:{
        width:'90%',
        height:280,
    },
    emptytext:{
        fontSize:20,
        fontFamily:'NotoSansSundanese-SemiBold',
        color:'#0d0301'
    },
    btncontainer:{
        width:170,
        height:50,
        backgroundColor:'#7BD78A',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,
    },
    btntext:{
        fontSize:20,
        color:'#fff',
        fontFamily:'NotoSansSundanese-Bold',
    },
    sublogintext:{
        fontSize:17,
        fontFamily:'NotoSansSundanese-Regular',
        color:'#707b7c',
        textAlign:'center',
        marginTop:5
    },
    headlogintext:{
        fontSize:25,
        fontFamily:'NotoSansSundanese-SemiBold',
        color:'#0d0301'
    },
})

export default Order;