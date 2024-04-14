import { Button } from "./Button"
import {useNavigate} from "react-router-dom"

export const Balance = ({ value }) => {
    const navigate=useNavigate()
    return (
        <div className="flex justify-between pr-4">
            <div className="flex p-2 m-4">
                <div className="pr-2 font-medium text-xl">
                    Your Balance is
                </div>
                <div className="flex items-center font-medium text-xl">
                    Rs {value}
                </div>
            </div>
            <div>
                <Button onClick={()=>{
                    localStorage.removeItem("token")
                    navigate("/signin")
                }} label ={"Log Out"}/>
            </div>
        </div>
    )
}