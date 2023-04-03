import { Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "../CSS/registration.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setWebinarId } from "../actions/webinarActions";


const Registration = () => {
  const webinarId = useSelector((state) => state);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("Title");
  const [subtitle, setSubtitle] = useState("Subtitle");
  const [description, setDescription] = useState("Description");
  const [backgroundColor, setBackgroundColor] = useState("#24561F");
  const [buttonColor, setButtonColor] = useState("#24561F");

  const [istitVisible, setIstitleVisible] = useState(false);
  const [issubVisible, setIssubtitleVisible] = useState(false);
  const [isdesVisible, setIsdesVisible] = useState(false);

  


  const handletitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSubtitleChange = (e) => {
    setSubtitle(e.target.value);
  };

  const handledesChange = (e) => {
    setDescription(e.target.value);
  };

  return (
   <section>
    {/* <div>
<NavbarMain/>
    </div>
    <hr /> */}
    <Row>
      <Col className="side-col" md={3}>
        <Sidebar
        //   title={handletitleChange}
        //   subtitle={handleSubtitleChange}
        //   description={handledesChange}
          backgroundColor={backgroundColor}
          buttonColor={buttonColor}
          onBackgroundColorChange={setBackgroundColor}
          onButtonColorChange={setButtonColor}
          ontitleToggle={(istitOn) => setIstitleVisible(istitOn)} title={handletitleChange}
          ontitleSubtitleToggle={(issubOn) => setIssubtitleVisible(issubOn)} subtitle={handleSubtitleChange}
          ontitleDesToggle={(isdesOn) => setIsdesVisible(isdesOn)} description={handledesChange}
        />
      </Col>

      <Col className="main-col" md={9} bg="danger">
        <section className="register-section">
          <div className="register-heading text-center d-flex align-items-center mt-3 ">
            
          <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8u6BJwwfQmBMCvPKeIL_PJcV1bylJ0zju9A&usqp=CAU"
              alt=""
              height="50px"
              width="50px"
              className="me-1"
            />
            <h2 className="fs-4 mt-2">Registration</h2>
           
          </div>
          <hr />

          <section className="REGISTER DIVISION SECTION">
          <div
            style={{ backgroundColor: backgroundColor }}
            className="register-div "
          >
            <div className="text-center text-light ">
            {istitVisible && (
              <h3>{title}</h3>
              )}
            </div>
            {/* <div className="text-center text-light py-2"> */}
            <div className="text-center text-light py-2 ">
            {issubVisible && (
              <h5>{subtitle}</h5>
              )}
            </div>
            <div className="card-div">
              <Card className="registration-card">
                <Card.Body>
                  <Form className="registration-form">
                    <Form.Group
                    //   className="text-center"
                      controlId="formBasicFirstName"
                    >
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                       
                        className="input mb-3"
                        type="text"
                        placeholder="Enter your full name"
                      />
                    </Form.Group>

                    <Form.Group
                    //   className="text-center"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        className="input mb-3"
                        type="email"
                        placeholder="Enter email"
                      />
                    </Form.Group>

                    <Button
                      style={{ backgroundColor: buttonColor }}
                      className="register-button"
                      variant="primary mt-3 mb-2"
                      type="submit"
                    >
                      REGISTER
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
          <hr />
          <div>
            <Card className="text-center">
              <Card.Header
                as="h5"
                style={{ backgroundColor: backgroundColor }}
                className=""
              ></Card.Header>
              <Card.Body>
                <Card.Text>
                    {isdesVisible && (
               <h5>{description}</h5>
              )}
                 
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          </section>
        </section>
      </Col>
    </Row>
   </section>
  );
};

export default Registration;
