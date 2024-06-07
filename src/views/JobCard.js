import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const JobCard = ({ job, index }) => {
  const [open, setOpen] = useState(false);

  const buttonStyle = {
    background: "none",
    border: "none",
    color: "#ccc",
    padding: "0",
    fontSize: "1rem",
    cursor: "pointer",
  };

  return (
    <Card style={{ marginBottom: "1em", width: "80%" }}>
      <Card.Body>
        <Card.Title>
          [{index}] {job.job_title}
          <Button
            variant="link"
            onClick={() => setOpen(!open)}
            aria-controls="job-details"
            aria-expanded={open}
            style={{ ...buttonStyle, float: "right" }}
          >
            {open ? "▲" : "▼"}
          </Button>
        </Card.Title>
        <br />
        {open && (
          <div id="job-details">
            <Card.Subtitle className="mb-2 text-muted">
              {job.location}
            </Card.Subtitle>
            <Card.Text>
              <b>Level:</b> {job.level}
            </Card.Text>
            <Card.Text>
              <b>Corporate:</b> {job.corporate}
            </Card.Text>
            <Card.Text>
              <div>
                <b>Requirements:</b>
                <ul>
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </Card.Text>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default JobCard;
