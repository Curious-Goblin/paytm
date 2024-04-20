import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { useSearchParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useState } from "react"

export default function SendMoney() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const name = searchParams.get("name")
    const [amount, setAmount] = useState("")
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-200">
            <div className="w-3/12 h-7/12 bg-white rounded-lg border border-2 pt-20 pb-20">
                <div className="mb-20">
                    <Heading label={"Send Money"} />
                </div>
                <div className="flex justify-center w-full">
                    <div className=" pl-4 pr-4 w-11/12 flex flex-col justify-start">
                        <div>
                            <div className="flex gap-2 justify-start pb-4">
                                <div className="text-white font-medium flex justify-center items-center rounded-full w-8 h-8 bg-green-500">
                                    {name[0]}
                                </div>
                                <div className="text-3xl font-medium">{name}</div>
                            </div>
                            <div className="font-medium text-xl text-left">
                                Amount (in Rs)
                            </div>
                        </div>
                        <div className="">
                            <InputBox onChange={(e) => {
                                setAmount(e.target.value)
                            }} placeholder="Enter Amount" />
                            <Button onClick={() => {
                                axios.post("https://paytm-server-wheat.vercel.app/api/v1/account/transfer", {
                                    to: id,
                                    amount: amount
                                }, {
                                    headers: {
                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                    }
                                })
                                navigate("/payementDone");
                                setTimeout(() => {
                                    navigate("/dashboard");
                                }, 1000);
                            }} label={"Initiate Transfer"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
