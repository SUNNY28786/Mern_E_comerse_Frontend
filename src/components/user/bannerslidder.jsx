import React, { useState, useEffect } from "react";

const images = [
    "/banners/banner1.png",
    "/banners/banner2.jpg",
    "/banners/banner3.jpg",
    "/banners/banner4.webp",
];

const BannerSlider = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIndex(index === images.length - 1 ? 0 : index + 1);
        }, 3000);

        return () => clearTimeout(timer);
    }, [index]);

    const duration = index === 0 ? 400 : 800;

    return (
        <div className="relative w-full overflow-hidden bg-black">
            <div
                className="flex"
                style={{
                    transform: `translateX(-${index * 100}%)`,
                    transition: `transform ${duration}ms ease-in-out`,
                }}
            >
                {images.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`Banner ${i + 1}`}
                        className="w-full shrink-0 object-cover h-[160px] sm:h-[260px] lg:h-[380px]"
                    />
                ))}
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === i ? "w-6 bg-white" : "w-2 bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerSlider;