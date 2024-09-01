import { createSlice } from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore'



const updateFirestoreData=async(orderdata,userId)=>{
    firestore().collection('users').doc(userId).update({
        Order:orderdata
      }) 
}

const Orderslice=createSlice({
    name:'Order',
    initialState:{
      orderdatas:[]
    },
    reducers:{
      saveorderdata:(state,action)=>{
       const item=action.payload.item
       const status=action.payload.status
       const userId=action.payload.userId
   const data={...item,status:status}
   state.orderdatas=[...state.orderdatas,data]
   const orderdata=state.orderdatas
       updateFirestoreData(orderdata,userId)
      }
    
    },
})


export const {saveorderdata}=Orderslice.actions
export default Orderslice.reducer;