import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";

import firestore from '@react-native-firebase/firestore'


const getadress=createAsyncThunk('address/data',async(userid)=>{
   const user=await firestore().collection('users').doc(userid).get()
    const data=user.data().Address
    return data
})

const getDefaultadress=createAsyncThunk('defaultadress/data',async(userid)=>{
    const user=await firestore().collection('users').doc(userid).get()
    const datas=user.data().Defaultadress
    return datas
})

const AdressSlices=createSlice({
    name:'Adress',
    initialState:{
   adressdata:[],
   defaultadress:[],
    },
    reducers:{
    saveadress:(state,action)=>{
      const  item=action.payload.items
       const userId=action.payload.userId
        const datas=state.adressdata
        const data=[item]
        datas.push({...item})
        firestore().collection('users').doc(userId).update({
            Address:datas,
            Defaultadress:data
          })
    },
    setdefaultaddress:(state,action)=>{
         const item=action.payload.item
         const userId=action.payload.userId
      const itemdata=state.adressdata
      const data=[item]
        itemdata.map((items)=>{
            if(items.id==item.id){
                items.select=true
            }
            else{
                items.select=false
            }
        })
        firestore().collection('users').doc(userId).update({
            Defaultadress:data
        })
    },
    removeadress:(state,action)=>{
        const item=action.payload.item
        const userId=action.payload.userId
        const itemdata=state.adressdata.filter((itm)=>itm.id !== item.id)
        const removedata=state.defaultadress.filter((itm)=>itm.id !== item.id)
        firestore().collection('users').doc(userId).update({
            Adress:itemdata,
            Defaultadress:removedata
        })

    }
    },
    extraReducers:(bulider)=>{
        bulider.addCase(getadress.fulfilled,(state,action)=>{
            state.adressdata=action.payload
        }),
        bulider.addCase(getDefaultadress.fulfilled,(state,action)=>{
            state.defaultadress=action.payload
        })
    }
})


export {getadress,getDefaultadress}
export const {saveadress,setdefaultaddress,removeadress}=AdressSlices.actions
export default AdressSlices.reducer