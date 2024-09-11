import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
function Send() {
    const friend = useParams();
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    // console.log(typeof (amount));
    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div
                    className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
                >
                    <div className="flex flex-col space-y-1.5 pt-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-3">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">A</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{friend.full_name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                    onChange={(e)=>setAmount(parseInt(e.target.value))}
                                />
                            </div>
                            <button
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                                onClick={()=> {
                                    transfer(friend.id, amount);
                                    navigate('/');
                                }}
                                >
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

async function transfer(to,amount){
    console.log(to);
    console.log(amount);
    try
    {
        const response = await axios.post("http://localhost:3000/api/v1/account/transfer",
            {
                "to": to,
                "amount": amount
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }
        );
        alert(`${response.data.message}`);
    }
    catch(err){
        console.log(err);
    }
}
export default Send;