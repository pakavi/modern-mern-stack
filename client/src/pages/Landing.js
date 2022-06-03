import React from "react";
import { Link } from "react-router-dom";

import { Logo } from "../components/";

import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";


const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
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
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="Job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
