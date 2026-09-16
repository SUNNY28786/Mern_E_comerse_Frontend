import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";



const Address = () => {

    const { shippingAddress, useraddress } = useContext(AppContext)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        phonenumber: "",
        address: ""
    });


    const onChangeHnadler = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const {
        fullName,
        country,
        state,
        city,
        pincode,
        phonenumber,
        address } = formData

    //FORM FILL HONE KE BAAD FORM CLEAR HO JAEGA


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await shippingAddress(
                fullName,
                country,
                state,
                city,
                pincode,
                phonenumber,
                address
            );

            if (res.success) {
                setFormData({
                    fullName: "",
                    country: "",
                    state: "",
                    city: "",
                    pincode: "",
                    phonenumber: "",
                    address: "",
                });

                // Navigation se pehle direct checkout par navigate karein
                setTimeout(() => {
                    navigate("/checkout"); // URL lowercase rakhein agar app routes me lowercase hai
                }, 1200);
            }
            navigate("/Checkout");
        } catch (err) {
            console.log(err);
        }
    };
    // Kuch nahi karna
    // Toast AppState me hi show ho jayega

    return (
        <div className="min-h-screen bg-black text-white px-4 py-6 sm:px-6">

            <div className="
        max-w-6xl
        mx-auto
        border-2 border-[#a7ad32]
        rounded-xl
        px-5 py-6
        sm:px-8 sm:py-7
        lg:px-6 lg:py-5
      ">

                {/* Heading */}
                <h1 className="
          text-center
          text-3xl
          sm:text-4xl
          font-bold
          mb-8
        ">
                    Shipping Address
                </h1>

                <form onSubmit={submitHandler}>

                    {/* Inputs Grid */}
                    <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-x-6
            gap-y-5
          ">

                        {/* Full Name */}
                        <div>
                            <label className="block font-bold mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={onChangeHnadler}
                                placeholder="Enter your full name"
                                className="
        w-full
        h-10
        bg-[#202427]
        border-2 border-gray-500
        rounded-lg
        px-3
        text-white
        placeholder-gray-500
        outline-none

        transition-all
        duration-300
        ease-in-out

        hover:border-blue-400

        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/40
        focus:shadow-[0_0_20px_rgba(59,130,246,0.6)]

        focus:bg-[#252b32]
    "

                            />
                        </div>

                        {/* Country */}
                        <div>
                            <label className="block font-bold mb-2">
                                Country
                            </label>

                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={onChangeHnadler}
                                placeholder="Enter your full name"
                                className="
        w-full
        h-10
        bg-[#202427]
        border-2 border-gray-500
        rounded-lg
        px-3
        text-white
        placeholder-gray-500
        outline-none

        transition-all
        duration-300
        ease-in-out

        hover:border-blue-400

        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/40
        focus:shadow-[0_0_20px_rgba(59,130,246,0.6)]

        focus:bg-[#252b32]
    "
                            />
                        </div>

                        {/* State */}
                        <div>
                            <label className="block font-bold mb-2">
                                State
                            </label>

                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={onChangeHnadler}
                                placeholder="Enter your full name"
                                className="
        w-full
        h-10
        bg-[#202427]
        border-2 border-gray-500
        rounded-lg
        px-3
        text-white
        placeholder-gray-500
        outline-none

        transition-all
        duration-300
        ease-in-out

        hover:border-blue-400

        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/40
        focus:shadow-[0_0_20px_rgba(59,130,246,0.6)]

        focus:bg-[#252b32]
    "

                            />
                        </div>

                        {/* City */}
                        <div>
                            <label className="block font-bold mb-2">
                                City
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={onChangeHnadler}
                                placeholder="Enter your full name"
                                className="
        w-full
        h-10
        bg-[#202427]
        border-2 border-gray-500
        rounded-lg
        px-3
        text-white
        placeholder-gray-500
        outline-none

        transition-all
        duration-300
        ease-in-out

        hover:border-blue-400

        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/40
        focus:shadow-[0_0_20px_rgba(59,130,246,0.6)]

        focus:bg-[#252b32]
    "
                            />
                        </div>

                        {/* Pincode */}
                        <div>
                            <label className="block font-bold mb-2">
                                Pincode
                            </label>

                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={onChangeHnadler}
                                placeholder="Enter your full name"
                                className="
        w-full
        h-10
        bg-[#202427]
        border-2 border-gray-500
        rounded-lg
        px-3
        text-white
        placeholder-gray-500
        outline-none

        transition-all
        duration-300
        ease-in-out

        hover:border-blue-400

        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/40
        focus:shadow-[0_0_20px_rgba(59,130,246,0.6)]

        focus:bg-[#252b32]
    "

                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block font-bold mb-2">
                                Phone Number
                            </label>

                            <input
                                type="text"
                                name="phonenumber"
                                value={formData.phonenumber}
                                onChange={onChangeHnadler}
                                placeholder="Enter your full name"
                                className="
        w-full
        h-10
        bg-[#202427]
        border-2 border-gray-500
        rounded-lg
        px-3
        text-white
        placeholder-gray-500
        outline-none

        transition-all
        duration-300
        ease-in-out

        hover:border-blue-400

        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/40
        focus:shadow-[0_0_20px_rgba(59,130,246,0.6)]

        focus:bg-[#252b32]
    "

                            />
                        </div>

                    </div>

                    {/* Address */}
                    <div className="mt-5">

                        <label className="block font-bold mt-0">
                            AddressLine/Nearby
                        </label>

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={onChangeHnadler}
                            placeholder="Enter your full name"
                            className="
        w-full
        h-10
        bg-[#202427]
        border-2 border-gray-500
        rounded-lg
        px-3
        text-white
        placeholder-gray-500
        outline-none

        transition-all
        duration-300
        ease-in-out

        hover:border-blue-400

        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/40
        focus:shadow-[0_0_20px_rgba(59,130,246,0.6)]

        focus:bg-[#252b32]
    "
                        />

                    </div>

                    {/* Buttons */}
                    {/* Buttons */}
                    <div className="
    flex
    flex-col
    items-center
    gap-3
    mt-2
">

                        {/* Submit */}
                        <button
                            type="submit"
                            className="
            w-full
            sm:w-[70%]
            lg:w-[45%]
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-bold
            py-2.5
            rounded-md

            transition-all
            duration-300
            ease-in-out

            hover:shadow-[0_0_15px_rgba(37,99,235,0.6)]
            hover:border-blue-400
        "
                        >
                            Submit
                        </button>

                        {/* Use Old Address */}
                        {useraddress && (
                            <button onClick={() => navigate("/checkout")}
                                type="button"
                                className="
            w-full
            sm:w-[70%]
            lg:w-[45%]
            bg-yellow-400
            hover:bg-yellow-500
            text-black
            font-bold
            py-2.5
            rounded-md

            transition-all
            duration-300
            ease-in-out

            hover:shadow-[0_0_15px_rgba(250,204,21,0.6)]
        "
                            >
                                Use Old Address
                            </button>
                        )}
                    </div>

                </form>

            </div>
        </div>
    );
};

export default Address;