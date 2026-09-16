import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce, } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  // const url = "http://localhost:1000/api";
  const url = "https://mern-e-comerse-api.onrender.com";
  const [products, setproducts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [token, setToken] = useState("");
  const [user, setuser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState();
  const [reload, setReload] = useState(false);
  const [useraddress, setuseraddress] = useState("");


  // 1. App load hone par localStorage se token check karein
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // 2. All Products fetch karne ke liye
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get("http://localhost:1000/api/product/all");
        setproducts(api.data.products);
        setFilterData(api.data.products);
      } catch (err) {
        console.log("Product Error:", err);
      }
    };

    fetchProduct();
    getaddress();
    userCart();
  }, [token, reload]);

  // 3. ✅ USER PROFILE FETCH & PRINT FUNCTION
  const userprofile = async () => {
    const currentToken = token || localStorage.getItem("token");

    if (!currentToken) return;
    // ✅ Token milte hi states update kar dein
    setToken(currentToken);
    setIsAuthenticated(true);

    try {
      const api = await axios.get("http://localhost:1000/api/user/profile", {
        headers: {
          "Content-Type": "application/json",
          "Auth": currentToken, // Agar backend "Authorization: Bearer <token>" use karta hai to 'Auth' ki jagah Authorization likhein
        },
      });

      // 🎯 CONSOLE LOG USER PROFILE HERE:
      console.log("User Profile Data:", api.data.user || api.data);

      setuser(api.data.user || api.data);
    } catch (err) {
      console.log("Profile Fetch Error:", err.response?.data || err.message);
    }
  };

  // 4. ✅ Jab token mil jaye tab User Profile automatic fetch ho
  useEffect(() => {
    if (token || localStorage.getItem("token")) {
      userprofile();
    }
  }, [token]);

  // Register Function
  const register = async (name, email, password) => {
    try {
      const api = await axios.post("http://localhost:1000/api/user/register", {
        name,
        email,
        password,
      });

      if (api.data.success) {
        toast.success(api.data.message, {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        toast.error(api.data.message, {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });
      }

      return api.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
      throw err;
    }
  };

  // Login Function
  const login = async (email, password) => {
    try {
      const api = await axios.post("http://localhost:1000/api/user/login", {
        email,
        password,
      });

      if (api.data.success) {
        toast.success(api.data.message, {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });

        // Token aur state save karein
        setToken(api.data.token);
        setIsAuthenticated(true);
        localStorage.setItem("token", api.data.token);
      } else {
        toast.error(api.data.message, {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });
      }

      return api.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
      throw err;
    }
  };

  // Logout Function
  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    setuser(null);
    localStorage.removeItem("token");
    toast.success("Logged out successfully...!", {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
      transition: Bounce,
    });
  };
  // ADD TO CART
  // Add To Cart Function
  const addToCart = async (productId, title, price, qty, imgsrc) => {
    try {
      const currentToken = token || localStorage.getItem("token");

      const api = await axios.post(
        "http://localhost:1000/api/cart/add",
        {
          productId,
          title,
          price: Number(price),
          qty: Number(qty),
          imgsrc,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: currentToken,
          },
        }
      );

      console.log("Cart Response:", api.data);

      // 🔥 MOST IMPORTANT
      // Backend se jo latest cart aaya hai,
      // wahi frontend mein set karo
      setCart(api.data.cart);

      toast.success(api.data.message || "Item added to cart", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });

      console.log("User Name:", user?.name);
      console.log("User Email:", user?.email);

    } catch (err) {
      console.log(
        "Cart Error:",
        err.response?.data || err.message
      );

      toast.error(
        err.response?.data?.message || "Failed to add item",
        {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        }
      );
    }
  };

  // GET user ITEMS CART

  const userCart = async () => {
    try {
      const currentToken = token || localStorage.getItem("token");

      const api = await axios.get("http://localhost:1000/api/cart/user", {
        headers: {
          "Content-Type": "application/json",
          Auth: currentToken,
        },
      });

      console.log("User Cart:", api.data.cart);

      setCart(api.data.cart);

    } catch (err) {
      console.log("Cart Fetch Error:", err.response?.data || err.message);
    }
  };

  //---decrease qty
  const decreaseQty = async (productId, qty) => {
    try {
      const currentToken = token || localStorage.getItem("token");

      const api = await axios.post(
        "http://localhost:1000/api/cart/--qty",
        {
          productId,
          qty,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: currentToken,
          },
        }
      );

      console.log("decrease cart items", api)

      // Updated cart state
      setCart(api.data.cart);
      setReload(!reload)
    } catch (err) {
      console.log("Decrease Error:", err.response?.data || err.message);
    }
  };
  //---REMOVE  QTY
  const removeFromCart = async (productId, qty) => {
    try {
      const currentToken = token || localStorage.getItem("token");

      console.log("Token:", currentToken);

      const api = await axios.delete(
        `http://localhost:1000/api/cart/remove/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Auth: currentToken,
          },
        }
      );


      console.log("decrease cart items", api)

      // Updated cart state
      setCart(api.data.cart);
      setReload(!reload)
      console.log("remove item from cart", api)
    } catch (err) {
      console.log("Decrease Error:", err.response?.data || err.message);
    }
  };

  //      CLEAR CART
  const cartClear = async () => {
    try {
      const currentToken = token || localStorage.getItem("token");

      console.log("Token:", currentToken);

      const api = await axios.delete(
        "http://localhost:1000/api/cart/clear",
        {
          headers: {
            Auth: currentToken,
          },
        }
      );

      console.log("Clear Cart Response:", api.data);

      setCart(api.data.cart);

      toast.success("Cart cleared successfully!", {
        autoClose: 1000, // 1 second
      });

    } catch (err) {
      console.log(
        "Clear Cart Error:",
        err.response?.data || err.message
      );
    }
  };

  // SHIPPING ADDRESS
  // SHIPPING ADDRESS
  const shippingAddress = async (
    fullName,
    country,
    state,
    city,
    pincode,
    phonenumber,
    address
  ) => {
    try {
      const currentToken = token || localStorage.getItem("token");
      /*console.log("DATA GOING TO BACKEND:", {
        fullName,
        country,
        state,
        city,
        pincode,
        phonenumber,
        address,
      });*/

      const api = await axios.post(
        "http://localhost:1000/api/address/add",
        {
          fullName,
          country,
          state,
          city,
          pincode,
          phonenumber,
          address,
        },
        {
          headers: {
            Auth: currentToken,
          },
        }
      );

      console.log("address add:", api.data);

      // Address save hone ke baad latest address dobara fetch karo
      await getaddress();

      setReload(!reload);

      toast.success(
        api.data.message || "Address saved successfully!",
        {
          autoClose: 1000,
        }
      );

      return api.data;

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Address add failed"
      );

      return {
        success: false,
      };
    }
  };
  // GET USER ADDRESS
  const getaddress = async () => {
    try {
      const currentToken = token || localStorage.getItem("token");

      const api = await axios.get(
        "http://localhost:1000/api/address/get",
        {
          headers: {
            Auth: currentToken,
          },
        }
      );

      console.log("User Address:", api.data.userAddress);

      setuseraddress(api.data.userAddress);

    } catch (err) {
      console.log(
        "Address Fetch Error:",
        err.response?.data || err.message
      );
    }
  };
  useEffect(() => {
    if (token) {
      getaddress();
    }
  }, [token, reload]);
  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        token,
        setIsAuthenticated,
        isAuthenticated,
        setFilterData,
        filterData,
        user,
        logout,
        userprofile,
        addToCart,
        cart,
        url,
        decreaseQty,
        removeFromCart,
        cartClear,
        shippingAddress,
        useraddress
        // Profile manual refresh ke liye export bhi kar diya
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;