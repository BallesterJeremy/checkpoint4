import { createContext, useContext, useReducer } from "react";

import userReducer, { initialState } from "../reducers/userReducer";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const userContext = () => useContext(UserContext);

export default UserContext;
export { UserContextProvider, userContext };
