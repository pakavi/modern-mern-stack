import React from "react";
import { Link } from "react-router-dom";

import Wrapper from "../assets/wrappers/ErrorPage";
import notFound from "../assets/images/not-found.svg";


const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={notFound} alt="Not found" />
        <h3>Page Not Found</h3>
        <Link to="/">Go back</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
