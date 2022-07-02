import React, { useState } from 'react';
import { createContext, useContext } from 'react';

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <AppContext.Provider value={[sidebar, setSidebar]}>
      {children}
    </AppContext.Provider>
  )
};

export default AppProvider;
