import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { fetchLogin } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
        const action = await dispatch(fetchLogin({ username, password }));

        if (fetchLogin.fulfilled.match(action)) {
            navigate("/map"); 
        } else {
            setError("Registration failed, please try again.");
        }
        } catch (err) {
        console.log((err as Error).message);
        setError("An error occurred. Please try again.");
        }
    };
    return (
        <div>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Login;