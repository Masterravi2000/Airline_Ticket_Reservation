import React, { useState } from "react";

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelectDate, onClose }) => {
  const [localDate, setLocalDate] = useState(selectedDate);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 py-8 rounded-xl shadow-lg w-[450px]">

        <h2 className="text-lg font-semibold mb-2 text-gray-800">Select Date</h2>

        <input
          type="date"
          value={localDate.toISOString().substring(0, 10)}
          onChange={(e) => setLocalDate(new Date(e.target.value))}
          className="border w-full p-2 rounded-lg"
        />

        <button
          onClick={() => onSelectDate(localDate)}
          className="mt-4 bg-purple-700 text-white w-full py-2 rounded-lg"
        >
          Confirm
        </button>

        <button
          onClick={onClose}
          className="mt-2 text-gray-600 underline w-full"
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default Calendar;
