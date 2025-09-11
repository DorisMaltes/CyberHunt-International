//this is the code for useRegister this contains the logic for that communicates to FirebaseAuth🧑‍🧒 and to creat a user and it also writes to a document in FireStore🗿

import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

export interface RegisterData {
  name: string;
  company: string;
  title: string;
  number: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const { email, password, name, company, title, number } = data;

  try{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    //creates the documents in FireStore :)
    await setDoc(doc(db, "users", uid), {
      name,
      company,
      email,
      title,
      number,
      score: 0,
      total_time: 0,
      visited_booths: [],
    });

  return uid;
  } 
  catch (err: any) 
  {
    console.error("registerUser failed:", err?.code, err?.message);
    throw err; // for React Query to show in UI 🚩🚩!!
  }

  
  
}

