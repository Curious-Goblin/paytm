import { Button } from "./Button"
import {useNavigate} from "react-router-dom"

export const Balance = ({ value }) => {
    const navigate=useNavigate()
    return (
        <div className="flex justify-between pr-4">
            <div className="flex p-2 ml-4">
                <div className="pr-2 md:font-medium text-lg md:text-xl">
                     Balance:
                </div>
                <div className="flex items-center md:font-medium text-lg md:text-xl">
                    Rs {value}
                </div>
            </div>
            <div className="pt-1">
                <Button onClick={()=>{
                    localStorage.removeItem("token")
                    navigate("/signin")
                }} label ={"Log Out"}/>
            </div>
        </div>
    )
}