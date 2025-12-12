import Image from "next/image";
import { useState, useEffect } from "react";

type BannerProps = {
    selectedFlight: any;
    adults: number;
    children: number;
    classType: string;
};

const Banner = ({ selectedFlight, adults, children, classType }: BannerProps) => {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

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



    return (
        <div className="relative w-full flex flex-row justify-between items-start px-30 py-10">

            {/* LEFT: Selected Flight Details */}
            <div className="flex flex-col gap-10 justify-between">
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
                        ${isSelected ? "bg-green-500 text-white" : "border-gray-400 hover:bg-green-400"}`}
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
