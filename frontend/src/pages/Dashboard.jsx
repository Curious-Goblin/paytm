import { useState, useEffect } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { useRecoilState } from "recoil"
import { BalanceAtom } from "../atoms/BalanceAtom"

export default function Dashboard() {
    return (
        <div>
            <AppbarComponent />
            <BalanceComponent />
            <Users />
        </div>
    )
}

function AppbarComponent(){
    const [firstName,setFirstName]=useState("")
    useEffect(()=>{
        axios.get("https://paytm-kohl.vercel.app/api/v1/user/me",{
        // axios.get("http://localhost:3000/api/v1/user/me",{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }).then(response=>{
            setFirstName(response.data.user.firstName)
        }).catch(error=>{
            console.log("erron fetching the username:",error)
        })
    },[])

    return <Appbar label={firstName}/>
}

function BalanceComponent() {
    const [balance, setBalance] = useRecoilState(BalanceAtom)

    useEffect(() => {
        axios.get("https://paytm-kohl.vercel.app/api/v1/account/balance", {
        // axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            setBalance(response.data.balance)
        }).catch(error => {
            console.error('Error fetching balance:', error);
        });
    }, []) 

    return <Balance value={balance} />
}
