import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Om Choksi </span>
            from <span className="purple">Surat, India.</span>
            <br />
            I am currently pursuing B.Tech in Artificial Intelligence & Machine Learning from CHARUSAT University.
            <br />
            I’m passionate about solving real-world problems with Machine Learning and Data Science.
            <br />
            I love learning new technologies and building projects with an optimized and practical approach.
            <br />
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Building ML projects
            </li>
            <li className="about-activity">
              <ImPointRight /> Exploring new tech tools
            </li>
            <li className="about-activity">
              <ImPointRight /> Participating in Hackathons & Competitions
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Om Choksi</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
