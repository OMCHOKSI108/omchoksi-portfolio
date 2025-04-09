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
    fontSize: "2em",      // reduced from 2.5em
    margin: "4px",        // reduced from 8px
    color: "white",
    border: "2px solid #a855f7",
    borderRadius: "8px",  // reduced from 10px
    padding: "8px",       // reduced from 10px
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
      <h1 className="project-heading" style={{ marginTop: "30px" }}> {/* reduced from 50px */}
        <strong className="purple">My Profiles</strong>
      </h1>
      <Row style={{ 
        justifyContent: "center", 
        paddingBottom: "15px",  // reduced from 20px
        gap: "5px"             // reduced from 10px
      }}>
        {profiles.map((profile, idx) => (
          <Col
            xs={3}    // changed from 4 to reduce width on mobile
            sm={2}    // changed from 3 to show more icons per row
            md={2}
            lg={1}
            key={idx}
            style={{ 
              textAlign: "center",
              padding: "2px"  // added minimal padding
            }}
          >
            <a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                textDecoration: "none", 
                color: "white",
                display: "inline-block"  // ensures proper icon alignment
              }}
            >
              {profile.icon}
            </a>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Profiles;