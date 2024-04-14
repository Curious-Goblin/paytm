import { Link } from "react-router-dom"

export const ButtonWarning = ({ label, buttonText, to }) => {
    return (
        <div className="flex justify-center pt-5">
            <div>
                {label}
            </div>
            <Link className="cursor-pointer underline pl-2" to={to}>
                {buttonText}
            </Link>
        </div>
    )
}