import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import Loading from "../components/user/Loading";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  const url = "https://mern-e-comerse-api.onrender.com/api";

  const [products, setproducts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [token, setToken] = useState("");
  const [user, setuser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState();
  const [reload, setReload] = useState(false);
  const [useraddress, setuseraddress] = useState("");
  const [loading, setLoading] = useState(false);

  // TOKEN CHECK
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      try {
        const api = await axios.get(`${url}/product/all`);

        setproducts(api.data.products);
        setFilterData(api.data.products);
      } catch (err) {
        console.log("Product Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    getaddress();
    userCart();
  }, [token, reload]);

  // USER PROFILE
  const userprofile = async () => {
    const currentToken =
      token || localStorage.getItem("token");

    if (!currentToken) return;

    setToken(currentToken);
    setIsAuthenticated(true);
    setLoading(true);

    try {
      const api = await axios.get(`${url}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Auth: currentToken,
        },
      });

      console.log(
        "User Profile Data:",
        api.data.user || api.data
      );

      setuser(api.data.user || api.data);
    } catch (err) {
      console.log(
        "Profile Fetch Error:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // USER PROFILE AUTO FETCH
  useEffect(() => {
    if (token || localStorage.getItem("token")) {
      userprofile();
    }
  }, [token]);

  // REGISTER
  const register = async (name, email, password) => {
    setLoading(true);

    try {
      const api = await axios.post(`${url}/user/register`, {
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
      toast.error(
        err.response?.data?.message ||
        "Registration Failed"
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const login = async (email, password) => {
    setLoading(true);

    try {
      const api = await axios.post(`${url}/user/login`, {
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
      toast.error(
        err.response?.data?.message ||
        "Login Failed"
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
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

    setLoading(false);
  };

  // ADD TO CART
  const addToCart = async (
    productId,
    title,
    price,
    qty,
    imgsrc
  ) => {
    setLoading(true);

    try {
      const currentToken =
        token || localStorage.getItem("token");

      const api = await axios.post(
        `${url}/cart/add`,
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

      setCart(api.data.cart);

      toast.success(
        api.data.message || "Item added to cart",
        {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        }
      );

      console.log("User Name:", user?.name);
      console.log("User Email:", user?.email);
    } catch (err) {
      console.log(
        "Cart Error:",
        err.response?.data || err.message
      );

      toast.error(
        err.response?.data?.message ||
        "Failed to add item",
        {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // GET USER CART
  const userCart = async () => {
    setLoading(true);

    try {
      const currentToken =
        token || localStorage.getItem("token");

      const api = await axios.get(`${url}/cart/user`, {
        headers: {
          "Content-Type": "application/json",
          Auth: currentToken,
        },
      });

      console.log("User Cart:", api.data.cart);

      setCart(api.data.cart);
    } catch (err) {
      console.log(
        "Cart Fetch Error:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // DECREASE QTY
  const decreaseQty = async (productId, qty) => {
    setLoading(true);

    try {
      const currentToken =
        token || localStorage.getItem("token");

      const api = await axios.post(
        `${url}/cart/--qty`,
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

      console.log("decrease cart items", api);

      setCart(api.data.cart);
      setReload(!reload);
    } catch (err) {
      console.log(
        "Decrease Error:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // REMOVE FROM CART
  const removeFromCart = async (productId, qty) => {
    setLoading(true);

    try {
      const currentToken =
        token || localStorage.getItem("token");

      console.log("Token:", currentToken);

      const api = await axios.delete(
        `${url}/cart/remove/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Auth: currentToken,
          },
        }
      );

      console.log("remove cart item", api);

      setCart(api.data.cart);
      setReload(!reload);
    } catch (err) {
      console.log(
        "Remove Error:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // CLEAR CART
  const cartClear = async () => {
    setLoading(true);

    try {
      const currentToken =
        token || localStorage.getItem("token");

      const api = await axios.delete(
        `${url}/cart/clear`,
        {
          headers: {
            Auth: currentToken,
          },
        }
      );

      console.log(
        "Clear Cart Response:",
        api.data
      );

      setCart(api.data.cart);

      toast.success("Cart cleared successfully!", {
        autoClose: 1000,
      });
    } catch (err) {
      console.log(
        "Clear Cart Error:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

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
    setLoading(true);

    try {
      const currentToken =
        token || localStorage.getItem("token");

      const api = await axios.post(
        `${url}/address/add`,
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

      await getaddress();

      setReload(!reload);

      toast.success(
        api.data.message ||
        "Address saved successfully!",
        {
          autoClose: 1000,
        }
      );

      return api.data;
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Address add failed"
      );

      return {
        success: false,
      };
    } finally {
      setLoading(false);
    }
  };

  // GET USER ADDRESS
  const getaddress = async () => {
    setLoading(true);

    try {
      const currentToken =
        token || localStorage.getItem("token");

      const api = await axios.get(
        `${url}/address/get`,
        {
          headers: {
            Auth: currentToken,
          },
        }
      );

      console.log(
        "User Address:",
        api.data.userAddress
      );

      setuseraddress(api.data.userAddress);
    } catch (err) {
      console.log(
        "Address Fetch Error:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ADDRESS REFETCH
  useEffect(() => {
    if (token) {
      getaddress();
    }
  }, [token, reload]);

  // RETURN
  return (
    <>
      {loading && <Loading />}

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
          useraddress,
          loading,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </>
  );
};

export default AppState;