import axios from "axios";
import { useEffect, useState } from "react";
export default function Transaction(){
    const [entries,setEntries] = useState([]);
    useEffect(()=>{
        async function initialFetch(){
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}api/v1/account/history`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            );
            console.log(response.data.transaction);
            setEntries(response.data.transaction);
        }
        initialFetch();
    },[])
    return (
        <div className="flex flex-col items-center">
            <h2 className="font-bold text-4xl mb-4">Transaction History</h2>
            <div className="overflow-auto w-full">
                <table className="table-auto border-collapse border w-full text-center">
                    <thead>
                        <tr className="bg-blue-100 text-blue-700">
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Sender</th>
                            <th className="border px-4 py-2">Receiver</th>
                            <th className="border px-4 py-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                <td className="border px-4 py-2">{entry.date}</td>
                                <td className="border px-4 py-2">{entry.sender}</td>
                                <td className="border px-4 py-2">{entry.reciever}</td>
                                <td className="border px-4 py-2 text-right">{entry.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}