// AvailableInternationalFlights.tsx

export const internationalFlights = [
  // ─────────── DELHI → NEW YORK ───────────
  {
    id: 101,
    from: "Delhi (DEL)",
    to: "New York (JFK)",
    airline: "Air India",
    flightNumber: "AI-101",
    departureTime: "02:15 AM",
    arrivalTime: "08:30 AM",
    duration: "15h 45m",
    price: 76000,
    classes: ["Economy", "Premium Economy", "Business Class", "First Class"]
  },
  {
    id: 102,
    from: "Delhi (DEL)",
    to: "New York (JFK)",
    airline: "United Airlines",
    flightNumber: "UA-83",
    departureTime: "11:00 PM",
    arrivalTime: "05:25 AM",
    duration: "15h 55m",
    price: 82000,
    classes: ["Economy", "Premium Economy", "Business Class"]
  },
  {
    id: 103,
    from: "Delhi (DEL)",
    to: "New York (JFK)",
    airline: "Emirates",
    flightNumber: "EK-515",
    departureTime: "09:45 AM",
    arrivalTime: "07:15 PM",
    duration: "22h 00m (1 stop)",
    price: 68000,
    classes: ["Economy", "Business Class", "First Class"]
  },

  // ─────────── MUMBAI → LONDON ───────────
  {
    id: 104,
    from: "Mumbai (BOM)",
    to: "London (LHR)",
    airline: "British Airways",
    flightNumber: "BA-138",
    departureTime: "02:00 AM",
    arrivalTime: "06:30 AM",
    duration: "9h 00m",
    price: 55000,
    classes: ["Economy", "Premium Economy", "Business Class", "First Class"]
  },
  {
    id: 105,
    from: "Mumbai (BOM)",
    to: "London (LHR)",
    airline: "Virgin Atlantic",
    flightNumber: "VS-355",
    departureTime: "11:45 PM",
    arrivalTime: "04:55 AM",
    duration: "9h 10m",
    price: 59000,
    classes: ["Economy", "Premium Economy", "Business Class"]
  },
  {
    id: 106,
    from: "Mumbai (BOM)",
    to: "London (LHR)",
    airline: "Air India",
    flightNumber: "AI-131",
    departureTime: "01:30 PM",
    arrivalTime: "05:40 PM",
    duration: "9h 40m",
    price: 52000,
    classes: ["Economy", "Business Class"]
  },

  // ─────────── BANGALORE → TOKYO ───────────
  {
    id: 107,
    from: "Bangalore (BLR)",
    to: "Tokyo (HND)",
    airline: "Japan Airlines",
    flightNumber: "JL-740",
    departureTime: "05:00 PM",
    arrivalTime: "07:30 AM",
    duration: "10h 00m",
    price: 61000,
    classes: ["Economy", "Premium Economy", "Business Class"]
  },
  {
    id: 108,
    from: "Bangalore (BLR)",
    to: "Tokyo (HND)",
    airline: "ANA",
    flightNumber: "NH-840",
    departureTime: "11:10 PM",
    arrivalTime: "01:55 PM",
    duration: "10h 15m",
    price: 64000,
    classes: ["Economy", "Business Class"]
  },
  {
    id: 109,
    from: "Bangalore (BLR)",
    to: "Tokyo (HND)",
    airline: "Singapore Airlines",
    flightNumber: "SQ-509",
    departureTime: "09:30 AM",
    arrivalTime: "08:00 PM",
    duration: "12h 30m (1 stop)",
    price: 55000,
    classes: ["Economy", "Business Class"]
  },

  // ─────────── DELHI → DUBAI ───────────
  {
    id: 110,
    from: "Delhi (DEL)",
    to: "Dubai (DXB)",
    airline: "Emirates",
    flightNumber: "EK-511",
    departureTime: "04:15 AM",
    arrivalTime: "06:35 AM",
    duration: "3h 20m",
    price: 18000,
    classes: ["Economy", "Business Class", "First Class"]
  },
  {
    id: 111,
    from: "Delhi (DEL)",
    to: "Dubai (DXB)",
    airline: "Air India",
    flightNumber: "AI-995",
    departureTime: "08:10 PM",
    arrivalTime: "10:30 PM",
    duration: "3h 20m",
    price: 16000,
    classes: ["Economy"]
  },
  {
    id: 112,
    from: "Delhi (DEL)",
    to: "Dubai (DXB)",
    airline: "IndiGo",
    flightNumber: "6E-23",
    departureTime: "02:30 PM",
    arrivalTime: "04:50 PM",
    duration: "3h 20m",
    price: 15000,
    classes: ["Economy"]
  },

  // ─────────── CHENNAI → SINGAPORE ───────────
  {
    id: 113,
    from: "Chennai (MAA)",
    to: "Singapore (SIN)",
    airline: "Singapore Airlines",
    flightNumber: "SQ-529",
    departureTime: "10:55 PM",
    arrivalTime: "05:30 AM",
    duration: "4h 05m",
    price: 21000,
    classes: ["Economy", "Business Class"]
  },
  {
    id: 114,
    from: "Chennai (MAA)",
    to: "Singapore (SIN)",
    airline: "IndiGo",
    flightNumber: "6E-51",
    departureTime: "06:45 AM",
    arrivalTime: "12:10 PM",
    duration: "4h 25m",
    price: 16500,
    classes: ["Economy"]
  },
  {
    id: 115,
    from: "Chennai (MAA)",
    to: "Singapore (SIN)",
    airline: "Air India",
    flightNumber: "AI-346",
    departureTime: "02:10 PM",
    arrivalTime: "07:30 PM",
    duration: "4h 20m",
    price: 19000,
    classes: ["Economy", "Business Class"]
  },
  // ─────────── KOLKATA → SINGAPORE ───────────
  {
    id: 116,
    from: "Kolkata (CCU)",
    to: "Singapore (SIN)",
    airline: "Singapore Airlines",
    flightNumber: "SQ-527",
    departureTime: "09:50 PM",
    arrivalTime: "05:40 AM",
    duration: "4h 50m",
    price: 22000,
    classes: ["Economy", "Business Class"]
  },
  {
    id: 117,
    from: "Kolkata (CCU)",
    to: "Singapore (SIN)",
    airline: "IndiGo",
    flightNumber: "6E-52",
    departureTime: "03:15 PM",
    arrivalTime: "11:20 PM",
    duration: "4h 05m",
    price: 18500,
    classes: ["Economy"]
  },

  // ─────────── KOLKATA → DUBAI ───────────
  {
    id: 118,
    from: "Kolkata (CCU)",
    to: "Dubai (DXB)",
    airline: "Emirates",
    flightNumber: "EK-509",
    departureTime: "06:30 AM",
    arrivalTime: "08:50 AM",
    duration: "3h 20m",
    price: 27000,
    classes: ["Economy", "Business Class", "First Class"]
  },
  {
    id: 119,
    from: "Kolkata (CCU)",
    to: "Dubai (DXB)",
    airline: "Air India",
    flightNumber: "AI-921",
    departureTime: "10:20 AM",
    arrivalTime: "12:40 PM",
    duration: "3h 20m",
    price: 25000,
    classes: ["Economy", "Business Class"]
  }

];