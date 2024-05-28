import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";

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
      current_messages.push({ text: message, fromUser: true });
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
            console.log(short_array);
            let jobString = "";

            for (let i = 0; i < short_array.length; i++) {
              jobString += `Job ${i + 1}:\n`;

              for (let key in short_array[i]) {
                jobString += `${key}: ${short_array[i][key]}\n`;
              }

              jobString += "\n";
            }

            new_message =
              "I have found some jobs you might be interested in!\n" +
              jobString;
          } else {
            new_message = "Sorry! Please try again later!";
          }
        } else {
          new_message = res.data["front end response"];
        }
        setMessages([...messages, { text: new_message, fromUser: false }]);
        setReady(true);
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
                whiteSpace: "pre-wrap",
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
