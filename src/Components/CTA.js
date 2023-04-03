import React from "react";
import { Form,Row, Col  } from "react-bootstrap";

const CTA = ({
  startTimeCTA,
  onStartTimeCTAChange,
  endTimeCTA,
  onEndTimeCTAChange,
  titleCTA,
  onTitleCTAChange,
  subtitle,
  onSubtitleChange,
  buttonText,
  onButtonTextChange,
  buttonLink,
  onButtonLinkChange,
}) => {

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Form className="CTA-form">
      <Row>
        <Col>
      <Form.Group controlId="formStartEndTime" className="mb-3">
        <Form.Label>Start time:</Form.Label>
        <Form.Control
          type="time"
          value={startTimeCTA}
          onChange={onStartTimeCTAChange}
          onKeyDown={handleKeyDown}
          required
        />
      </Form.Group>
      </Col>
        <Col>
      <Form.Group controlId="formStartEndTime" className="mb-3">
        <Form.Label>End time:</Form.Label>
        <Form.Control
          type="time"
          value={endTimeCTA}
          onChange={onEndTimeCTAChange}
          onKeyDown={handleKeyDown}
          required
        />
      </Form.Group>
      </Col>
      </Row>
      <Form.Group controlId="title" className="mb-3">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          value={titleCTA}
          onChange={onTitleCTAChange}
          placeholder="Enter the title"
          required
          maxLength="20"
          onKeyDown={handleKeyDown}
        
        />
      </Form.Group>
      <Form.Group controlId="subtitle" className="mb-3">
        <Form.Label>Subtitle:</Form.Label>
        <Form.Control
          type="text"
          value={subtitle}
          onChange={onSubtitleChange}
          placeholder="Enter the subtitle"
          maxLength="20"
          required
          onKeyDown={handleKeyDown}
        />
      </Form.Group>
      <Form.Group controlId="button-text" className="mb-3">
        <Form.Label>Button Text:</Form.Label>
        <Form.Control
          type="text"
          value={buttonText}
          onChange={onButtonTextChange}
          placeholder="Button Text"
          required
          onKeyDown={handleKeyDown}
        />
      </Form.Group>
      <Form.Group controlId="button-link" className="mb-3">
        <Form.Label>Button Link:</Form.Label>
        <Form.Control
          type="url"
          value={buttonLink}
          onChange={onButtonLinkChange}
          placeholder="Button link"
          name="url"
          required
          onKeyDown={handleKeyDown}
        />
      </Form.Group>
    </Form>
  );
};

export default CTA;
