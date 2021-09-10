import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import TrainerService from "./TrainerService";
import RequestService from "./RequestService";
import Constants from "../Constants";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, type) {
    if(type === Constants.userTypes.trainer)
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
    
    const unsubscriber = auth.onAuthStateChanged(user => {
      if(user) {
        TrainerService.getAll().onSnapshot(dbTrainerList =>{

          dbTrainerList.forEach(dbTrainerRef => {
            const dbTrainer = dbTrainerRef.data();
            if(dbTrainer && dbTrainer.email === user.email) 
            {
              user.type = Constants.userTypes.trainer;
              user.trainerid = dbTrainerRef.id;
            }
          });

          if(user.type === Constants.userTypes.trainer && user.trainerid !== "") {
            TrainerService.update(user.trainerid, {available:true})
          }
          else {
            user.type = Constants.userTypes.seeker;
          }

          setCurrentUser(user);
          setLoading(false);
        });
      }
      else {
        setCurrentUser(user);
        setLoading(false);
      }
    });

    return unsubscriber;
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
