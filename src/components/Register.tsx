import { useState } from "react"
import { fetchRegister } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/store";

const Register = () => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(0);
    return (
        <div>
            <div>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="number" placeholder="Age" onChange={(e) => setAge(+e.target.value)}/>
                <button onClick={() => dispatch(fetchRegister({username, password, age}))}>Register</button>
            </div>
        </div>
    )
}

export default Register