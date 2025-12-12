"use client";

import Image from "next/image";
import { useState } from "react";

const LandingPage = () => {
    const [openRegister, setOpenRegister] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImage = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
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
                                    className="border border-gray-400 rounded-lg px-3 w-full h-10 py-2"
                                />
                            </div>

                            <div>
                                <p>Password</p>
                                <input
                                    className="border border-gray-400 rounded-lg px-3 w-full h-10 py-2"
                                    type="password"
                                />
                            </div>
                        </div>
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
                        <div className="flex justify-center mb-4">
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
                                <input type="file" className="hidden" onChange={handleImage} />
                            </label>
                        </div>

                        {/* Form Fields */}
                        <div className="flex flex-col gap-3">
                            <div>
                                <p>First Name</p>
                                <input className="border border-gray-400 rounded-lg px-3 w-full h-10" />
                            </div>
                            <div>
                                <p>Last Name</p>
                                <input className="border border-gray-400 rounded-lg px-3 w-full h-10" />
                            </div>
                            <div>
                                <p>Email</p>
                                <input className="border border-gray-400 rounded-lg px-3 w-full h-10" />
                            </div>
                            <div>
                                <p>Password</p>
                                <input
                                    type="password"
                                    className="border border-gray-400 rounded-lg px-3 w-full h-10"
                                />
                            </div>
                        </div>

                        {/* Next Button */}
                        <button className="bg-purple-700 text-white mt-5 w-full py-2 rounded-lg font-bold">
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
