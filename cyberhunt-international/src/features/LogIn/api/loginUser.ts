import { auth} from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export interface LoginData {
    email: string;
    password: string;
}

export async function loginUser(data:LoginData) {

    const {email, password} = data;

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user.uid;
    
    
}