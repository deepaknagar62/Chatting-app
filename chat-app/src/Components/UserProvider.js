import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

const UserState = (props) => {
  const [userData, setUserData] = useState({ userId: null, userName: null });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
