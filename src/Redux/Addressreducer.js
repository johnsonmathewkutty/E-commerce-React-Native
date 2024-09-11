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
    const email=user.data().Email
    return {name,phnumber,email}
})

const AddressSlices=createSlice({
    name:'Address',
    initialState:{
   addressdata:[],
   defaultaddress:[],
   updateaddress:[],
   fullname:'',
   phonenumber:'',
   email:'',
   loading:false
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
    editaddress:(state,action)=>{
        const  item=action.payload.items
         const userId=action.payload.userId
         const fullname=action.payload.name
         const phonenumber=action.payload.phno
         const Email=action.payload.email
          const filterdatas=state.addressdata.filter((items)=>items.id !== item.id)
          const data=[item]
        const  datas=[...filterdatas,...data]
          firestore().collection('users').doc(userId).update({
              Address:datas,
              Defaultaddress:data,
              Fullname:fullname,
              PhoneNumber:phonenumber,
              Email:Email
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
              state.fullname=action.payload.name,
              state.phonenumber=action.payload.phnumber
              state.email=action.payload.email
        })
    }
})


export {getaddress,getDefaultaddress,getLogindetails}
export const {saveaddress,setdefaultaddress,removeaddress,editaddress}=AddressSlices.actions
export default AddressSlices.reducer