import "../CSS/Navbar.css";
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  return (
    <Navbar className="navbar" bg="success">
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="" >
          <Nav.Link href="/mywebinar" className="me-5 ms-5 fs-5 text-light">
            My Webinars
          </Nav.Link>
          <Nav.Link
            href="/customersupport"
            className="dropdown-toggle-custom me-5 ms-5 fs-5 text-light "
          >
            Customer Support
          </Nav.Link>
          {/* <Nav.Link href="/webinarportal" className="me-5 ms-5 fs-5 text-light">
            More
          </Nav.Link> */}
        </Nav>
        <div className="navabar-main-dropdown ms-5">
          <NavDropdown
        
            title={
              <img
             
                style={{borderRadius:"20px"}}
                src="profile.jpg"
                alt="Accounts"
                onClick={handleToggleOptions}
                height="26px"
                width="27px"
              
                // className="border-0 bg-transparent p-0"
              />
            }
            id="basic-nav-dropdown"
            show={showOptions}
            align="end"
            style={{ minWidth: "150px", maxWidth: "150px" }}
          
          
          >
            
              <NavDropdown.Item className="text-center" id="dropdown-item" href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item className="text-center" id="dropdown-item" href="/billings">Billings</NavDropdown.Item>
              {/* <NavDropdown.Item className="text-center" id="dropdown-item" href="/settings">Settings</NavDropdown.Item> */}
              <NavDropdown.Item className="text-center" id="dropdown-item" href="/">Logout</NavDropdown.Item>
          
          </NavDropdown>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
