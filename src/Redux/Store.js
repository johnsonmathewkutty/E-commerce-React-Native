import { configureStore } from "@reduxjs/toolkit";
import Datainforeducer from "./Datainforeducer";
import Cartreducer from "./Cartreducer";



const Store=configureStore({
    reducer:{
        Datainfo:Datainforeducer,
        Cartdatas:Cartreducer,
    }
})


export default Store;