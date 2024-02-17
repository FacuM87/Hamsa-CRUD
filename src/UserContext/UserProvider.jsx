import React, { createContext, useContext, useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState(null)
  const navigate = useNavigate()

  const saludo = (email) =>{
	  switch (email) {
		case process.env.REACT_APP_MAIL_1:
			setNickname("Facu")
			break
		case process.env.REACT_APP_MAIL_2:
			setNickname("Alci")
			break
		case process.env.REACT_APP_MAIL_3:
			setNickname("Gus")
			break
		default:
			console.log("Couldnt get a nickname");
			break
	  } 
  }

  const login = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredentials.user);
	  saludo(userCredentials.user.email)	
      return userCredentials;
    } catch (error) {
      console.error("Couldnt login: ", error);
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
    <UserContext.Provider value={{ user, nickname, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
