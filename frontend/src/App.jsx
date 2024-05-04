import React, { Suspense, useState, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import axios from "axios"
import { RecoilRoot } from "recoil"

const SignUp = React.lazy(() => import("./pages/SignUp"))
const SignIn = React.lazy(() => import("./pages/SignIn"))
const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const SendMoney = React.lazy(() => import("./pages/SendMoney"))
const PayementDone = React.lazy(() => import("./pages/PaymentDone"))
const PayementFailed = React.lazy(() => import("./pages/PaymentFailed"))



function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Suspense fallback={"loading..."}><SignUp /></Suspense>} />
          <Route path="/signin" element={<Suspense fallback={"loading..."}><SignIn /></Suspense>} />
          <Route path="/" element={<Suspense fallback={"loading..."}><DashboardOrSignUp /></Suspense>} />
          <Route path="/dashboard" element={<Suspense fallback={"loading..."}><Dashboard /></Suspense>} />
          <Route path="/send" element={<Suspense fallback={"loading..."}><SendMoney /></Suspense>} />
          <Route path="/payementDone" element={<Suspense fallback={"loading..."}><PayementDone /></Suspense>} />
          <Route path="/payementFailed" element={<Suspense fallback={"loading..."}><PayementFailed /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

function DashboardOrSignUp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const response = await axios.get("https://paytm-kohl.vercel.app/api/v1/user/me", {
        const response = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const signal = response.data.signal;
        setIsAuthenticated(signal);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Dashboard /> : <SignUp />;
}

export default App;
