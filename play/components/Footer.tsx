import React from "react";
import { useTranslation } from "react-i18next";

export default () => {
    let { t } = useTranslation();

    return (
        <>
            <div id="affiliatefooter" style={{ position: "relative" }}>
                <div id="ftrWrap" style={{ position: "relative" }}>
                    <div id="ftrBg" style={{ position: "relative" }}>
                        <div id="ftrContent" style={{ position: "relative" }}> 
                            <img src="images/disney-logo3.gif" id="disGame" alt="Disney.com Games" />
                            <ul>
                                <li><a href={__environment__.links.company} target="_parent">{t('company')}</a></li>
                                <li>|</li>
                                <li><a href={__environment__.links.terms} target="_parent">{t('terms')}</a></li>
                                <li>|</li>
                                <li><a className="new" href={__environment__.links.privacy} target="_parent">{t('privacy')}</a><span className="asterisk">{t('asterisk')}</span></li>
                                <li>|</li>
                                <li><a href={__environment__.links.contact} target="_parent">{t('contact')}</a></li>
                                <li>|</li>
                                <li><a href={__environment__.links.sitemap} target="_parent">{t('map')}</a></li>
                                <li>|</li>
                                <li><a href={__environment__.links.affiliates} target="_blank">{t('affiliates')}</a></li>
                                <li>|</li>
                                <li className="noMarg"><a href={__environment__.links.help} target="_parent">{t('help')}</a></li>  
                            </ul>
                            <p>{t('copyright')}<br /><span className="asterisk">{t('asterisk')}</span> <span className="updated">{t('lastupdated')}</span></p>
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
