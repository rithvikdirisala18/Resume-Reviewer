import { auth, provider, signInWithPopup } from "../firebase";
import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [user, setUser] = useState(null);

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();

            await axios.post("http://localhost:5001/api/auth/login", { idToken: token });

            setUser(result.user);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div>
            {user ? (
                <h2>Welcome, {user.displayName}</h2>
            ) : (
                <button onClick={handleLogin}>Login with Google</button>
            )}
        </div>
    );
}
