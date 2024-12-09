import Heading from "../components/Heading.jsx";
import SubHeading from "../components/SubHeading.jsx";
import InputBox from "../components/InputBox.jsx";
import Button from "../components/Button.jsx";
import BottomWarning from "../components/BottomWarning.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center bg-slate-300 h-screen items-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label="Login"/>
                <SubHeading label="Enter your credentials to access your account"/>
                <InputBox label={"Email ID"} placeholder="sairaj@gmail.com" type={"email"} onChange={(e) => setEmail(e.target.value)} />
                <InputBox label={"Password"}  type={"password"} onChange={(e) => setPassword(e.target.value)} />
                <div className="pt-4">
                    <Button label={"Login"} onClick={async ()=>{
                        try{
                            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}api/v1/user/login`, {
                                userName: email,
                                password: password,
                            }, {
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            })
                            localStorage.setItem("token", response.data.token);
                            navigate("/");
                        }
                        catch(err){
                            console.error(err);
                        }
                    }}></Button>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={'/signup'}/>
            </div>
        </div>
    )
}

export default Login;