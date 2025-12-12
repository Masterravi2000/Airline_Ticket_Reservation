"use client";
import Front_Header from "@/components/Headers/Front_Header";
import Controll_Pannel from "@/components/Controlls/Controll_Pannel";
import Banner from "@/components/Banner/Banner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const FrontPage = () => {
    const [selectedFlight, setSelectedFlight] = useState<any>(null);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [classType, setClassType] = useState("Economy");
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
            router.push("/auth");
        }
    }, []);

    return (
        <div className="w-full bg-white">
            <Front_Header />
            {/* model banner */}
            <Banner selectedFlight={selectedFlight} adults={adults} children={children} classType={classType} />
            {/* reserve_system */}
            <Controll_Pannel onSelectFlight={(flight) => setSelectedFlight(flight)}
                adults={adults}
                children={children}
                classType={classType}
                setAdults={setAdults}
                setChildren={setChildren}
                setClassType={setClassType} />

            {/* About */}
            <div className="w-[100%] justify-center flex">
                <div className="w-[80%] flex-col gap-10 py-20 justify-center items-center flex">
                    <text className="text-2xl font-bold text-gray-900">About</text>
                    <div className="w-[100%] flex flex-wrap">
                        <text className="text-md text-center text-gray-700">Skyward’s Airline Ticket Reservation System makes booking flights fast, simple, and reliable.
                            Built for travellers and airlines alike, it offers intuitive search, real-time availability, and smart seat selection.
                            Secure payments and encrypted user accounts keep personal data and transactions safe.
                            Optimized performance and mobile-first design let you book on the go with minimal steps.
                            Integrated booking management and e-ticketing put control of your trips in one place.
                            Customer support and clear policies ensure smooth journeys from reservation to arrival.</text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontPage;