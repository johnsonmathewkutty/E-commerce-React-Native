import React, { useEffect,useRef} from "react";
import { View,Text,StyleSheet,
  ActivityIndicator,Image,
StatusBar,FlatList, TextInput,
TouchableOpacity} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AirbnbRating,Rating } from "react-native-ratings";
import  Icon  from "react-native-vector-icons/MaterialIcons";
import firestore from '@react-native-firebase/firestore'

import { Getdatainfo,itemdetails,searchAsync} from "../Redux/Datainforeducer";

function Home({navigation,route}){
    const dispatch=useDispatch()
    const data=useSelector(state=>state.Datainfo.datas)
    const loading=useSelector(state=>state.Datainfo.loading)
    const error=useSelector(state=>state.Datainfo.error)
    const userId=useSelector(state=>state.Datainfo.userid)
    const mytext=useRef('')
   useEffect(()=>{
    dispatch(Getdatainfo())
    const { email } = route.params;
    const {password}=route.params;
        const usersRef = firestore().collection('users');
        usersRef
          .where('Email', '==', email || 'Email','!=','')
          .get()
          .then((querySnapshot ) => {
            if (querySnapshot.empty) {
              // document already exists, do nothing
             firestore().collection('users').doc(userId)
              .set({
                Email: email,
                Password: password,
              })}  
          })
          .catch((error) => {
            console.error(error);
          });
       
    
   },[])
   const additemdetails=(item)=>{
    dispatch(itemdetails(item))

   }
   
   if(error) {return (
    
    <View style={styles.errorcontainer}>
        <StatusBar backgroundColor={'#00D100'} />
   <Text style={styles.errortext}>{error}</Text>
   </View>
   )}
   if(loading){ return(
    <View style={styles.errorcontainer}>
        <StatusBar backgroundColor={'#00D100'} />
   <ActivityIndicator size={60} color={'blue'} style={styles.indicator}/>
   </View>
   )}
   const handleclearbutton=()=>{
    mytext.current.clear();
}
    return(
        <View style={styles.container}>
           
                <StatusBar backgroundColor={'#00D100'} />
                <View style={styles.searchcontainer}>
                    <View style={styles.searchbox}>
                    <TextInput
                     placeholder='search'
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
                )}/>
        {/* //     )
        // })
    // } */}
       
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    errorcontainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    errortext:{
      fontSize:25,
      fontWeight:'600'
    },
    indicator:{
        width:'30%',
        height:100,
        backgroundColor:'#fff'
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
    searchcontainer:{
      width:"100%",
      height:110,
      backgroundColor:'#00D100',
      justifyContent:'center',
      alignItems:'center',
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
       fontFamily:'inherit',
       color:'#2E2E2E',
       fontWeight:'600',
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
          paddingRight:10
    }
})


export default Home;