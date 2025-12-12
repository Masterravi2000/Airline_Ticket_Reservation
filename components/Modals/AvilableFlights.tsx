import React from "react";
import { domesticFlights } from "../Data/AvailableDomesticFlights";
import { internationalFlights } from "../Data/AvailableInternationalFlights";

interface Props {
    from: string;
    to: string;
    classType: string;
    onSelectFlight: (flight: any) => void;
}

const AvailableFlights: React.FC<Props> = ({ from, to, classType, onSelectFlight }) => {
    // Combine domestic + international flights
    const allFlights = [...domesticFlights, ...internationalFlights];

    // Filter logic
    const filtered = allFlights.filter((flight) => {
        const fromCode = flight.from.split("(")[1]?.replace(")", "");
        const toCode = flight.to.split("(")[1]?.replace(")", "");
        return fromCode === from && toCode === to && flight.classes.includes(classType);
    });


    return (
        <div className="mt-2 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold text-black mb-4">
                Available Flights ({filtered.length})
            </h2>

            {filtered.length === 0 && (
                <p className="text-gray-600">No flights available for the selected criteria.</p>
            )}

            <div className="flex flex-col gap-4">
                {filtered.map((flight) => (
                    <button
                        key={flight.id}
                        onClick={() => onSelectFlight(flight)} 
                        className="border border-gray-400 rounded-lg p-4 flex flex-row justify-between items-center hover:bg-purple-100 transition"
                    >
                        <div>
                            <p className="font-semibold text-lg text-black">
                                {flight.airline} — {flight.flightNumber}
                            </p>
                            <p className="text-sm text-gray-600">
                                {flight.from} → {flight.to}
                            </p>
                            <p className="text-sm text-gray-600">
                                {flight.departureTime} • {flight.arrivalTime} • {flight.duration}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-lg font-bold text-purple-600">₹{flight.price}</p>
                            <p className="text-sm text-gray-600">{classType}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AvailableFlights;
