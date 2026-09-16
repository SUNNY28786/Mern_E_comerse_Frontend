import React, { useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Cart = () => {
    const navigate = useNavigate();
    const { cart, addToCart, decreaseQty, removeFromCart, cartClear, user } = useContext(AppContext);

    // Total items count (Sum of quantities)
    const totalItemCount =
        cart?.items?.reduce((total, item) => total + Number(item.qty), 0) || 0;

    // Subtotal Calculation (Unit Price * Quantity)
    const subtotal =
        cart?.items?.reduce((total, item) => {
            return total + Number(item.price) * Number(item.qty);
        }, 0) || 0;

    // Empty Cart View
    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="min-h-screen w-full bg-[#070d18] flex items-center justify-center px-4 py-8 overflow-x-hidden">
                <div className="w-full max-w-md text-center bg-[#151c2c] rounded-2xl p-5 sm:p-8 shadow-2xl">
                    <div className="text-5xl sm:text-6xl mb-5">🛒</div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        Your Cart is Empty
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base mb-7 leading-relaxed">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <Link
                        to="/"
                        className="w-full h-[50px] flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                    >
                        🛍️ Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#070d18] text-white px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    {/* Cart Heading */}
                    <button
                        className="
              px-4 py-2
              rounded-xl
              bg-red-500
              hover:bg-orange-600
              hover:scale-105
              hover:shadow-xl
              text-black
              font-bold
              text-lg
              flex items-center gap-2
              shadow-lg shadow-orange-500/30
              transition-all duration-300
              cursor-pointer
            "
                    >
                        🛒 Shopping Cart
                        <span
                            className="
                bg-white
                text-orange-600
                px-2.5 py-1
                rounded-full
                text-sm
                font-bold
                transition-all duration-300
                group-hover:bg-orange-100
              "
                        >
                            {totalItemCount}
                        </span>
                    </button>

                    {/* Buttons */}
                    <div className="flex flex-col xs:flex-row sm:flex-row gap-3 w-full sm:w-auto">
                        {/* Checkout */}
                        <button
                            onClick={() => navigate("/Shipping")}
                            className="
                w-full sm:w-auto
                px-5 py-2.5
                rounded-lg
                bg-orange-500
                hover:bg-orange-600
                text-white
                font-semibold
                shadow-lg shadow-orange-500/20
                transition-all duration-300
                hover:scale-105
              "
                        >
                            🛒 Checkout
                        </button>

                        {/* Clear Cart */}
                        <button
                            onClick={() => {
                                Swal.fire({
                                    title: "Clear Cart?",
                                    text: "Are you sure you want to clear your cart?",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonText: "Yes, clear it",
                                    cancelButtonText: "Cancel",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        cartClear();
                                    }
                                });
                            }}
                            className="
                w-full sm:w-auto
                px-5 py-2.5
                rounded-lg
                bg-red-500
                hover:bg-red-600
                text-white
                font-semibold
                shadow-lg shadow-red-500/20
                transition-all duration-300
                hover:scale-105
              "
                        >
                            🗑️ Clear Cart
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-5">
                        {cart.items.map((item) => (
                            <div
                                key={item.productId || item._id}
                                className="bg-[#151c2c] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg"
                            >
                                {/* Product Info */}
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <img
                                        src={item.imgsrc}
                                        alt={item.title}
                                        className="w-20 h-20 object-cover rounded-lg bg-white"
                                    />
                                    <div>
                                        <h2 className="text-lg font-bold">{item.title}</h2>
                                        <p className="text-orange-400 font-semibold mt-1">
                                            ₹{item.price}
                                        </p>
                                    </div>
                                </div>

                                {/* Qty & Price */}
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex items-center bg-[#232d45] rounded-full px-3 py-2">
                                        <button
                                            onClick={() => decreaseQty(item.productId, 1)}
                                            disabled={Number(item.qty) <= 1}
                                            className="px-3 text-xl hover:text-orange-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            -
                                        </button>

                                        <span className="px-4">{item.qty}</span>

                                        <button
                                            onClick={() =>
                                                addToCart(
                                                    item.productId,
                                                    item.title,
                                                    Number(item.price),
                                                    1, // ✅ Fix: Send delta quantity 1 because backend adds `+= qty`
                                                    item.imgsrc
                                                )
                                            }
                                            className="px-3 text-xl hover:text-orange-400 cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <h2 className="font-bold text-orange-400">
                                        ₹{Number(item.price) * Number(item.qty)}
                                    </h2>

                                    <button
                                        onClick={() => {
                                            Swal.fire({
                                                title: "Remove item?",
                                                text: "This item will be removed from your cart.",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonText: "Yes, remove it",
                                                cancelButtonText: "Cancel",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    removeFromCart(item.productId);
                                                }
                                            });
                                        }}
                                        className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 transition cursor-pointer flex items-center justify-center"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-[#151c2c] rounded-xl p-6 h-fit lg:sticky lg:top-24">
                        <h2 className="text-2xl font-bold mb-6">₹ Order Summary</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-500">Free</span>
                            </div>

                            <hr className="border-gray-700" />

                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span className="text-orange-500">₹{subtotal}</span>
                            </div>

                            <button
                                onClick={() => navigate("/Shipping")}
                                className="
                  w-full
                  mt-6
                  bg-pink-200
                  text-black
                  hover:bg-pink-300
                  hover:text-white
                  py-2.5
                  rounded-full
                  font-bold
                  text-lg
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:shadow-lg
                  hover:shadow-pink-500/40
                  cursor-pointer
                "
                            >
                                Proceed Securely
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;