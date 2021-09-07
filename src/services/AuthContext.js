import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import UserService from "./UserService";
import TrainerService from "./TrainerService";
import SeekerService from "./SeekerService";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password, type) {
    UserService.create(email, type);
    if(type == "seeker")
      SeekerService.create(email);
    else
      TrainerService.create(email);
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  useEffect(() => {
    return auth.onAuthStateChanged(async user => {
      if(user) {
        UserService.getAll().on("value", dbUserList =>{
          dbUserList.forEach(dbUserRef => {
            const dbUser = dbUserRef.val();
            if(dbUser && dbUser.email == user.email) 
            {
              user.type = dbUser.type;
              setCurrentUser(user);
              setLoading(false);
            }
          });
        });
      }
      else {
        setCurrentUser(user);
        setLoading(false);
      }
    });
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
