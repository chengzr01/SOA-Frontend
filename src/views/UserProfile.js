import React, { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";

function User() {
  const get_username = () => {
    let username = cookie.load("username");
    if (username !== "") {
      return username;
    } else {
      return "Visitor";
    }
  };

  const get_email = () => {
    let email = cookie.load("email");
    if (email !== "") {
      return email;
    } else {
      return "";
    }
  };

  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleRefresh = (event) => {
    let username = cookie.load("username");
    let email = cookie.load("email");
    let password = cookie.load("password");
    axios
      .post("/get_description/", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        setText(res.data.message);
      })
      .catch((err) => {
        alert("Refresh Error!");
      });
  };

  const handleUpdate = (event) => {
    let username = cookie.load("username");
    let email = cookie.load("email");
    let password = cookie.load("password");
    axios
      .post("/update_description/", {
        username: username,
        email: email,
        password: password,
        description: text,
      })
      .then((res) => {
        alert("Update Success!");
      })
      .catch((err) => {
        alert("Update Error!");
      });
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/default-avatar.png")}
                    ></img>
                    <h5 className="title">{get_username()}</h5>
                  </a>
                </div>
                <p className="description text-center">{get_email()}</p>
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <Form.Control
                        cols="80"
                        rows="4"
                        as="textarea"
                        value={text}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col
                    md="12"
                    style={{
                      textAlign: "center",
                      marginTop: "1em",
                      marginBottom: "1em",
                    }}
                  >
                    <Form.Group>
                      <div className="clearfix"></div>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                        style={{
                          textAlign: "center",
                          margin: "1em",
                        }}
                        onClick={handleUpdate}
                      >
                        Update Profile
                      </Button>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                        style={{
                          textAlign: "center",
                          margin: "1em",
                        }}
                        onClick={handleRefresh}
                      >
                        Refresh Profile
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
