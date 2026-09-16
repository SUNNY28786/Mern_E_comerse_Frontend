import React from "react";
import { useNavigate } from "react-router-dom";
import {
    CheckCircle2,
    PackageCheck,
    CreditCard,
    MapPin,
    ShoppingBag,
    ArrowRight,
    Truck,
    Phone,
    User,
    ShieldCheck,
    Home,
} from "lucide-react";

const OrderConformation = () => {
    const navigate = useNavigate();

    // ================================
    // GET ORDER DATA
    // ================================
    let order = null;

    try {
        const savedOrder = sessionStorage.getItem("orderConfirmation");

        if (savedOrder) {
            order = JSON.parse(savedOrder);
        }
    } catch (error) {
        console.error("Order data parse error:", error);
    }

    // ================================
    // NO ORDER
    // ================================
    if (!order) {
        return (
            <div className="min-h-screen bg-[#070d18] flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-[#151c2c] border border-gray-800 rounded-2xl p-6 text-center shadow-2xl">
                    <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                        <ShoppingBag size={34} className="text-orange-500" />
                    </div>

                    <h1 className="text-xl font-bold text-white">
                        No Order Found
                    </h1>

                    <p className="text-gray-400 mt-2 text-sm">
                        Order information is not available.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-5 w-full bg-orange-500 hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-white font-bold py-2.5 rounded-xl cursor-pointer"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    const payment = order.payment || {};
    const items = payment.items || [];
    const address = payment.shippingAddress || {};

    const totalItems = items.reduce(
        (total, item) => total + Number(item.qty || 0),
        0
    );

    return (
        <div className="min-h-screen bg-[#070d18] text-white px-3 sm:px-4 py-3">
            <div className="max-w-6xl mx-auto">

                {/* =========================================
                    COMPACT SUCCESS BANNER
                ========================================= */}
                <div className="relative overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-r from-[#111d24] via-[#151c2c] to-[#10241c] shadow-xl mb-3">

                    <div className="absolute -top-16 -left-16 w-36 h-36 bg-green-500/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-orange-500/10 rounded-full blur-3xl" />

                    <div className="relative flex items-center gap-3 px-4 py-3">

                        <div className="relative shrink-0">
                            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-lg" />

                            <div className="relative w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                                <CheckCircle2
                                    size={30}
                                    className="text-green-400"
                                />
                            </div>
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-lg sm:text-xl font-extrabold leading-tight">
                                Order Confirmed! 🎉
                            </h1>

                            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                                Payment successful. Your order has been placed.
                            </p>
                        </div>

                        <div className="hidden md:flex ml-auto items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full shrink-0">
                            <ShieldCheck
                                size={15}
                                className="text-green-400"
                            />

                            <span className="text-green-400 text-xs font-semibold">
                                Payment Secure
                            </span>
                        </div>
                    </div>
                </div>

                {/* =========================================
                    TOP ORDER INFO
                ========================================= */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3">

                    {/* Order ID */}
                    <div className="bg-[#151c2c] border border-gray-800 rounded-xl p-3 hover:border-orange-500/30 hover:scale-[1.015] transition-all duration-200 cursor-pointer">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                                <PackageCheck
                                    size={19}
                                    className="text-blue-400"
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-gray-500 text-[10px]">
                                    ORDER ID
                                </p>

                                <p className="text-white font-semibold text-xs mt-0.5 truncate">
                                    {order.orderId || "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="bg-[#151c2c] border border-gray-800 rounded-xl p-3 hover:border-green-500/30 hover:scale-[1.015] transition-all duration-200 cursor-pointer">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                                <CreditCard
                                    size={19}
                                    className="text-green-400"
                                />
                            </div>

                            <div>
                                <p className="text-gray-500 text-[10px]">
                                    PAYMENT
                                </p>

                                <p className="text-green-400 font-bold text-xs mt-0.5">
                                    ✓ {payment.status || "Success"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="bg-[#151c2c] border border-gray-800 rounded-xl p-3 hover:border-orange-500/30 hover:scale-[1.015] transition-all duration-200 cursor-pointer">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                                <span className="text-orange-400 text-lg font-bold">
                                    ₹
                                </span>
                            </div>

                            <div>
                                <p className="text-gray-500 text-[10px]">
                                    AMOUNT PAID
                                </p>

                                <p className="text-orange-400 font-extrabold text-base">
                                    ₹{Number(order.amount || 0).toLocaleString("en-IN")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="bg-[#151c2c] border border-gray-800 rounded-xl p-3 hover:border-purple-500/30 hover:scale-[1.015] transition-all duration-200 cursor-pointer">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                                <ShoppingBag
                                    size={19}
                                    className="text-purple-400"
                                />
                            </div>

                            <div>
                                <p className="text-gray-500 text-[10px]">
                                    ITEMS
                                </p>

                                <p className="text-white font-bold text-xs mt-0.5">
                                    {totalItems} Item{totalItems !== 1 ? "s" : ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =========================================
                    MAIN CONTENT
                ========================================= */}
                <div className="grid lg:grid-cols-3 gap-3">

                    {/* =====================================
                        ORDERED ITEMS
                    ===================================== */}
                    <div className="lg:col-span-2 bg-[#151c2c] border border-gray-800 rounded-xl overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">

                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <ShoppingBag
                                        size={19}
                                        className="text-orange-400"
                                    />
                                </div>

                                <div>
                                    <h2 className="font-bold text-base">
                                        Ordered Items
                                    </h2>

                                    <p className="text-gray-500 text-[11px]">
                                        Your purchased products
                                    </p>
                                </div>
                            </div>

                            <span className="bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-full text-[11px] font-bold">
                                {totalItems} Items
                            </span>
                        </div>

                        {/* Products */}
                        <div className="p-3 space-y-2">

                            {items.length === 0 ? (
                                <div className="text-center py-6 text-gray-500 text-sm">
                                    No items found.
                                </div>
                            ) : (
                                items.map((item, index) => (
                                    <div
                                        key={item.productId || index}
                                        className="group flex items-center gap-3 bg-[#0d1422] border border-gray-800 hover:border-orange-500/30 hover:scale-[1.01] rounded-lg p-2.5 transition-all duration-200 cursor-pointer"
                                    >

                                        {/* Product Image */}
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                            {item.imgsrc ? (
                                                <img
                                                    src={item.imgsrc}
                                                    alt={item.title || "Product"}
                                                    className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-200"
                                                />
                                            ) : (
                                                <ShoppingBag
                                                    size={24}
                                                    className="text-gray-400"
                                                />
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">

                                            <h3 className="font-semibold text-white text-sm truncate">
                                                {item.title || "Product"}
                                            </h3>

                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-gray-500 text-[11px]">
                                                    Qty
                                                </span>

                                                <span className="bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                                    {item.qty}
                                                </span>
                                            </div>

                                            <p className="text-orange-400 font-bold text-xs mt-1">
                                                ₹{Number(item.price || 0).toLocaleString("en-IN")}
                                            </p>
                                        </div>

                                        {/* Total */}
                                        <div className="text-right shrink-0">
                                            <p className="text-gray-500 text-[9px] uppercase">
                                                Total
                                            </p>

                                            <p className="text-white font-extrabold text-sm mt-0.5">
                                                ₹
                                                {(
                                                    Number(item.price || 0) *
                                                    Number(item.qty || 0)
                                                ).toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* =====================================
                        RIGHT SIDE
                    ===================================== */}
                    <div className="space-y-3">

                        {/* DELIVERY ADDRESS */}
                        <div className="bg-[#151c2c] border border-gray-800 rounded-xl overflow-hidden hover:border-red-500/20 transition-all">

                            <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                                    <MapPin
                                        size={19}
                                        className="text-red-400"
                                    />
                                </div>

                                <div>
                                    <h2 className="font-bold text-sm">
                                        Delivery Address
                                    </h2>

                                    <p className="text-gray-500 text-[10px]">
                                        Shipping information
                                    </p>
                                </div>
                            </div>

                            <div className="p-3">
                                <div className="bg-[#0d1422] rounded-lg p-3 border border-gray-800">

                                    <div className="flex items-center gap-2 mb-1.5">
                                        <User
                                            size={14}
                                            className="text-orange-400"
                                        />

                                        <p className="font-bold text-xs">
                                            {address.fullName || "-"}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <Home
                                            size={14}
                                            className="text-gray-500 mt-0.5 shrink-0"
                                        />

                                        <div className="text-gray-400 text-[11px] leading-4">
                                            <p>
                                                {address.address || "-"}
                                            </p>

                                            <p>
                                                {address.city || "-"},{" "}
                                                {address.state || "-"}
                                            </p>

                                            <p>
                                                {address.country || "-"} -{" "}
                                                {address.pincode || "-"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-gray-800">
                                        <Phone
                                            size={13}
                                            className="text-green-400"
                                        />

                                        <span className="text-gray-400 text-[11px]">
                                            {address.phonenumber || "-"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PAYMENT DETAILS */}
                        <div className="bg-[#151c2c] border border-gray-800 rounded-xl p-3">

                            <div className="flex items-center gap-2.5 mb-2.5">
                                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                                    <CreditCard
                                        size={16}
                                        className="text-green-400"
                                    />
                                </div>

                                <h3 className="font-bold text-sm">
                                    Payment Details
                                </h3>
                            </div>

                            <div className="bg-[#0d1422] rounded-lg p-2.5">

                                <p className="text-gray-500 text-[9px]">
                                    PAYMENT ID
                                </p>

                                <p className="text-gray-300 text-[11px] font-medium break-all mt-0.5">
                                    {order.paymentId || "-"}
                                </p>

                                <div className="flex justify-between items-center mt-2.5 pt-2.5 border-t border-gray-800">
                                    <span className="text-gray-500 text-[11px]">
                                        Status
                                    </span>

                                    <span className="text-green-400 text-[11px] font-bold flex items-center gap-1">
                                        <CheckCircle2 size={13} />
                                        {payment.status || "Success"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =========================================
                    COMPACT TOTAL + BUTTON
                ========================================= */}
                <div className="mt-3 bg-gradient-to-r from-[#151c2c] to-[#111a2b] border border-gray-800 rounded-xl px-4 py-3">

                    <div className="flex flex-row items-center gap-3">

                        <div className="flex items-center gap-2.5 flex-1 min-w-0">

                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                                <Truck
                                    size={19}
                                    className="text-orange-400"
                                />
                            </div>

                            <div>
                                <p className="text-gray-500 text-[10px]">
                                    ORDER TOTAL
                                </p>

                                <p className="text-orange-400 font-extrabold text-lg leading-tight">
                                    ₹{Number(order.amount || 0).toLocaleString("en-IN")}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                sessionStorage.removeItem(
                                    "orderConfirmation"
                                );

                                navigate("/");
                            }}
                            className="shrink-0 px-4 sm:px-6 py-2.5 bg-orange-500 hover:bg-orange-600 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-white text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 cursor-pointer"
                        >
                            Continue Shopping
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConformation;
