import { Button } from "../components/Button"
import { ButtonWarning } from "../components/ButtonWarning"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [credentials, setCredentials] = useState(false)
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const clearInputs = () => {
        setFirstName("")
        setLastName("")
        setPassword("")
        setUsername("")
    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-200">
            <div className="w-7/10 bg-white rounded-lg p-4 m-4">
                <Heading label={"Sign Up"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox onChange={(e) => {
                    setFirstName(e.target.value)
                }} label={"First Name"} placeholder="Sourabh" value={firstName} />
                <InputBox onChange={(e) => {
                    setLastName(e.target.value)
                }} label={"Last Name"} placeholder="Poddar" value={lastName} />
                <InputBox onChange={(e) => {
                    setUsername(e.target.value)
                }} label={"Email"} placeholder="sourabh1234@gmail.com" value={username}/>
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }} label={"Password"} placeholder="12345678" value={password} />
                <div className={`${credentials ? 'rounded text-red-500 bg-red-200 p-3 m-3 pl-2' : 'hidden'}`}>
                    {message}
                </div>
                <Button onClick={async () => {
                    try {
                        const response = await axios.post("https://paytm-kohl.vercel.app/api/v1/user/signup",
                        // const response = await axios.post("http://localhost:3000/api/v1/user/signup",
                            {
                                username,
                                firstName,
                                lastName,
                                password
                            })
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }
                    catch (error) {
                        if (axios.isAxiosError(error) && error.response) {
                            const status = error.response.status
                            setCredentials(true)
                            if (status == 400) {
                                setMessage("incorrect format of inputs")
                            }
                            else if (status == 411) {
                                setMessage("This email is already registered")
                            }
                            else if (status == 412) {
                                setMessage("This First Name is not available")
                            }
                            clearInputs()
                        }
                    }
                }} label={"Sign Up"} />
                <ButtonWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"} />
            </div>

        </div>
    )
}