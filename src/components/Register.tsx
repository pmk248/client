import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { fetchRegister } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        try {
        const action = await dispatch(fetchRegister({ username, password, age }));

        if (fetchRegister.fulfilled.match(action)) {
            navigate("/login"); 
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
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <input type="number" placeholder="Age" onChange={(e) => setAge(Number(e.target.value))} value={age}/>
            <button onClick={handleRegister}>Register</button>
            {error && <p>{error}</p>} 
        </div>
    );
};

export default Register;
