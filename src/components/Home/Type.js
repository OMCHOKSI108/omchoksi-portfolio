import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "AI & ML Enthusiast",
          "Data Science Practitioner",
          "Python & C++ Developer",
          "Deep Learning Explorer",
          "OpenCV | TensorFlow | Pandas"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
