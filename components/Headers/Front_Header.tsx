import Image from "next/image";

const Front_Header = ({ userData }) => {
    const options = ["Home", "Book", "Manage", "Help"]
    const allOptions = options.map((element, index) => {
        return (
            <a key={index} className="text-lg text-black font-400">{element}</a>
        )
    });


    return (
        <div className="w-full px-10 py-5 flex flex-row justify-between">
            {/* logo */}
            <div className="flex flex-row justify-center items-center gap-2">
                <Image
                    src="/logo/Skyward2.JPG"
                    alt="Logo"
                    width={70}
                    height={10}
                    className=" rounded-full" />
                <p className="text-2xl font-semibold text-purple-700">Skyward</p>
            </div>
            {/* Option */}
            <div className="flex px-10 flex-row gap-10 items-center">
                {allOptions}
            </div>
            {/* Login/Signup Button */}
            <button className="px-2 flex justify-center items-center rounded-full">
                <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                <p className="text-lg text-black px-3 ">{userData?.firstName} {userData?.lastName}</p>
            </button>
        </div>
    );
};

export default Front_Header;