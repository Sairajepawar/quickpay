export default function BalanceBar({balance}){
    return (
        <div className="flex m-5 text-lg">
            <div className="font-bold">Your balance</div>
            <div className="font-semibold ml-4">Rs {balance}</div>
        </div>
    )
}