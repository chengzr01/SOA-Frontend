import React, { useEffect } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

import ChatBox from "./Chatbox";

function Dashboard() {
  const [ready, setReady] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [visualization, setVisualization] = useState("");
  const [summarization, setSummarization] = useState("");
  const [analysis, setAnalysis] = useState("");

  const handleSummarization = () => {
    const body = {
      username: cookie.load("username"),
      email: cookie.load("email"),
      password: cookie.load("password"),
      jobs: jobList,
    };
    axios
      .post("/summarize/", body)
      .then((res) => {
        console.log(res.data);
        setSummarization(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAnalysis = () => {
    const body = {
      username: cookie.load("username"),
      email: cookie.load("email"),
      password: cookie.load("password"),
      jobs: jobList,
    };
    axios
      .post("/analyze/", body)
      .then((res) => {
        console.log(res.data);
        setAnalysis(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVisualization = () => {
    const body = {
      username: cookie.load("username"),
      email: cookie.load("email"),
      password: cookie.load("password"),
      jobs: jobList,
    };
    axios
      .post("/visualize/", body)
      .then((res) => {
        console.log(res.data);
        setVisualization(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (ready) {
      if (!fetch) {
        setFetch(true);
        handleSummarization();
        handleAnalysis();
        handleVisualization();
      }
    }
  }, [ready, jobList]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title
                  as="h2"
                  style={{ textAlign: "center", margin: "1em" }}
                >
                  Chat
                </Card.Title>
              </Card.Header>
              <Card.Body></Card.Body>
              <Card.Footer>
                <ChatBox
                  ready={ready}
                  setReady={setReady}
                  jobList={jobList}
                  setJobList={setJobList}
                />
              </Card.Footer>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title
                  as="h2"
                  style={{ textAlign: "center", margin: "1em" }}
                >
                  Analyze
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="legend">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Summarization</Card.Title>
                    </Card.Header>
                    <Card.Body>{summarization}</Card.Body>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Analysis</Card.Title>
                    </Card.Header>
                    <Card.Body>{analysis}</Card.Body>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Visualization</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: visualization,
                        }}
                      />
                    </Card.Body>
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
