import { createSlice } from "@reduxjs/toolkit";


const CartreducerSlice=createSlice({
    name:'cart',
    initialState:{
        cartdata:[]
    },
    reducers:{
        addcart:(state,action)=>{
        // const itemindex=state.cartdata.findIndex((item)=>item.id === action.payload.id)
        // if(itemindex>=0){
        //     state.cartdata[itemindex].quantity+=1
        // }
        // else{
        //     state.cartdata.push({...action.payload, quantity:1})

        //    } 
        state.cartdata=({...action.payload, quantity:1})
        },
    }
})
export const {addcart}=CartreducerSlice.actions
export default CartreducerSlice.reducer;