import React, { useReducer, useContext } from "react";
import axios from "axios";

import reducer from "./reducer";

import {
  user,
  token,
  userLocation,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "./constants";

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from "./actions";


const initialState = {
  loading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  showSidebar: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () =>
    setTimeout(() => dispatch({ type: CLEAR_ALERT }), 3000);

  const toggleSidebar = () => dispatch({ type: TOGGLE_SIDEBAR });

  const setupUser = async ({ currentUser, endpoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });

    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endpoint}`,
        currentUser
      );
      const { user, token, location } = data;

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (err) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const updateUser = (currentUser) => {
    console.log(currentUser);
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        updateUser,
        logoutUser,
        toggleSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const UseAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, UseAppContext, initialState };
