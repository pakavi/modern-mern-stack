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
            Organic 8-bit freegan 90's banh mi listicle fixie health goth
            microdosing DSA iceland man braid. Hot chicken cardigan austin,
            chillwave asymmetrical jianbing.
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
