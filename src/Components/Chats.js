import { Form,Row, Col } from "react-bootstrap";

const Chats = ({
  startMessageTime,
  onStartTimeChange,
  endMessageTime,                      
 onEndTimeChange,                     
  senderName,                          
  onSenderNameChange,                  
  senderMessage,
  onSenderMessageChange,
  admin,
  onAdminChange,
}) => {

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Form className="chat-form" >
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Start Time:</Form.Label>
            <Form.Control
              type="time"
              id="start-time"
              name="start-time"
              value={startMessageTime}
              onChange={onStartTimeChange}
              onKeyDown={handleKeyDown}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>End Time:</Form.Label>
            <Form.Control
              type="time"
              id="end-time"
              name="end-time"
              value={endMessageTime}
              onChange={onEndTimeChange}
              onKeyDown={handleKeyDown}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Sender Name:</Form.Label>
        <Form.Control
          placeholder="sender name"
          type="text"
          id="sender-name"
          name="sender-name"
          value={senderName}
          onChange={onSenderNameChange}
          onKeyDown={handleKeyDown}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Sender Message:</Form.Label>
        <Form.Control
          as="textarea"
          className="chat-textarea"
          id="sender-message"
          name="sender-message"
          placeholder="enter the message you want to send"
          value={senderMessage}
          onChange={onSenderMessageChange}
          onKeyDown={handleKeyDown}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id="admin"
          name="admin"
          label="Admin"
          checked={admin}
          onChange={onAdminChange}
          onKeyDown={handleKeyDown}
          required
        />
      </Form.Group>

     
    </Form>
  );
};

export default Chats;
