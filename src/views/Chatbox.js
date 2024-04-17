import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import axios from "axios";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (message.trim() !== "") {
      let current_messages = messages;
      current_messages.push({ text: message, fromUser: true });
      setMessages(current_messages);
      setMessage("");
      scrollToBottom();
      handleMessageResponse(message);
    }
  };

  const handleMessageResponse = (input) => {
    axios
      .post("/response/", "user_input=" + input)
      .then((res) => {
        console.log(res.data["back end response"][0]);
        let new_message = res.data["back end response"][0]["job_title"];
        setMessages([...messages, { text: new_message, fromUser: false }]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        style={{
          height: "25em",
          width: "100%",
          overflowY: "auto",
          padding: 20,
        }}
      >
        {messages.map((msg, index) => (
          <Row
            key={index}
            style={{
              width: "100%",
              paddingTop: 10,
              paddingBottom: 10,
              display: "flex",
              justifyContent: msg.fromUser ? "flex-end" : "flex-start",
            }}
          >
            <ListGroup.Item
              style={{
                backgroundColor: msg.fromUser ? "#fdfdfd" : "#fdfdfd",
              }}
            >
              {msg.fromUser ? <b>User</b> : <b>Agent</b>}: {msg.text}
            </ListGroup.Item>
          </Row>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <Row style={{ width: "100%" }}>
        <Form onSubmit={handleMessageSubmit}>
          <Col xs={10}>
            <Form.Group controlId="message" style={{ width: "100%" }}>
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={handleMessageChange}
                style={{ minWidth: "100%" }}
              />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Send
            </Button>
          </Col>
        </Form>
      </Row>
    </>
  );
};

export default ChatBox;
