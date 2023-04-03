import React from "react";
import { Form,Row, Col  } from "react-bootstrap";

const Poll = ({
  startpollTime,
  onStartTimeChange,
  endpollTime,
  onEndTimeChange,
  question,
  onQuestionChange,
  answers,
  onAnswerChange,
  showResult,
  onShowResultChange,
  customMessage,
  onCustomMessageChange,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Start time:</Form.Label>
            <Form.Control
              type="time"
              value={startpollTime}
              onChange={onStartTimeChange}
              onKeyDown={handleKeyDown}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>End time:</Form.Label>
            <Form.Control
              type="time"
              value={endpollTime}
              onChange={onEndTimeChange}
              onKeyDown={handleKeyDown}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Question:</Form.Label>
        <Form.Control
          type="text"
          value={question}
          onChange={onQuestionChange}
          onKeyDown={handleKeyDown}
          required
          placeholder="Question"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Answers:</Form.Label>
        <Form.Control
          type="text"
          value={answers}
          onChange={onAnswerChange}
          onKeyDown={handleKeyDown}
          required
          placeholder="Answers"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Show result"
          checked={showResult}
          onChange={onShowResultChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Custom message"
          checked={customMessage}
          onChange={onCustomMessageChange}
          required
        />
      </Form.Group>
    </Form>
  );
};

export default Poll;
