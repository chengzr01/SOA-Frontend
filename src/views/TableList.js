import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "react-cookies";

import { Card, Table, Container, Row, Col, Pagination } from "react-bootstrap";

function TableList() {
  const [recommendationReady, setRecommendationReady] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const currentJobs = jobList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRecommendation = (event) => {
    setRecommendationReady(true);
    let username = cookie.load("username");
    let email = cookie.load("email");
    let password = cookie.load("password");
    axios
      .post("/recommendation/", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data["backend response"]);
        setJobList(res.data["backend response"]);
        setTotalPages(
          Math.ceil(res.data["backend response"].length / itemsPerPage)
        );
        const uniqueCorporates = new Set();
        res.data["backend response"].forEach((item) => {
          uniqueCorporates.add(item.corporate);
        });
        let newList = Array.from(uniqueCorporates);
        console.log(newList);
        setCompanyList(newList);
      });
  };

  const getPaginationItems = () => {
    let start = Math.max(currentPage - 5, 1);
    let end = Math.min(currentPage + 4, totalPages);

    if (currentPage <= 5) {
      end = Math.min(10, totalPages);
    } else if (currentPage > totalPages - 5) {
      start = Math.max(totalPages - 9, 1);
    }

    const items = [];
    for (let i = start; i <= end; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
          style={{ flex: "auto" }}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };

  useEffect(() => {
    if (!recommendationReady) {
      handleRecommendation();
    }
  }, []);

  return (
    <>
      <Container fluid>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Positions</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0" style={{ width: "10%" }}>
                      Index
                    </th>
                    <th className="border-0" style={{ width: "20%" }}>
                      Location
                    </th>
                    <th className="border-0" style={{ width: "40%" }}>
                      Title
                    </th>
                    <th className="border-0" style={{ width: "20%" }}>
                      Company
                    </th>
                    <th className="border-0" style={{ width: "10%" }}>
                      Level
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentJobs.map((job, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{job["location"]}</td>
                      <td>{job["job_title"]}</td>
                      <td>{job["corporate"]}</td>
                      <td>{job["level"]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {getPaginationItems()}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </Card.Body>
          </Card>
        </Col>
        <Col md="12">
          <Card className="card-plain table-plain-bg">
            <Card.Header>
              <Card.Title as="h4">Companies</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                {companyList.map((company, index) => {
                  return (
                    <Col xs={4} key={index}>
                      <Card style={{ height: "15em" }}>
                        <Card.Header>
                          <Card.Title>
                            <h4>{company}</h4>
                          </Card.Title>
                          <Card.Text></Card.Text>
                        </Card.Header>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  );
}

export default TableList;
