"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CgPassword } from "react-icons/cg";

const LandingPage = () => {
    const [openRegister, setOpenRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        // profilePic: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    // const handleImage = (e: any) => {
    //     const file = e.target.files?.[0];
    //     if (!file) return;
    //     if (file.size > 1_000_000) { // 1MB limit
    //         alert("Image too large");
    //         return;
    //     }
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         setPreview(reader.result as string);

    //         // store image data in formData
    //         // setFormData({ ...formData, profilePic: reader.result as string });
    //     };
    //     reader.readAsDataURL(file);
    // };

    const handleSignup = async () => {
        if (!formData.firstName) {
            alert("First Name is required");
            return;
        }
        if (!formData.lastName) {
            alert("Last Name is required");
            return;
        }
        if (!formData.email) {
            alert("email is required");
            return;
        }
        if (!formData.password) {
            alert("password is required");
            return;
        }

        setLoading(true);

        //if all sorted then do the baclend api call
        const res = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const message = await res.text();

        if (message !== "User registered successfully") {
            alert(message); // shows: Email already exists
            return;
        }

        setLoading(false);
        alert("Account Created Successfully now you can login");
        setOpenRegister(false);
    }


    const handleLogin = async () => {
        if (!loginData.email || !loginData.password) {
            alert("Email and password are required");
            return;
        }

        setLoading(true);
        localStorage.setItem("userEmail", loginData.email);
        
        const res = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
        });

        if (!res.ok) {
            alert("Server error. Try again.");
            setLoading(false);
            return;
        }

        const message = await res.text();
        setLoading(false);

        if (message !== "Login successful") {
            alert(message);
            return;
        }

        router.push("/main");
        alert("Login successful!");
    };


    return (
        <div className="bg-white">
            <div className="flex w-[100%] flex-row">
                <div className="w-1.5/2">
                    <Image
                        src="/Images/Landing.JPG"
                        alt=""
                        width={1500}
                        height={240}
                        className="object-cover h-240"
                    />
                </div>

                <div className="w-[40%] bg-white justify-center items-center flex flex-col">
                    <div className="rounded-lg border border-gray-200 shadow-lg flex flex-col p-6 flex justify-center items-center">
                        <p className="text-2xl text-gray-800 font-bold w-full pb-6">Login</p>

                        <div className="gap-3 flex flex-col">
                            <div>
                                <p>Email</p>
                                <input
                                value={loginData.email}
                                onChange={(e)=>{
                                    setLoginData({...loginData, email: e.target.value})
                                }}
                                    className="border border-gray-400 rounded-lg px-3 w-full h-10 py-2"
                                />
                            </div>

                            <div>
                                <p>Password</p>
                                <input
                                value={loginData.password}
                                onChange={(e)=>{
                                    setLoginData({...loginData, password: e.target.value})
                                }}
                                    className="border border-gray-400 rounded-lg px-3 w-full h-10 py-2"
                                    type="password"
                                />
                            </div>
                        </div>
                        {
                            loading ?
                                <div className="w-full flex justify-center items-center pt-5">
                                    <div className="w-6 h-6 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
                                </div>
                                :
                                <button
                                    onClick={handleLogin}
                                    className="w-full mt-5 py-2 bg-purple-600 rounded-full flex items-center justify-center">
                                    <a className="text-white font-semibold text-sm">Login</a>
                                </button>
                        }
                    </div>

                    <div className="p-8">
                        <p className="text-gray-800 text-md">
                            dont have an account ?{" "}
                            <button
                                className="font-bold text-md text-purple-700"
                                onClick={() => setOpenRegister(true)}
                            >
                                signup
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* SIGNUP MODAL */}
            {openRegister && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-[380px] p-6 rounded-lg shadow-lg relative">

                        {/* Close Button */}
                        <button
                            onClick={() => setOpenRegister(false)}
                            className="absolute right-3 top-2 text-gray-500 text-xl"
                        >
                            ×
                        </button>

                        <h2 className="text-2xl font-bold mb-4 text-gray-800">
                            Create Account
                        </h2>

                        {/* Profile Image Upload */}
                        {/* <div className="flex justify-center mb-4">
                            <label className="cursor-pointer">
                                {preview ? (
                                    <img
                                        src={preview}
                                        className="w-24 h-24 rounded-full object-cover border"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gray-200 border flex items-center justify-center text-gray-600">
                                        Profile
                                    </div>
                                )}
                                <input
                                    type="file" className="hidden" onChange={handleImage} />
                            </label>
                        </div> */}

                        {/* Form Fields */}
                        <div className="flex flex-col gap-3">
                            <div>
                                <p>First Name</p>
                                <input value={formData.firstName} onChange={(e) =>
                                    setFormData({ ...formData, firstName: e.target.value })
                                } className="border border-gray-400 rounded-lg px-3 w-full h-10" />
                            </div>
                            <div>
                                <p>Last Name</p>
                                <input value={formData.lastName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, lastName: e.target.value })
                                    }
                                    className="border border-gray-400 rounded-lg px-3 w-full h-10" />
                            </div>
                            <div>
                                <p>Email</p>
                                <input value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value })
                                    }}
                                    className="border border-gray-400 rounded-lg px-3 w-full h-10" />
                            </div>
                            <div>
                                <p>Password</p>
                                <input value={formData.password}
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value });
                                    }}
                                    type="password"
                                    className="border border-gray-400 rounded-lg px-3 w-full h-10"
                                />
                            </div>
                        </div>

                        {/* Next Button */}
                        {
                            loading ?
                                <div className="w-full flex justify-center items-center pt-5">
                                    <div className="w-6 h-6 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
                                </div>
                                :
                                <button onClick={handleSignup} className="bg-purple-700 text-white mt-5 w-full py-2 rounded-lg font-bold">
                                    Next
                                </button>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
