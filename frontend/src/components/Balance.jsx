import { Button } from "./Button"
import {useNavigate} from "react-router-dom"

export const Balance = ({ value }) => {
    const navigate=useNavigate()
    return (
        <div className="flex justify-between m-4 bg-gray-300 rounded">
            <div className="flex items-center gap-2 pl-2">
                <div className="md:font-medium text-lg md:text-xl">
                     Balance:
                </div>
                <div className="md:font-medium text-lg md:text-xl">
                    <div className="flex">
                    <div className="w-4 h-1">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Indian_Rupee_symbol.svg/407px-Indian_Rupee_symbol.svg.png">
                        </img>
                    </div>
                    <div>
                        {value}
                    </div>
                    </div>
                </div>
            </div>
            <div className="p-3">
                <Button onClick={()=>{
                    localStorage.removeItem("token")
                    navigate("/signin")
                }} label ={"Log Out"}/>
            </div>
        </div>
    )
}