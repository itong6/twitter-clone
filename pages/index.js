import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase/firebase.config';

export default function Home() {

  const GoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    const authorization = auth
    const result = await signInWithPopup(authorization, provider)

    console.log(result)
  }

  return (
    <div>
      <button onClick={() => GoogleSignIn()}>Log in with Google</button>
    </div>
  )
}
