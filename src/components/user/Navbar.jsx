import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../../context/AppContext";



import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Shield,
  ArrowRight,
  ChevronDown,
  ArrowUp,
  Smartphone,
  Laptop,
  Tablet,
  Camera,
  Sparkles,
  IndianRupee,

} from "lucide-react";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    products = [],
    setFilterData,
    logout,
    isAuthenticated,
    cart,
  } = useContext(AppContext);

  // =========================================================
  // CART COUNT
  // =========================================================

  const cartCount =
    cart?.items?.reduce(
      (total, item) => total + Number(item?.qty || 0),
      0
    ) || 0;

  // =========================================================
  // CART TOTAL
  // =========================================================

  const cartTotal =
    cart?.items?.reduce(
      (total, item) =>
        total +
        Number(item?.price || 0) * Number(item?.qty || 0),
      0
    ) || 0;

  // =========================================================
  // FILTERS
  // =========================================================

  const filterAll = () => {
    setFilterData(products);
  };

  const filterCategory = (category) => {
    setFilterData(
      products.filter(
        (item) =>
          item?.category?.toLowerCase() ===
          category.toLowerCase()
      )
    );
  };

  const filterPrice = (price) => {
    setFilterData(
      products.filter(
        (item) => Number(item?.price || 0) >= price
      )
    );
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const submitHandler = (e) => {
    e.preventDefault();

    const value = searchTerm.trim();

    if (!value) return;

    navigate(`/product/search/${value}`);
    setSearchTerm("");
    setOpen(false);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  // =========================================================
  // CART
  // =========================================================

  const openCart = () => {
    setOpen(false);
    navigate("/cart");
  };
  // =========================================================
  // SCROLL PROGRESS
  // =========================================================

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (scrollHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = Math.min(
        100,
        Math.max(0, (scrollTop / scrollHeight) * 100)
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress, {
      passive: true,
    });

    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };



  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="premium-navbar sticky top-0 z-[100] text-white">

        {/* Subtle animated glow */}

        <div className="navbar-glow navbar-glow-one" />
        <div className="navbar-glow navbar-glow-two" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-7">

          {/* =================================================
              MAIN ROW
          ================================================= */}

          <div className="h-[64px] flex items-center gap-3">

            {/* =================================================
                LOGO
            ================================================= */}

            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="
                group
                flex
                items-center
                gap-2.5
                shrink-0
                no-underline
                cursor-pointer
              "
            >
              <div
                className="
                  logo-box
                  relative
                  w-10
                  h-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                  transition-all
                  duration-300
                  group-hover:scale-105
                "
              >
                <ShoppingCart
                  size={20}
                  className="relative z-10 text-orange-400"
                />

                <div className="logo-shine" />
              </div>

              <div className="hidden sm:block leading-none">
                <p className="text-[15px] font-extrabold tracking-tight">
                  MERN
                </p>

                <p className="text-[8px] tracking-[0.22em] text-gray-500 mt-1">
                  E-COMMERCE
                </p>
              </div>
            </Link>

            {/* =================================================
                DESKTOP SEARCH
            ================================================= */}

            <div className="hidden md:block flex-1 max-w-2xl mx-auto">
              <form
                onSubmit={submitHandler}
                className="relative group"
              >
                <Search
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    group-focus-within:text-orange-400
                    transition-colors
                  "
                />

                <input
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  type="text"
                  placeholder="Search products..."
                  className="
                    w-full
                    h-10
                    rounded-xl
                    bg-[#0b0f18]
                    border
                    border-white/[0.08]
                    pl-11
                    pr-4
                    text-sm
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    transition-all
                    duration-300
                    focus:border-orange-500/50
                    focus:bg-[#0d121d]
                    focus:shadow-[0_0_0_3px_rgba(249,115,22,0.06)]
                  "
                />
              </form>
            </div>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <div className="hidden lg:flex items-center gap-1 ml-auto">

              {isAuthenticated ? (
                <>
                  {/* CART */}

                  <Link
                    to="/cart"
                    className="
                      nav-icon-button
                      relative
                      no-underline
                      cursor-pointer
                    "
                  >
                    <ShoppingCart size={19} />

                    {cartCount > 0 && (
                      <span className="cart-badge">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </Link>

                  {/* PROFILE */}

                  <Link
                    to="/profile"
                    className="nav-link cursor-pointer"
                  >
                    <User size={17} />
                    Profile
                  </Link>

                  {/* ADMIN */}

                  <Link
                    to="/admin"
                    className="nav-link cursor-pointer"
                  >
                    <Shield size={17} />
                    Admin
                  </Link>

                  {/* LOGOUT */}

                  <button
                    onClick={handleLogout}
                    type="button"
                    className="
                      nav-link
                      border-0
                      bg-transparent
                      text-gray-400
                      hover:text-red-400
                      cursor-pointer
                    "
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="nav-link cursor-pointer"
                  >
                    <LogIn size={17} />
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="
                      register-button
                      cursor-pointer
                    "
                  >
                    <UserPlus size={17} />
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* =================================================
                MOBILE CART
            ================================================= */}

            <div className="lg:hidden ml-auto flex items-center gap-2">

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={openCart}
                  className="
                    mobile-cart-button
                    relative
                    cursor-pointer
                  "
                >
                  <ShoppingCart size={20} />

                  {cartCount > 0 && (
                    <span className="cart-badge">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </button>
              )}

              {/* MENU */}

              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="
                  mobile-menu-button
                  cursor-pointer
                "
                aria-label="Menu"
              >
                {open ? (
                  <X size={22} />
                ) : (
                  <Menu size={22} />
                )}
              </button>
            </div>
          </div>

          {/* =================================================
              MOBILE SEARCH
          ================================================= */}

          <div className="md:hidden pb-3">
            <form
              onSubmit={submitHandler}
              className="relative"
            >
              <Search
                size={17}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />

              <input
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                type="text"
                placeholder="Search products..."
                className="
                  w-full
                  h-10
                  rounded-xl
                  bg-[#090d15]
                  border
                  border-white/[0.08]
                  pl-10
                  pr-4
                  text-sm
                  text-white
                  placeholder:text-gray-600
                  outline-none
                  focus:border-orange-500/50
                  transition-all
                "
              />
            </form>
          </div>
        </div>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        {open && (
          <div className="mobile-menu">

            <div className="mobile-menu-inner">

              {isAuthenticated ? (
                <>
                  <Link
                    to="/cart"
                    onClick={() => setOpen(false)}
                    className="mobile-menu-item"
                  >
                    <span>
                      <ShoppingCart size={18} />
                      Cart
                    </span>

                    {cartCount > 0 && (
                      <small>{cartCount}</small>
                    )}
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="mobile-menu-item"
                  >
                    <span>
                      <User size={18} />
                      Profile
                    </span>

                    <ChevronDown
                      size={15}
                      className="rotate-[-90deg]"
                    />
                  </Link>

                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="mobile-menu-item"
                  >
                    <span>
                      <Shield size={18} />
                      Admin
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mobile-menu-item logout-item"
                  >
                    <span>
                      <LogOut size={18} />
                      Logout
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="mobile-menu-item"
                  >
                    <span>
                      <LogIn size={18} />
                      Login
                    </span>
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="mobile-menu-item register-mobile"
                  >
                    <span>
                      <UserPlus size={18} />
                      Create Account
                    </span>

                    <ArrowRight size={16} />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* =====================================================
    SCROLL PROGRESS BUTTON
===================================================== */}

      {scrollProgress > 3 && (
        <button
          type="button"
          onClick={scrollToTop}
          className="scroll-progress-button"
          aria-label="Scroll to top"
          style={{
            "--scroll-progress": `${scrollProgress}%`,
          }}
        >
          <div className="scroll-progress-ring">
            <div className="scroll-progress-inner">
              <ArrowUp size={17} />
            </div>
          </div>
        </button>
      )}


      {/* =====================================================
          HOMEPAGE FILTERS
      ===================================================== */}
      {location.pathname === "/" && (
        <div className="filter-bar bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-b border-purple-100 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-3 sm:px-5">
            <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-hide">

              {/* ALL */}
              <button
                type="button"
                onClick={filterAll}
                className="filter-pill active-filter
            bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600
            text-white font-semibold
            border border-transparent
            shadow-md shadow-pink-300/50
            hover:shadow-lg hover:shadow-pink-400/60
            hover:scale-105 active:scale-95
            transition-all duration-300
            rounded-full px-4 py-1.5 text-sm whitespace-nowrap cursor-pointer
            flex items-center gap-1.5"
              >
                <Sparkles size={16} strokeWidth={2.2} />
                All
              </button>

              {/* MOBILES */}
              <button
                type="button"
                onClick={() => filterCategory("Mobiles")}
                className="filter-pill
            bg-white text-black font-medium
            border border-gray-200
            hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600
            hover:text-white hover:border-white
            hover:shadow-md hover:shadow-blue-400/60
            hover:scale-105 active:scale-95
            transition-all duration-300
            rounded-full px-4 py-1.5 text-sm whitespace-nowrap cursor-pointer
            flex items-center gap-1.5"
              >
                <Smartphone size={16} strokeWidth={2.2} />
                Mobiles
              </button>

              {/* LAPTOPS */}
              <button
                type="button"
                onClick={() => filterCategory("Laptops")}
                className="filter-pill
            bg-white text-black font-medium
            border border-gray-200
            hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600
            hover:text-white hover:border-white
            hover:shadow-md hover:shadow-emerald-400/60
            hover:scale-105 active:scale-95
            transition-all duration-300
            rounded-full px-4 py-1.5 text-sm whitespace-nowrap cursor-pointer
            flex items-center gap-1.5"
              >
                <Laptop size={16} strokeWidth={2.2} />
                Laptops
              </button>

              {/* TABLETS */}
              <button
                type="button"
                onClick={() => filterCategory("Tablets")}
                className="filter-pill
            bg-white text-black font-medium
            border border-gray-200
            hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-600
            hover:text-white hover:border-white
            hover:shadow-md hover:shadow-violet-400/60
            hover:scale-105 active:scale-95
            transition-all duration-300
            rounded-full px-4 py-1.5 text-sm whitespace-nowrap cursor-pointer
            flex items-center gap-1.5"
              >
                <Tablet size={16} strokeWidth={2.2} />
                Tablets
              </button>

              {/* CAMERAS */}
              <button
                type="button"
                onClick={() => filterCategory("Cameras")}
                className="filter-pill
            bg-white text-black font-medium
            border border-gray-200
            hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600
            hover:text-white hover:border-white
            hover:shadow-md hover:shadow-amber-400/60
            hover:scale-105 active:scale-95
            transition-all duration-300
            rounded-full px-4 py-1.5 text-sm whitespace-nowrap cursor-pointer
            flex items-center gap-1.5"
              >
                <Camera size={16} strokeWidth={2.2} />
                Cameras
              </button>

              <div className="filter-divider w-px h-6 bg-gradient-to-b from-transparent via-purple-300 to-transparent mx-1 shrink-0" />

              {/* ₹39,999+ */}
              <button
                type="button"
                onClick={() => filterPrice(39999)}
                className="filter-pill price-pill
            bg-gradient-to-r from-rose-300 to-pink-300
          text-black
           border border-rose-300
            hover:from-rose-600 hover:to-pink-600
            hover:text-white hover:border-white
            hover:shadow-md hover:shadow-rose-400/60
            hover:scale-105 active:scale-95
            transition-all duration-300
            rounded-full px-4 py-1.5 text-sm whitespace-nowrap cursor-pointer
            flex items-center gap-1.5"
              >
                <IndianRupee size={15} strokeWidth={2.5} />
                39,999+
              </button>

              {/* ₹49,999+ */}
              <button
                type="button"
                onClick={() => filterPrice(49999)}
                className="filter-pill price-pill
            bg-gradient-to-r from-sky-100 to-blue-100
            text-black font-semibold
            border border-sky-200
            hover:from-sky-600 hover:to-blue-600
            hover:text-white hover:border-white
            hover:shadow-md hover:shadow-sky-400/60
            hover:scale-105 active:scale-95
            transition-all duration-300
            rounded-full px-4 py-1.5 text-sm whitespace-nowrap cursor-pointer
            flex items-center gap-1.5"
              >
                <IndianRupee size={15} strokeWidth={2.5} />
                49,999+
              </button>

              {/* ₹65,999+ */}
              <button
                type="button"
                onClick={() => filterPrice(65999)}
                className="filter-pill price-pill
            bg-gradient-to-r from-sky-300 to-blue-300
            text-black
            border border-sky-300
            hover:from-emerald-600 hover:to-green-600
            hover:text-white hover:border-white
            hover:shadow-md hover:shadow-emerald-400/60
            hover:scale-105 active:scale-95
            transition-all duration-300
            rounded-full px-4 py-1.5 text-sm whitespace-nowrap cursor-pointer
            flex items-center gap-1.5"
              >
                <IndianRupee size={15} strokeWidth={2.5} />
                65,999+
              </button>

              {/* ₹80,000+ */}
              <button
                type="button"
                onClick={() => filterPrice(80000)}
                className="filter-pill price-pill
           bg-gradient-to-r from-purple-300 to-fuchsia-300
           text-black
           border border-purple-300
            hover:from-purple-600 hover:to-fuchsia-600
            hover:text-white hover:border-white
            hover:shadow-md hover:shadow-purple-400/60
            hover:scale-105 active:scale-95
            transition-all duration-300
            rounded-full px-4 py-1.5 text-sm whitespace-nowrap cursor-pointer
            flex items-center gap-1.5"
              >
                <IndianRupee size={15} strokeWidth={2.5} />
                80,000+
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          MOBILE FLOATING CART
      ===================================================== */}

      {isAuthenticated &&
        cartCount > 0 &&
        location.pathname !== "/cart" && (
          <div className="floating-cart-wrapper">

            <button
              type="button"
              onClick={openCart}
              className="floating-cart cursor-pointer"
            >
              {/* ICON */}

              <div className="floating-cart-icon">
                <ShoppingCart size={20} />

                <span>
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              </div>

              {/* TEXT */}

              <div className="floating-cart-info">
                <p>
                  {cartCount} item
                  {cartCount !== 1 ? "s" : ""} in cart
                </p>

                <strong>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </strong>
              </div>

              {/* BUTTON */}

              <div className="floating-cart-action">
                View Cart
                <ArrowRight size={16} />
              </div>
            </button>
          </div>
        )}
    </>
  );
};

export default Navbar;