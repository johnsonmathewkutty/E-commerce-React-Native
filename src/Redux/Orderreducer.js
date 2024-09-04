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
       const itemdata=action.payload.data
       const status=action.payload.status
       const userId=action.payload.userId
       itemdata.forEach(item=>{
       const value=state.orderdatas.filter((items)=>items.id !== item.id)
         const data = itemdata.map(items => ({ ...items, status: status, id: uuidv4() }));
        const updatadata=[...value,...data]
        updateFirestoreData(updatadata,userId)
      })
  
       
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