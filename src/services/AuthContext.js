import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import UserService from "./UserService";
import TrainerService from "./TrainerService";
import SeekerService from "./SeekerService";
import RequestService from "./RequestService";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

function clearRequest(sender) {
  RequestService.getAll().onSnapshot(requestList => {
    requestList.forEach(requestRef => {
      const id = requestRef.id;
      const request = requestRef.data();
      if(request.sender === sender)
        RequestService.delete(id);
    });
  });
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password, type) {
    UserService.create(email, type);
    if(type === "seeker")
      SeekerService.create(email);
    else
      TrainerService.create(email);
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    //clearRequest(email);
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    //clearRequest(currentUser.email);
    return auth.signOut()
  }

  useEffect(() => {
    return auth.onAuthStateChanged(async user => {
      if(user) {
        UserService.getAll().onSnapshot(snapshot =>{
          snapshot.forEach(dbUserRef => {
            const dbUser = dbUserRef.data();
            if(dbUser && dbUser.email === user.email) 
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
