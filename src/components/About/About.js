import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import {
  SiLeetcode,
  SiHackerrank,
  SiCodeforces,
  SiCodechef,
  SiKaggle,
  SiGooglecolab,
} from "react-icons/si";

function About() {
  const profiles = [
    {
      name: "LeetCode",
      icon: <SiLeetcode size={40} color="#F7E018" />,
      url: "https://leetcode.com/u/omchoksi_23aiml010/",
    },
    {
      name: "HackerRank",
      icon: <SiHackerrank size={40} color="#2EC866" />,
      url: "https://www.hackerrank.com/profile/23aiml010_om",
    },
    {
      name: "Codeforces",
      icon: <SiCodeforces size={40} color="#3FB6CE" />,
      url: "https://codeforces.com/profile/omchoksi",
    },
    {
      name: "CodeChef",
      icon: <SiCodechef size={40} color="#D16F27" />,
      url: "https://www.codechef.com/users/om_23aiml010",
    },
    {
      name: "Kaggle",
      icon: <SiKaggle size={40} color="#20BEFF" />,
      url: "https://www.kaggle.com/omchoksi04",
    },
    {
      name: "GeeksforGeeks",
      icon: (
        <img
          src={require("../../Assets/gfg-logo.png")}
          alt="GFG"
          style={{ width: "40px", height: "40px" }}
        />
      ),
      url: "https://www.geeksforgeeks.org/user/omchoksii/",
    },
    {
      name: "Google Colab",
      icon: <SiGooglecolab size={40} color="#F9AB00" />,
      url: "https://colab.research.google.com/drive/1XNhC8kEafWXN9ubEmzjauU1-y_jd7S_T?usp=sharing",
    },
  ];

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
          Professional <strong className="purple">Skillset</strong>
        </h1>
        <Techstack />

        <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Toolstack />

        <Github />

        <h1 className="project-heading">
          <strong className="purple">My Profiles</strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          {profiles.map((profile, index) => (
            <Col
              xs={4}
              md={2}
              className="profile-card d-flex justify-content-center"
              key={index}
            >
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-link"
              >
                <div className="profile-box">{profile.icon}</div>
                <div
                  style={{
                    color: "white",
                    marginTop: "8px",
                    fontSize: "0.85rem",
                    textAlign: "center",
                  }}
                >
                  {profile.name}
                </div>
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default About;
