import { createContext, useContext, useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../firebase/config'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function login(email, password) {
    return FIREBASE_AUTH.signInWithEmailAndPassword(email, password)
  }

  function signOut() {
    return FIREBASE_AUTH.signOut();
  }

  function signUp(email, password) {
    return FIREBASE_AUTH.createUserWithEmailAndPassword(email, password)
  }

  function getUser() {
    return FIREBASE_AUTH.currentUser
  }

  function isAdmin() {
    return FIREBASE_AUTH.currentUser.getIdTokenResult()
    .then((idTokenResult) => {
      if (!!idTokenResult.claims.admin) {
        return true
      } else {
        return false
      }
    })
  }

  function isEditor() {

  }

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    getUser,
    login,
    signOut,
    signUp
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  )

}