
import { useState, useEffect } from "react";
import { Button, Form, Card } from "react-bootstrap";
import NavigationBar from "./navbar";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { Modal } from "react-bootstrap";
import "../CSS/mywebinar.css";
import { useDispatch } from "react-redux";
import { setWebinarId } from "../actions/webinarActions";

const Mywebinar = () => {
  const [showForm, setShowForm] = useState(false);
  const [webinarName, setwebinarName] = useState("");
  const [webinars, setWebinars] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
 
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUser(authUser);

        // Fetch webinars data from Firestore
        const webinarsRef = db
          .collection("accounts")
          .doc(authUser.uid)
          .collection("webinars");

        const unsubscribeWebinars = webinarsRef.onSnapshot((querySnapshot) => {
          const webinarsData = [];
          querySnapshot.forEach((doc) => {
            webinarsData.push({ ...doc.data() }); // remove the id property
          });
          setWebinars(webinarsData);
        });

        return () => {
          unsubscribeWebinars();
        };
      } else {
        // User is logged out
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

 

  const handleCreateClick = async () => {
    try {
      // Add webinar data to Firestore
      const webinarRef = await db
        .collection("accounts")
        .doc(user?.uid)
        .collection("webinars")
        .doc(); // use .doc() to create a new document with a random ID

      const webinarId = webinarRef.id; // store the random ID in a variable

      await webinarRef.set({
        name: webinarName,
        webinarId: webinarRef.id,
        createdAt: new Date().toISOString(),
      });

      // console.log(`Webinar created with ID: ${webinarId}`);
      dispatch(setWebinarId(webinarId)); // dispatch action to update webinarId in Redux store

       // Store webinarId in local storage
    localStorage.setItem("webinarId", webinarId);

      // Redirect user to summary page after successful creation
      navigate(`/webinarportal/`);
    } catch (error) {
      alert(error.message);
    }

    setShowForm(false);
    setwebinarName(""); // clear input value
  };

  const handleCardClick = (webinarId) => {
    dispatch(setWebinarId(webinarId)); // dispatch action to update webinarId in Redux store
    localStorage.setItem("webinarId", webinarId); // store webinarId in local storage
    console.log(`Webinar updated with ID: ${webinarId}`);
    navigate(`/webinarportal/`);
  };
  

  const handleInputChange = (event) => {
    setwebinarName(event.target.value);
  };

  return (
    <section>
      <div>
        <NavigationBar />
      </div>
      <div className="webhome">
        <Button id="mainweb-button" variant="success" onClick={handleShowModal}>
          New webinar
        </Button>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new webinar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="webinar-from">
              <Form.Control
                style={{ padding: "20px" }}
                id="input-webinar"
                type="text"
                placeholder="Webinar name"
                value={webinarName}
                onChange={handleInputChange}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleCreateClick}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
        {webinars.map((webinar) => (
          <Card
            key={webinar.id}
            className="webinar-card"
            onClick={() => handleCardClick(webinar.webinarId)}
          >
            <Card.Body className="card-webinarbody">
              <div>{webinar.name}</div>
              <div>{webinar.createdAt} </div>
              <div>{webinar.webinarId}</div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Mywebinar;
