import { configureStore } from "@reduxjs/toolkit";
import Datainforeducer from "./Datainforeducer";
import Cartreducer from "./Cartreducer";
import Adressreducer from "./Adressreducer";

const Store=configureStore({
    reducer:{
        Datainfo:Datainforeducer,
        Cartdatas:Cartreducer,
        Adressdatas:Adressreducer,
    }
})


export default Store;