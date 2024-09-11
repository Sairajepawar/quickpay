import {Link} from "react-router-dom";

export default function BottomWarning({label,buttonText,to}) {
    return (
        <div className="py-2 text-sm flex justify-center">
            <div>
                {label}
            </div>
            <Link to={to} className="pointer pl-1 underline cursor-pointer">{buttonText}</Link>
        </div>
    )
}