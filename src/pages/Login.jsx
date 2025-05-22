import React, { useState } from "react";
import { Header } from "../components/Home/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { toast } from "sonner";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "ADMIN") navigate("/admin/dashboard");
    else if (user?.role === "BENEVOLE") navigate("/missions");
    else if (user?.role === "MEMBRE") navigate("/missions");
    else toast.error("Rôle non reconnu");
  };

  return (
    <>
      <Header />
      <div className="w-full flex flex-col items-center ">
        <div className="w-screen min-h-32 bg-gradient-to-r from-green-primary to-gray-700 text-center content-center text-gray-200 text-4xl font-bold">
          Welcome Back !
        </div>
        <Card className="w-1/3 bg-gray-50 mt-14">
          <CardContent className=" w-full p-6 flex flex-col items-center text-center">
            <h3 className="text-3xl my-5 font-semibold">Login</h3>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className=" text-left">
                <label htmlFor="email">Email</label>
                <Input
                  className="my-2"
                  placeholder="Your email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className=" text-left">
                <label htmlFor="password">Password</label>
                <Input
                  className="my-2"
                  placeholder="Your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button disabled={isLoading} className="bg-green-primary hover:bg-green-700 text-white w-full text-base my-2">
                {isLoading ? "Connexion..." : "Login"}
              </Button>
              <span className="text-gray-500">
                You don't have an account ? <Link className="underline hover:text-green-700" to="/signup">Click here to signup</Link>
              </span>
            </form>
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </CardContent>
        </Card>
      </div>
    </>
  );
};
