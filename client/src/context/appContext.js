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
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
} from "./actions";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  token: token,
  user: user ? JSON.parse(user) : null,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["pending", "interview", "declined"],
  status: "pending",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({ baseURL: "/api/v1" });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (err.response.status === 401) logoutUser();
      return Promise.reject(err);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () =>
    setTimeout(() => dispatch({ type: CLEAR_ALERT }), 3000);

  const toggleSidebar = () => dispatch({ type: TOGGLE_SIDEBAR });

  const handleChange = ({ name, value }) =>
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });

  const clearValues = () => dispatch({ type: CLEAR_VALUES });

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

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });

    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (err) {
      if (err.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: err.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (err) {
      if (err.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
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
        handleChange,
        clearValues,
        createJob,
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
