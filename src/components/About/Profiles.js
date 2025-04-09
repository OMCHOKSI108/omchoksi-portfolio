import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiLeetcode,
  SiCodeforces,
  SiCodechef,
  SiKaggle,
  SiHackerrank,
  SiGooglecolab,
  SiGeeksforgeeks,
} from "react-icons/si";

function Profiles() {
  const iconStyle = {
    fontSize: "2.5em", // slightly smaller
    margin: "8px",     // closer spacing
    color: "white",
    border: "2px solid #a855f7",
    borderRadius: "10px",
    padding: "10px",
    transition: "transform 0.2s ease-in-out",
  };

  const profiles = [
    { icon: <SiLeetcode style={iconStyle} />, link: "https://leetcode.com/u/OmChoksi_23aiml010/", name: "LeetCode" },
    { icon: <SiHackerrank style={iconStyle} />, link: "https://www.hackerrank.com/23aiml010_om", name: "HackerRank" },
    { icon: <SiCodeforces style={iconStyle} />, link: "https://codeforces.com/profile/omchoksi", name: "Codeforces" },
    { icon: <SiCodechef style={iconStyle} />, link: "https://www.codechef.com/users/om_23aiml010", name: "CodeChef" },
    { icon: <SiKaggle style={iconStyle} />, link: "https://www.kaggle.com/omchoksi04", name: "Kaggle" },
    { icon: <SiGeeksforgeeks style={iconStyle} />, link: "https://www.geeksforgeeks.org/user/omchoksii/?_gl=1*tl5rje*_up*MQ..*_gs*MQ..&gclid=CjwKCAjwtdi_BhACEiwA97y8BK-CiyfP3eEWFshfbiN2dkSRN1dSToHW8exkz-sDi0dZUYimSfxg2xoCODcQAvD_BwE", name: "GFG" },
    { icon: <SiGooglecolab style={iconStyle} />, link: "https://colab.research.google.com", name: "Colab" },
  ];

  return (
    <>
      <h1 className="project-heading" style={{ marginTop: "50px" }}>
        <strong className="purple">My Profiles</strong>
      </h1>
      <Row style={{ justifyContent: "center", paddingBottom: "20px", gap: "10px" }}>
        {profiles.map((profile, idx) => (
          <Col
            xs={4}
            sm={3}
            md={2}
            lg={1}
            key={idx}
            style={{ textAlign: "center" }}
          >
            <a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "white" }}
            >
              {profile.icon}
              <div style={{ fontSize: "0.85em", marginTop: "4px" }}>{profile.name}</div>
            </a>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Profiles;
