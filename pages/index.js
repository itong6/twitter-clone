import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import { useState } from "react";

export default function Home() {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

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

  const GoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    const authorization = auth
    const result = await signInWithPopup(authorization, provider)

    console.log(result)
  }

  return (
    <div>
      <div>
        <form>
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
            <button onClick={() => GoogleSignIn()}>Log in with Google</button>
          </div>
        </form>
      </div>
    </div>
  )
}
