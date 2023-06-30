import React from "react";
import FacebookIcon from "../facebook.png";
import InstagramIcon from "../instagram.png";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="contact-info">
                <h3>Contact Information</h3>
                <p>Email: khata.knyharnia@gmail.com</p>
                <p>Phone: +380502577255</p>
            </div>
            <div className="social-links">
                <a href="https://www.facebook.com/khata.knyharnia" target="_blank" rel="noopener noreferrer">
                    <img src={FacebookIcon} alt="Facebook" className="social-icon" />
                </a>
                <a href="https://www.instagram.com/khata.knyharnia" target="_blank" rel="noopener noreferrer">
                    <img src={InstagramIcon} alt="Instagram" className="social-icon" />
                </a>
            </div>

        </footer>
    );
};

export default Footer;
