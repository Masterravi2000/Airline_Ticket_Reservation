interface ClassModalProps {
    onSelect: (value: string) => void;
    onClose: () => void;
}

const ClassModal: React.FC<ClassModalProps> = ({ onSelect, onClose }) => {
    const options = ["Economy", "Premium Economy", "Business Class", "First Class"];

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-[50%] rounded-xl p-4">
                <h2 className="font-bold text-black text-2xl px-4 py-3">Select Class</h2>

                <div className="p-4 w-full flex flex-col gap-5">
                    {options.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => onSelect(item)}
                            className="px-3 border-1 border-gray-300 rounded-lg py-2 hover:bg-purple-100"
                        >
                            <p className="text-gray-800 font-semibold text-lg">{item}</p>
                        </button>
                    ))}
                </div>

                <button 
                    onClick={onClose} 
                    className="w-full text-center text-gray-600 py-2 underline"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ClassModal;
