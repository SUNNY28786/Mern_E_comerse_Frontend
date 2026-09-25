import React, { useContext, useState } from "react";
import Swal from "sweetalert2";

import AppContext from "../../context/AppContext";

const Payment = () => {

    const {
        cart,
        useraddress,
    } = useContext(AppContext);


    const [loading, setLoading] = useState(false);

    const [paymentSuccess, setPaymentSuccess] =
        useState(false);

    const [paymentId, setPaymentId] =
        useState("");


    // ==========================================
    // CART TOTAL
    // ==========================================

    const subtotal =
        cart?.items?.reduce(
            (total, item) =>
                total +
                Number(item.price) *
                Number(item.qty),
            0
        ) || 0;


    // ==========================================
    // PAYMENT
    // ==========================================

    const handlePayment = async () => {

        try {

            setLoading(true);


            const token =
                localStorage.getItem("token");


            // LOGIN CHECK
            if (!token) {

                Swal.fire({
                    icon: "warning",
                    title: "Login Required",
                    text: "Please login before payment",
                    confirmButtonColor: "#f97316",
                    background: "#151c2c",
                    color: "#fff",
                });

                return;
            }


            // CART CHECK
            if (
                !cart?.items ||
                cart.items.length === 0
            ) {

                Swal.fire({
                    icon: "warning",
                    title: "Cart Empty",
                    text: "Your cart is empty",
                    confirmButtonColor: "#f97316",
                    background: "#151c2c",
                    color: "#fff",
                });

                return;
            }


            // ADDRESS CHECK
            if (!useraddress) {

                Swal.fire({
                    icon: "warning",
                    title: "Address Required",
                    text: "Please add delivery address first",
                    confirmButtonColor: "#f97316",
                    background: "#151c2c",
                    color: "#fff",
                });

                return;
            }


            // ==========================================
            // CREATE ORDER FROM BACKEND
            // ==========================================

            const response = await fetch(
                `${url}/payment/checkout`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Auth: token,
                    },
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to create payment"
                );
            }


            console.log(
                "Razorpay Order:",
                data.order
            );


            // ==========================================
            // RAZORPAY OPTIONS
            // ==========================================

            const options = {

                key: data.key,

                amount:
                    data.order.amount,

                currency:
                    data.order.currency,

                name:
                    "My E-Commerce",

                description:
                    "Cart Order Payment",

                order_id:
                    data.order.id,


                // ======================================
                // PAYMENT SUCCESS
                // ======================================

                handler: async function (
                    razorpayResponse
                ) {

                    try {

                        console.log(
                            "Razorpay Response:",
                            razorpayResponse
                        );


                        // ==================================
                        // VERIFY PAYMENT ON BACKEND
                        // ==================================

                        const verifyResponse =
                            await fetch(
                                `${url}/payment/verify`,
                                {
                                    method: "POST",

                                    headers: {
                                        "Content-Type":
                                            "application/json",

                                        Auth: token,
                                    },

                                    body: JSON.stringify({

                                        razorpay_order_id:
                                            razorpayResponse
                                                .razorpay_order_id,

                                        razorpay_payment_id:
                                            razorpayResponse
                                                .razorpay_payment_id,

                                        razorpay_signature:
                                            razorpayResponse
                                                .razorpay_signature,
                                    }),
                                }
                            );


                        const verifyData =
                            await verifyResponse.json();


                        if (!verifyResponse.ok) {

                            throw new Error(
                                verifyData.message ||
                                "Payment verification failed"
                            );
                        }


                        // ==================================
                        // SUCCESS
                        // ==================================

                        setPaymentSuccess(true);

                        setPaymentId(
                            razorpayResponse
                                .razorpay_payment_id
                        );


                        Swal.fire({
                            icon: "success",
                            title: "Payment Successful 🎉",
                            text:
                                "Your payment has been verified successfully.",
                            confirmButtonColor:
                                "#f97316",
                            background:
                                "#151c2c",
                            color: "#fff",
                        });


                    } catch (error) {

                        console.error(
                            "Verification Error:",
                            error
                        );


                        Swal.fire({
                            icon: "error",
                            title:
                                "Payment Verification Failed",
                            text:
                                error.message,
                            confirmButtonColor:
                                "#f97316",
                            background:
                                "#151c2c",
                            color: "#fff",
                        });
                    }
                },


                // ==========================================
                // CUSTOMER DETAILS
                // ==========================================

                prefill: {

                    name:
                        useraddress?.fullName ||
                        "",

                    contact:
                        useraddress?.phonenumber ||
                        "",
                },


                notes: {

                    address:
                        useraddress?.address ||
                        "",

                    city:
                        useraddress?.city ||
                        "",

                    state:
                        useraddress?.state ||
                        "",

                    pincode:
                        useraddress?.pincode ||
                        "",
                },


                theme: {

                    color:
                        "#f97316",
                },


                // ==========================================
                // POPUP CLOSED
                // ==========================================

                modal: {

                    ondismiss: function () {

                        console.log(
                            "Razorpay popup closed"
                        );

                    },
                },
            };


            // ==========================================
            // RAZORPAY INSTANCE
            // ==========================================

            if (!window.Razorpay) {

                throw new Error(
                    "Razorpay SDK not loaded. Please check index.html"
                );
            }


            const razorpay =
                new window.Razorpay(
                    options
                );


            // ==========================================
            // PAYMENT FAILED
            // ==========================================

            razorpay.on(
                "payment.failed",
                function (response) {

                    console.error(
                        "Payment Failed:",
                        response.error
                    );


                    Swal.fire({
                        icon: "error",
                        title: "Payment Failed",
                        text:
                            response.error?.description ||
                            "Payment failed",
                        confirmButtonColor:
                            "#f97316",
                        background:
                            "#151c2c",
                        color: "#fff",
                    });
                }
            );


            // OPEN RAZORPAY
            razorpay.open();


        } catch (error) {

            console.error(
                "Payment Error:",
                error
            );


            Swal.fire({
                icon: "error",
                title: "Payment Error",
                text:
                    error.message,
                confirmButtonColor:
                    "#f97316",
                background:
                    "#151c2c",
                color: "#fff",
            });


        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // PAYMENT SUCCESS SCREEN
    // ==========================================

    if (paymentSuccess) {

        return (

            <div className="
                    min-h-screen
                    bg-[#070d18]
                    flex
                    items-center
                    justify-center
                    px-4
                ">

                <div className="
                        w-full
                        max-w-md
                        bg-[#151c2c]
                        border
                        border-gray-800
                        rounded-2xl
                        p-8
                        text-center
                        text-white
                    ">

                    <div className="
                            w-20
                            h-20
                            mx-auto
                            rounded-full
                            bg-green-500/10
                            flex
                            items-center
                            justify-center
                            text-5xl
                            mb-5
                        ">
                        ✓
                    </div>


                    <h1 className="
                            text-2xl
                            font-bold
                            text-green-400
                        ">
                        Payment Successful
                    </h1>


                    <p className="
                            text-gray-400
                            text-sm
                            mt-3
                        ">
                        Your payment has been
                        successfully verified.
                    </p>


                    <div className="
                            mt-6
                            bg-[#0d1424]
                            rounded-xl
                            p-4
                            text-left
                        ">

                        <div className="
                                flex
                                justify-between
                                gap-3
                                text-sm
                            ">

                            <span className="text-gray-500">
                                Amount
                            </span>

                            <span className="font-bold">
                                ₹{subtotal}
                            </span>

                        </div>


                        <div className="
                                flex
                                justify-between
                                gap-3
                                text-sm
                                mt-3
                            ">

                            <span className="text-gray-500">
                                Payment ID
                            </span>

                            <span className="
                                    font-semibold
                                    text-orange-400
                                    text-xs
                                    break-all
                                ">
                                {paymentId}
                            </span>

                        </div>

                    </div>


                    <div className="
                            mt-5
                            text-green-400
                            text-sm
                            font-semibold
                        ">
                        ✓ Payment Verified
                    </div>


                    <p className="
                            text-gray-500
                            text-xs
                            mt-2
                        ">
                        Your cart has been cleared.
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // PAYMENT PAGE
    // ==========================================

    return (

        <div className="
                min-h-screen
                bg-[#070d18]
                flex
                items-center
                justify-center
                px-4
                py-8
            ">

            <div className="
                    bg-[#151c2c]
                    border
                    border-gray-800
                    rounded-2xl
                    p-6
                    w-full
                    max-w-md
                    text-white
                ">


                <h1 className="
                        text-2xl
                        font-bold
                        text-center
                    ">
                    Payment
                </h1>


                <p className="
                        text-center
                        text-gray-500
                        text-sm
                        mt-1
                    ">
                    Secure Razorpay Checkout
                </p>


                {/* PRODUCTS */}

                <div className="
                        mt-6
                        space-y-3
                    ">

                    {cart?.items?.map(
                        (item) => (

                            <div
                                key={item._id}
                                className="
                                        flex
                                        justify-between
                                        gap-4
                                        border-b
                                        border-gray-800
                                        pb-3
                                    "
                            >

                                <div className="min-w-0">

                                    <p className="
                                            font-semibold
                                            truncate
                                        ">
                                        {item.title}
                                    </p>


                                    <p className="
                                            text-gray-400
                                            text-sm
                                            mt-1
                                        ">
                                        ₹{item.price} × {item.qty}
                                    </p>

                                </div>


                                <p className="
                                        font-bold
                                        whitespace-nowrap
                                    ">
                                    ₹
                                    {Number(item.price) *
                                        Number(item.qty)}
                                </p>

                            </div>

                        )
                    )}

                </div>


                {/* TOTAL */}

                <div className="
                        flex
                        justify-between
                        items-center
                        pt-5
                    ">

                    <span className="
                            text-gray-400
                        ">
                        Total Amount
                    </span>


                    <span className="
                            text-orange-500
                            text-2xl
                            font-bold
                        ">
                        ₹{subtotal}
                    </span>

                </div>


                {/* PAY BUTTON */}

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="
                            w-full
                            mt-6
                            h-12
                            rounded-lg
                            bg-orange-500
                            hover:bg-orange-600
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            font-bold
                            transition
                        "
                >

                    {loading
                        ? "Creating Payment..."
                        : `Pay ₹${subtotal}`
                    }

                </button>


                {/* SECURITY */}

                <div className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        mt-4
                        text-xs
                        text-gray-500
                    ">

                    🔒 Secure payment powered by Razorpay

                </div>

            </div>

        </div>
    );
};

export default Payment;