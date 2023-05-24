import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore'


const additemcount=createAsyncThunk('cart/count',async(userid)=>{
    const user= await firestore().collection('users').doc(userid).get();
    let itemcount=user.data().cart.length
    return itemcount
})

const getcartdata=createAsyncThunk('cart/firestoredata',async(userid)=>{
 const user =await firestore().collection('users').doc(userid).get();
   let datas=user.data().cart
   return datas
})

const CartreducerSlice=createSlice({
    name:'cart',
    initialState:{
        cartcount:0,
        userid:'',
        cartdata:[]
    },
    reducers:{
        firestoreuserid:(state,action)=>{
            state.userid=action.payload
    },
    },
    extraReducers:(builder)=>{
      builder.addCase(additemcount.fulfilled,(state,action)=>{
        state.cartcount=action.payload
      }),
      builder.addCase(getcartdata.fulfilled,(state,action)=>{
        state.cartdata=action.payload
      })
    }
})
export{additemcount,getcartdata}
export const {firestoreuserid}=CartreducerSlice.actions
export default CartreducerSlice.reducer;