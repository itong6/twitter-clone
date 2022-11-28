import React from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import { useState } from "react";
import { useRouter }  from "next/router";

export default function Home() {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [user, setUser] = useState({})
  
  const router = useRouter();
  const handleClick = (e) => {
    router.push('./tweets')
  }

  const register = async () => {
    try {
      setRegisterEmail('')
      setRegisterPassword('')
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => { setUser(currentUser) })
  }, [])

  const GoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    const authorization = auth
    const result = await signInWithPopup(authorization, provider)

    console.log(result)
  }

  const handleSubmit = event => {
    event.preventDefault()
    event.target.reset()
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div>
            <div>
              <label>Email</label>
              <input
                placeholder='Email...'
                onChange={(event) => {
                  setRegisterEmail(event.target.value)
                }}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                placeholder='Password...'
                onChange={(event) => {
                  setRegisterPassword(event.target.value)
                }}
              />
            </div>
            <button onClick={register}>Register User</button>
            <button onClick={() => GoogleSignIn()}>Register with Google</button>
          </div>
        </form>

        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label>Email</label>
              <input
                placeholder='Email...'
                onChange={(event) => {
                  setLoginEmail(event.target.value)
                }}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                placeholder='Password...'
                onChange={(event) => {
                  setLoginPassword(event.target.value)
                }}
              />
            </div>
            <button onClick={login}>Login User</button>
          </div>
        </form>

        <div>
          <h2>User logged in: </h2>
          <div>
            {/* {user?.email} */}
            {user ? user.email : 'Not logged in'}
          </div>
          {user ? <button onClick={logout}>Sign out</button> : ""}

          <button onClick={()=>handleClick()}>explore tweets</button>
          
        </div>
      </div>
    </div>
  )
}
