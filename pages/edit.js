import React from "react";
import { useState } from "react";
import { auth, db } from '../firebase/firebase.config';
import { Firestore, getDocs } from "firebase/firestore";
import { collection, doc, addDoc, postDoc, getDoc} from "firebase/firestore";
import { useRouter } from "next/router";

export default function Edit() {

    const router = useRouter();
    const [tweet, setTweet] = useState('')
    const [viewTweet, showNewTweet] = useState([])

    const showTweet = async()=>{
        const getDoc = await getDocs(collection(db, "posts"));
        var newTweets = [];
        getDoc.forEach((doc)=>{
            console.log(doc.id, "=>", doc.data());
            newTweets.push({...doc.data(),id:doc.id})
        });
        showNewTweet([...newTweets]);
        console.log(viewTweet);
    }

    const handleSubmit = event =>{
        event.preventDefault()
        event.target.reset()
        router.push('/tweets')
    }

    const editTweet = async()=>{
        const postDoc = await addDoc(collection(db, "posts"),{
            text: tweet,
            user: auth.currentUser.email,
            userId: auth.currentUser.uid
        });
        showTweet();
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>{tweet.user}</div>
        <input
          placeholder="edit tweet"
          type="text"
          onChange={(event) => {
            setTweet(event.target.value);
          }}
        />
        <button onClick={editTweet}>Edit</button>
      </form>
    </div>
  );
}
