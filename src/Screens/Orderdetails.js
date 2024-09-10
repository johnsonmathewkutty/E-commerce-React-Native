import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated,ScrollView ,FlatList} from "react-native";

import Icon from "react-native-vector-icons/Octicons";
import  Icons  from "react-native-vector-icons/MaterialIcons";
import { itemdetails } from "../Redux/Datainforeducer";
import { useDispatch,useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import {
    initialize,
    showMessaging,
  } from '@robbywh/react-native-zendesk-messaging'


const Orderdetails = ({ route, navigation }) => {
    const { item, status } = route.params;
    const defaultaddress=useSelector(state=>state.Adressdatas.defaultaddress)
    const dispatch = useDispatch()
    const [selectstep, setselectstep] = useState(0)
    const [cancelview,setcancelview]=useState(false)
    const progress1 = useRef(new Animated.Value(0)).current;
    const progress2 = useRef(new Animated.Value(0)).current;
    const progress3 = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        let isMounted = true; // Track if the component is mounted
    
        const handlestatus = () => {
            if (isMounted) setselectstep(1);
            const timer1 = setTimeout(() => {
                if (isMounted) setselectstep(2);
            }, 3000);
            
            // Add more timeouts or async tasks as needed
    
            return () => {
                clearTimeout(timer1); // Cleanup on unmount
                isMounted = false; // Update the flag when unmounting
            };
        };
    
        handlestatus();
    
        return () => {
            isMounted = false; // Ensure to cancel any pending updates
        };
    }, [])
    useEffect(() => {
        initialize('eyJzZXR0aW5nc191cmwiOiJodHRwczovL3RzbTY2MTIuemVuZGVzay5jb20vbW9iaWxlX3Nka19hcGkvc2V0dGluZ3MvMDFKNzNKOEs0OEE5MURaUEZCSkNBMzdBUlAuanNvbiJ9');
      }, []);
    const start1 = () => {
        Animated.timing(progress1, {
            toValue: 59,
            duration: 3000,
            useNativeDriver: false
        }).start()
    }
    const start2 = () => {
        Animated.timing(progress2, {
            toValue: 58,
            duration: 3000,
            useNativeDriver: false
        }).start()
    }
    const start3 = () => {
        Animated.timing(progress3, {
            toValue: 59,
            duration: 3000,
            useNativeDriver: false
        }).start()
    }
    if (selectstep == 1) {
        start1()
    }
    if (selectstep == 2) {
        start2()
    }
    if(selectstep == 3){
        start3()
    }
    const Failedview = () => {
        return (
            <View style={styles.container}>
                <View style={styles.reasonview}>
                    <View style={styles.reasoninnerview}>
                        <Text style={styles.reasonheadtext}>Order not placed.Try ordering again</Text>
                        <Text style={styles.reasonsubtext}>Due to an error with the payment,this order could
                            not be placed.please place a new order
                        </Text>
                        <Text style={styles.reasonsubtext}>Payment was not successful.Please contact your
                            bank for any more deducted
                        </Text>
                        <TouchableOpacity activeOpacity={0.9} style={styles.reasonbtn} onPress={() => { dispatch(itemdetails(item)), navigation.navigate('Order Summary', { from: '' }) }}>
                            <Text style={styles.reasonbtntext}>Place order again</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.itemview}>
                    <View style={styles.idview}>
                        <Text style={styles.idtext}>Order ID - {item.id}</Text>
                    </View>
                    <View style={styles.itemdetailsview}>
                        <View style={styles.itemtextview}>
                            <Text style={styles.itemheadtext}>{item.title}</Text>
                            <Text style={styles.itemprice}>${item.price}</Text>
                        </View>
                        <View style={styles.imagecontainer}>
                            <Image source={{ uri: item.image }} style={styles.itemimg} />
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.9} style={styles.chatbtn}onPress={() => showMessaging()}>
                        <Icons name="chat" size={25} color={'#34495e'} />
                        <Text style={styles.chatbtntext}>Chat with us</Text>
                    </TouchableOpacity>
                </View>
             
            </View>
        )
    }

    const Successview = () => {
        return (
            <View style={styles.container}>
                    <View>
                    <View style={styles.idview}>
                        <Text style={styles.idtext}>Order ID - {item.id}</Text>
                    </View>
                    <View style={styles.itemdetailsview}>
                        <View style={styles.itemtextview}>
                            <Text style={styles.itemheadtext}>{item.title}</Text>
                            <Text style={styles.itemprice}>${item.price}</Text>
                        </View>
                        <View style={styles.imagecontainer}>
                            <Image source={{ uri: item.image }} style={styles.itemimg} />
                        </View>
                    </View>
                </View>
                <View style={styles.trackcontainer}>
                <View style={styles.trackingview}>
                    <View style={styles.innerview}>
                        <View>
                            {selectstep > 0 ? <Icon name="check-circle-fill" size={22} color={'#25bc2c'} />
                                :
                                <Icon name="check-circle" size={22} color={'#25bc2c'} />}

                        </View>
                        <View style={styles.flowview}></View>
                        <View>
                            {selectstep > 1 ? <Icon name="check-circle-fill" size={22} color={'#25bc2c'} />
                                :
                                <Icon name="check-circle" size={22} color={'#25bc2c'} />}
                        </View>
                        <View style={styles.flowview}></View>
                        <View>
                            {selectstep > 2 ? <Icon name="check-circle-fill" size={22} color={'#25bc2c'} />
                                :
                                <Icon name="check-circle" size={22} color={'#25bc2c'} />}
                        </View>
                        <View style={styles.flowview}></View>
                        <View>
                            {selectstep > 3 ? <Icon name="check-circle-fill" size={22} color={'#25bc2c'} />
                                :
                                <Icon name="check-circle" size={22} color={'#25bc2c'} />}
                        </View>
                    </View>
                    <View style={styles.upperview}>
                        <Animated.View style={{
                            width: 4,
                            height: progress1,
                            backgroundColor: '#25bc2c',
                            marginTop: 22
                        }}></Animated.View>
                        <Animated.View style={{
                            width: 4,
                            height: progress2,
                            backgroundColor: '#25bc2c',
                            marginTop: 24
                        }}></Animated.View>
                         <Animated.View style={{
                            width: 4,
                            height: progress3,
                            backgroundColor: '#25bc2c',
                            marginTop: 26
                        }}></Animated.View>
                    </View>
                </View>
                <View style={styles.tracktext}>
                    <Text style={styles.tracktext1}>Order Confirmed</Text>
                    <Text style={styles.tracktext2}>Shipped</Text>
                    <Text style={styles.tracksubtext}>your item shipped from courier facility</Text>
                    <Text style={styles.tracktext3}>Out For Delivery</Text>
                    <Text style={styles.tracksubtext}>Delivery boy picked your packet from courier office</Text>
                     <Text style={styles.tracktext4}>Order Delivered</Text>
                     <Text style={styles.tracksubtext}>Delivery boy delevered item on given address</Text>
                </View>
                </View>
                <View style={styles.buttoncontainer}>
                <TouchableOpacity activeOpacity={0.8} style={styles.successbtn1} onPress={()=>setcancelview(true)}>
                        <Text style={styles.chatbtntext}>Cancel Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.successbtn2} onPress={() => showMessaging()}>
                        <Icons name="chat" size={25} color={'#34495e'} />
                        <Text style={styles.chatbtntext}>Chat with us</Text>
                    </TouchableOpacity>
                </View>
               
            </View>
        )
    }

    const  Cancelview=()=>{
        return (
            <View style={styles.container}>
                    <View>
                    <View style={styles.idview}>
                        <Text style={styles.idtext}>Order ID - {item.id}</Text>
                    </View>
                    <View style={styles.itemdetailsview}>
                        <View style={styles.itemtextview}>
                            <Text style={styles.itemheadtext}>{item.title}</Text>
                            <Text style={styles.itemprice}>${item.price}</Text>
                        </View>
                        <View style={styles.imagecontainer}>
                            <Image source={{ uri: item.image }} style={styles.itemimg} />
                        </View>
                    </View>
                </View>
                <View style={styles.canceltrackcontainer}>
                <View style={styles.trackingview}>
                    <View style={styles.innerview}>
                        <View>
                            {selectstep > 0 ? <Icon name="check-circle-fill" size={22} color={'#25bc2c'} />
                                :
                                <Icon name="check-circle" size={22} color={'#25bc2c'} />}

                        </View>
                        <View style={styles.flowview}></View>
                        <View>
                            {selectstep > 1 ? <Icon name="check-circle-fill" size={22} color={'#e74c3c'} />
                                :
                                <Icon name="check-circle" size={22} color={'#25bc2c'} />}
                        </View>
                    </View>
                    <View style={styles.upperview}>
                        <Animated.View style={{
                            width: 4,
                            height: progress1,
                            backgroundColor: '#25bc2c',
                            marginTop: 22
                        }}></Animated.View>
                    </View>
                </View>
                <View style={styles.tracktext}>
                    <Text style={styles.tracktext1}>Order Confirmed</Text>
                    <Text style={styles.tracktext2}>order Cancelled</Text>
                    <Text style={styles.tracksubtext}>you requested for item  cancel,</Text>
                </View>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={styles.chatbtn} onPress={() => showMessaging()}>
                        <Icons name="chat" size={25} color={'#34495e'} />
                        <Text style={styles.chatbtntext}>Chat with us</Text>
                    </TouchableOpacity>
            </View>
        )
    }


   const  handlecancel=()=>{
    navigation.navigate('Orderstatus',{status:'Cancel',data:item})
    setcancelview(false)
   }

    const Cancelpopupview=()=>{
        return(
         <View style={[styles.Cancelcontainer,StyleSheet.absoluteFillObject]}>
            <View style={styles.cancelbottomview}>
              <Text style={styles.canceltxt}>if you cancel now,you may not be able to avail this deal again do you still want to cancel?</Text>
              <View style={styles.cancelbuttoncontainer}>
                <TouchableOpacity activeOpacity={0.8} style={styles.successbtn1} onPress={()=>setcancelview(false)}>
                        <Text style={styles.chatbtntext}>Don't Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.successbtn2} onPress={()=>handlecancel()}>
                        <Text style={styles.chatbtntext}>Cancel order</Text>
                    </TouchableOpacity>
                </View>
            </View>
         </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
            data={defaultaddress}
            renderItem={({item})=>(
                <View>
                { status=='success' ?
                <View style={styles.addresscontainer}>
                    <View style={styles.idview}>
                        <Text style={styles.idtext}>Shipping Details</Text>
                    </View>
                    <View style={styles.addressdetails}>
                       <Icon name="home" size={25} color={'#17202a'}/>
                        <View style={styles.addressdatacontainer}>
                        <Text style={styles.addresstext}>{item.name}</Text>
                        <Text style={styles.addresstext}>{item.buildingname},{item.street}</Text>
                        <Text style={styles.addresstext}>{item.city} {item.pincode}</Text>
                        <Text style={styles.addresstext}>{item.phno}</Text>
                        </View>
                          <View style={styles.btncontainer}>
                          <TouchableOpacity activeOpacity={0.8} style={styles.btn}
                          onPress={()=>{
                            Toast.show({
                                type:'error',
                                text1:'Not possible to edit address',
                                visibilityTime:4000
                              })
                          }}>
                            <Text style={styles.btntext}>Edit</Text>
                        </TouchableOpacity>
                            </View>
                         </View>
                </View> 
                :
                <View style={styles.addresscontainer}>
                <View style={styles.idview}>
                    <Text style={styles.idtext}>Shipping Details</Text>
                </View>
                <View style={styles.addressdetails}>
                   <Icon name="home" size={25} color={'#17202a'}/>
                    <View style={styles.addressdatacontainer}>
                    <Text style={styles.addresstext}>{item.name}</Text>
                    <Text style={styles.addresstext}>{item.buildingname},{item.street}</Text>
                    <Text style={styles.addresstext}>{item.city} {item.pincode}</Text>
                    <Text style={styles.addresstext}>{item.phno}</Text>
                    </View>
                     </View>
            </View>}
            </View>
            )}
            ListHeaderComponent={()=>(
                <>
                {status == 'failed' && <Failedview />}
                {status == 'success' && <Successview />}
                {status == 'Cancel'  && <Cancelview/>}
                </>
            )}
             />
          {cancelview && <Cancelpopupview/>}
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1'
    },
    reasonview: {
        width: '100%',
        height: 310,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    reasoninnerview: {
        width: '95%',
        height: '90%',
        backgroundColor: '#eaf2f8',
        borderRadius: 10,
        padding: 15,
        justifyContent: 'center'
    },
    reasonheadtext: {
        fontSize: 17,
        fontFamily: 'NotoSansSundanese-Bold',
        color: '#0d0301'
    },
    reasonsubtext: {
        fontFamily: 'NotoSansSundanese-Medium',
        fontSize: 16,
        marginTop: 15,
        color: '#707b7c'
    },
    reasonbtntext: {
        fontFamily: 'NotoSansSundanese-Bold',
        color: '#2e86c1'
    },
    reasonbtn: {
        width: 150,
        height: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginTop: 20
    },
    itemview: {
        width: '100%',
        height: 300,
        marginTop: 10
    },
    idview: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingLeft: 10,

    },
    idtext: {
        fontFamily: 'NotoSansSundanese-Bold',
        fontSize: 13,
        color: '#B6B6B6'
    },
    itemdetailsview: {
        width: '100%',
        height: 200,
        backgroundColor: '#fff',
        marginTop: 2,
        flexDirection: 'row',
    },
    imagecontainer: {
        width: '35%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemimg: {
        width: '70%',
        height: '70%'
    },
    itemtextview: {
        width: '65%',
        height: '100%',
    },
    itemheadtext: {
        fontFamily: 'NotoSansSundanese-Bold',
        fontSize: 17,
        marginTop: 35,
        marginLeft: 10,
        color: '#17202a'
    },
    itemprice: {
        fontFamily: 'NotoSansSundanese-SemiBold',
        fontSize: 17,
        color: '#17202a',
        marginTop: 15,
        marginLeft: 20,
    },
    chatbtn: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginTop: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    chatbtntext: {
        fontFamily: 'NotoSansSundanese-Bold',
        fontSize: 16,
        marginLeft: 10,
        color: '#5d6d7e'
    },
    trackingview: {
        width: '20%',
        height: '100%',
        marginTop: 2,
        justifyContent:'center',
        alignItems:'center'
    },
    flowview: {
        width: 4,
        height: 60,
        backgroundColor: '#f2f2f2',
    },
    upperview: {
        position: 'absolute',
        top: 0,
        width: '100%',
        alignItems: 'center',
        marginTop: 35
    },

    innerview: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop:70,
    },
    trackcontainer:{
        flexDirection:'row',
        width:'100%',
        backgroundColor: '#fff',
        height:380,
        marginTop:15,
    },
    tracktext:{
        marginTop:36,
        width:'70%',
        height:'100%',
    },
    tracktext1:{
        fontSize:18,
        fontFamily: 'NotoSansSundanese-SemiBold',
        color: '#17202a'
    },
    tracktext2:{
        fontSize:18,
        fontFamily: 'NotoSansSundanese-SemiBold',
        color: '#17202a',
        marginTop:54
    },
    tracktext3:{
        fontSize:18,
        fontFamily: 'NotoSansSundanese-SemiBold',
        color: '#17202a',
        marginTop:40
    },
    tracktext4:{
        fontSize:19,
        fontFamily: 'NotoSansSundanese-SemiBold',
        color: '#17202a',
        marginTop:17
    },
    tracksubtext:{
        fontSize:14,
        fontFamily: 'NotoSansSundanese-SemiBold',
        color:'#707b7c'
    },
    addresscontainer:{
        width:'100%',
        height:200,
        marginTop:10
    },
    addressdetails:{
        flexDirection:'row',
        backgroundColor:'#fff',
        width:'100%',
        height:180,
        marginTop:1,
        paddingTop:20,
        paddingLeft:25
    },
    addressdatacontainer:{
        marginLeft:20,
        width:'61%'
    },
    addresstext:{
        fontSize:16,
        fontFamily: 'NotoSansSundanese-Medium',
        color:'#707b7c',
    },
    btncontainer:{
     width:'20%',
     height:'75%',
     justifyContent:'center',
     alignItems:'center'
    },
    btn:{
        width:70,
        height:35,
        borderWidth:1,
        borderColor:'#d7dbdd',
        justifyContent:'center',
        alignItems:'center'
    },
    btntext:{
        fontSize:16,
        fontFamily: 'NotoSansSundanese-Bold',
        color:'#27ae60'
    },
    successbtn1: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
     borderRightWidth:2,
     borderRightColor:'#ecf0f1'
    },
    successbtn2: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttoncontainer:{
        width:'100%',
        height:50,
        backgroundColor: '#fff',
        marginTop: 1,
        flexDirection:'row',
      
    },
    Cancelcontainer:{
        backgroundColor:'rgba(0,0,0,0.3)',
        zIndex:1,
        justifyContent:'flex-end',
        marginBottom:30
      },
      cancelbottomview:{
        width:'100%',
        height:150,
        backgroundColor:'#fff',
      },
      canceltxt:{
        fontSize:15,
        fontFamily: 'NotoSansSundanese-SemiBold',
        marginLeft:15,
        marginRight:15,
        marginTop:25,
        color:'#478778'
      },
      cancelbuttoncontainer:{
        width:'100%',
        height:50,
        backgroundColor: '#fff',
        marginTop: 29,
        flexDirection:'row',
      borderTopWidth:2,
      borderTopColor:'#ecf0f1'
    },
    canceltrackcontainer:{
        flexDirection:'row',
        width:'100%',
        backgroundColor: '#fff',
        height:180,
        marginTop:15,
    }
})


export default Orderdetails;