import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore'
import { v4 as uuidv4 } from 'uuid';


const updateFirestoreData=async(datas,userId)=>{
    firestore().collection('users').doc(userId).update({
        Order:datas
      }) 
}


const Getorderdata=createAsyncThunk('orderdatas/data',async(userid)=>{
  const user=await firestore().collection('users').doc(userid).get()
  const datas=user.data().Order
  return datas
})

const Orderslice=createSlice({
    name:'Order',
    initialState:{
      orderdatas:[]
    },
    reducers:{
      saveorderdata:(state,action)=>{
       const item=action.payload.data
       const status=action.payload.status
       console.log('reducer',status)
       const userId=action.payload.userId
   const data = item.map(items => ({ ...items, status: status, id: uuidv4() }));
    const updatadata=[...state.orderdatas,...data]
       updateFirestoreData(updatadata,userId)
      }
    
    },
    extraReducers:(builder)=>{
      builder.addCase(Getorderdata.fulfilled,(state,action)=>{
          state.orderdatas=action.payload
      })
    }
})

export {Getorderdata}
export const {saveorderdata}=Orderslice.actions
export default Orderslice.reducer;