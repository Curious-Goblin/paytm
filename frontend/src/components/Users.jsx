import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_URL || "http://localhost:3000";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // axios.get("https://paytm-backend-ashy.vercel.app/api/v1/user/bulkDummy?filter=" + filter, {
    axios
      .get(`${URL}/api/v1/user/bulk?filter=` + filter, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        // keep the same field name you used originally
        setUsers(response.data.user ?? []);
        console.log(response.data.user);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setUsers([]);
      });
  }, [filter]);

  return (
    <div>
      <div className="ml-4 mr-4 p-2 font-medium text-xl">
        Users
      </div>
      <div className="ml-4 mr-4 p-2">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded border-2 w-full p-3"
          placeholder="Search users ..."
        />
      </div>
      <div>
        {users.map((user, idx) => (
          // prefer user._id or user.id but fall back to index so key is always present
          <User key={user._id ?? user.id ?? idx} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  // guard missing fields so we don't crash
  const firstName = user?.firstName ?? "";
  const lastName = user?.lastName ?? "";
  const displayInitial = firstName ? firstName[0].toUpperCase() : "?";

  return (
    <div className="flex justify-between m-4 p-2">
      <div className="flex justify-center items-center gap-2">
        <div className="bg-slate-300 rounded-full w-8 h-8 flex justify-center items-center">
          {displayInitial}
        </div>
        <div>
          {firstName} {lastName}
        </div>
      </div>

      <div className="hidden md:block">
        <Button onClick={() => {
          navigate("/send?id=" + (user.id ?? "") + "&name=" + firstName)
        }} label={"Send Money"} />
      </div>
      <div className="md:hidden">
        <Button onClick={() => {
          navigate("/send?id=" + (user.id ?? "") + "&name=" + firstName)
        }} label={"Send"} />
      </div>
    </div>
  );
}
 