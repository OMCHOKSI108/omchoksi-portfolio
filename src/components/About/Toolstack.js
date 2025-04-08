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
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://code.visualstudio.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <SiVisualstudiocode size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>VS Code</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://jupyter.org/documentation"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <SiJupyter size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>Jupyter</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://colab.research.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <SiGooglecolab size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>Google Colab</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://docs.streamlit.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <SiStreamlit size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>Streamlit</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://www.kaggle.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <SiKaggle size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>Kaggle</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://docs.github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <SiGithub size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>GitHub</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://learning.postman.com/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <SiPostman size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>Postman</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://vercel.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <SiVercel size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>Vercel</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://docs.netlify.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <SiNetlify size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>Netlify</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://www.apachefriends.org/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <SiXampp size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>XAMPP</p>
          </div>
        </a>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <a
          href="https://help.figma.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <div className="profile-box">
            <SiFigma size={15} color="white" /> {/* Reduced from 20 to 15 */}
            <p>Figma</p>
          </div>
        </a>
      </Col>
    </Row>
  );
}

export default Toolstack;