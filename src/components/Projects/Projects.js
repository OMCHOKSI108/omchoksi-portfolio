import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

// Import your project images
import websocketImg from "../../Assets/Projects/websocket.jpg";
import webscrappingImg from "../../Assets/Projects/webscrapping.jpg";
import educationalChatbotImg from "../../Assets/Projects/educationalchatbot.jpg";
import documentNlpImg from "../../Assets/Projects/documentnlp.jpg";
import textToImageImg from "../../Assets/Projects/texttoimagegenai.jpg";
import socialMediaImg from "../../Assets/Projects/socialmedia.jpg";
import employeeImg from "../../Assets/Projects/employee.jpg";
import faceIdImg from "../../Assets/Projects/faceid.jpg";
import whatsappImg from "../../Assets/Projects/whatsapp.jpg";
import fastapiImg from "../../Assets/Projects/fast-api.jpg";


function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Projects </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={websocketImg}
              isBlog={false}
              title="WebSocket Attack Detection & Simulation"
              description="A project that detects and simulates WebSocket-based attacks in real-time."
              ghLink="https://github.com/OMCHOKSI108/WEBSOCKET-ATTACK-AND-DETECTION"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={webscrappingImg}
              isBlog={false}
              title="Student Result Web Scraper"
              description="Extracts student result data from university portals using Python."
              ghLink="https://github.com/OMCHOKSI108/Web-Scarpping-Tool"
            />
          </Col>
          
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={fastapiImg}
              isBlog={false}
              title="AI RESUME ANALYZER & IMPROVEMENT ADVISOR"
              description="AI-powered resume analyzer and improvement advisor using FastAPI."
              ghLink="https://github.com/OMCHOKSI108/AI-RESUME-ANALZER-FASTAPI"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={educationalChatbotImg}
              isBlog={false}
              title="AI Educational Chatbot"
              description="A natural language chatbot for academic Q&A with students."
              ghLink="https://github.com/OMCHOKSI108/CPI-PROJECT-CHATBOT-EDUCATIONAL"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={documentNlpImg}
              isBlog={false}
              title="NLP Document Chatbot"
              description="Chat with documents via NLP-based intelligent extraction and Q&A."
              ghLink="https://github.com/OMCHOKSI108/NLP-DOCUMENT-CHATBOT"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={textToImageImg}
              isBlog={false}
              title="Text-to-Image Generator AI"
              description="Generates visual content from text input using deep learning."
              ghLink="https://github.com/OMCHOKSI108/TEXT-TO-IMAGE-GEN-AI"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={socialMediaImg}
              isBlog={false}
              title="Social Media Sentiment Analysis"
              description="Analyzes Instagram and Twitter data to determine sentiment trends."
              ghLink="https://github.com/OMCHOKSI108/SOCIAL-MEDIA-SENTIMENTAL-ANALYSIS"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={employeeImg}
              isBlog={false}
              title="Employee Performance Prediction"
              description="Predicts employee performance using ML models and HR datasets."
              ghLink="https://github.com/OMCHOKSI108/EMPLOYEE-PERFORMANCE-PREDICTION-"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={faceIdImg}
              isBlog={false}
              title="Face Identification"
              description="Real-time facial recognition with OpenCV and TensorFlow."
              ghLink="https://github.com/OMCHOKSI108/FACE-IDENTIFICATION-USING-OPENCV-AND-TENSOR"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={whatsappImg}
              isBlog={false}
              title="WhatsApp Chat Analyzer"
              description="Analyzes WhatsApp chats for patterns, trends and communication metrics."
              ghLink="https://github.com/OMCHOKSI108/WHATSAPP-CHAT-ANALYZER"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
