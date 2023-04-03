import React, { useState, useEffect } from "react";
import "../CSS/interaction.css";

import Poll from "./poll";
import Chats from "./Chats";
import CTA from "./CTA";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { auth, db } from "../firebase";

import { useSelector } from "react-redux";

const Interactionx = () => {
  const webinarId = useSelector((state) => state);
  const [interactionType, setInteractionType] = useState("polls");
  const [showInteraction, setShowInteraction] = useState(false);

  const [user, setUser] = useState(null);

  console.log("webinarId:", webinarId);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUser(authUser);
      } else {
        // User is logged out
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    setShowInteraction(true);
  };

  const handleInteractionTypeChange = (e) => {
    e.preventDefault();
    setInteractionType(e.target.value);
  };

  const handleCloseClick = () => {
    setShowInteraction(false);
  };

  const handlepollSubmit = async (
    startpollTime,
    endpollTime,
    question,
    answers,
    showResult,
    customMessage
  ) => {
    try {
      const interactionRef = db
        .collection("accounts")
        .doc(user?.uid)
        .collection("webinars")
        .doc(webinarId)
        .collection("interactions")
        .doc();

      await interactionRef.set({
        type: interactionType,
        starttime: startpollTime,
        endtime: endpollTime,
        question: question,
        answer: answers,
        result: showResult,
        custom: customMessage,
        createdAt: new Date().toISOString(),
      });

      setShowInteraction(false);
    } catch (error) {
      alert(error.message);
    }
  }

  const handlectaSubmit = async (
    startTimeCTA,
    endTimeCTA,
    titleCTA,
    subtitle,
    buttonText,
    buttonLink
  ) => {
    try {
      const interactionRef = db
        .collection("accounts")
        .doc(user?.uid)
        .collection("webinars")
        .doc(webinarId)
        .collection("interactions")
        .doc();

      await interactionRef.set({
        type: interactionType,
        starttimee: startTimeCTA,
        endtime: endTimeCTA,
        title: titleCTA,
        subtitle: subtitle,
        buttontext: buttonText,
        buttonlink: buttonLink,
        createdAt: new Date().toISOString(),
      });

      setShowInteraction(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handlechatSubmit = async (
    startMessageTime,
    endMessageTime,
    senderName,
    senderMessage,
    admin
  ) => {
    try {
      const interactionRef = db
        .collection("accounts")
        .doc(user?.uid)
        .collection("webinars")
        .doc(webinarId)
        .collection("interactions")
        .doc();

      await interactionRef.set({
        type: interactionType,
        startime: startMessageTime,
        endtime: endMessageTime,
        name: senderName,
        sender: senderMessage,
        admin: admin,
        createdAt: new Date().toISOString(),
      });

      setShowInteraction(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="">
      <Button variant="success ms-4 mt-3" onClick={handleCreate}>
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
              //   onSubmit={handleInteractionSubmit}
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
                <Poll onSubmit={handlepollSubmit} />
              )}
              {interactionType === "cta" && <CTA onSubmit={handlectaSubmit} />}
              {interactionType === "chats" && (
                <Chats onSubmit={handlechatSubmit} />
              )}
            </Form>
          </Modal.Body>
        </Modal>
      )}
      <div>Content from backend</div>
    </section>
  );
};

export default Interactionx;
