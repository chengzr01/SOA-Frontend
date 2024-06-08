import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import routes from "routes.js";

function Header() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showLogOutModal, setLogOutModal] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleLogOutShow = () => setLogOutModal(true);
  const handleLogOutClose = () => setLogOutModal(false);

  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const getIdentity = () => {
    let username = cookie.load("username");
    if (username !== "") {
      return username;
    } else {
      return "Visitor";
    }
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(email);
    console.log(password);
    let cookieSetup = {
      path: "/",
      domain: window.location.hostname,
    };

    axios
      .post("/login/", { username: username, email: email, password: password })
      .then((res) => {
        console.log(res);
        cookie.save("username", username, cookieSetup);
        cookie.save("email", email, cookieSetup);
        cookie.save("password", password, cookieSetup);
        alert("Login Success!");
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        alert("Login Failure!");
      });
  };

  const handleLogOutSubmit = async (e) => {
    e.preventDefault();
    let cookieSetup = {
      path: "/",
      domain: window.location.hostname,
    };
    axios
      .post("/login/", { username: username, email: email, password: password })
      .then((res) => {
        console.log(res);
        cookie.save("username", "", cookieSetup);
        cookie.save("email", "", cookieSetup);
        cookie.save("password", "", cookieSetup);
        alert("Logout Success!");
        handleLogOutClose();
      })
      .catch((err) => {
        console.log(err);
        alert("Logout Failure!");
      });
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
            <Button
              variant="dark"
              className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
              onClick={mobileSidebarToggle}
            >
              <i className="fas fa-ellipsis-v"></i>
            </Button>
            <Navbar.Brand
              href="#home"
              onClick={(e) => e.preventDefault()}
              className="mr-2"
            >
              {getBrandText()}
            </Navbar.Brand>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                as={Nav.Link}
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                variant="default"
                className="m-0"
              >
                <span className="no-icon">Action</span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Feedback
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  About
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" navbar>
              <Nav.Item>
                <Nav.Link className="m-0" href="#pablo">
                  <span className="no-icon">
                    <b>{getIdentity()}</b>
                  </span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  className="m-0"
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    handleShow();
                  }}
                >
                  <span className="no-icon">Log in</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  className="m-0"
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogOutShow();
                  }}
                >
                  <span className="no-icon">Log out</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicUsername"
              style={{
                textAlign: "center",
                marginTop: "1em",
                marginBottom: "1em",
              }}
            >
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showLogOutModal} onHide={handleLogOutClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogOutSubmit}>
            <Button variant="primary" type="submit">
              Confirm
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
