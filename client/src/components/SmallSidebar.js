import React from "react";
import { FaTimes } from "react-icons/fa";

import Wrapper from "../assets/wrappers/SmallSidebar";
import { UseAppContext } from "../context/appContext";

import Logo from "./Logo";
import NavLinks from "./NavLinks";


const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = UseAppContext();

  return (
    <Wrapper>
      <div
        className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
