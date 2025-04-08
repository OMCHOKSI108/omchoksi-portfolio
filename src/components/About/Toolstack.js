import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiVercel,
  SiGithub,
  SiNetlify,
  SiJupyter,
  SiGooglecolab,
  SiStreamlit,
  SiKaggle,
  SiXampp,
  SiFigma,
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px", gap: "20px" }}>
      <Col xs={4} md={2} className="tech-icons toolstack-icon">
        <a
          href="https://code.visualstudio.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link toolstack-link"
        >
          <SiVisualstudiocode size={50} color="white" />
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons toolstack-icon">
        <a
          href="https://jupyter.org/documentation"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link toolstack-link"
        >
          <SiJupyter size={60} color="white" />
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons toolstack-icon">
        <a
          href="https://colab.research.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link toolstack-link"
        >
          <SiGooglecolab size={60} color="white" />
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons toolstack-icon">
        <a
          href="https://docs.streamlit.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link toolstack-link"
        >
          <SiStreamlit size={60} color="white" />
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons toolstack-icon">
        <a
          href="https://www.kaggle.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link toolstack-link"
        >
          <SiKaggle size={60} color="white" />
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons toolstack-icon">
        <a
          href="https://docs.github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link toolstack-link"
        >
          <SiGithub size={60} color="white" />
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons toolstack-icon">
        <a
          href="https://learning.postman.com/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link toolstack-link"
        >
          <SiPostman size={60} color="white" />
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons toolstack-icon">
        <a
          href="https://vercel.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link toolstack-link"
        >
          <SiVercel size={60} color="white" />
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons toolstack-icon">
        <a
          href="https://docs.netlify.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link toolstack-link"
        >
          <SiNetlify size={60} color="white" />
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons toolstack-icon">
        <a
          href="https://www.apachefriends.org/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link toolstack-link"
        >
          <SiXampp size={60} color="white" />
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons toolstack-icon">
        <a
          href="https://help.figma.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link toolstack-link"
        >
          <SiFigma size={60} color="white" />
        </a>
      </Col>
    </Row>
  );
}

export default Toolstack;