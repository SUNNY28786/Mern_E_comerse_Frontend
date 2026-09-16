
import React, { useContext, useState, useEffect, } from "react";
import AppContext from "../../context/AppContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "../product/RelatedProduct"
import { ChevronLeft, Tag, Zap } from "lucide-react";




const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(AppContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(
          "http://localhost:1000/api/product/all"
        );

        console.log(api.data.products);

        const foundProduct = api.data.products.find(
          (item) => item._id === id
        );

        setProduct(foundProduct);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );
  }
  return (

    <>
      <div className="container mx-auto px-4 md:px-8 bg-gray-900 rounded-2xl shadow-2xl my-4 md:p-8 border-x-gray-800 border-t-gray-800 min-h-[400px]">

        <Link to="/" className="no-underline text-white">
          <button className="flex items-center text-gray-400 hover:text-orange-400 transition duration-150 mb-8 font-semibold text-lg cursor-pointer">
            <ChevronLeft className="w-6 h-6 mr-1" />
            <span>Back to All Products</span>
          </button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">

          {/* Image */}
          <div className="flex justify-center items-center start mt-6">
            <div className="w-full max-w-[380px] h-[330px] bg-white rounded-2xl border-4 border-gray-800 p-8 lg:p-10 flex items-center justify-center shadow-xl">
              <img
                src={product.imgsrc}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          {/* Product Details */}
          <div className="flex flex-col justify-center px-1 lg:px-2">

            <h1 className="text-xl lg:text-2xl font-extrabold text-white mb-2 leading-tight">
              {product.title}
            </h1>

            <p className="text-xl lg:text-xl font-bold text-orange-400 mb-3">
              ₹{product.price.toFixed(2)}
            </p>

            <h2 className="text-base lg:text-lg font-bold text-gray-200 mb-2 border-b border-orange-900/50 pb-2 flex items-center gap-2">
              <Tag className="w-5 h-5 text-orange-500" />
              <span>Product Overview</span>
            </h2>

            <p className="text-gray-400 text-xs lg:text-sm leading-6 mb-3">
              {product.description}
            </p>

            <ul className="space-y-2 text-gray-300 p-3 bg-gray-800 rounded-xl border border-gray-700 mb-4">

              <li className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="text-sm">
                  High Quality Professional Grade Materials
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="text-sm">
                  1 Year Manufacturer Warranty
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="text-sm">
                  Fast Shipping Available
                </span>
              </li>

            </ul>

            {/* Buttons */}
            <button onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgsrc)} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full transition duration-300 mb-3">
              ADD TO CART
            </button>

            <Link to="/">
              <button className="w-full border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white font-bold py-3 rounded-full transition duration-300">
                KEEP SHOPPING
              </button>
            </Link>

          </div>

        </div>


      </div>



      <RelatedProduct category={product.category} />


    </>
  );
};

export default ProductDetail;








/*<img src={product.imgsrc} alt={product.title} />

{product.title}
{product.description}s
{product.price}
{product.category}*/