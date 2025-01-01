import axios from "axios";
import { Children, createContext, useEffect } from "react";
import { server } from "../../Server";

export const AddtoCartContext = createContext()



const AddtoCartProvider= (props)=>{
    

    
    return(
        <AddtoCartContext.Provider value={{ Addtocartfun  }}>
            {props.Children}
        </AddtoCartContext.Provider>
    )
   
}
export default AddtoCartProvider