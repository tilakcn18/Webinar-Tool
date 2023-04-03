import React, { useState } from "react";
import { useEffect } from "react";
import "../CSS/interaction.css";
import Poll from "./poll";
import Chats from "./Chats";
import CTA from "./CTA";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import { auth, db } from "../firebase";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import { setWebinarId } from './actions/webinarActions';
import { setWebinarId } from "../actions/webinarActions";

const Interaction = () => {
  //webinar id accessed anywhere using redux store
  const webinarId = useSelector((state) => state);
  const [interactionType, setInteractionType] = useState("polls");
  const [showInteraction, setShowInteraction] = useState(false);
  const [user, setUser] = useState(null);
  const [interactionsData, setInteractionsData] = useState([]);
  const dispatch = useDispatch();
  const [interactionId, setInteractionId] = useState("");
  // const [currentInteraction, setCurrentInteraction] = useState(null);
  // const [interactionRef, setInteractionRef] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // const [isCreating, setIsCreating] = useState(false);

  //poll form
  const [startpollTime, setStartpolltime] = useState("");
  const [endpollTime, setendpolltime] = useState("");
  const [question, setquestion] = useState("");
  const [answers, setanswers] = useState("");
  const [showResult, setshowresult] = useState(false);
  const [customMessage, setcustommessage] = useState(false);
  //CTA form
  const [startTimeCTA, setStarttimeCTA] = useState("");
  const [endTimeCTA, setendtimeCTA] = useState("");
  const [titleCTA, setCTAtitle] = useState("");
  const [subtitleCTA, setCTAsubtitle] = useState("");
  const [buttonText, setbuttontext] = useState("");
  const [buttonLink, setbuttonlink] = useState("");
  //chats form
  const [startMessageTime, setStartmessagetime] = useState("");
  const [endMessageTime, setendmessagetime] = useState("");
  const [senderName, setsendername] = useState("");
  const [senderMessage, setsendermessage] = useState("");
  const [admin, setadmin] = useState(false);



  //poll form functions

  const handlepollstarttime = (e) => {
    setStartpolltime(e.target.value);
  };
  const handleendpolltime = (e) => {
    setendpolltime(e.target.value);
  };
  const handlequestion = (e) => {
    setquestion(e.target.value);
  };
  const handleanswers = (e) => {
    setanswers(e.target.value);
  };
  const handleshowresult = (e) => {
    setshowresult(e.target.checked);
  };
  const handlecustomMessage = (e) => {
    setcustommessage(e.target.checked);
  };

  //CTA form functions

  const handleCTAstarttime = (e) => {
    setStarttimeCTA(e.target.value);
  };
  const handleCTAendtime = (e) => {
    setendtimeCTA(e.target.value);
  };
  const handleCTAtitle = (e) => {
    setCTAtitle(e.target.value);
  };
  const handleCTAsubtitle = (e) => {
    setCTAsubtitle(e.target.value);
  };
  const handleCTAbuttontext = (e) => {
    setbuttontext(e.target.value);
  };
  const handleCTAbuttonlink = (e) => {
    setbuttonlink(e.target.value);
  };

  //Chats form functions

  const handlestartmessagetime = (e) => {
    setStartmessagetime(e.target.value);
  };
  const handleendmessagetime = (e) => {
    setendmessagetime(e.target.value);
  };
  const handlesendername = (e) => {
    setsendername(e.target.value);
  };
  const handlesendermessage = (e) => {
    setsendermessage(e.target.value);
  };
  const handleadmincheck = (e) => {
    setadmin(e.target.checked);
  };

  console.log("webinarId:", webinarId);

  useEffect(() => {
    const storedWebinarId = localStorage.getItem("webinarId");
    // If webinarId exists in local storage, dispatch setWebinarId action
    if (storedWebinarId) {
      dispatch(setWebinarId(storedWebinarId));
    }
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUser(authUser);

        // Fetch the interactions data from Firestore
        const interactionsRef = db
          .collection("accounts")
          .doc(authUser.uid)
          .collection("webinars")
          .doc(webinarId)
          .collection("interactions");

        interactionsRef.onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          setInteractionsData(data);
        });
      } else {
        // User is logged out
        setUser(null);
      }
    });

    return unsubscribe;
  }, [webinarId]);

  //this handleInteractionSubmit will handle the form submission based on interactiontype to the firestore database

  const handleInteractionSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    let isFormValid = true;
    if (interactionType === "polls") {
      if (!startpollTime || !endpollTime || !question || !answers) {
        isFormValid = false;
        alert("Please fill in all the required fields.");
      }
    } else if (interactionType === "cta") {
      if (
        !startTimeCTA ||
        !endTimeCTA ||
        !titleCTA ||
        !subtitleCTA ||
        !buttonText ||
        !buttonLink
      ) {
        isFormValid = false;
        alert("Please fill in all the required fields.");
      }
    } else if (interactionType === "chats") {
      if (
        !startMessageTime ||
        !endMessageTime ||
        !senderName ||
        !senderMessage
      ) {
        isFormValid = false;
        alert("Please fill in all the required fields.");
      }
    } else {
      alert("No interaction type selected");
      isFormValid = false;
    }

    if (!isFormValid) {
      return;
    }

    // Create a reference to the interactions collection for the current webinar

    const interactionsRef = db
      .collection("accounts")
      .doc(user?.uid)
      .collection("webinars")
      .doc(webinarId)
      .collection("interactions");

    let formData;

    if (interactionType === "polls") {
      formData = {
        interactionType,
        startpollTime,
        endpollTime,
        question,
        answers,
        showResult,
        customMessage,
        createdAt: new Date().toISOString(),
      };
    } else if (interactionType === "cta") {
      formData = {
        interactionType,
        startTimeCTA,
        endTimeCTA,
        titleCTA,
        subtitleCTA,
        buttonText,
        buttonLink,
        createdAt: new Date().toISOString(),
      };
    } else if (interactionType === "chats") {
      formData = {
        interactionType,
        startMessageTime,
        endMessageTime,
        senderName,
        senderMessage,
        admin,
        createdAt: new Date().toISOString(),
      };
    }

    let interactionDocRef;

    if (isEditing) {
      // Update the existing interaction document
      interactionDocRef = interactionsRef.doc(interactionId);
      await interactionDocRef.update(formData);
      console.log("Interaction data updated with ID:", interactionId);
    } else {
      // Create a new interaction document
      interactionDocRef = interactionsRef.doc();
      formData.interactionid = interactionDocRef.id;
      await interactionDocRef.set(formData);
      console.log("Interaction data saved with ID:", interactionDocRef.id);
    }

    // Reset form fields
    setStartpolltime("");
    setendpolltime("");
    setquestion("");
    setanswers("");
    setshowresult(false);
    setcustommessage(false);
    setStarttimeCTA("");
    setendtimeCTA("");
    setCTAtitle("");
    setCTAsubtitle("");
    setbuttontext("");
    setbuttonlink("");
    setStartmessagetime("");
    setendmessagetime("");
    setsendername("");
    setsendermessage("");
    setadmin(false);

    // Hide the interaction form
    setShowInteraction(false);

    // Reset the value of isEditing to false
    setIsEditing(false);
    // window.location.reload();
  };

  function handleEditInteraction(interaction) {
    setInteractionType(interaction.interactionType);

    if (interaction.interactionType === "polls") {
      setStartpolltime(interaction.startpollTime);
      setendpolltime(interaction.endpollTime);
      setquestion(interaction.question);
      setanswers(interaction.answers);
      setshowresult(interaction.showResult);
      setcustommessage(interaction.customMessage);
    } else if (interaction.interactionType === "cta") {
      setStarttimeCTA(interaction.startTimeCTA);
      setendtimeCTA(interaction.endTimeCTA);
      setCTAtitle(interaction.titleCTA);
      setCTAsubtitle(interaction.subtitleCTA);
      setbuttontext(interaction.buttonText);
      setbuttonlink(interaction.buttonLink);
    } else if (interaction.interactionType === "chats") {
      setStartmessagetime(interaction.startMessageTime);
      setendmessagetime(interaction.endMessageTime);
      setsendername(interaction.senderName);
      setsendermessage(interaction.senderMessage);
      setadmin(interaction.admin);
    }

    setInteractionId(interaction.interactionid);
    setShowInteraction(true);
    setIsEditing(true);
    // reload the page to display the updated data
  }

  const handleDeleteInteraction = async (interactionid) => {
    const interactionRef = db
      .collection("accounts")
      .doc(user.uid)
      .collection("webinars")
      .doc(webinarId)
      .collection("interactions")
      .doc(interactionid);

    try {
      await interactionRef.delete();
      console.log("Interaction deleted successfully");
      console.log(interactionid);
    } catch (error) {
      console.error("Error deleting interaction: ", error);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    // setIsCreating(true);
    setShowInteraction(true);
  };
  

  const handleInteractionTypeChange = (e) => {
    e.preventDefault();
    setInteractionType(e.target.value);
  };

  const handleCloseClick = () => {
    setShowInteraction(false);
  };

  return (
    <section className="">
      <Button
        className="createinteraction-button"
        variant="success ms-4 me-3 mt-3 px-4"
        onClick={handleCreate}
      >
        Create
      </Button>
      {showInteraction && (
        <Modal show={showInteraction} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <h4>Create Your Interaction</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              className="interaction-form"
              onSubmit={handleInteractionSubmit}
            >
              <Form.Group className="mb-3 text-center">
                <Form.Label className="text-center">
                  Select Your Interaction Type
                </Form.Label>
                <Form.Control
                  className="typeof-interaction text-center"
                  as="select"
                  value={interactionType}
                  onChange={handleInteractionTypeChange}
                >
                  <option value="polls">Poll</option>
                  <option value="cta">CTA</option>
                  <option value="chats">Chat</option>
                </Form.Control>
              </Form.Group>
              {interactionType === "polls" && (
                <Poll
                  startpollTime={startpollTime}
                  onStartTimeChange={handlepollstarttime}
                  endpollTime={endpollTime}
                  onEndTimeChange={handleendpolltime}
                  question={question}
                  onQuestionChange={handlequestion}
                  answers={answers}
                  onAnswerChange={handleanswers}
                  showResult={showResult}
                  onShowResultChange={handleshowresult}
                  customMessage={customMessage}
                  onCustomMessageChange={handlecustomMessage}
                />
              )}
              {interactionType === "cta" && (
                <CTA
                  startTimeCTA={startTimeCTA}
                  onStartTimeCTAChange={handleCTAstarttime}
                  endTimeCTA={endTimeCTA}
                  onEndTimeCTAChange={handleCTAendtime}
                  titleCTA={titleCTA}
                  onTitleCTAChange={handleCTAtitle}
                  subtitleCTA={subtitleCTA}
                  onSubtitleChange={handleCTAsubtitle}
                  buttonText={buttonText}
                  onButtonTextChange={handleCTAbuttontext}
                  buttonLink={buttonLink}
                  onButtonLinkChange={handleCTAbuttonlink}
                />
              )}
              {interactionType === "chats" && (
                <Chats
                  startMessageTime={startMessageTime}
                  onStartTimeChange={handlestartmessagetime}
                  endMessageTime={endMessageTime}
                  onEndTimeChange={handleendmessagetime}
                  senderName={senderName}
                  onSenderNameChange={handlesendername}
                  senderMessage={senderMessage}
                  onSenderMessageChange={handlesendermessage}
                  admin={admin}
                  onAdminChange={handleadmincheck}
                />
              )}
              <Button variant="success" type="submit" className="mt-3 mb-3">
                {isEditing ? "Save" : "Submit"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>
              <h6>Interaction Type</h6>
            </th>
            <th>
              <h6>Start Time</h6>
            </th>
            <th>
              <h6>End Time</h6>
            </th>
            <th>
              <h6>Question / Title / Sender Message</h6>
            </th>
            <th>
              <h6>Answers / Subtitle / Button Text</h6>
            </th>
            <th>
              <h6>Button Link</h6>
            </th>
            <th>
              <h6>Show Result</h6>
            </th>
            <th>
              <h6>Custom Message</h6>
            </th>
            <th>
              <h6>Admin</h6>
            </th>
            <th>
              <h6>Edit</h6>
            </th>
            <th>
              <h6>Delete</h6>
            </th>
          </tr>
        </thead>
        <tbody>
          {interactionsData.map((interaction, index) => (
            <tr key={index}>
              <td>{interaction.interactionType}</td>
              <td>
                {interaction.startpollTime || interaction.startTimeCTA ||interaction.startMessageTime}
              </td>
              <td>
                {interaction.endpollTime ||
                  interaction.endTimeCTA ||
                  interaction.endMessageTime}
              </td>
              <td>
                {interaction.question ||
                  interaction.titleCTA ||
                  interaction.senderMessage}
              </td>
              <td>
                {interaction.answers ||
                  interaction.subtitleCTA ||
                  interaction.buttonText}
              </td>
              <td>{interaction.buttonLink}</td>
              <td>{interaction.showResult ? "Yes" : "No"}</td>
              <td>{interaction.customMessage ? "Yes" : "No"}</td>
              <td>{interaction.admin ? "Yes" : "No"}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditInteraction(interaction)}
                >
                  <FontAwesomeIcon icon={faEdit} /> <span>Edit</span>
                </button>
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() =>
                    handleDeleteInteraction(interaction.interactionid)
                  }
                >
                  <FontAwesomeIcon icon={faTrash} /> <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Interaction;
