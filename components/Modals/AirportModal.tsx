// components/AirportModal.tsx
"use client";

import React, { useState } from "react";
import { airportData } from "../Data/airportData";

interface AirportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (city: string, code: string, address: string) => void;
}

const AirportModal: React.FC<AirportModalProps> = ({ isOpen,  onClose, onSelect }) => {
    const [search, setSearch] = useState("");

    if (!isOpen) return null;

    const allCities = airportData.flatMap((c) => c.cities);

    const filteredCities = allCities.filter(item =>
        item.city.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase())
    );

    return (
 <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">       
            <div className="bg-white w-[50%] rounded-xl p-4">

                {/* Header with close button */}
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold">Select City</h2>
                    <button onClick={onClose} className="text-xl">✕</button>
                </div>

                <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="max-h-56 overflow-y-auto">
                    {filteredCities.map((item) => (
                        <button
                            key={item.code}
                            className="w-full text-left p-2 hover:bg-gray-100"
                            onClick={() => {
                                onSelect(item.city, item.code, item.airport);
                                onClose();
                            }}
                        >
                            {item.city} ({item.code}) — {item.airport}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AirportModal;
