import "./App.css";
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/Login";
import Signup from "./Components/SignUp";
import ForgotPassword from "./Components/forgot";
import Home from "./Components/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileForm from "./Components/Profile";
import Mywebinar from "./Components/Mywebinars";
import CustomerSupport from "./Components/CustomerSupport";
// import Settings from "./Components/settings";
import Webinarportal from "./Components/webinarportal";
// import { Provider } from 'react-redux';

// import NavbarMain from "./Components/MainNavbar";
// import Interaction from "./Components/Interaction";
// import Registration from "./Components/Registrationpage";

// import Summary from "./Components/summary";
// import Source from "./Components/source";
// import { useState } from "react";
// import { WebinarContext } from "./WebinarContext";
// import UploadCSV from "./Components/practice";
// import CreateInteraction from "./Components/CreateInteraction";

function App() {

  return (
    <BrowserRouter>
      <Routes>
      
            <Route exact path="/" element={<LoginForm />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<ProfileForm />} />

            <Route path="/customersupport" element={<CustomerSupport />} />
            {/* <Route path="/navbarmain" element={<NavbarMain />} /> */}
            {/* <Route path="/summary" element={<Summary />} />
            <Route path="/source" element={<Source />} /> */}

            <Route path="/mywebinar" element={<Mywebinar />} />
            {/* <Route path="/interaction" element={<Interaction />} />

            <Route path="/register" element={<Registration />} /> */}
            {/* <Route path="/settings" element={<Settings />} /> */}
            <Route path="/webinarportal/*" element={<Webinarportal />} />
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
