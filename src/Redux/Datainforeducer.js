import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { response } from "express";
import  axios  from "react-native-axios";
 
const TIMEOUT = 10000;

const Getdatainfo=createAsyncThunk('data/api',async(_,{ rejectWithValue})=>{
   
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), TIMEOUT)
  );
try{
  const response = await Promise.race([
    axios.get('https://fakestoreapi.com/products'),
    timeoutPromise
  ]);
  return response.data;
} catch (error) {
 
    return rejectWithValue(`Error ${error.response.status}: ${error.message}`);
  
}
      //  return axios.get('https://fakestoreapi.com/products')
      //   .then((response)=>{
      //     console.log('its working')
      //     return (response.data)
          
      //   })
      //   .catch(error => {
      //       if (!error.response) {
      //           return rejectWithValue('Network error: Please check your internet connection.');
      //         }else{
      //         return rejectWithValue(`Error ${error.response.status}: ${error.message}`);
      //         }
              
        // });
        
    
})

export const searchAsync = createAsyncThunk('data/search', async (searchquery) => {
        
      const response = await axios.get('https://fakestoreapi.com/products');
      const filteredData = response.data.filter(item => 
        item.title.toLowerCase().includes(searchquery.toLowerCase())
      );
      return filteredData;
    
      })

      export const searchbarAsync = createAsyncThunk('data/searchbar', async (searchquery) => {
        
        const response = await axios.get('https://fakestoreapi.com/products');
        const filteredData = response.data.filter(item => 
          item.title.toLowerCase().includes(searchquery.toLowerCase())
        );
        return filteredData;
      
        })
  
  
const DatainfoSlice=createSlice({
    name:'Data',
  initialState:{
      datas:[],
      loading:false,
      error:'',
      itemdatas:[],
      searchdata:[]
     
  },
  reducers:{
    itemdetails:(state,action)=>{
         if(state.itemdatas.length>0){
          const index=state.itemdatas.findIndex((item)=>item.id !== action.payload.id)
         if(index>=0){
          state.itemdatas[index]={...action.payload,quantity:1}
         }
        }
        else
        {
         state.itemdatas.push({...action.payload,quantity:1})
        }
           
    }
 },
    extraReducers:(builder)=>{
        builder.addCase(Getdatainfo.fulfilled,(state,action)=>{
            state.loading=false;
            state.datas=action.payload
             state.error=''
        }),
        builder.addCase(Getdatainfo.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(Getdatainfo.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        builder.addCase(searchAsync.fulfilled,(state,action)=>{
            state.loading=false
            state.datas=action.payload
        }),
        builder.addCase(searchbarAsync.fulfilled,(state,action)=>{
            state.searchdata=action.payload
        })

    },
})

 export const {itemdetails}=DatainfoSlice.actions;
  export {Getdatainfo}  
export default DatainfoSlice.reducer;