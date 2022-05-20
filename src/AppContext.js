import React, { useState, useContext } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [currentCatId, setCurrentCatId] = useState(0);
  return (
    <AppContext.Provider value={{ fetchData, setCurrentCatId, currentCatId }}>
      {children}
    </AppContext.Provider>
  );
};

const fetchData = async (url) => {
  try {
    const { data } = await axios(url, {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
