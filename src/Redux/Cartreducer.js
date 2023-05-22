import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore'


const additemcount=createAsyncThunk('cart/count',async(userid)=>{
    const user= await firestore().collection('users').doc(userid).get();
    let itemcount=user.data().cart.length
    return itemcount
})

const CartreducerSlice=createSlice({
    name:'cart',
    initialState:{
        cartcount:0,
        userid:''
    },
    reducers:{
        firestoreuserid:(state,action)=>{
            state.userid=action.payload
    },
    },
    extraReducers:(builder)=>{
      builder.addCase(additemcount.fulfilled,(state,action)=>{
        state.cartcount=action.payload
      })
    }
})
export{additemcount}
export const {firestoreuserid}=CartreducerSlice.actions
export default CartreducerSlice.reducer;