import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiGoogleCloudPlatform } from "react-icons/di";
import {
  SiLeetcode,
  SiHackerrank,
  SiCodeforces,
  SiCodechef,
  SiKaggle,
  SiGeeksforgeeks,
  SiGooglecolab,
} from "react-icons/si";

const profileLinks = [
  {
    name: "LeetCode",
    url: "https://leetcode.com/your_username",
    icon: <SiLeetcode color="#f5c518" size={40} />,
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com/your_username",
    icon: <SiHackerrank color="#2EC866" size={40} />,
  },
  {
    name: "Codeforces",
    url: "https://codeforces.com/profile/your_username",
    icon: <SiCodeforces color="#1f8acb" size={40} />,
  },
  {
    name: "CodeChef",
    url: "https://www.codechef.com/users/your_username",
    icon: <SiCodechef color="#DE6B35" size={40} />,
  },
  {
    name: "Kaggle",
    url: "https://www.kaggle.com/your_username",
    icon: <SiKaggle color="#20BEFF" size={40} />,
  },
  {
    name: "GFG",
    url: "https://auth.geeksforgeeks.org/user/your_username",
    icon: <SiGeeksforgeeks color="#2F8D46" size={40} />,
  },
  {
    name: "Colab",
    url: "https://colab.research.google.com/drive/your_file",
    icon: <SiGooglecolab color="#F9AB00" size={40} />,
  },
];

function Profiles() {
  return (
    <>
      <h1 className="project-heading">
        <strong className="purple">My Profiles</strong>
      </h1>
      <Row
        style={{
          justifyContent: "center",
          paddingBottom: "20px",
          rowGap: "10px",
        }}
      >
        {profileLinks.map((p, i) => (
          <Col
            key={i}
            xs={4}
            sm={3}
            md={2}
            className="d-flex flex-column align-items-center"
            style={{ margin: "5px" }}
          >
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  border: "2px solid #c084fc",
                  padding: "10px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(192,132,252,0.08)",
                }}
              >
                {p.icon}
              </div>
              <span
                style={{
                  marginTop: "5px",
                  fontSize: "0.8rem",
                }}
              >
                {p.name}
              </span>
            </a>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Profiles;
