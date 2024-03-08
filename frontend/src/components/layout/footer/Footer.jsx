import React from 'react'
import { BiLogoPlayStore } from "react-icons/bi";
import { FaAppStoreIos } from "react-icons/fa";

import "./Footer.css";
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <>
            <footer id="footer">
                <div className="leftFooter">
                    <h4>DOWNLOAD OUR APP</h4>
                    <p>Download App for Android and IOS mobile phone</p>
                    <BiLogoPlayStore size={30}/>
                    <FaAppStoreIos size={30} style={{marginTop  : "20px"}}/>
                </div>

                <div className="midFooter">
                    <h1>ShoppingCart</h1>
                    <p>Learning perpose</p>

                    <p>Copyrights 2024 &copy; Something</p>
                </div>

                <div className="rightFooter">
                    <h4>Follow Us</h4>
                    <Link to={"http://instagram.com/somethingoff"}>Instagram</Link>
                    <Link to={"http://instagram.com/somethingoff"}>Facebook</Link>
                </div>
            </footer>
        </>
    )
}

export default Footer