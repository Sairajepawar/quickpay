import Appbar from "../components/Appbar.jsx";
import BalanceBar from "../components/BalanceBar.jsx";
import UserComponent from "../components/UserComponent.jsx";
import axios from "axios";
import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
function Dashboard() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [balance, setBalance] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("token")=='' || localStorage.getItem("token")=='null'){
            navigate('/signup');
        }
        const getFirstName = async ()=> {
            try
            {
                const response = await axios.get('http://localhost:3000/api/v1/user/firstname', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                setFirstName(firstName => response.data.firstName)
            }
            catch (error) {
                console.error(error);
            }
        };
        const getBalance = async ()=> {
            try
            {
                const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                setBalance(balance => response.data.balance)
            }
            catch (error) {
                console.error(error);
            }
        };
        getFirstName();
        getBalance();
    },[])
    return (
        <>
            <Appbar firstName={firstName} />
            <BalanceBar balance={balance}/>
            <UserComponent/>
        </>
    )
}
export default Dashboard;