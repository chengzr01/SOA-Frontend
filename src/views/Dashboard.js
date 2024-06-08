import React from "react";
import cookie from "react-cookies";
import { useState } from "react";
import { Chart, registerables } from "chart.js";
// react-bootstrap components
import { Card, Container, Row, Col } from "react-bootstrap";

import ChatBox from "./Chatbox";

function Dashboard() {
  const [ready, setReady] = useState(false);
  const [visualization, setVisualization] = useState(`
<div style=\"display: flex; flex-direction: column; align-items: center; width: 600px; border: 1px solid #ddd; padding: 10px; margin: 10px;\">\n    <h2>Job Information Bar Charts</h2>\n    <div style=\"display: flex; align-items: flex-end; height: 300px; width: 500px;\">\n        <div style=\"width: 50px; margin: 0 5px; background-color: #4CAF50; text-align: center; color: white; height: 100px;\">Mountain View, CA</div>\n        <div style=\"width: 50px; margin: 0 5px; background-color: #4CAF50; text-align: center; color: white; height: 150px;\">YouTube</div>\n        <div style=\"width: 50px; margin: 0 5px; background-color: #4CAF50; text-align: center; color: white; height: 200px;\">Software Engineer III, Machine Learning</div>\n        <div style=\"width: 50px; margin: 0 5px; background-color: #4CAF50; text-align: center; color: white; height: 250px;\">Mid</div>\n        <div style=\"width: 50px; margin: 0 5px; background-color: #4CAF50; text-align: center; color: white; height: 300px;\">1 year</div>\n    </div>\n    <div style=\"display: flex; align-items: flex-end; height: 300px; width: 500px;\">\n        <div style=\"width: 50px; margin: 0 5px; background-color: #4CAF50; text-align: center; color: white; height: 100px;\">Mountain View, CA</div>\n        <div style=\"width: 50px; margin: 0 5px; background-color: #4CAF50; text-align: center; color: white; height: 150px;\">YouTube</div>\n        <div style=\"width: 50px; margin: 0 5px; background-color: #4CAF50; text-align: center; color: white; height: 200px;\">Staff Software Engineer, Mobile (Android)</div>\n        <div style=\"width: 50px; margin: 0 5px; background-color: #4CAF50; text-align: center; color: white; height: 250px;\">Advanced</div>\n        <div style=\"width: 50px; margin: 0 5px; background-color: #4CAF50; text-align: center; color: white; height: 300px;\">8 years</div>\n    </div>\n</div>\n
  `);
  const [summarization, setSummarization] = useState(`
Here's a summary of various software engineering positions at Google:\n\n
Location & Titles: Google offers roles globally, including in Bangalore, Pune, Mountain View, Sunnyvale, Kraków, Warsaw, and Atlanta. Positions range from entry-level to advanced, covering diverse specializations such as Security/Privacy, Machine Learning, Front End, Full Stack, Infrastructure, and Android development.\n\n
Requirements: While specific requirements vary, a Bachelor's degree or equivalent practical experience is generally needed. Experience in software development, data structures/algorithms, and technical leadership are common prerequisites. Advanced roles may demand more extensive experience, such as 8+ years in software development or 5+ years in technical leadership positions.\n\n
Skills: Proficiency in programming languages like Python, Java, C++, and JavaScript is often sought. Knowledge of data structures, algorithms, and relevant frameworks is crucial. Specialized skills like machine learning, full-stack development, infrastructure security, or frontend/backend technologies may be required based on the role.\n\n
Salary & Benefits: Google offers competitive salaries, typically reflecting the level of expertise and market rates in each location. Additionally, employees enjoy various perks, including health benefits, retirement plans, and opportunities for career growth through training and development programs.\n\n
Overall, Google seeks talented individuals with a blend of technical skills, domain expertise, and a passion for innovation to join its diverse teams worldwide. Each position presents an opportunity to contribute to cutting-edge projects and shape the future of technology.
  `);
  const [recommendation, setRecommendation] = useState(`
  Based on your requirement for maximizing pay as a software engineer at Google, I recommend focusing on Job 4: Senior Staff Software Engineer, Borglet Accelerators, GPU, located in Sunnyvale, CA, USA. This role offers an advanced level position with significant experience prerequisites, including 8 years of software development experience, 7 years specifically in infrastructure-related domains, and 5 years in design and architecture. The role involves working on cutting-edge technologies like GPU acceleration within the Borglet Accelerators team, which can be both intellectually stimulating and financially rewarding. Given its seniority and technical depth, this position is likely to offer one of the highest compensation packages among the options provided. Moreover, being based in Sunnyvale, California, it also offers proximity to Google's headquarters, potentially providing additional career growth opportunities within the company.
  `);

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
                <ChatBox ready={ready} setReady={setReady} />
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
                    <Card.Body>{ready ? summarization : ""}</Card.Body>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Recommendation</Card.Title>
                    </Card.Header>
                    <Card.Body>{ready ? recommendation : ""}</Card.Body>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Visualization</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      {" "}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: ready ? visualization : "",
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
