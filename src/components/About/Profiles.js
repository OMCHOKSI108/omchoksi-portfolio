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
    fontSize: "7em",      // Larger icons
    margin: "0",         // No margin
    color: "white",
    border: "2px solid #a855f7",
    borderRadius: "18px",  // Slight rounding
    padding: "15px",      // Increased from 2px to 3px
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
      <h1 className="project-heading" style={{ marginTop: "30px" }}>
        <strong className="purple">My Profiles</strong>
      </h1>
      <div style={{ 
        textAlign: "center", 
        display: "inline-block", 
        border: "2px solid #a855f7", 
        padding: "15px", 
        borderRadius: "70px" 
      }}>
        <span style={{ color: "white", fontSize: "2em" }}>[</span>
        <Row style={{ 
          justifyContent: "center", 
          paddingBottom: "15px",
          gap: "35px",          // Increased from 2px to 3px
          margin: "0",
          display: "flex",
          flexWrap: "nowrap",
        }}>
          {profiles.map((profile, idx) => (
            <Col
              xs={3.8}    // Slightly increased to prevent overlap
              sm={2.4}
              md={1.2}
              lg={1}
              key={idx}
              style={{ 
                textAlign: "center",
                padding: "0",
                margin: "0",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <a
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  textDecoration: "none", 
                  color: "white",
                  display: "inline-block",
                  margin: "0",
                  padding: "0",
                }}
              >
                {profile.icon}
              </a>
            </Col>
          ))}
        </Row>
        <span style={{ color: "white", fontSize: "2em" }}>]</span>
      </div>
    </>
  );
}

export default Profiles;