import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import { FaGlobe } from "react-icons/fa"; // For "Profiles" globe icon
import { SiLeetcode, SiHackerrank, SiCodeforces, SiCodechef, SiKaggle } from "react-icons/si";
import { DiGeeksforgeeks } from "react-icons/di"; // For GeeksforGeeks icon

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Know Who <strong className="purple">I'M</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
        <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1>
        <Techstack />
        <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Toolstack />
        <Github />
        <h1 className="project-heading">
          <FaGlobe /> <strong className="purple">Profiles</strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          <Col xs={4} md={2} className="tech-icons" style={{ textAlign: "center" }}>
            <a href="https://leetcode.com/u/omchoksi_23aiml010/" target="_blank" rel="noopener noreferrer">
              <SiLeetcode size={40} color="#F7E018" />
              <p>LeetCode</p>
            </a>
          </Col>
          <Col xs={4} md={2} className="tech-icons" style={{ textAlign: "center" }}>
            <a href="https://www.hackerrank.com/profile/23aiml010_om" target="_blank" rel="noopener noreferrer">
              <SiHackerrank size={40} color="#2EC866" />
              <p>HackerRank</p>
            </a>
          </Col>
          <Col xs={4} md={2} className="tech-icons" style={{ textAlign: "center" }}>
            <a href="https://codeforces.com/profile/omchoksi" target="_blank" rel="noopener noreferrer">
              <SiCodeforces size={40} color="#3FB6CE" />
              <p>Codeforces</p>
            </a>
          </Col>
          <Col xs={4} md={2} className="tech-icons" style={{ textAlign: "center" }}>
            <a href="https://www.codechef.com/users/om_23aiml010" target="_blank" rel="noopener noreferrer">
              <SiCodechef size={40} color="#D16F27" />
              <p>CodeChef</p>
            </a>
          </Col>
          <Col xs={4} md={2} className="tech-icons" style={{ textAlign: "center" }}>
            <a href="https://www.kaggle.com/omchoksi04" target="_blank" rel="noopener noreferrer">
              <SiKaggle size={40} color="#20BEFF" />
              <p>Kaggle</p>
            </a>
          </Col>
          <Col xs={4} md={2} className="tech-icons" style={{ textAlign: "center" }}>
            <a href="https://www.geeksforgeeks.org/user/omchoksii/" target="_blank" rel="noopener noreferrer">
              <DiGeeksforgeeks size={40} color="#2F8D46" />
              <p>GFG</p>
            </a>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;