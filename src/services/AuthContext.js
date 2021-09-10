import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import TrainerService from "./TrainerService";
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
    TrainerService.setAvailable(email);
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    TrainerService.setAvailable(currentUser.email,false);
    return auth.signOut()
  }

  useEffect(() => {
    
    return auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
      if(user) {
        TrainerService.getAll().onSnapshot(dbTrainerList => {

          dbTrainerList.forEach(dbTrainerRef => {
            const dbTrainer = dbTrainerRef.data();
            if(dbTrainer && dbTrainer.email === user.email) {
              user.type = Constants.userTypes.trainer;
              user.trainerid = dbTrainerRef.id;
            }
          });

          if(user.type !== Constants.userTypes.trainer) {
            user.type = Constants.userTypes.seeker;
          }

          setCurrentUser(user);
        });
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
