import { useState, useEffect } from "react";
import { db } from "../firebase";
import { auth } from "../firebase";
import { Card, Container } from "react-bootstrap";
import "../CSS/Profile.css";
import NavigationBar from "./navbar";

const ProfileForm = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the currently authenticated user's ID
        const userId = auth.currentUser.uid;
        
        // Query the database for the current user's data
        const querySnapshot = await db.collection("accounts").doc(userId).get();
        const docData = querySnapshot.data();

        // Update the state with the user's data
        setData([docData]);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    // Call fetchData only when there is a currently authenticated user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchData();
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <section className="profilepage">
      <div className="navbar-home">
        <NavigationBar />
      </div>

      <div  className= "card-profile">
        {data.map((doc) => (
          <Card key={doc.id} className="m-auto " >
            <Card.Header className="bg-success text-light">User Profile</Card.Header>
            <Card.Body>
              <img src="https://cdn.icon-icons.com/icons2/1865/PNG/96/idcard_119573.png" width="50px" height="50px" alt="" />
              <Card.Title> <h3>{doc.fullName}</h3> </Card.Title>
              <Card.Text>
                <b>Email: </b> {doc.email}
                <br />
                <b>From: </b> {doc.country}
                <br />
                <b>Signup Time: </b> {doc.signupTime}
                <br />
                <b>Current Status: </b> {doc.status}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProfileForm;
