import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading.jsx";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning.jsx";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
function Signup(){
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center bg-slate-300 h-screen items-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label="Signup"/>
                <SubHeading label="Enter your information to create an account"/>
                <InputBox label={"First Name"} placeholder="John" type={"text"} onChange={(e) => setFirstName(e.target.value)} />
                <InputBox label={"Last Name"} placeholder="Doe" type={"text"} onChange={(e) => setLastName(e.target.value)}/>
                <InputBox label={"Email ID"} placeholder="sairaj@gmail.com" type={"email"} onChange={(e) => setEmail(e.target.value)}/>
                <InputBox label={"Password"} type={"password"} onChange={(e) => setPassword(e.target.value)}/>
                <div className="pt-4">
                    <Button label={"Sign Up"} onClick={async()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            firstName: firstName,
                            lastName: lastName,
                            userName: email,
                            password: password,
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard")
                    }}></Button>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Login"} to={'/login'}/>
            </div>
        </div>

    )
}

export default Signup;