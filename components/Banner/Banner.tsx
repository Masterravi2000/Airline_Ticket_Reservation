import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type BannerProps = {
    selectedFlight: any;
    adults: number;
    children: number;
    classType: string;
    userData: any;
    activeIndex: number;
    setActiveIndex: any;
};

const Banner = ({ activeIndex, setActiveIndex, userData, selectedFlight, adults, children, classType }: BannerProps) => {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // If nothing is selected → don't render anything
    if (!selectedFlight) return null;

    // Destructure flight details safely
    const {
        airline,
        flightNumber,
        from,
        to,
        departureTime,
        arrivalTime
    } = selectedFlight;


    // Map airlines to model images
    const airlineImages: Record<string, string> = {
        "IndiGo": "/models/indigo2.JPG",
        "Vistara": "/models/vistara.JPG",
        "Air India": "/models/airindia.JPG",
        "SpiceJet": "/models/spicejet.JPG",
        "Akasa": "/models/akasa.JPG",
        "Emirates": "/models/emirates.JPG",
        "Singapore Airlines": "/models/singapore.JPG"
    };

    const imageSrc = airlineImages[airline] || "/models/default.JPG";

    const handleSeatClick = (seatNumber: number) => {
        setSelectedSeats((prev) =>
            prev.includes(seatNumber)
                ? prev.filter((s) => s !== seatNumber) // unselect
                : [...prev, seatNumber]               // select
        );
    };


    // Price inputs
    const basePrice = selectedFlight.price || 0;
    const passengerCount = adults + children;
    const seatsReserved = selectedSeats.length;

    // Seat service fee (fixed per reserved seat)
    const seatServiceFee = 0; // change as needed

    // Class multiplier
    const classMultiplier =
        classType === "Business" ? 1.8 :
            classType === "First Class" ? 2.5 : 1;

    // Chargeable seats = ensure we charge at least for each passenger
    const chargeableSeats = Math.max(passengerCount, seatsReserved);

    // Fare (base fare * number of charged seats * class multiplier)
    const fare = basePrice * chargeableSeats * classMultiplier;

    // Extra seat service fees (optional)
    const seatFeesTotal = seatsReserved * seatServiceFee;

    // Final total
    const totalPrice = fare + seatFeesTotal;



    const handleBookFlight = async () => {
        const email = localStorage.getItem("userEmail");
        setLoading(true);
        if (!email) {
            alert("User not logged in");
            router.push("/auth");
            return;
        }

        const bookedFlightData = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: email,

            airline: selectedFlight.airline,
            flightNumber: selectedFlight.flightNumber,
            fromCity: selectedFlight.from,
            toCity: selectedFlight.to,
            departureTime: selectedFlight.departureTime,
            arrivalTime: selectedFlight.arrivalTime,
            totalPrice: totalPrice,

            seatNumbers: selectedSeats
        };

        try {
            const res = await fetch("http://localhost:8080/flight/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookedFlightData)
            });

            if (!res.ok) {
                alert("Booking failed");
                return;
            }

            setLoading(false);
            const message = await res.text();
            alert(message); // "Flight booked successfully"
            setActiveIndex(1);

        } catch (err) {
            alert("Network error. Try again.");
        }
    };



    return (
        <div className="relative w-full flex flex-row justify-between items-start px-30 py-10">

            {/* LEFT: Selected Flight Details */}
            <div className="flex flex-col gap-5 justify-between">
                <div className="bg-white rounded-xl p-6 border border-gray-300">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                        {airline} — {flightNumber}
                    </h2>

                    <p className="text-gray-700 text-md">
                        {from} ➝ {to}
                    </p>

                    <p className="text-gray-600 mt-2">
                        Departure: {departureTime}
                    </p>
                    <p className="text-gray-600">
                        Arrival: {arrivalTime}
                    </p>
                </div>

                {/* total calculated amount */}
                <div className="bg-white rounded-xl p-6 border flex justify-center gap-2 items-center flex-wrap border-gray-300">
                    <p className="text-gray-700 text-xl text-bold">Total Amount -</p>
                    <p className="text-xl text-purple-700 font-bold"> ₹ {totalPrice.toLocaleString()}</p>
                </div>

                <button onClick={handleBookFlight} className="bg-purple-600 rounded-xl p-2 border flex justify-center gap-2 items-center flex-wrap border-purple-300">
                    {loading ?
                        <div className="w-6 h-6 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
                        :
                        <h2 className="text-white text-xl text-bold">Book</h2>}
                </button>
            </div>

            {/* CENTER: Plane Model Banner */}
            <div className="relative">
                <Image
                    src={imageSrc}
                    alt="model-banner"
                    width={900}
                    height={300}
                    className="rounded-lg object-cover"
                />
            </div>

            {/* RIGHT: Seat Selection Area */}
            <div className="bg-white rounded-xl p-6 border border-gray-300">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Select Your Seat
                </h2>

                {/* 2D Seat Grid */}
                <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 28 }).map((_, index) => {
                        const seatNum = index + 1;
                        const isSelected = selectedSeats.includes(seatNum);

                        return (
                            <button
                                key={index}
                                onClick={() => handleSeatClick(seatNum)}
                                className={`w-8 h-8 flex items-center justify-center border rounded-md shadow-md 
                        ${isSelected ? "bg-purple-600 text-white" : "border-gray-400 hover:bg-purple-500"}`}
                            >
                                <span className="text-sm">{seatNum}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Banner;
