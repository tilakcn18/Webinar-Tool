import React, { useState } from "react";
import { Button, Card, Col,Form, Row } from "react-bootstrap";
import Papa from "papaparse";
import "../CSS/Settings.css";

const Settings = () => {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [emails, setEmails] = useState([]);

  const handleDownloadCSV = () => {
    const filename = "data.csv";
    // Create a new array of objects with an email property
    const newData = data.map((row) => ({ email: "user@example.com", ...row }));

    const csvData = Papa.unparse(newData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const handleUploadCSV = (event) => {
    const file = event.target.files[0];
    if (!file || !file.name.endsWith(".csv")) {
      alert("Please select a CSV file.");
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target.result;
      const parsedData = Papa.parse(csv).data;
      // Remove the first column, which is assumed to be the email column
      const newData = parsedData.map((row) => row.slice(1));
      setData(newData);
      // Get the email column and set it as the list of emails
      const emailColumn = parsedData.map((row) => row[0]);
      setEmails(emailColumn);
    };
    reader.readAsText(file);
  };

  const handleDeleteEmail = (index) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  return (
    <div className="">
      <div className="settings">
      <img className=" ms-3 me-2" src="settings.jpg" alt="" height="25px" width="25px" /><h4 className="mt-1">Settings</h4>
      </div>
      <hr />
      <Row>
        <Col md={3}>
          <Card className="Settings-card mt-4">
           
            <Card.Body>
              <Card.Text>Click below to Download CSV</Card.Text>
              <Button variant="success mb-4" onClick={handleDownloadCSV}>
                Download
              </Button>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose CSV file to upload:</Form.Label>
                <Form.Control
                  className=""
                  type="file"
                  onChange={handleUploadCSV}
                  accept="text/csv"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="Settings-card1 mt-4">
          <Card.Header className="bg-success text-light mb-1" as="h5">
            Preview page
          </Card.Header>
            <Card.Header className="bg-success text-light" as="h5">
              Number of Attendes({emails.length})
            </Card.Header>
            <Card.Body>
              <ol className="">
                {emails.map((email, index) => (
                  <li className="settings-list mb-3" key={index}>
                    {email}
                    <button
                      id="settings-button"
                      className="ms-2"
                      onClick={() => handleDeleteEmail(index)}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ol>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
};

export default Settings;
