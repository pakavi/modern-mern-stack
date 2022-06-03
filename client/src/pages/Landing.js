import React from "react";

import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";

import Wrapper from "../assets/wrappers/LandingPage";


const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="Jobify" className="logo" />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            I'm baby messenger bag helvetica meditation taxidermy pitchfork,
            vegan synth. Stumptown gentrify next level coloring book pork belly
            green juice.
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} alt="Job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
