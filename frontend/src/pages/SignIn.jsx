import { useState } from "react"
import { Button } from "../components/Button"
import { ButtonWarning } from "../components/ButtonWarning"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function SignIn() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [credentials, setCredentials] = useState(false)

    const clearInputs = () => {
        setPassword("")
        setUsername("")
    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-200">
            <div className="w-7/10 bg-white rounded-lg p-4 m-4">
                <Heading label={"Log In"} />
                <SubHeading label={"Enter your credentials to enter your account"} />
                <InputBox
                    onChange={(e) => setUsername(e.target.value)}
                    label={"Email"}
                    placeholder="jhonDoe@gmail.com"
                    value={username}
                />
                <InputBox
                    onChange={(e) => setPassword(e.target.value)}
                    label={"Password"}
                    placeholder="********"
                    value={password}
                />
                <div className={`${credentials ? 'rounded text-red-500 bg-red-200 p-3 m-3 pl-2' : 'hidden'}`}>
                    Username or password is wrong
                </div>
                <Button onClick={async () => {
                    try {
                        // const response = await axios.post("https://paytm-kohl.vercel.app/api/v1/user/signin", {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username,
                            password
                        })
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    } catch (error) {
                        setCredentials(true)
                        clearInputs()
                    }
                }} label={"Log in"} />
                <ButtonWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
            </div>
        </div>
    )
}
