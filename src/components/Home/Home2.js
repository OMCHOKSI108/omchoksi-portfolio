import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I’m passionate about solving real-world problems using{" "}
              <b className="purple">Artificial Intelligence</b> and{" "}
              <b className="purple">Machine Learning</b>.
              <br />
              <br />
              I am proficient in languages like{" "}
              <i>
                <b className="purple">Python, C++,</b>
              </i>{" "}
              and familiar with frameworks like{" "}
              <i>
                <b className="purple">TensorFlow, OpenCV, Pandas</b>
              </i>.
              <br />
              <br />
              My interests lie in developing intelligent solutions and working on projects involving{" "}
              <b className="purple">Data Science</b> and{" "}
              <b className="purple">Deep Learning</b>.
              <br />
              <br />
              I enjoy working with tools like{" "}
              <b className="purple">Flask</b>,{" "}
              <i>
                <b className="purple">Streamlit</b>
              </i>{" "}
              and libraries like{" "}
              <i>
                <b className="purple">Scikit-learn</b>
              </i>{" "}
              to bring ML-powered ideas to life.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/OMCHOKSI108"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/yourhandle"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/om-choksi/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/yourhandle"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
