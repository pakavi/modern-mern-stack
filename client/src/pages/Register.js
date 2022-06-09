import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UseAppContext } from "../context/appContext";
import { Logo, FormRow, Alert } from "../components/";

import Wrapper from "../assets/wrappers/RegisterPage";


const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  
  const navigate = useNavigate();

  const { user, isLoading, showAlert, displayAlert, setupUser } =
    UseAppContext();

  const toggleMember = () =>
    setValues({ ...values, isMember: !values.isMember });

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, isMember } = values;
    const currentUser = { name, email, password };

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    if (isMember) {
      setupUser({
        currentUser,
        endpoint: "login",
        alertText: "Login Successful",
      });
    } else {
      setupUser({
        currentUser,
        endpoint: "register",
        alertText: "User Created",
      });
    }
  };

  useEffect(() => {
    if (user) setTimeout(() => navigate("/"), 3000);
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}

        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="text"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
