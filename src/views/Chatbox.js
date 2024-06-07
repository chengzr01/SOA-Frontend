import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import JobCard from "./JobCard";

const ChatBox = ({ ready, setReady }) => {
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
      current_messages.push({ content: message, fromUser: true, type: "text" });
      setMessages(current_messages);
      setMessage("");
      scrollToBottom();
      handleMessageResponse(message);
    }
  };

  function getRandomItemsFromArray(array, numItems) {
    if (array.length <= numItems) {
      return array.slice();
    }

    const randomItems = [];
    const indexes = Array.from(Array(array.length).keys());

    for (let i = 0; i < numItems; i++) {
      const randomIndex = Math.floor(Math.random() * indexes.length);
      const selectedIndex = indexes[randomIndex];
      randomItems.push(array[selectedIndex]);
      indexes.splice(randomIndex, 1);
    }

    return randomItems;
  }

  const handleMessageResponse = (input) => {
    let username = cookie.load("username");
    let email = cookie.load("email");
    let password = cookie.load("password");
    axios
      .post("/response/", "user_input=" + input)
      .then((res) => {
        let new_message = "";
        console.log(res.data);
        if (res.data["back end response"]) {
          if (Array.isArray(res.data["back end response"])) {
            let short_array = getRandomItemsFromArray(
              res.data["back end response"],
              10
            );

            new_message = {
              type: "jobs",
              content: "",
              jobs: short_array,
            };

            setMessages([...messages, { ...new_message, fromUser: false }]);
          } else {
            new_message = {
              type: "error",
              content: "",
            };
          }
          setMessages([...messages, { ...new_message, fromUser: false }]);
        } else {
          new_message = {
            type: "text",
            content: res.data["front end response"],
          };
          setMessages([...messages, { ...new_message, fromUser: false }]);
        }
        setReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderMessage = (msg, index) => {
    switch (msg.type) {
      case "jobs":
        return (
          <div>
            {msg.jobs.map((job, index) => (
              <JobCard key={index} index={index} job={job} />
            ))}
          </div>
        );
      case "error":
        return (
          <ListGroup.Item
            key={index}
            style={{
              backgroundColor: msg.fromUser ? "#fdfdfd" : "#fdfdfd",
              whiteSpace: "pre-wrap",
            }}
          >
            <b>{msg.fromUser ? "User" : "Agent"}</b>: {msg.content}
          </ListGroup.Item>
        );
      case "text":
      default:
        return (
          <ListGroup.Item
            key={index}
            style={{
              backgroundColor: msg.fromUser ? "#fdfdfd" : "#fdfdfd",
              whiteSpace: "pre-wrap",
            }}
          >
            <b>{msg.fromUser ? "User" : "Agent"}</b>: {msg.content}
          </ListGroup.Item>
        );
    }
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
            {renderMessage(msg, index)}
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
