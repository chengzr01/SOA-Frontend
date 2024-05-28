import React from "react";
import { useState } from "react";
// react-bootstrap components
import { Card, Container, Row, Col } from "react-bootstrap";

import ChatBox from "./Chatbox";

function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [positions, setPositions] = useState([]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Chat</Card.Title>
              </Card.Header>
              <Card.Body></Card.Body>
              <Card.Footer>
                <ChatBox />
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Recommendation</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="legend">
                  <div style={{ paddingTop: "2em", paddingBottom: "2em" }}>
                    <i>Here are 3 positions that might be suitable for you.</i>
                  </div>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Anthropic</Card.Title>
                    </Card.Header>
                    <Card.Body></Card.Body>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Microsoft Research</Card.Title>
                    </Card.Header>
                    <Card.Body></Card.Body>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Meta</Card.Title>
                    </Card.Header>
                    <Card.Body></Card.Body>
                  </Card>
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
