import React from "react";

const Loading = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="flex flex-col items-center gap-3">

                <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-purple-500"></div>

                <p className="text-sm font-medium text-white">
                    Loading...
                </p>

            </div>

        </div>
    );
};

export default Loading;

