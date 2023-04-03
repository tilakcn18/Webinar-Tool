import NavbarMain from "./MainNavbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";


const Summary = () => {
    
    return ( 
       <section> 
         {/* <div>
       <NavbarMain/>
   </div> */}
   {/* <hr /> */}
   <div>
      <h1>summary page</h1>
   </div></section>
     );
}
 
export default Summary;