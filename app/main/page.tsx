"use client";
import Front_Header from "@/components/Headers/Front_Header";
import Controll_Pannel from "@/components/Controlls/Controll_Pannel";
import Banner from "@/components/Banner/Banner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Flight {
    id: number;
    airline: string;
    flightNumber: string;
    fromCity: string;
    toCity: string;
    departureTime: string;
    arrivalTime: string;
    totalPrice: number;
    seatNumbers: string;
    firstName: string;
    lastName: string;
    email: string;
}

const FrontPage = () => {
    const [selectedFlight, setSelectedFlight] = useState<any>(null);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [classType, setClassType] = useState("Economy");
    const [userData, setUserData] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [bookedFlights, setBookedFlights] = useState<Flight[]>([]);
    const router = useRouter();

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/auth");
            return;
        }

        fetch(`http://localhost:8080/auth/me?email=${email}`)
            .then(res => res.json())
            .then(data => setUserData(data))
            .catch(() => router.push("/auth"));
    }, []);

    useEffect(() => {
        const fetchBookedFlights = async () => {
            const email = localStorage.getItem("userEmail");
            if (!email) return;

            try {
                const res = await fetch(`http://localhost:8080/flight/my-flights?email=${email}`);
                if (!res.ok) throw new Error("Failed to fetch booked flights");

                const data = await res.json();
                setBookedFlights(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBookedFlights();
    }, []);

    return (
        <div className="w-full bg-white">
            <Front_Header userData={userData} />
            {/* model banner */}
            <Banner activeIndex={activeIndex} setActiveIndex={setActiveIndex} userData={userData} selectedFlight={selectedFlight} adults={adults} children={children} classType={classType} />
            {/* reserve_system */}
            <Controll_Pannel onSelectFlight={(flight) => setSelectedFlight(flight)}
                adults={adults}
                children={children}
                classType={classType}
                setAdults={setAdults}
                setChildren={setChildren}
                setClassType={setClassType}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                bookedFlights={bookedFlights} />

            {/* About */}
            <div className="w-[100%] justify-center flex">
                <div className="w-[80%] flex-col gap-10 py-20 justify-center items-center flex">
                    <p className="text-2xl font-bold text-gray-900">About</p>
                    <div className="w-[100%] flex flex-wrap">
                        <p className="text-md text-center text-gray-700">Skyward’s Airline Ticket Reservation System makes booking flights fast, simple, and reliable.
                            Built for travellers and airlines alike, it offers intuitive search, real-time availability, and smart seat selection.
                            Secure payments and encrypted user accounts keep personal data and transactions safe.
                            Optimized performance and mobile-first design let you book on the go with minimal steps.
                            Integrated booking management and e-ticketing put control of your trips in one place.
                            Customer support and clear policies ensure smooth journeys from reservation to arrival.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontPage;