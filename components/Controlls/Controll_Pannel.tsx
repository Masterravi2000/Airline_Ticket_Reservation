import { useState } from "react";
import Image from "next/image";
import { Plane, Ticket, Clock, ListChecksIcon, ArrowLeftRight, MoveDownIcon } from "lucide-react";
import AirportModal from "../Modals/AirportModal";
import Calendar from "../Calendar/Calender";
import PassengerModal from "../Modals/PessengerModal";
import ClassModal from "../Modals/ClassModal";
import AvailableFlights from "../Modals/AvilableFlights";

interface ControlPanelProps {
    onSelectFlight: (flight: any) => void;

    adults: number;
    children: number;
    classType: string;
    activeIndex: number;

    setAdults: (value: number) => void;
    setChildren: (value: number) => void;
    setClassType: (value: string) => void;
    setActiveIndex: (value: number) => void;
}

const Controll_Pannel: React.FC<ControlPanelProps> = ({
    onSelectFlight,
    adults,
    children,
    classType,
    setAdults,
    setChildren,
    setClassType,
    activeIndex,
    setActiveIndex,
}) => {
    const [open, setOpen] = useState(false);
    const [openDate, setOpenDate] = useState(false);
    const [openClass, setOpenClass] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const [activeField, setActiveField] = useState<"from" | "to" | null>(null);
    const [activeField2, setActiveField2] = useState<"departing" | "returning" | null>(null);
    const [departingDate, setDepartingDate] = useState<Date | null>(null);
    const [returningDate, setReturningDate] = useState<Date | null>(null);

    const [selectClass, setSelectClass] = useState("Economy")

    const [selectedCity, setSelectedCity] = useState("City"); // default
    const [selectedCode, setSelectedCode] = useState("Citc");   // default
    const [selectedAddress, setSelectedAddress] = useState("Location/Adress");

    const [selectedCity2, setSelectedCity2] = useState("City"); // default
    const [selectedCode2, setSelectedCode2] = useState("Citc");   // default
    const [selectedAddress2, setSelectedAddress2] = useState("Location/Adress");

    const [passengerModalOpen, setPassengerModalOpen] = useState(false);

    const formatDate = (date: Date | null) => {
        if (!date) {
            return {
                day: "--",
                month: "Month",
                weekday: "Day",
                year: "Year"
            };
        }
        return {
            day: date.getDate(),
            month: date.toLocaleString("default", { month: "long" }),
            weekday: date.toLocaleString("default", { weekday: "long" }),
            year: date.getFullYear()
        };
    };

    const dep = formatDate(departingDate);
    const ret = formatDate(returningDate);

    const handleSelectDate = (date: Date) => {
        if (activeField2 === "departing") {
            setDepartingDate(date);
        } else if (activeField2 === "returning") {
            setReturningDate(date);
        }
        setOpenDate(false);
        setActiveField2(null);
    };

    const services = [
        {
            name: 'Search Flights',
            icon: <Plane className="w-5.5 h-5.5 text-black-500" />
        },
        {
            name: 'Manage Booking/Check in',
            icon: <Ticket className="w-6 h-6 text-black-500" />
        },
        {
            name: 'Whats on your flight',
            icon: <ListChecksIcon className="w-6 h-6 text-black-500" />
        },
        {
            name: 'Flight Status',
            icon: <Clock className="w-6 h-6 text-black-500" />
        }
    ]
    const allServices = services.map((element, index) => {
        return (
            <button onClick={() => setActiveIndex(index)} key={index} className={`w-70 gap-2 flex flex-row border-b-[3px] flex justify-center items-center py-10 ${activeIndex === index ? "border-purple-700" : "border-transparent"}`}>
                {element.icon}
                <p className="text-black font-semibold text-sm">{element.name}</p>
            </button>
        )
    })


    const bookedFlights = [
        {
            flightName: "IndiGo",
            flightCode: "6E-203",
            from: "Delhi",
            to: "Mumbai",
            seats: 3,
            amount: 18500
        },
        {
            flightName: "Air India",
            flightCode: "AI-101",
            from: "Bangalore",
            to: "Chennai",
            seats: 2,
            amount: 9200
        }
    ];


    return (
        <div className="sm:px-30 px-5 pb-10">
            <div className="border-1 border-gray-300 p-3 gap-5 flex flex-col rounded-2xl px-7 pb-7">
                <div className="flex justify-between flex-row">
                    {allServices}
                </div>
                {/* from to section */}
                {activeIndex === 0 ?
                    <div className="flex flex-row gap-10 items-center">
                        <div className="w-[50%] gap-5 flex flex-col">
                            <div className="flex flex-row w-[100%] gap-2 items-center">
                                <button onClick={() => { setActiveField("from"); setOpen(true); }} className="border shadow-lg sm:h-20 w-[47%] h-8 py-2 border-gray-200 rounded-lg flex flex-row">
                                    <div className="border-r-[1px] flex-col w-[30%] items-start pl-4 border-gray-300 justify-center flex">
                                        <a className="text-xs text-gray-700">From</a>
                                        <text className="font-bold sm:text-lg text-xs text-gray-800">{selectedCode}</text>
                                    </div>
                                    <div className="px-4 justify-center items-start flex flex-col w-[70%]">
                                        <p className="font-semibold sm:text-lg text-xs text-gray-800">{selectedCity}</p>
                                        <p className="text-xs w-[90%] truncate text-gray-700">{selectedAddress}</p>
                                    </div>
                                </button>
                                <div className="rounded-full shadow-lg flex justify-center h-10 w-10 items-center border-1 border-gray-300">
                                    <ArrowLeftRight className="w-4 h-4 text-black" />
                                </div>
                                <button onClick={() => { setActiveField("to"); setOpen(true); }} className="border shadow-lg w-[47%] sm:h-20 h-8 py-2 border-gray-200 rounded-lg flex flex-row">
                                    <div className="border-r-[1px] flex-col w-[30%] items-start pl-4 border-gray-300 justify-center flex">
                                        <text className="text-xs text-gray-700">To</text>
                                        <text className="font-bold sm:text-lg text-xs text-gray-800">{selectedCode2}</text>
                                    </div>
                                    <div className="px-4 justify-center items-start flex flex-col w-[70%]">
                                        <p className="font-semibold sm:text-lg text-xs text-gray-800">{selectedCity2}</p>
                                        <p className="text-xs w-[90%] truncate text-gray-700">{selectedAddress2}</p>
                                    </div>
                                </button>
                            </div>
                            <button className="rounded-lg w-[100%] shadow-lg border border-gray-200 py-3 items-center items-center justify-between px-5 flex flex-row">
                                <div className="flex flex-col items-start gap-0.5">
                                    <text className="text-gray-700 text-xs">Flight Options</text>
                                    <p className="font-semibold text-black text-lg">Return</p>
                                </div>
                                <MoveDownIcon className="w-5 h-5 text-black" />
                            </button>
                        </div>

                        <div className="w-[50%] flex flex-col gap-5">
                            <div className="w-[100%] justify-between flex flex-row">

                                {/* Departing Button */}
                                <button
                                    onClick={() => {
                                        setActiveField2("departing");
                                        setOpenDate(true);
                                    }}
                                    className="border w-[47.5%] shadow-lg sm:h-20 h-12 py-2 border-gray-200 rounded-lg flex flex-row"
                                >
                                    <div className="border-r-[1px] p-4 flex-col w-[30%] border-gray-300 justify-center flex items-center">
                                        <span className="text-xs text-gray-700">Departing</span>
                                        <span className="font-bold sm:text-2xl text-xs text-gray-800">
                                            {departingDate ? departingDate.getDate() : "--"}
                                        </span>
                                    </div>

                                    <div className="px-4 justify-center items-start flex flex-col w-[70%]">
                                        <p className="font-semibold sm:text-lg text-xs text-gray-800">
                                            {departingDate ? departingDate.toLocaleString("default", { month: "long" }) : "Month"}
                                        </p>
                                        <p className="text-xs text-gray-700">
                                            {departingDate
                                                ? departingDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric" })
                                                : "Day, Year"}
                                        </p>
                                    </div>
                                </button>

                                {/* Returning Button */}
                                <button
                                    onClick={() => {
                                        setActiveField2("returning");
                                        setOpenDate(true);
                                    }}
                                    className="border w-[47.5%] shadow-lg sm:h-20 h-12 py-2 border-gray-200 rounded-lg flex flex-row"
                                >
                                    <div className="border-r-[1px] p-4 flex-col w-[30%] border-gray-300 justify-center flex items-center">
                                        <span className="text-xs text-gray-700">Returning</span>
                                        <span className="font-bold sm:text-2xl text-xs text-gray-800">
                                            {returningDate ? returningDate.getDate() : "--"}
                                        </span>
                                    </div>

                                    <div className="px-4 justify-center items-start flex flex-col w-[70%]">
                                        <p className="font-semibold sm:text-lg text-xs text-gray-800">
                                            {returningDate ? returningDate.toLocaleString("default", { month: "long" }) : "Month"}
                                        </p>
                                        <p className="text-xs text-gray-700">
                                            {returningDate
                                                ? returningDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric" })
                                                : "Day, Year"}
                                        </p>
                                    </div>
                                </button>

                            </div>

                            <div className="flex flex-row justify-between">
                                <button onClick={() => setPassengerModalOpen(true)} className="border w-[47.5%] shadow-lg sm:h-20 h-8 py-2 border-gray-200 rounded-lg flex flex-row">
                                    <div className="border-r-[1px] p-4 flex-col w-[30%] border-gray-300 justify-center flex">
                                        <text className="font-bold sm:text-2xl text-xs text-gray-800">{adults + children}</text>
                                    </div>
                                    <div className="px-4 justify-center items-start flex flex-col w-[70%]">
                                        <p className="font-semibold sm:text-lg text-xs text-gray-800">Passenger</p>
                                        <p className="text-xs text-gray-700">{adults} Adults, {children} Children</p>
                                    </div>
                                </button>

                                <button onClick={() => setOpenClass(true)} className="border shadow-lg w-[47.5%] sm:h-20 h-8 px-4 py-2 border-gray-200 rounded-lg flex flex-row">
                                    <div className="flex-col items-start w-[30%] w-full border-gray-300 justify-center flex">
                                        <text className="text-xs text-gray-700">Class</text>
                                        <text className="font-bold sm:text-xl text-xs text-gray-800">{selectClass}</text>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div> : null}

                {/* Booked flight section  */}
                {activeIndex === 1 && (
                    <div className="w-full px-6 md:px-20 py-6">
                        <div className="flex flex-col gap-5">

                            {/* Section Title */}
                            <h2 className="text-xl font-semibold text-gray-800">
                                Your Booked Flights
                            </h2>

                            {/* Records */}
                            {bookedFlights.map((flight, index) => (
                                <div
                                    key={index}
                                    className="w-full border-gray-300 border-1 rounded-xl shadow-lg p-5 px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition"
                                >
                                    {/* Left: Flight Info */}
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-gray-500">
                                            {flight.flightName}
                                        </p>
                                        <p className="text-lg font-semibold text-gray-800">
                                            {flight.flightCode}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {flight.from} → {flight.to}
                                        </p>
                                    </div>

                                    {/* Middle: Seats */}
                                    <div className="text-sm flex border-1 border-gray-400 px-4 rounded-lg p-2 flex-row gap-2 text-gray-700">
                                        <p className="font-bold">Seats</p>
                                        <p className="font-bold">{flight.seats}</p>
                                    </div>

                                    {/* Right: Amount */}
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">
                                            Amount Payed
                                        </p>
                                        <p className="text-lg font-bold text-purple-700">
                                            ₹ {flight.amount}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {activeIndex === 0 && showResults && (
                    <AvailableFlights
                        from={selectedCode}
                        to={selectedCode2}
                        classType={selectClass}
                        onSelectFlight={onSelectFlight}
                    />
                )}

                {/* button */}
                {activeIndex === 0 ?
                    <button
                        onClick={() => {
                            if (selectedCode && selectedCode2 && departingDate && adults >= 1 && selectClass) {
                                setShowResults(true); // show the flights section
                            } else {
                                alert("Please fill all required fields");
                            }
                        }}
                        className="w-[100%] rounded-lg justify-center items-center flex bg-purple-600 py-4">
                        <p className="text-white font-semibold text-xl">Continue</p>
                    </button> : null}

                {/* Modal */}
                <AirportModal isOpen={open} onClose={() => setOpen(false)}
                    onSelect={(city, code, address) => {
                        if (activeField === "from") {
                            setSelectedCity(city);
                            setSelectedCode(code);
                            setSelectedAddress(address);
                        } else if (activeField === "to") {
                            setSelectedCity2(city);
                            setSelectedCode2(code);
                            setSelectedAddress2(address);
                        }
                        setOpen(false);
                    }} />

                {openDate && (
                    <Calendar
                        selectedDate={
                            activeField2 === "departing"
                                ? departingDate || new Date()
                                : returningDate || new Date()
                        }
                        onSelectDate={(date) => {
                            if (activeField2 === "departing") {
                                setDepartingDate(date);
                            } else {
                                setReturningDate(date);
                            }
                            setOpenDate(false); // close modal
                            setActiveField2(null);
                        }}
                        onClose={() => {
                            setOpenDate(false);
                            setActiveField2(null);
                        }}
                    />
                )}

                {/* Passenger Modal */}
                <PassengerModal
                    isOpen={passengerModalOpen}
                    onClose={() => setPassengerModalOpen(false)}
                    adults={adults}
                    children={children}
                    setAdults={setAdults}
                    setChildren={setChildren}
                />

                {openClass && (
                    <ClassModal
                        onSelect={(selectedValue) => {
                            setSelectClass(selectedValue);
                            setOpenClass(false); // close modal
                        }}
                        onClose={() => setOpenClass(false)}
                    />
                )}

            </div>
        </div>
    )
}

export default Controll_Pannel;