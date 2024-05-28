import React from "react";
import cookie from "react-cookies";
import { useState } from "react";
// react-bootstrap components
import { Card, Container, Row, Col } from "react-bootstrap";

import ChatBox from "./Chatbox";

function Dashboard() {
  const [visualization, setVisualization] = useState("");
  const [summarization, setSummarization] = useState("");
  const [recommendation, setRecommendation] = useState("");

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
                <Card.Title as="h4">Analyze</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="legend">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Visualization</Card.Title>
                    </Card.Header>
                    <Card.Body>{visualization}</Card.Body>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Summarization</Card.Title>
                    </Card.Header>
                    <Card.Body>{summarization}</Card.Body>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Recommendation</Card.Title>
                    </Card.Header>
                    <Card.Body>{recommendation}</Card.Body>
                  </Card>
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
