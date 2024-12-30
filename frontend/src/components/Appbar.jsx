import {useNavigate} from "react-router-dom";

export default function Appbar({firstName}) {
    const navigate = useNavigate();
    const initial = firstName ? firstName.toUpperCase()[0] : '';
    return (
        <div className="flex shadow justify-between h-14">
            <div className="flex flex-col justify-center ml-4 h-full font-bold text-2xl">QuickPay</div>
            <div className="flex">
            <div className="flex flex-col justify-center mr-4 h-full">
                    <button className="" onClick={() => {
                        navigate(`/history`);
                    }}>Transactions
                    </button>
                </div>
                <div className="flex flex-col justify-center mr-4 h-full">
                    <button className="" onClick={() => {
                        localStorage.setItem('token', null);
                        navigate(`/login`);
                    }}>Logout
                    </button>
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex flex-col justify-center mt-1 mr-1">
                    <div className="flex flex-row justify-center font-bold text-xl">
                        {initial}
                    </div>
                </div>
            </div>
        </div>
    )
}