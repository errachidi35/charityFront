import React, { useState } from "react";
import { Header } from "../components/Home/Header"
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";


export const Signup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    // signup hook
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async e => {
        e.preventDefault();

        await signup(firstName, lastName, email, password);
        console.log(email, password);

    }



    return (
        <>
            <Header />
            <div className="w-full flex flex-col items-center ">
                <div className="w-screen min-h-32 bg-gradient-to-r from-green-primary to-gray-700 text-center content-center text-gray-200 text-4xl font-bold">
                    Let's work together !
                </div>
                <Card className="w-1/3 bg-gray-50 mt-14">
                    <CardContent className=" w-full p-6 flex flex-col items-center text-center">
                        <h3 className="text-3xl my-5 font-semibold">Sign up</h3>
                        <form action="" className="w-full" onSubmit={handleSubmit}>
                            <div className="flex justify-between">

                                <div className=" w-1/2 text-left pr-1">
                                    <label htmlFor="firstName">First Name</label>
                                    <Input
                                        className="my-2"
                                        placeholder="Your first name"
                                        type="text"
                                        value={firstName}
                                        onChange={e => { setFirstName(e.target.value) }}
                                    />
                                </div>
                                <div className="w-1/2 text-left pl-1">
                                    <label htmlFor="lastName">Last Name</label>
                                    <Input
                                        className="my-2"
                                        placeholder="Your last name"
                                        type="text"
                                        value={lastName}
                                        onChange={e => { setLastName(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className=" text-left">
                                <label htmlFor="email">Email</label>
                                <Input
                                    className="my-2"
                                    placeholder="Your email address"
                                    type="email"
                                    value={email}
                                    onChange={e => { setEmail(e.target.value) }}
                                />
                            </div>
                            <div className=" text-left">
                                <label htmlFor="password">Password</label>
                                <Input
                                    className="my-2"
                                    placeholder="Your password"
                                    type="password"
                                    value={password}
                                    onChange={e => { setPassword(e.target.value) }}
                                />
                            </div>
                            <div className=" text-left">
                                <label htmlFor="password">Confirm Password</label>
                                <Input
                                    className="my-2"
                                    placeholder="Your password"
                                    type="password"
                                    value={passwordConfirmation}
                                    onChange={e => { setPasswordConfirmation(e.target.value) }}
                                />
                            </div>
                            <Button disabled={isLoading} className="bg-green-primary hover:bg-green-700 text-white w-full text-base my-2">
                                Signup
                            </Button>
                            <span className="text-gray-500">
                                Already have an account ?   <Link className="underline hover:text-green-700" to="/login"> Click here to login </Link>
                            </span>
                            {error && <div className=""> {error} </div>}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}