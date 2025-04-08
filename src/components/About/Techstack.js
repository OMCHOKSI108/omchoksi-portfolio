import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
} from "react-icons/di";
import { SiPytorch, SiTensorflow, SiKeras } from "react-icons/si";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://docs.python.org/3/"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <DiPython size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>Python</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <DiJavascript1 size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>JavaScript</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://reactjs.org/docs/getting-started.html"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <DiReact size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>React</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://nodejs.org/docs/latest/api/"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <DiNodejs size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>Node.js</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://docs.mongodb.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <DiMongodb size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>MongoDB</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://git-scm.com/doc"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <DiGit size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>Git</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://docs.oracle.com/javase/tutorial/"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <DiJava size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>Java</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://pytorch.org/docs/stable/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <SiPytorch size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>PyTorch</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://www.tensorflow.org/api_docs"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <SiTensorflow size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>TensorFlow</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://keras.io/api/"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <SiKeras size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>Keras</p>
          </div>
        </a>
      </Col>
    </Row>
  );
}

export default Techstack;