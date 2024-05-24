import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"
export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("")

    useEffect(() => {
        // axios.get("https://paytm-kohl.vercel.app/api/v1/user/bulk?filter=" + filter, {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {

            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setUsers(response.data.user)
                console.log(response.data.user)
            })
    }, [filter])

    return (
        <div>
            <div className="ml-4 mr-4 p-2 font-medium text-xl">
                Users
            </div>
            <div className="ml-4 mr-4 p-2">
                <input onChange={(e) => {
                    setFilter(e.target.value)
                }} className="border rounded border-2 w-full p-3" placeholder="Search users ..." />
            </div>
            <div>
                {users.map((user,index) => <User key={user._id} user={user} index={index} />)}
            </div>
        </div>
    )
}

function User({ user,index }) {
    const navigate = useNavigate()
    const bgColors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];
    const bgColor = bgColors[Math.floor(Math.random() * 4)];
    return (
        <div className={`flex justify-between m-4 mb-2 p-2 ${bgColor} rounded`}>
            <div className="flex justify-center items-center gap-2">
                <div className="bg-slate-300 rounded-full w-8 h-8 flex justify-center items-center">
                    {user.firstName[0].toUpperCase()}
                </div>
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div className="hidden md:block">
                <Button onClick={() => {
                    navigate("/send?id=" + user.id + "&name=" + user.firstName)
                }} label={"Send Money"} />
            </div>
            <div className="md:hidden">
                <Button onClick={() => {
                    navigate("/send?id=" + user.id + "&name=" + user.firstName)
                }} label={"Send"} />
            </div>
        </div>
    )
}