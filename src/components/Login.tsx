import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { fetchLogin } from "../store/slices/userSlice";

const Login = () => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <div>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={() => dispatch(fetchLogin({ username, password}))}>Login</button>
            </div>
        </div>
    )
}

export default Login