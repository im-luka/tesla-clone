import React, { useState } from "react";
import { getCarModel } from "../api/api";

export const ModelContext = React.createContext({
  model: {},
  isLoading: false,
  getModel: (id) => {},
});

export const ModelContextProvider = ({ children }) => {
  const [model, setModel] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getDataHandler = async (id) => {
    setIsLoading(true);
    setModel(await getCarModel(id));
    setIsLoading(false);
  };

  return (
    <ModelContext.Provider
      value={{
        model,
        isLoading,
        getModel: getDataHandler,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};
