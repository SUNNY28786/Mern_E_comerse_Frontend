import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

import {
    Trash2,
    MapPin,
    ShieldCheck,
    CreditCard,
    ShoppingBag,
    ChevronRight
} from "lucide-react";

import AppContext from "../../context/AppContext";

const Checkout = () => {

    const navigate = useNavigate();

    const {
        cart,
        addToCart,
        decreaseQty,
        removeFromCart,
        cartClear,
        useraddress
    } = useContext(AppContext);

    // PAYMENT LOADING STATE
    const [paymentLoading, setPaymentLoading] = useState(false);

    // ==========================================
    // CART TOTAL
    // ==========================================

    const subtotal =
        cart?.items?.reduce(
            (total, item) => total + item.price * item.qty,
            0
        ) || 0;

    const totalItems =
        cart?.items?.reduce(
            (total, item) => total + item.qty,
            0
        ) || 0;

    // ==========================================
    // ADDRESS CHECK
    // Empty object {} ko valid address nahi manenge
    // ==========================================

    const hasAddress =
        useraddress &&
        useraddress.fullName?.trim() &&
        useraddress.address?.trim() &&
        useraddress.city?.trim() &&
        useraddress.state?.trim() &&
        useraddress.country?.trim() &&
        useraddress.pincode?.trim() &&
        useraddress.phonenumber?.trim();

    // ==========================================
    // EMPTY CART
    // ==========================================

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-[#070d18] flex items-center justify-center px-4">

                <div className="w-full max-w-sm bg-[#151c2c] rounded-2xl p-7 text-center">

                    <div className="text-5xl mb-3">
                        🛒
                    </div>

                    <h1 className="text-2xl font-bold text-white">
                        Your Cart is Empty
                    </h1>

                    <p className="text-gray-400 text-sm mt-2 mb-5">
                        Add some products before checkout.
                    </p>

                    <Link
                        to="/"
                        className="block w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold transition"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>
        );
    }

    // ==========================================
    // REMOVE PRODUCT
    // ==========================================

    const handleRemove = (productId) => {

        Swal.fire({
            title: "Remove item?",
            text: "This product will be removed from your cart.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Remove",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#ef4444",
            background: "#151c2c",
            color: "#fff"
        }).then((result) => {

            if (result.isConfirmed) {
                removeFromCart(productId);
            }

        });
    };

    // ==========================================
    // CLEAR CART
    // ==========================================

    const handleClearCart = () => {

        Swal.fire({
            title: "Clear cart?",
            text: "All products will be removed.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, clear",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#ef4444",
            background: "#151c2c",
            color: "#fff"
        }).then((result) => {

            if (result.isConfirmed) {
                cartClear();
            }

        });
    };

    // ==========================================
    // RAZORPAY PAYMENT
    // ==========================================

    const handlePayment = async () => {
        try {
            setPaymentLoading(true);

            const token = localStorage.getItem("token");

            // ==========================================
            // LOGIN CHECK
            // ==========================================

            if (!token) {
                await Swal.fire({
                    icon: "warning",
                    title: "Login Required",
                    text: "Please login before payment",
                    confirmButtonColor: "#f97316",
                    background: "#151c2c",
                    color: "#fff"
                });

                setPaymentLoading(false);
                return;
            }

            // ==========================================
            // CART CHECK
            // ==========================================

            if (!cart?.items || cart.items.length === 0) {
                await Swal.fire({
                    icon: "warning",
                    title: "Cart Empty",
                    text: "Your cart is empty",
                    confirmButtonColor: "#f97316",
                    background: "#151c2c",
                    color: "#fff"
                });

                setPaymentLoading(false);
                return;
            }

            // ==========================================
            // ADDRESS CHECK
            // ==========================================

            if (!hasAddress) {
                await Swal.fire({
                    icon: "warning",
                    title: "Address Required",
                    text: "Please add your delivery address first.",
                    confirmButtonText: "Add Address",
                    confirmButtonColor: "#f97316",
                    background: "#151c2c",
                    color: "#fff"
                });

                setPaymentLoading(false);
                navigate("/Shipping");
                return;
            }

            // ==========================================
            // IMPORTANT:
            // ADDRESS KA SNAPSHOT PAYMENT VERIFY KE LIYE
            // ==========================================

            const shippingAddress = {
                fullName: useraddress.fullName,
                address: useraddress.address,
                city: useraddress.city,
                state: useraddress.state,
                country: useraddress.country,
                pincode: useraddress.pincode,
                phonenumber: useraddress.phonenumber
            };

            console.log(
                "Shipping Address Before Payment:",
                shippingAddress
            );

            // ==========================================
            // RAZORPAY SDK CHECK
            // ==========================================

            if (!window.Razorpay) {
                throw new Error(
                    "Razorpay SDK not loaded. Please check index.html"
                );
            }

            // ==========================================
            // CREATE RAZORPAY ORDER
            // ==========================================

            const response = await fetch(
                "http://localhost:1000/api/payment/checkout",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Auth: token
                    }
                }
            );

            const responseText = await response.text();

            console.log(
                "Payment API Status:",
                response.status
            );

            console.log(
                "Payment API Response:",
                responseText
            );

            let data;

            try {
                data = JSON.parse(responseText);
            } catch (error) {
                console.error(
                    "Backend returned non-JSON:",
                    responseText
                );

                throw new Error(
                    `Payment API error(${response.status}).Backend JSON response nahi de raha.`
                );
            }

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to create payment order"
                );
            }

            if (!data.order || !data.order.id) {
                throw new Error(
                    "Razorpay order ID backend se nahi mili."
                );
            }

            if (!data.key) {
                throw new Error(
                    "Razorpay Key ID backend se nahi mili."
                );
            }

            // ==========================================
            // RAZORPAY OPTIONS
            // ==========================================

            const options = {

                key: data.key,

                amount: data.order.amount,

                currency:
                    data.order.currency || "INR",

                name: "Online Shopping Portal",

                description: "Cart Order Payment",

                order_id: data.order.id,

                // ======================================
                // PAYMENT SUCCESS
                // ======================================

                handler: async function (paymentResponse) {

                    console.log(
                        "Razorpay Payment Response:",
                        paymentResponse
                    );

                    try {

                        // ==================================
                        // CHECK RAZORPAY RESPONSE
                        // ==================================

                        if (
                            !paymentResponse.razorpay_order_id ||
                            !paymentResponse.razorpay_payment_id ||
                            !paymentResponse.razorpay_signature
                        ) {
                            throw new Error(
                                "Razorpay payment details incomplete."
                            );
                        }

                        // ==================================
                        // VERIFY PAYMENT
                        // ==================================

                        console.log(
                            "Sending Shipping Address To Backend:",
                            shippingAddress
                        );

                        const verifyResponse =
                            await fetch(
                                "http://localhost:1000/api/payment/verify",
                                {
                                    method: "POST",

                                    headers: {
                                        "Content-Type":
                                            "application/json",
                                        Auth: token
                                    },

                                    body: JSON.stringify({

                                        razorpay_order_id:
                                            paymentResponse.razorpay_order_id,

                                        razorpay_payment_id:
                                            paymentResponse.razorpay_payment_id,

                                        razorpay_signature:
                                            paymentResponse.razorpay_signature,

                                        // ⭐⭐⭐ IMPORTANT ⭐⭐⭐
                                        shippingAddress:
                                            shippingAddress
                                    })
                                }
                            );

                        // ==================================
                        // READ RESPONSE
                        // ==================================

                        const verifyText =
                            await verifyResponse.text();

                        console.log(
                            "Verify API Status:",
                            verifyResponse.status
                        );

                        console.log(
                            "Verify API Raw Response:",
                            verifyText
                        );

                        let verifyData;

                        try {
                            verifyData =
                                JSON.parse(verifyText);
                        } catch (error) {

                            throw new Error(
                                "Backend verification response JSON nahi hai."
                            );
                        }

                        console.log(
                            "Verify Response:",
                            verifyData
                        );

                        // ==================================
                        // VERIFY FAILED
                        // ==================================

                        if (
                            !verifyResponse.ok ||
                            !verifyData.success
                        ) {

                            throw new Error(
                                verifyData.message ||
                                "Payment verification failed"
                            );
                        }

                        // ==================================
                        // PAYMENT SUCCESS
                        // ==========================================

                        console.log(
                            "🔥 PAYMENT VERIFIED SUCCESSFULLY 🔥"
                        );

                        // Backend already cart clear karta hai.
                        // Isliye yahan cartClear() dobara call
                        // nahi karna hai.

                        setPaymentLoading(false);

                        // ==================================
                        // SUCCESS ALERT
                        // ==================================

                        await Swal.fire({

                            icon: "success",

                            title: "Payment Successful 🎉",

                            html: `
        < div style = "text-align:center" >

                                <p>
                                    Your payment has been
                                    verified successfully.
                                </p>

                                <p style="margin-top:10px">
                                    <b>Amount:</b>
                                    ₹${subtotal}
                                </p>

                                <p style="
                                    margin-top:8px;
                                    font-size:12px;
                                    color:#aaa;
                                ">
                                    Payment ID:
                                    ${paymentResponse.razorpay_payment_id}
                                </p>

                            </div >
    `,

                            confirmButtonText: "Done",

                            confirmButtonColor: "#f97316",

                            background: "#151c2c",

                            color: "#fff"

                        });

                        // ==================================
                        // PAYMENT SUCCESS KE BAAD
                        // ==================================

                        // ==========================================
                        // PAYMENT SUCCESS
                        // ==========================================

                        console.log("🔥 PAYMENT VERIFIED SUCCESSFULLY 🔥");
                        console.log("🔥 FINAL ORDER DATA:", verifyData);

                        // ==========================================
                        // CART CLEAR AFTER PAYMENT VERIFIED
                        // ==========================================

                        try {
                            await cartClear();

                            console.log("🛒 CART CLEARED SUCCESSFULLY");
                        } catch (cartError) {

                            console.error(
                                "❌ CART CLEAR ERROR:",
                                cartError
                            );
                        }

                        // ==========================================
                        // SAVE ORDER DATA
                        // ==========================================

                        sessionStorage.setItem(
                            "orderConfirmation",
                            JSON.stringify(verifyData)
                        );

                        setPaymentLoading(false);

                        // ==========================================
                        // GO TO ORDER CONFIRMATION PAGE
                        // ==========================================

                        navigate("/orderconformation");

                        return;


                        return;


                    } catch (error) {

                        console.error(
                            "Payment Verification Error:",
                            error
                        );

                        setPaymentLoading(false);

                        await Swal.fire({

                            icon: "error",

                            title: "Payment Verification Failed",

                            text:
                                error?.message ||
                                "Payment verification failed",

                            confirmButtonColor: "#f97316",

                            background: "#151c2c",

                            color: "#fff"

                        });
                    }
                },

                // ==========================================
                // CUSTOMER DETAILS
                // ==========================================

                prefill: {

                    name:
                        shippingAddress.fullName,

                    contact:
                        shippingAddress.phonenumber

                },

                // ==========================================
                // NOTES
                // ==========================================

                notes: {

                    address:
                        shippingAddress.address,

                    city:
                        shippingAddress.city,

                    state:
                        shippingAddress.state,

                    pincode:
                        shippingAddress.pincode,

                    country:
                        shippingAddress.country

                },

                // ==========================================
                // THEME
                // ==========================================

                theme: {

                    color: "#f97316"

                },

                // ==========================================
                // MODAL
                // ==========================================

                modal: {

                    ondismiss: function () {

                        console.log(
                            "Razorpay popup closed"
                        );

                        setPaymentLoading(false);

                    }

                }

            };

            // ==========================================
            // CREATE RAZORPAY INSTANCE
            // ==========================================

            const rzp =
                new window.Razorpay(options);

            // ==========================================
            // PAYMENT FAILED
            // ==========================================

            rzp.on(
                "payment.failed",
                function (response) {

                    console.error(
                        "Payment Failed:",
                        response.error
                    );

                    setPaymentLoading(false);

                    Swal.fire({

                        icon: "error",

                        title: "Payment Failed",

                        text:
                            response.error?.description ||
                            "Payment failed",

                        confirmButtonColor: "#f97316",

                        background: "#151c2c",

                        color: "#fff"

                    });

                }
            );

            // ==========================================
            // OPEN RAZORPAY
            // ==========================================

            rzp.open();

        } catch (error) {

            console.error(
                "Payment Error:",
                error
            );

            setPaymentLoading(false);

            Swal.fire({

                icon: "error",

                title: "Payment Error",

                text:
                    error?.message ||
                    "Something went wrong",

                confirmButtonColor: "#f97316",

                background: "#151c2c",

                color: "#fff"

            });
        }
    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="min-h-screen bg-[#070d18] text-white px-3 sm:px-5 py-4">

            <div className="max-w-7xl mx-auto">

                {/* TOP HEADER */}

                <div className="flex items-center justify-between mt-0 pd-0">

                    <div className="flex items-center gap-2">

                        <ShoppingBag
                            size={25}
                            className="text-orange-500"
                        />

                        <div>

                            <h1 className="text-xl sm:text-2xl font-bold">
                                Checkout
                            </h1>

                            <p className="text-gray-500 text-xs">
                                {totalItems} items
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={handleClearCart}
                        className="flex items-center gap-1.5 text-xs sm:text-sm text-red-400 hover:text-red-300 transition"
                    >

                        <Trash2 size={25} />

                        <h3>clearcart</h3>

                    </button>

                </div>

                {/* MAIN GRID */}

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">

                    {/* LEFT SIDE */}

                    <div className="space-y-3">

                        {/* DELIVERY ADDRESS */}

                        <div className="bg-[#151c2c] border border-gray-800 rounded-xl px-4 py-3">

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <MapPin
                                        size={19}
                                        className="text-orange-500"
                                    />

                                    <h2 className="font-bold text-sm sm:text-base">
                                        Delivery Address
                                    </h2>

                                </div>

                                <button
                                    onClick={() => navigate("/Shipping")}
                                    className="text-orange-400 text-xs font-semibold hover:text-orange-300"
                                >
                                    {hasAddress ? "Change" : "Add Address"}
                                </button>

                            </div>

                            <div className="mt-2 ml-6">

                                {hasAddress ? (

                                    <div className="border border-orange-500/30 bg-[#101827] rounded-xl p-3">

                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">

                                            <span className="font-bold text-sm text-white">
                                                {useraddress.fullName}
                                            </span>

                                            <span className="text-gray-600">
                                                |
                                            </span>

                                            <span className="text-gray-400 text-xs">
                                                {useraddress.phonenumber}
                                            </span>

                                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 font-semibold">
                                                SAVED
                                            </span>

                                        </div>

                                        <p className="text-gray-400 text-xs mt-2 leading-5">

                                            {useraddress.address},{" "}

                                            {useraddress.city},{" "}

                                            {useraddress.state} -{" "}

                                            {useraddress.pincode},{" "}

                                            {useraddress.country}

                                        </p>

                                        <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-500">

                                            <ShieldCheck
                                                size={13}
                                                className="text-green-400"
                                            />

                                            This address will be used for delivery.

                                        </div>

                                    </div>

                                ) : (

                                    <button
                                        onClick={() => navigate("/Shipping")}
                                        className="text-orange-400 text-xs font-semibold"
                                    >
                                        + Add Delivery Address
                                    </button>

                                )}

                            </div>

                        </div>

                        {/* PRODUCT TABLE */}

                        <div className="bg-[#151c2c] border border-gray-800 rounded-xl overflow-hidden">

                            {/* TABLE HEADER */}

                            <div className="hidden sm:grid grid-cols-[1fr_100px_125px_90px_45px] items-center gap-3 px-4 py-2 bg-[#101827] border-b border-gray-800 text-[11px] uppercase tracking-wide text-gray-500">

                                <span>Product</span>

                                <span className="text-center">
                                    Price
                                </span>

                                <span className="text-center">
                                    Quantity
                                </span>

                                <span className="text-center">
                                    Total
                                </span>

                                <span></span>

                            </div>

                            {/* PRODUCTS */}

                            <div>

                                {cart.items.map((item) => (

                                    <div
                                        key={item._id}
                                        className="
                                        grid
                                        grid-cols-1
                                        sm:grid-cols-[1fr_100px_125px_90px_45px]
                                        items-center
                                        gap-2
                                        sm:gap-3
                                        px-3
                                        sm:px-4
                                        py-3
                                        border-b
                                        border-gray-800
                                        last:border-b-0
                                        hover:bg-[#192237]
                                        transition
                                        "
                                    >

                                        {/* PRODUCT */}

                                        <div className="flex items-center gap-3 min-w-0">

                                            <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-white rounded-lg border border-orange-500 p-1">

                                                <img
                                                    src={item.imgsrc}
                                                    alt={item.title}
                                                    className="w-full h-full object-contain"
                                                />

                                            </div>

                                            <div className="min-w-0">

                                                <h3 className="font-semibold text-sm truncate">
                                                    {item.title}
                                                </h3>

                                                <p className="text-[11px] text-gray-500 mt-1">
                                                    Product available
                                                </p>

                                            </div>

                                        </div>

                                        {/* PRICE */}

                                        <div className="flex sm:block justify-between">

                                            <span className="sm:hidden text-xs text-gray-500">
                                                Price
                                            </span>

                                            <span className="text-sm font-semibold">
                                                ₹{item.price}
                                            </span>

                                        </div>

                                        {/* QUANTITY */}

                                        <div className="flex sm:justify-center items-center">

                                            <div className="flex items-center h-8 bg-[#0d1424] border border-gray-700 rounded-md overflow-hidden">

                                                <button
                                                    onClick={() =>
                                                        decreaseQty(
                                                            item.productId,
                                                            1
                                                        )
                                                    }
                                                    disabled={item.qty <= 1}
                                                    className="
                                                    w-8
                                                    h-8
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-lg
                                                    hover:bg-orange-500
                                                    disabled:opacity-30
                                                    transition
                                                    "
                                                >
                                                    −
                                                </button>

                                                <span className="w-8 text-center text-sm font-bold">
                                                    {item.qty}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        addToCart(
                                                            item.productId,
                                                            item.title,
                                                            item.price,
                                                            1,
                                                            item.imgsrc
                                                        )
                                                    }
                                                    className="
                                                    w-8
                                                    h-8
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-lg
                                                    hover:bg-orange-500
                                                    transition
                                                    "
                                                >
                                                    +
                                                </button>

                                            </div>

                                        </div>

                                        {/* TOTAL */}

                                        <div className="flex sm:block justify-between">

                                            <span className="sm:hidden text-xs text-gray-500">
                                                Total
                                            </span>

                                            <span className="font-bold text-orange-400 text-sm">
                                                ₹{item.price * item.qty}
                                            </span>

                                        </div>

                                        {/* DELETE */}

                                        <div className="flex justify-end sm:justify-center">

                                            <button
                                                onClick={() =>
                                                    handleRemove(
                                                        item.productId
                                                    )
                                                }
                                                title="Remove item"
                                                className="
                                                w-8
                                                h-8
                                                rounded-lg
                                                flex
                                                items-center
                                                justify-center
                                                text-gray-500
                                                hover:text-white
                                                hover:bg-red-500
                                                transition
                                                "
                                            >

                                                <Trash2 size={17} />

                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}

                    <div className="space-y-3">

                        {/* ORDER SUMMARY */}

                        <div className="bg-[#151c2c] border border-gray-800 rounded-xl p-4">

                            <h2 className="font-bold text-lg mb-4">
                                Order Summary
                            </h2>

                            <div className="space-y-3 text-sm">

                                <div className="flex justify-between text-gray-400">

                                    <span>
                                        Price ({totalItems} items)
                                    </span>

                                    <span className="text-white">
                                        ₹{subtotal}
                                    </span>

                                </div>

                                <div className="flex justify-between text-gray-400">

                                    <span>
                                        Delivery
                                    </span>

                                    <span className="text-green-400">
                                        FREE
                                    </span>

                                </div>

                                <div className="border-t border-gray-700 pt-3 flex justify-between">

                                    <span className="font-bold">
                                        Total Amount
                                    </span>

                                    <span className="text-xl font-bold text-orange-500">
                                        ₹{subtotal}
                                    </span>

                                </div>

                            </div>

                            {/* PAY BUTTON */}

                            <button
                                onClick={handlePayment}
                                disabled={paymentLoading}
                                className="
                                w-full
                                mt-4
                                h-11
                                rounded-lg
                                bg-orange-500
                                hover:bg-orange-600
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                flex
                                items-center
                                justify-center
                                gap-2
                                font-bold
                                shadow-lg
                                shadow-orange-500/20
                                transition
                                hover:scale-[1.01]
                                "
                            >

                                <CreditCard size={18} />

                                {paymentLoading
                                    ? "Creating Payment..."
                                    : "Proceed to Pay"
                                }

                                {!paymentLoading && (
                                    <ChevronRight size={18} />
                                )}

                            </button>

                            <div className="flex items-center justify-center gap-1 mt-3 text-[11px] text-gray-500">

                                <ShieldCheck size={14} />

                                Secure & Safe Checkout

                            </div>

                        </div>

                        {/* BENEFITS */}

                        <div className="bg-[#151c2c] border border-gray-800 rounded-xl px-4 py-3">

                            <div className="flex items-center gap-3">

                                <div className="text-xl">
                                    🚚
                                </div>

                                <div>

                                    <p className="text-xs font-semibold">
                                        Free Delivery
                                    </p>

                                    <p className="text-[10px] text-gray-500">
                                        Fast & secure delivery
                                    </p>

                                </div>

                            </div>

                            <div className="border-t border-gray-800 my-2" />

                            <div className="flex items-center gap-3">

                                <div className="text-xl">
                                    ↩️
                                </div>

                                <div>

                                    <p className="text-xs font-semibold">
                                        Easy Returns
                                    </p>

                                    <p className="text-[10px] text-gray-500">
                                        Hassle-free returns
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Checkout;




















//rzp_test_TWhJ53d96sWDtL
//Qrmq6jZiaiYtxSCbRR4gjpRa