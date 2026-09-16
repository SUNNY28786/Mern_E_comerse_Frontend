
import { useLocation, useNavigate } from "react-router-dom";
import {
    CheckCircle2,
    PackageCheck,
    CreditCard,
    MapPin,
    ShoppingBag,
    ArrowRight,
} from "lucide-react";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Payment verification se data yahan receive hoga
    const order = location.state?.order;

    // Agar direct page open ho aur data na ho
    if (!order) {
        return (
            <div className="min-h-screen bg-[#070d18] flex items-center justify-center px-4">
                <div className="bg-[#151c2c] border border-gray-800 rounded-2xl p-8 text-center max-w-md w-full">
                    <ShoppingBag
                        size={55}
                        className="mx-auto text-orange-500 mb-4"
                    />

                    <h2 className="text-2xl font-bold text-white mb-2">
                        No Order Found
                    </h2>

                    <p className="text-gray-400 mb-6">
                        Order details are not available.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    const payment = order.payment || {};

    const address = payment.shippingAddress || {};

    const items = payment.items || [];

    return (
        <div className="min-h-screen bg-[#070d18] text-white px-4 py-8 sm:px-6 lg:px-10">

            {/* SUCCESS HEADER */}
            <div className="max-w-5xl mx-auto text-center">

                <div className="flex justify-center mb-4">
                    <div className="bg-green-500/10 p-4 rounded-full">
                        <CheckCircle2
                            size={75}
                            className="text-green-500"
                            strokeWidth={1.7}
                        />
                    </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold">
                    Order Confirmed! 🎉
                </h1>

                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>

                {/* ORDER ID */}
                <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-2 bg-[#151c2c] border border-gray-800 px-5 py-3 rounded-xl">
                    <span className="text-gray-400 text-sm">
                        Order ID:
                    </span>

                    <span className="font-bold text-orange-400 break-all">
                        {order.orderId}
                    </span>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">

                    {/* PAYMENT DETAILS */}
                    <div className="bg-[#151c2c] border border-gray-800 rounded-2xl p-5 sm:p-6">

                        <div className="flex items-center gap-3 mb-5">
                            <div className="bg-green-500/10 p-2 rounded-lg">
                                <CreditCard className="text-green-500" size={22} />
                            </div>

                            <h2 className="text-xl font-bold">
                                Payment Details
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="bg-[#0d1422] rounded-xl p-4">
                                <p className="text-gray-500 text-xs">
                                    Payment Status
                                </p>

                                <p className="text-green-400 font-bold mt-1">
                                    ✓ Successful
                                </p>
                            </div>

                            <div className="bg-[#0d1422] rounded-xl p-4">
                                <p className="text-gray-500 text-xs">
                                    Amount Paid
                                </p>

                                <p className="text-orange-400 font-bold mt-1">
                                    ₹{Number(order.amount || 0).toLocaleString("en-IN")}
                                </p>
                            </div>

                            <div className="bg-[#0d1422] rounded-xl p-4 sm:col-span-2">
                                <p className="text-gray-500 text-xs">
                                    Payment ID
                                </p>

                                <p className="text-gray-200 font-medium text-sm mt-1 break-all">
                                    {order.paymentId}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PRODUCTS */}
                    <div className="bg-[#151c2c] border border-gray-800 rounded-2xl p-5 sm:p-6">

                        <div className="flex items-center gap-3 mb-5">
                            <div className="bg-orange-500/10 p-2 rounded-lg">
                                <PackageCheck className="text-orange-500" size={22} />
                            </div>

                            <h2 className="text-xl font-bold">
                                Order Items
                            </h2>
                        </div>

                        <div className="space-y-4">

                            {items.map((item, index) => (
                                <div
                                    key={item.productId || index}
                                    className="flex gap-4 bg-[#0d1422] rounded-xl p-3 sm:p-4"
                                >

                                    {/* IMAGE */}
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        {item.imgsrc ? (
                                            <img
                                                src={item.imgsrc}
                                                alt={item.title}
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <ShoppingBag className="text-gray-400" />
                                        )}
                                    </div>

                                    {/* DETAILS */}
                                    <div className="flex-1 min-w-0">

                                        <h3 className="font-semibold text-white line-clamp-2">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm mt-1">
                                            Quantity: {item.qty}
                                        </p>

                                        <p className="text-orange-400 font-bold mt-2">
                                            ₹{Number(item.price || 0).toLocaleString("en-IN")}
                                        </p>
                                    </div>

                                    {/* TOTAL */}
                                    <div className="hidden sm:flex items-center">
                                        <p className="font-bold text-white">
                                            ₹
                                            {(
                                                Number(item.price || 0) *
                                                Number(item.qty || 0)
                                            ).toLocaleString("en-IN")}
                                        </p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>

                    {/* SHIPPING ADDRESS */}
                    <div className="bg-[#151c2c] border border-gray-800 rounded-2xl p-5 sm:p-6">

                        <div className="flex items-center gap-3 mb-5">
                            <div className="bg-orange-500/10 p-2 rounded-lg">
                                <MapPin className="text-orange-500" size={22} />
                            </div>

                            <h2 className="text-xl font-bold">
                                Delivery Address
                            </h2>
                        </div>

                        <div className="bg-[#0d1422] rounded-xl p-4">

                            <p className="font-bold text-white">
                                {address.fullName}
                            </p>

                            <p className="text-gray-400 mt-2 leading-6">
                                {address.address}
                                <br />
                                {address.city}, {address.state}
                                <br />
                                {address.country} - {address.pincode}
                            </p>

                            <p className="text-gray-400 mt-2">
                                📞 {address.phonenumber}
                            </p>

                        </div>
                    </div>
                </div>

                {/* RIGHT - SUMMARY */}
                <div className="lg:col-span-1">

                    <div className="bg-[#151c2c] border border-gray-800 rounded-2xl p-5 sm:p-6 lg:sticky lg:top-6">

                        <h2 className="text-xl font-bold mb-5">
                            Order Summary
                        </h2>

                        <div className="flex justify-between text-gray-400 mb-3">
                            <span>Items</span>
                            <span>
                                {items.reduce(
                                    (total, item) => total + Number(item.qty || 0),
                                    0
                                )}
                            </span>
                        </div>

                        <div className="border-t border-gray-800 my-4" />

                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">
                                Total Paid
                            </span>

                            <span className="text-xl font-extrabold text-orange-500">
                                ₹{Number(order.amount || 0).toLocaleString("en-IN")}
                            </span>
                        </div>

                        <div className="mt-5 bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                            <p className="text-green-400 font-semibold text-sm">
                                ✓ Payment Successful
                            </p>

                            <p className="text-gray-400 text-xs mt-1">
                                Your order has been successfully placed.
                            </p>
                        </div>

                        {/* CONTINUE SHOPPING */}
                        <button
                            onClick={() => navigate("/")}
                            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] transition-all py-3.5 rounded-xl font-bold flex items-center justify-center gap-2"
                        >
                            Continue Shopping
                            <ArrowRight size={19} />
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;

