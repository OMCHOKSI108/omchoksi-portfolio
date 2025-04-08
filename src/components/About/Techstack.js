import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiC,
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiReact,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiPostgresql,
  SiSqlite,
  SiChartdotjs,
  SiNextdotjs,
  SiGit,
  SiLinux,
  SiOpenai,
  SiPostman,
  SiGithub,
} from "react-icons/si";
import { FaCode } from "react-icons/fa"; // Generic fallback for Web Development

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px", gap: "20px" }}>
      {/* 1. C */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://www.tutorialspoint.com/cprogramming/index.htm"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiC size={50} color="white" />
        </a>
      </Col>

      {/* 2. C++ */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://en.cppreference.com/w/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiCplusplus size={60} color="white" />
        </a>
      </Col>

    

      {/* 4. Python */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://docs.python.org/3/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiPython size={60} color="white" />
        </a>
      </Col>

      {/* 5. JavaScript */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiJavascript size={55} color="white" />
        </a>
      </Col>

      {/* 6. HTML */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/HTML"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiHtml5 size={60} color="white" />
        </a>
      </Col>

      {/* 7. CSS */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiCss3 size={65} color="white" />
        </a>
      </Col>

      {/* 8. Node.js */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://nodejs.org/en/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiNodedotjs size={60} color="white" />
        </a>
      </Col>

      {/* 9. React */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://reactjs.org/docs/getting-started.html"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiReact size={60} color="white" />
        </a>
      </Col>

      {/* 10. Express.js */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://expressjs.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiExpress size={60} color="white" />
        </a>
      </Col>

      {/* 11. Firebase */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://firebase.google.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiFirebase size={60} color="white" />
        </a>
      </Col>

      {/* 12. MongoDB */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://www.mongodb.com/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiMongodb size={65} color="white" />
        </a>
      </Col>

      {/* 13. PostgreSQL */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://www.postgresql.org/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiPostgresql size={60} color="white" />
        </a>
      </Col>

      {/* 14. SQLite */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://sqlite.org/docs.html"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiSqlite size={60} color="white" />
        </a>
      </Col>

      {/* 15. Chart.js */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://www.chartjs.org/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiChartdotjs size={60} color="white" />
        </a>
      </Col>

      {/* 16. Next.js */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiNextdotjs size={60} color="white" />
        </a>
      </Col>

      {/* 17. Git */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://git-scm.com/doc"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiGit size={60} color="white" />
        </a>
      </Col>

      {/* 18. Linux */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://www.kernel.org/doc/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiLinux size={60} color="white" />
        </a>
      </Col>

      {/* 19. OpenAI */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://platform.openai.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiOpenai size={60} color="white" />
        </a>
      </Col>

      {/* 20. Postman */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://learning.postman.com/docs/getting-started/introduction/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiPostman size={60} color="white" />
        </a>
      </Col>

      {/* 21. GitHub */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://docs.github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <SiGithub size={60} color="white" />
        </a>
      </Col>

      {/* 22. Web Development */}
      <Col xs={4} md={2} className="tech-icons techstack-icon">
        <a
          href="https://developer.mozilla.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-link techstack-link"
        >
          <FaCode size={60} color="white" /> {/* Generic fallback */}
        </a>
      </Col>


    </Row>
  );
}

export default Techstack;