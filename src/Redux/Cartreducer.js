import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore'


const updateFirestoreData =async(userId,data) => {
 firestore().collection('users').doc(userId).update({
    cart:data
  }) 
}
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
        cartdata:[],
        itemdetails:[],
        loading:false,
        price:[],
        totalprice:0,
        item:0,
    },
    reducers:{
firestoreuserid:(state,action)=>{
        state.userid=action.payload
      },
    cartdataadd:(state,action)=>{
      const Items=action.payload.item
      const userId=action.payload.userId
      const itemdata=state.cartdata
      if(state.cartdata.length>0){
      const itemindex=itemdata.findIndex((item)=>item.id === Items.id)
      if(itemindex>=0){
         itemdata[itemindex].quantity+=1
      }else{
        itemdata.push({...Items})
      }
      }else{
        itemdata.push({...Items})
      }
      updateFirestoreData(userId, itemdata);
     
    },
    addquantity:(state,action)=>{
      const item=action.payload.items
      const userId=action.payload.userId
      const itemdata=state.cartdata
      state.loading=true;
      const itemindex=itemdata.findIndex((items)=> items.id == item.id )
      if(itemindex>=0){
        itemdata[itemindex].quantity+=1,
        itemdata[itemindex].price+=item.price
      }
      updateFirestoreData(userId,itemdata)
    },
    decreasequantity:(state,action)=>{
      const itemdata=state.cartdata
      const item=action.payload.items
      const userId=action.payload.userId
      state.loading=true
      const itemindex=itemdata.findIndex((items)=>items.id == item.id)
      if (itemindex>=0){
        itemdata[itemindex].quantity-=1
      }
      updateFirestoreData(userId, itemdata);
    },
    deleteitem:(state,action)=>{
       const item=action.payload.items
       const userId=action.payload.userId
        state.loading=true
       const datas=state.cartdata.filter((items)=>items.id !== item.id)
       updateFirestoreData(userId,datas);
    },
    buynowaction:(state,action)=>{
      const data=state.cartdata.filter((itm)=>itm.id == action.payload.id)
       if(state.itemdetails.length>0){
          const itemdata=state.itemdetails.findIndex((itm)=>itm.id != data.id)
          if(itemdata>=0){
            state.itemdetails[itemdata]=action.payload
          }
       }else{
        state.itemdetails.push(...data)    
        }
    },
    totalpriceaction:(state,action)=>{
      state.price=[]
      state.item=0
      state.cartdata.filter((item)=>{
          state.price.push(item.price) 
          if(item.id !=0){
            state.item+=1
          }
        }
    )
    state.totalprice=state.price.reduce((acc, curr) => acc + curr, 0);
    }

    },
    extraReducers:(builder)=>{
      builder.addCase(additemcount.fulfilled,(state,action)=>{
        state.cartcount=action.payload
      }),
      builder.addCase(getcartdata.fulfilled,(state,action)=>{
        state.cartdata=action.payload
        state.loading=false
      })
    }
})
export{additemcount,getcartdata}
export const {firestoreuserid,cartdataadd,addquantity,decreasequantity,deleteitem,buynowaction,totalpriceaction}=CartreducerSlice.actions
export default CartreducerSlice.reducer;