import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function TableList() {
  return (
    <>
      <Container fluid>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Potential Positions</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Position</th>
                    <th className="border-0">Company</th>
                    <th className="border-0">Salary</th>
                    <th className="border-0">City</th>
                    <th className="border-0">Country</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Research Scientist</td>
                    <td>Microsoft</td>
                    <td>$100,000</td>
                    <td>Redmond, WA</td>
                    <td>USA</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Assistant Professor</td>
                    <td>Carnegie Mellon University</td>
                    <td>$20,000</td>
                    <td>Pittsburgh, PA</td>
                    <td>USA</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Research Engineer</td>
                    <td>Google</td>
                    <td>CHF 100,000</td>
                    <td>Zurich</td>
                    <td>Switzerland</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Table on Plain Background</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col> */}
        <Col md="12">
          <Card className="card-plain table-plain-bg">
            <Card.Header>
              <Card.Title as="h4">Potential Companies</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={4}>
                  <Card style={{ height: "15em" }}>
                    <Card.Header>
                      <Card.Title>Google</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      Here is some information related to Google!
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={4}>
                  <Card style={{ height: "15em" }}>
                    <Card.Header>
                      <Card.Title>Google</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      Here is some information related to Google!
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={4}>
                  <Card style={{ height: "15em" }}>
                    <Card.Header>
                      <Card.Title>Google</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      Here is some information related to Google!
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={4}>
                  <Card style={{ height: "15em" }}>
                    <Card.Header>
                      <Card.Title>Google</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      Here is some information related to Google!
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  );
}

export default TableList;
