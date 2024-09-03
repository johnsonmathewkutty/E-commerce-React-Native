import React, { useEffect,useRef,useState,useCallback,} from "react";
import { View,Text,StyleSheet,
  ActivityIndicator,Image,
StatusBar,FlatList, TextInput,
TouchableOpacity,RefreshControl} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AirbnbRating,Rating } from "react-native-ratings";
import  Icon  from "react-native-vector-icons/MaterialIcons";
import auth from '@react-native-firebase/auth'


import { Getdatainfo,itemdetails,searchAsync} from "../Redux/Datainforeducer";
import { additemcount,firestoreuserid} from "../Redux/Cartreducer";
import { getLogindetails } from "../Redux/Addressreducer";



function Home({navigation}){
    const dispatch=useDispatch()
    const data=useSelector(state=>state.Datainfo.datas)
    const loading=useSelector(state=>state.Datainfo.loading)
    const error=useSelector(state=>state.Datainfo.error)
    const userId=useSelector(state=>state.Cartdatas.userid)
    const fullname=useSelector(state=>state.Adressdatas.fullname)
    const [refresh,setreFresh]=useState(false)
    const mytext=useRef('')
    
   useEffect(()=>{


    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        // If user is already authenticated, navigate to the home screen
        dispatch(firestoreuserid(user.uid));
        dispatch(getLogindetails(user.uid));
        dispatch(Getdatainfo()) 
        dispatch(additemcount(user.uid)) 
      } else {
        dispatch(Getdatainfo())
      }
    });
    return()=>{
      unsubscribe;
    } 
   },[])

   useEffect(()=>{
    if(error){
      setreFresh(true)
      console.log('its working',refresh)
      console.log('its working',error)
      console.log('its working',userId)
  } 
   },[error,refresh])
  
   const additemdetails=(item)=>{
    dispatch(itemdetails(item))

   }
   
   

   const handleclearbutton=()=>{
    mytext.current.clear();
}

const onRefresh = useCallback(() => {
    setreFresh(false)
        
  }, []);

const Apploader=()=>{
    return(
        <View style={[styles.loadercontainer,StyleSheet.absoluteFillObject]}>
            <StatusBar backgroundColor={'#7BD78A'} />
       <ActivityIndicator size={60} color={'blue'}/>
       </View>
       ) 
}

  
const Errorpage=()=>{
    return(
        <View style={[styles.errorcontainer,StyleSheet.absoluteFillObject]}>
             <View style={styles.headericoncontainer}>
      <View style={styles.iconcontainer}>
      <Image source={require('../images/appicon.png')} style={styles.iconimg}/>
      </View>
        </View>
           <View style={styles.errorimgcontainer}>
        <Image source={require('../images/NetworkError.jpg') } style={styles.imgerror}/>
      </View>
      <Text style={styles.subtexterror}>Something went wrong.Please try again later</Text>
      <TouchableOpacity style={styles.buttonerror} onPress={onRefresh}>
        <Text style={styles.btntexterror}>Refresh</Text>
      </TouchableOpacity>
        </View>
    )
}
    return(
        <View style={styles.container}>
           
                <StatusBar backgroundColor={'#7BD78A'}/>
                <View style={styles.headercontainer}>
                    <View style={styles.subcontainer}>
                        <View style={styles.appnameimg}>
                        <Image source={require('../images/appicon.png')} style={styles.imgapp}/>
                        </View>
                        <View style={{marginLeft:-25}}>
                            {userId=='' ?(
                         <View style={styles.headeraccount}>
                            <View>
                            <Icon name="account-circle" size={37}  color={'#fff'}/>
                        </View>
                        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                        <Text style={styles.username}>Login</Text>
                        </TouchableOpacity>
                        </View>

                        ):(<View style={styles.headeruseraccount}>
                            <View>
                            <Icon name="account-circle" size={37} color={'#fff'}/>
                        </View>
                        <TouchableOpacity style={styles.accountbutton} onPress={()=>navigation.navigate('Bottomtabs',{screen:'Profile'})}>
                        <Text  style={styles.username}>{fullname}</Text>
                        <Icon name="arrow-forward-ios" style={{marginTop:10}} size={18} color={'#fff'}/>
                        </TouchableOpacity>
                        </View>
                        )}
                        </View>
                    </View>
                    <View style={styles.searchcontainer}>
                    <View style={styles.searchbox}>
                    <TextInput style={{color:'#478778'}}
                     placeholder='search' placeholderTextColor={'#478778'}
                     autoCorrect={false}
                    ref={mytext}
                    clearButtonMode='always'
                    onChangeText={((text)=>{
                         dispatch(searchAsync(text))
                    })}

                    />
                     <TouchableOpacity onPress={handleclearbutton} style={styles.searchclear}>
            <Icon name="close" size={20} color="black" />
          </TouchableOpacity>
                </View>
                </View>
                </View>
        {/* {
        data.map((item)=>{
            return( */}
                <FlatList
                data={data}
             renderItem={({item})=>(
               <TouchableOpacity
                onPress={() =>
             navigation.navigate('Itemdetails',additemdetails(item))}
             >
             <View style={styles.maincontainer}>
               
                <View style={styles.imgcontainer}>
                 <Image source={{uri:item.image}} style={styles.img} />
                </View>
                <View style={styles.detailscontainer}>
                    <Text style={styles.titletext}>{item.title}</Text>
                    {/* <AirbnbRating
                    defaultRating={item.rating.rate}
                    size={22}
                    isDisabled/> */}
                    <Rating
                    readonly
                    imageSize={28}
                    startingValue={item.rating.rate}
                    style={styles.rating}
                    />
                    <View style={styles.ratingcount}>
                    <Text style={styles.ratetext}>{item.rating.rate}</Text>
                    <Text>({item.rating.count})</Text>
                    </View>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
               
             </View>
             </TouchableOpacity>
                )}
                refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                  }
                />
        {/* //     )
        // })
    // } */}
       {loading ? <Apploader/> : null}
       {refresh ||error ? <Errorpage/> : null}
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    errorcontainer:{
        flex:1,
        backgroundColor:'#fff'
    },
    loadercontainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
    },
    errortext:{
      fontSize:25,
      fontWeight:'600'
    },
    imgcontainer:{
        width:'50%',
        height:220,
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width:'70%',
        height:'65%',
    },
    headercontainer:{
      width:"100%",
      height:160,
      backgroundColor:'#7BD78A',
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20
    },
    maincontainer:{
        flexDirection:'row',
        borderWidth:5,
        flex:1,
        margin:10,
        borderRadius:10,
        backgroundColor:'#fff',
        borderColor:'#fff',
    },
    titletext:{
       fontSize:20,
       color:'#2E2E2E',
       fontFamily:'NotoSansSundanese-SemiBold'
    },
    detailscontainer:{
        alignItems:'flex-start',
        flex:1,
        paddingTop:28
    },
    price:{
        fontSize:25,
        marginTop:13,
        color:'#2E2E2E',
        fontWeight:'700'
    },
    rating:{
        marginTop:10,
    
    },
    ratingcount:{
        flexDirection:'row',
        paddingTop:2
    },
    ratetext:{
       marginRight:100,
       color:'green',
       fontWeight:'900'
    },
    searchbox:{
          borderWidth:2,
          width:'90%',
          height:50,
          borderRadius:10,
          borderColor:'#fff',
          paddingLeft:10,
          backgroundColor:'#fff',
          flexDirection:'row',
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          paddingRight:10,
    },
    subcontainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:29
        },
    headeraccount:{
        flexDirection:'row',
        marginRight:25,
        marginBottom:23
    },
    headeruseraccount:{
        flexDirection:'row',
        marginRight:50,
        marginBottom:23
    },
    searchcontainer:{
        width:'100%',
        height:70,
        alignItems:'center',
        justifyContent:'flex-start'
    },
    appname:{
        fontSize:25,
         fontFamily:'NotoSansSundanese-Bold',
         color:'#228B22',
         marginLeft:15
    },
    username:{
        fontSize:20,
        fontFamily:'NotoSansSundanese-Bold',
        marginLeft:5,
        marginTop:5,
        color:'#fff',
    },
    accountbutton:{
     width:85,
     height:35,
     flexDirection:'row'
    },
    appnameimg:{
        width:'65%',
        height:40,
        marginLeft:10,
        borderRadius:6,
        borderColor:'red'
    },
    imgapp:{
        width:'75%',
        height:'80%'
    },
    errorimgcontainer:{
        width:'100%',
        height:250,
        alignItems:'center',
        marginTop:100
      },
      imgerror:{
        width:'100%',
        height:'100%'
      },
      subtexterror:{
        fontSize:18,
        fontFamily:'NotoSansSundanese-Bold',
        color:'#4682B4',
        marginTop:15,
        marginLeft:30,
        marginRight:30,
        textAlign:'center'
      },
      buttonerror:{
        width:200,
        height:50,
        backgroundColor:'#7BD78A',
        borderRadius:8,
        marginTop:30,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
      },
      btntexterror:{
        color:'#fff',
        fontSize:20,
        fontWeight:'700'
      },
      headericoncontainer:{
        width:'100%',
        height:60,
        backgroundColor:'#7BD78A',
        justifyContent:'center'
      },
      iconcontainer:{
        width:'60%',
        height:50,
      justifyContent:'center',
     marginLeft:9
      },
      iconimg:{
        width:'80%',
        height:'60%'
      }
})


export default Home;