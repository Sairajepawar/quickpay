import {useEffect, useState} from "react";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom"
import axios from "axios";

export default function UserComponent() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(()=>{
        const getUsers = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}api/v1/user/bulk?filter=`+filter, {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            setUsers(response.data.users);
        }
        getUsers();
    },[filter])
    return (
        <div className="ml-4 mr-4">
            <div className="font-bold text-lg">Users</div>
            <div className="my-2">
                <input type={"text"} placeholder="Search Users .." className="w-full px-2 py-1 border border-slate-200" onChange={(e)=>{setFilter(e.target.value)}}/>
            </div>
            <div>
                {users.map((user, index) => (
                    <User user={user} key={index}></User>
                ))}
            </div>
        </div>
    )
}

function User({user}){
    const firstName = formatString(user.firstName);
    const lastName = formatString(user.lastName);
    const full_name = firstName+" "+lastName;
    const navigate = useNavigate();
    return (
        <div className="flex justify-between my-4">
            <div className="flex gap-2 font-bold">
                <div className="rounded-full h-12 w-12 bg-slate-200">
                    <div className="flex flex-row justify-center items-center h-full">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    {firstName+" "+lastName}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button label={"Send Money"} onClick={()=>{
                    navigate(`/send/${user._id}/${full_name}`);
                }}></Button>
            </div>
        </div>
    )
}

function formatString(a){
    var ans = a[0].toUpperCase();
    ans = ans+a.slice(1,a.length);
    return ans;
}