import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import  axios  from "react-native-axios";
 

const Getdatainfo=createAsyncThunk('data/api',()=>{
    return axios.get('https://fakestoreapi.com/products')
    .then((Response)=>{
       return (Response.data)
    })
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
      searchdata:[],
      userid:''
     
  },
  reducers:{
    itemdetails:(state,action)=>{
         if(state.itemdatas.length>0){
          const index=state.itemdatas.findIndex((item)=>item.id !== action.payload.id)
         if(index>=0){
          state.itemdatas[index]=action.payload
         }
        }
        else
        {
         state.itemdatas.push(action.payload)
        }
           
    },
    firestoreuserid:(state,action)=>{
       
            state.userid=action.payload
    }
 },
    extraReducers:(builder)=>{
        builder.addCase(Getdatainfo.fulfilled,(state,action)=>{
            state.loading=false;
            state.datas=action.payload
        }),
        builder.addCase(Getdatainfo.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(Getdatainfo.rejected,(state,action)=>{
            state.loading=false
            state.error='something went wrong'
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

 export const {itemdetails,firestoreuserid}=DatainfoSlice.actions;
  export {Getdatainfo}  
export default DatainfoSlice.reducer;