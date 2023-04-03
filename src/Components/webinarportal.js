import Interaction from "./Interaction";
// import Interactionx from "./interactionex";
import NavbarMain from "./MainNavbar";
import Source from "./source";
import Summary from "./summary";
import {Routes,Route} from "react-router-dom"
import Registration from "./Registrationpage";
import "../CSS/webinarportal.css";

import Settings from "./settings";

const Webinarportal = () => {
    return ( 
        <div className="webinar-portal ">
        <div className="navbar-main">
        <NavbarMain />
        </div>
        <div className="mt-3"> <Routes>
       
       <Route path="/" element={<Summary/>} />
      <Route path="/source" element={<Source />} />
     
      <Route path="/interaction" element={<Interaction /> } />
      {/* <Route path="/interaction" element={<Interactionx/>} /> */}
      <Route path="/register" element={<Registration />} />
      <Route path="/settings" element={<Settings />} />

      
         
      </Routes></div>
    </div>
     );
}
 
export default Webinarportal;