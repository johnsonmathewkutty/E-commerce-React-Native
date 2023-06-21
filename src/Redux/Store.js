import { configureStore } from "@reduxjs/toolkit";
import Datainforeducer from "./Datainforeducer";
import Cartreducer from "./Cartreducer";
import Addressreducer from "./Addressreducer";

const Store=configureStore({
    reducer:{
        Datainfo:Datainforeducer,
        Cartdatas:Cartreducer,
        Adressdatas:Addressreducer,
    }
})


export default Store;