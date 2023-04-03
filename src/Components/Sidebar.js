import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { ChromePicker } from "react-color";
import InputGroup from "react-bootstrap/InputGroup";
import "../CSS/sidebar.css";

const Sidebar = ({
  title,
  subtitle,
  description,
  backgroundColor,
  onBackgroundColorChange,
  onButtonColorChange,
  ontitleToggle, onInputChange , ontitleSubtitleToggle,ontitleDesToggle
}) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  
  const [isGradientEnabled, setIsGradientEnabled] = useState(false);
  const [istitOn, setIstitOn] = useState(false);
  const [issubOn, setIssubOn] = useState(false);
  const [isdesOn, setIsdesOn] = useState(false);
//   const [title, setTitle] = useState('');
  

//   const handleClick = () => {
//     const newState = !isOn;
//     setIsOn(newState);
//     onToggle(newState);
//   };

const handletitleClick = () => {
    const newState1 = !istitOn;
    setIstitOn(newState1);
    ontitleToggle(newState1);
  };
const handleSubtitleClick = () => {
    const newState2 = !issubOn;
    setIssubOn(newState2);
    ontitleSubtitleToggle(newState2);
  };
const handleDestitleClick = () => {
    const newState3 = !isdesOn;
    setIsdesOn(newState3);
    ontitleDesToggle(newState3);
  };


  const handleColorChange = (newColor) => {
    onBackgroundColorChange(newColor.hex);
    onButtonColorChange(newColor.hex);
  };

  const handleGradientToggle = () => {
    setIsGradientEnabled(!isGradientEnabled);
  };

  return (
    <>
      <div className="sidebar">
        <div className="mt-2 text-center">
            <h4 >Editor</h4>
        </div>
        <hr />
      <p className="register-p fs-5">Customise Title</p>
      
        <div className="sidebar-options">
         
         
         
     
     <div className={`toggle-button  ${istitOn ? 'on' : 'off'}`} onClick={handletitleClick}>
       <div className="toggle-button-switch"></div>
       <div className="toggle-button-content">{istitOn ? 'ON' : 'OFF'}</div>
     </div>
    <div>
    <Button
            variant="success"
            size="sm"
            onClick={() => setShowTitle(true)}
          >
            Edit
          </Button>
    </div>
         
        </div>
        <hr />
        <p className="register-p fs-5">Customise Subtitle</p>
      
        <div className="sidebar-options">
         
        
          <div className={`toggle-button  ${issubOn ? 'on' : 'off'}`} onClick={handleSubtitleClick}>
       <div className="toggle-button-switch"></div>
       <div className="toggle-button-content">{issubOn ? 'ON' : 'OFF'}</div>
     </div>
    <div>
    <Button
            variant="success"
            size="sm"
            onClick={() => setShowSubtitle(true)}
          >
            Edit
          </Button>
    </div>
          
        </div>
        <hr />
        <p className="register-p fs-5">Write Description</p>
       
        <div className="sidebar-options">
         
          
          <div className={`toggle-button  ${isdesOn ? 'on' : 'off'}`} onClick={handleDestitleClick}>
       <div className="toggle-button-switch"></div>
       <div className="toggle-button-content">{isdesOn ? 'ON' : 'OFF'}</div>
     </div>
     <div>
     <Button
            variant="success"
            size="sm"
            onClick={() => setShowDescription(true)}
          >
            Edit
          </Button>
     </div>
        </div>
        <hr />
        <div className="text-center">
          <p className="fs-5">Click the toggle to choose colour</p>
          <Form.Check
            className="outline-sucess"
            type="switch"
            checked={isGradientEnabled}
            onChange={handleGradientToggle}
          />
          {isGradientEnabled && (
            <ChromePicker
              className="chrome-color"
              color={backgroundColor}
              onChange={handleColorChange}
            />
          )}
        </div>
      </div>

      <Modal
        className="main-modal"
        show={showTitle}
        onHide={() => setShowTitle(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="Enter Title"
            className="form-control-input"
            type="text"
            onChange={title}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowTitle(false)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="main-modal"
        show={showSubtitle}
        onHide={() => setShowSubtitle(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Subtitle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="Enter Subtitle"
            className="form-control-input"
            type="text"
            onChange={subtitle}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSubtitle(false)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="main-modal"
        show={showDescription}
        onHide={() => setShowDescription(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            {/* <InputGroup.Text className="bg-success text-light">
              Description
            </InputGroup.Text> */}
            <Form.Control
              placeholder="Enter description"
              className="form-control-input"
              as="textarea"
              aria-label="With textarea"
              onChange={description}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowDescription(false)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Sidebar;
