import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
//import { addToCart } from "../../../../API/Controllers/cart";

const Showproduct = () => {
  const { filterData, addToCart } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-[#070d18] text-white py-2">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-4xl font-bold text-center mb-10">
          Featured Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {filterData?.map((product, index) => (
            <div
              // यहाँ product._id के साथ index बैकअप में दिया है ताकि कभी undefined होने पर भी एरर न आए
              key={product._id || index}
              className="bg-[#1F2937] rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]"
            >
              {/* Image Container */}
              <div className="relative bg-white h-48 overflow-hidden rounded-t-2xl flex items-center justify-center p-2">
                <Link
                  to={`/product/${product._id}`}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={product.imgsrc}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain transition duration-500 group-hover:scale-110 group-hover:opacity-90"
                  />
                </Link>

                {/* Price */}
                <span className="absolute left-0 bottom-0 bg-orange-600 text-white px-5 py-2 text-sm font-bold rounded-tr-xl">
                  ₹{product.price}
                </span>
              </div>

              {/* Content */}
              <div className="px-4 py-3">
                <h2 className="text-2xl font-extrabold text-white mb-2 cursor-pointer hover:text-orange-400 transition duration-200 line-clamp-1">
                  {product.title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-sm mt-1 leading-5 line-clamp-2 min-h-[40px]">
                  {product.description}
                </p>

                {/* Category */}
                <div className="mt-1">
                  <span className="bg-[#293447] text-gray-300 text-xs px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Button */}
                <button onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgsrc)} className="w-full mt-2 bg-orange-600 hover:bg-orange-500 text-white py-3 rounded-full font-bold transition duration-300">
                  🛒 ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Showproduct;