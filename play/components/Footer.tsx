import React from "react";

export default () => {
    return (
        <>
        <div id="affiliatefooter" style={{ position: "relative" }}>
            <div id="ftrWrap" style={{ position: "relative" }}>
                <div id="ftrBg" style={{ position: "relative" }}>
                    <div id="ftrContent" style={{ position: "relative" }}> 
                        <img src="images/disney-logo3.gif" id="disGame" alt="Disney.com Games" />
                        <ul>
                            <li><a href="http://www.clubpenguin.com/company/index.htm" target="_parent">Company</a></li>
                            <li>|</li>
                            <li><a href="http://www.clubpenguin.com/terms.htm" target="_parent">Terms of Use</a></li>
                            <li>|</li>
                            <li><a className="new" href="http://www.clubpenguin.com/privacy.htm" target="_parent">Privacy Policy</a><span className="asterisk">*</span></li>
                            <li>|</li>
                            <li><a href="http://support.clubpenguin.com/help/contact/" target="_parent">Contact Us</a></li>
                            <li>|</li>
                            <li><a href="http://www.clubpenguin.com/sitemap.htm" target="_parent">Site Map</a></li>
                            <li>|</li>
                            <li><a href="https://signup.cj.com/member/brandedPublisherSignUp.do?air_refmerchantid=3297551" target="_blank">Affiliates</a></li>
                            <li>|</li>
                            <li className="noMarg"><a href="http://support.clubpenguin.com/help/" target="_parent">Help</a></li>  
                        </ul>
                        <p>Club Penguin&trade; Disney Canada Inc. &copy; Disney. All rights reserved.<br /><span className="asterisk">*</span> <span className="updated">Updated on January 11, 2012</span></p>
                        <a href="http://www.truste.org/ivalidate.php?url=www.clubpenguin.com&sealid=105" target="_blank" style={{ position: "absolute", top: "40px", right: "10px" }}>
                            <img src="images/truste.gif" alt="TRUSTe - Kids Privacy" width="65" height="65" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
