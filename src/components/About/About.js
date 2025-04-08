import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import { FaGlobe, FaCode } from "react-icons/fa"; // Generic code icon for unsupported languages
import { SiLeetcode, SiHackerrank, SiCodeforces, SiCodechef, SiKaggle, SiPython, SiJavascript, SiHtml5, SiCss3, SiNodedotjs, SiReact, SiMongodb, SiMysql, SiGit, SiLinux, SiDocker, SiFirebase, SiVisualstudiocode, SiGithub } from "react-icons/si";

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
          <Col xs={4} md={2} className="profile-card">
            <a href="https://leetcode.com/u/omchoksi_23aiml010/" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiLeetcode size={40} color="#F7E018" />
                <p>LeetCode</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://www.hackerrank.com/profile/23aiml010_om" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiHackerrank size={40} color="#2EC866" />
                <p>HackerRank</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://codeforces.com/profile/omchoksi" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiCodeforces size={40} color="#3FB6CE" />
                <p>Codeforces</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://www.codechef.com/users/om_23aiml010" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiCodechef size={40} color="#D16F27" />
                <p>CodeChef</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://www.kaggle.com/omchoksi04" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiKaggle size={40} color="#20BEFF" />
                <p>Kaggle</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://www.geeksforgeeks.org/user/omchoksii/" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <img src={require("../../Assets/gfg-logo.png")} alt="GFG" style={{ width: "40px", height: "40px" }} />
                <p>GFG</p>
              </div>
            </a>
          </Col>
        </Row>
        <h1 className="project-heading">
          <FaGlobe /> <strong className="purple">Tech Documentation</strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://devdocs.io/c/" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <img src={require("../../Assets/c-icon.png")} alt="C" style={{ width: "40px", height: "40px" }} />
                <p>C</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://devdocs.io/cpp/" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <img src={require("../../Assets/cpp-icon.png")} alt="C++" style={{ width: "40px", height: "40px" }} />
                <p>C++</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://docs.oracle.com/javase/tutorial/" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <img src={require("../../Assets/java-icon.png")} alt="Java" style={{ width: "40px", height: "40px" }} />
                <p>Java</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://docs.python.org/3/" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiPython size={40} color="white" />
                <p>Python</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiJavascript size={40} color="white" />
                <p>JS</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiHtml5 size={40} color="white" />
                <p>HTML5</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiCss3 size={40} color="white" />
                <p>CSS3</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://nodejs.org/docs/latest/api/" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiNodedotjs size={40} color="white" />
                <p>Node.js</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiReact size={40} color="white" />
                <p>React</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://docs.mongodb.com/" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiMongodb size={40} color="white" />
                <p>MongoDB</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://dev.mysql.com/doc/" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiMysql size={40} color="white" />
                <p>MySQL</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://git-scm.com/doc" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiGit size={40} color="white" />
                <p>Git</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://www.linux.org/docs.php" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiLinux size={40} color="white" />
                <p>Linux</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiDocker size={40} color="white" />
                <p>Docker</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://firebase.google.com/docs" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiFirebase size={40} color="white" />
                <p>Firebase</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://code.visualstudio.com/docs" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiVisualstudiocode size={40} color="white" />
                <p>VS Code</p>
              </div>
            </a>
          </Col>
          <Col xs={4} md={2} className="profile-card">
            <a href="https://docs.github.com/" target="_blank" rel="noopener noreferrer" className="profile-link">
              <div className="profile-box">
                <SiGithub size={40} color="white" />
                <p>GitHub</p>
              </div>
            </a>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;