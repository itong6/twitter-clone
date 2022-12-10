import { useRouter } from 'next/router'
import { PostBody } from './tweets'
import { useState } from 'react';
import { collection, getDoc, updateDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase.config';

export default function EditTweet() {

    const router = useRouter()
    const { id } = router.query
    const [tweet, setTweet] = useState('')
    const [orginalTweet, setOrginalTweet] = useState([
        {
            text: '',
            user: '',
            userId: ''
        }
    ])

    const handleEdit = async () => {
        const docRef = doc(db, "tweets", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            await updateDoc(docRef, {
                text: tweet
            });
            router.back('./')
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    return (
        <PostBody>
            <h1>Edit Tweet</h1>
                <input type="text" placeholder='Set Tweet' onChange={(txt)=> setTweet(txt)}  />
                <button onClick={handleEdit}>Edit</button>
        </PostBody>
    )
}