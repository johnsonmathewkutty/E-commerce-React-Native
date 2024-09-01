import { configureStore } from "@reduxjs/toolkit";
import Datainforeducer from "./Datainforeducer";
import Cartreducer from "./Cartreducer";
import Addressreducer from "./Addressreducer";
import Orderreducer from "./Orderreducer";

const Store=configureStore({
    reducer:{
        Datainfo:Datainforeducer,
        Cartdatas:Cartreducer,
        Adressdatas:Addressreducer,
        Orderdata:Orderreducer,
    }
})


export default Store;