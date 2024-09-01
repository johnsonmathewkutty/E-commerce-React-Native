import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";

import firestore from '@react-native-firebase/firestore'


const getaddress=createAsyncThunk('address/data',async(userid)=>{
   const user=await firestore().collection('users').doc(userid).get()
    const data=user.data().Address
    return data
})

const getDefaultaddress=createAsyncThunk('defaultadress/data',async(userid)=>{
    const user=await firestore().collection('users').doc(userid).get()
    const datas=user.data().Defaultaddress
    return datas
})
const getLogindetails=createAsyncThunk('data/Login',async(userid)=>{
    const user=await firestore().collection('users').doc(userid).get()
    const name=user.data().Fullname
    const phnumber=user.data().PhoneNumber
    return {name,phnumber}
})

const AddressSlices=createSlice({
    name:'Address',
    initialState:{
   addressdata:[],
   defaultaddress:[],
   updateaddress:[],
   fullname:'',
   phonenumber:''
    },
    reducers:{
    saveaddress:(state,action)=>{
      const  item=action.payload.items
       const userId=action.payload.userId
        const datas=state.addressdata
        const data=[item]
        datas.push({...item})
        firestore().collection('users').doc(userId).update({
            Address:datas,
            Defaultaddress:data
          })
    },
    setdefaultaddress:(state,action)=>{
         const item=action.payload.item
         const userId=action.payload.userId
         const dataaddress=state.addressdata
      const data=[item]
    dataaddress.forEach((items)=>{
            if(items.id==item.id){
                items.select=true;
            }
            else{
                items.select=false;
            }
        })
        firestore().collection('users').doc(userId).update({
            Defaultaddress:data,
            Address:dataaddress
        })
    },
    removeaddress:(state,action)=>{
        const item=action.payload.item
        const userId=action.payload.userId
        const itemdata=state.addressdata.filter((itm)=>itm.id !== item.id)
        const removedata=state.defaultaddress.filter((itm)=>itm.id !== item.id)
        firestore().collection('users').doc(userId).update({
            Address:itemdata,
            Defaultaddress:removedata
        })

    },
  
    },
    extraReducers:(bulider)=>{
        bulider.addCase(getaddress.fulfilled,(state,action)=>{
            state.addressdata=action.payload
        }),
        bulider.addCase(getDefaultaddress.fulfilled,(state,action)=>{
            state.defaultaddress=action.payload
        }),
        bulider.addCase(getLogindetails.fulfilled,(state,action)=>{
            console.log(action.payload)
              state.fullname=action.payload.name,
              state.phonenumber=action.payload.phnumber
        })
    }
})


export {getaddress,getDefaultaddress,getLogindetails}
export const {saveaddress,setdefaultaddress,removeaddress}=AddressSlices.actions
export default AddressSlices.reducer