// Components/Modals/PassengerModal.tsx
import React from "react";

interface PassengerModalProps {
  isOpen: boolean;
  onClose: () => void;
  adults: number;
  children: number;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
}

const PassengerModal: React.FC<PassengerModalProps> = ({
  isOpen,
  onClose,
  adults,
  children,
  setAdults,
  setChildren,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-[90%] sm:w-[400px] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select Passengers</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Passenger Selection */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span>Adults</span>
            <div className="flex gap-4">
              <button
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="px-4 border rounded-full"
              >
                -
              </button>
              <span className="font-bold">{adults}</span>
              <button
                onClick={() => setAdults(adults + 1)}
                className="px-4 border rounded-full"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span>Children</span>
            <div className="flex gap-4">
              <button
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="px-4 border rounded-full"
              >
                -
              </button>
              <span className="font-bold">{children}</span>
              <button
                onClick={() => setChildren(children + 1)}
                className="px-4 border rounded-full"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerModal;
