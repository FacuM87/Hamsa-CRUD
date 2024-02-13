import React, { createContext, useContext, useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  const login = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredentials.user);
      return userCredentials;
    } catch (error) {
      console.error("Couldnt login: ", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
        await signOut(auth)
        console.log("Logged out successfuly");
        navigate("/")
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
