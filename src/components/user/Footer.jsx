import React from 'react';

const Footer = () => {
    return (
        <>
            {/* CSS Styling Start */}
            <style>{`
        .footer-section {
            background-color: #222222;
            color: #ffffff;
            padding-top: 60px;
            position: relative;
            background-image: radial-gradient(#333 1px, transparent 1px);
            background-size: 20px 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .footer-section .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .footer-row {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 30px;
            padding-bottom: 40px;
        }

        .footer-col {
            flex: 1;
            min-width: 250px;
        }

        .about-col {
            flex: 1.5;
        }

        .logo-area {
            margin-bottom: 20px;
        }

        .brand-name {
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 1px;
            margin: 0;
        }

        .sub-brand {
            font-size: 14px;
            color: #ff2d55;
            font-weight: 600;
            letter-spacing: 2px;
            display: block;
            margin-top: -5px;
        }

        .about-text {
            font-size: 14px;
            line-height: 1.6;
            color: #cccccc;
            margin-bottom: 20px;
        }

        .social-links {
            display: flex;
            gap: 10px;
        }

        .social-links a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border: 1px solid #ff2d55;
            border-radius: 50%;
            color: #ff2d55;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .social-links a:hover {
            background-color: #ff2d55;
            color: #ffffff;
        }

        .social-links svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }

        .footer-col h3 {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 10px;
            color: #ffffff;
            margin-top: 0;
        }

        .footer-col h3::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 40px;
            height: 2px;
            background-color: #ff2d55;
        }

        .footer-links {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .footer-links li {
            margin-bottom: 12px;
        }

        .footer-links a {
            color: #cccccc;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s ease;
            display: inline-block;
        }

        .footer-links a:hover {
            color: #ff2d55;
            padding-left: 5px;
        }

        .contact-heading, .address-heading {
            margin-top: 25px !important;
        }

        .contact-info p, .address-info p {
            font-size: 14px;
            color: #cccccc;
            margin-bottom: 10px;
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-top: 0;
        }

        .contact-info svg, .address-info svg {
            width: 16px;
            height: 16px;
            fill: #ff2d55;
            flex-shrink: 0;
            margin-top: 4px;
        }

        /* Beech Wala About Section */
        .mid-about-section {
            text-align: center;
            padding: 40px 20px 30px;
            border-top: 1px solid #333;
        }

        .mid-about-section h3 {
            font-size: 22px;
            color: #ffffff;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .mid-about-section p {
            font-size: 15px;
            color: #cccccc;
            line-height: 1.8;
            max-width: 800px;
            margin: 0 auto;
        }

        /* Bottom Bar (Home About Blog Contact-us) */
        .footer-bottom {
            background-color: #1a1a1a;
            padding: 20px 0;
            border-top: 1px solid #333;
        }

        .bottom-row {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }

        .bottom-links {
            display: flex;
            gap: 30px;
        }

        .bottom-links a {
            color: #cccccc;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s;
        }

        .bottom-links a:hover {
            color: #ff2d55;
        }

        @media (max-width: 991px) {
            .footer-row {
                flex-direction: column;
            }
            .footer-col {
                min-width: 100%;
            }
            .about-col {
                flex: 1;
            }
        }

        @media (max-width: 576px) {
            .bottom-links {
                gap: 15px;
                flex-wrap: wrap;
                justify-content: center;
            }
        }
      `}</style>
            {/* CSS Styling End */}

            <footer className="footer-section">
                <div className="container">
                    <div className="footer-row">

                        {/* Column 1: My Account */}
                        <div className="footer-col contact-col">
                            <h3>My Account</h3>
                            <ul className="footer-links">
                                <li><a href="#signin">Sign In</a></li>
                                <li><a href="#cart">View Cart</a></li>
                                <li><a href="#wishlist">My Wishlist</a></li>
                                <li><a href="#track-order">Track My Order</a></li>
                                <li><a href="#help">Help</a></li>
                            </ul>

                            <h3 className="contact-heading">Got Question? Call us 24/7</h3>
                            <div className="contact-info">
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
                                    +91 7428068439
                                </p>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
                                    +91 7838384314
                                </p>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
                                    +91 7838384318
                                </p>
                            </div>

                            <h3 className="address-heading">Our Address</h3>
                            <div className="address-info">
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                                    GF-, Plot No. 36 Block E-2, Chanakya place Part-1, Uttam Nagar, North West Delhi-110059.
                                </p>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                                    A1-40, Chanakya Place Part-1, 25 Foota Road (C-1 Janak Puri), Opp. Mata Chanan Devi Hospital
                                </p>
                            </div>
                        </div>

                        {/* Column 2: About Us & Logo */}
                        <div className="footer-col about-col">
                            <div className="logo-area">
                                <h2 className="brand-name">BUNNY BOSS</h2>
                                <span className="sub-brand">KALIKA IMPEX</span>
                            </div>
                            <p className="about-text">
                                Welcome to Bunny Boss. We offer top-notch products and services tailored to your needs.
                                Our expert team ensures a seamless shopping experience every time. Trust us for reliable,
                                professional, and efficient solutions.
                            </p>
                            <div className="social-links">
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" /></svg>
                                </a>
                                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" /></svg>
                                </a>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                                </a>
                                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Column 3: Useful Links */}
                        <div className="footer-col">
                            <h3>Useful Links</h3>
                            <ul className="footer-links">
                                <li><a href="#about">About BunnyBoss</a></li>
                                <li><a href="#how-to-shop">How to shop on BunnyBoss</a></li>
                                <li><a href="#faq">FAQ</a></li>
                                <li><a href="#contact">Contact us</a></li>
                                <li><a href="#login">Log in</a></li>
                            </ul>
                        </div>

                        {/* Column 4: Customer Service */}
                        <div className="footer-col">
                            <h3>Customer Service</h3>
                            <ul className="footer-links">
                                <li><a href="#payment-methods">Payment Methods</a></li>
                                <li><a href="#money-back">Money-back guarantee!</a></li>
                                <li><a href="#returns">Returns</a></li>
                                <li><a href="#shipping">Shipping</a></li>
                                <li><a href="#terms">Terms and conditions</a></li>
                                <li><a href="#privacy">Privacy Policy</a></li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Beech Wala About Section (Do Line) */}
                <div className="mid-about-section">
                    <h3>About Bunny Boss</h3>
                    <p>
                        Bunny Boss is your one-stop destination for all your shopping needs. We provide high-quality products at affordable prices with fast delivery.<br />
                        Our mission is to deliver the best online shopping experience with 100% customer satisfaction and secure payment options.
                    </p>
                </div>

                {/* Bottom Bar - Sirf Home About Blog Contact-us */}
                <div className="footer-bottom">
                    <div className="container">
                        <div className="bottom-row">
                            <div className="bottom-links">
                                <a href="#home">Home</a>
                                <a href="#about">About</a>
                                <a href="#blog">Blog</a>
                                <a href="#contact">Contact-us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;