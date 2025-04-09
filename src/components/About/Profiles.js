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
    fontSize: "clamp(4em, 6vw, 7em)", // Slightly larger icons, scales with screen
    margin: "0",
    color: "white",
    border: "2px solid #a855f7",
    borderRadius: "18px",
    padding: "clamp(5px, 1vw, 10px)", // Responsive padding
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)", // Hover effect for desktop
    },
  };

  const profiles = [
    {
      icon: <SiLeetcode style={iconStyle} />,
      link: "https://leetcode.com/u/OmChoksi_23aiml010/",
      name: "LeetCode",
    },
    {
      icon: <SiHackerrank style={iconStyle} />,
      link: "https://www.hackerrank.com/23aiml010_om",
      name: "HackerRank",
    },
    {
      icon: <SiCodeforces style={iconStyle} />,
      link: "https://codeforces.com/profile/omchoksi",
      name: "Codeforces",
    },
    {
      icon: <SiCodechef style={iconStyle} />,
      link: "https://www.codechef.com/users/om_23aiml010",
      name: "CodeChef",
    },
    {
      icon: <SiKaggle style={iconStyle} />,
      link: "https://www.kaggle.com/omchoksi04",
      name: "Kaggle",
    },
    {
      icon: <SiGeeksforgeeks style={iconStyle} />,
      link: "https://www.geeksforgeeks.org/user/omchoksii/?_gl=1*tl5rje*_up*MQ..*_gs*MQ..&gclid=CjwKCAjwtdi_BhACEiwA97y8BK-CiyfP3eEWFshfbiN2dkSRN1dSToHW8exkz-sDi0dZUYimSfxg2xoCODcQAvD_BwE",
      name: "GFG",
    },
    {
      icon: <SiGooglecolab style={iconStyle} />,
      link: "https://colab.research.google.com",
      name: "Colab",
    },
  ];

  return (
    <>
      <h1
        className="project-heading"
        style={{
          marginTop: "30px",
          textAlign: "center",
          fontSize: "clamp(1.5em, 5vw, 2.5em)", // Responsive heading
        }}
      >
        <strong className="purple">My Profiles</strong>
      </h1>
      <div
        style={{
          textAlign: "center",
          display: "inline-block",
          border: "2px solid #a855f7",
          padding: "clamp(10px, 2vw, 15px)", // Responsive padding
          borderRadius: "50px",
          margin: "0 auto",
          width: "100%", // Full width on mobile
          maxWidth: "600px", // Limits width on larger screens
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: "clamp(1em, 3vw, 2em)", // Responsive brackets
          }}
        >
          [
        </span>
        <div
          style={{
            padding: "10px 0",
          }}
        >
          {/* Row 1: 2 icons */}
          <Row
            style={{
              justifyContent: "center",
              gap: "10px", // Small separation between icons
              marginBottom: "10px", // Space between rows
            }}
          >
            {profiles.slice(0, 2).map((profile, idx) => (
              <Col
                xs={6} // 2 icons per row on mobile
                key={idx}
                style={{
                  textAlign: "center",
                  padding: "5px",
                  display: "flex",
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
                  }}
                >
                  {profile.icon}
                </a>
              </Col>
            ))}
          </Row>

          {/* Row 2: 2 icons */}
          <Row
            style={{
              justifyContent: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            {profiles.slice(2, 4).map((profile, idx) => (
              <Col
                xs={6}
                key={idx}
                style={{
                  textAlign: "center",
                  padding: "5px",
                  display: "flex",
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
                  }}
                >
                  {profile.icon}
                </a>
              </Col>
            ))}
          </Row>

          {/* Row 3: 2 icons */}
          <Row
            style={{
              justifyContent: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            {profiles.slice(4, 6).map((profile, idx) => (
              <Col
                xs={6}
                key={idx}
                style={{
                  textAlign: "center",
                  padding: "5px",
                  display: "flex",
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
                  }}
                >
                  {profile.icon}
                </a>
              </Col>
            ))}
          </Row>

          {/* Row 4: 1 icon */}
          <Row
            style={{
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {profiles.slice(6, 7).map((profile, idx) => (
              <Col
                xs={12} // Full width for the single icon
                key={idx}
                style={{
                  textAlign: "center",
                  padding: "5px",
                  display: "flex",
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
                  }}
                >
                  {profile.icon}
                </a>
              </Col>
            ))}
          </Row>
        </div>
        <span
          style={{
            color: "white",
            fontSize: "clamp(1em, 3vw, 2em)", // Responsive brackets
          }}
        >
          ]
        </span>
      </div>
    </>
  );
}

export default Profiles;