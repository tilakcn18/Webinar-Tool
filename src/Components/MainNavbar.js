import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import '../CSS/mainnavbar.css';

function NavbarMain() {
  return (
    <Navbar className='mainnavbar fixed-top bg-success' expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item className=''> 
            <NavLink to="/webinarportal/" className="nav-link text-light ms-5 ">Summary</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="source" className="nav-link text-light ms-5">Source</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="register" className="nav-link text-light ms-5">Registration</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="interaction" className="nav-link text-light ms-5">Interactions</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="settings" className="nav-link text-light ms-5">Settings</NavLink>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarMain;
