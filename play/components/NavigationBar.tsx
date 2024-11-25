import React, { createRef, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import NavigationLink from "./NavigationLink";
import LanguageSelect from "./LanguageSelect";
import ScreenSizeToggle from "./ScreenSizeToggle";
import TrialDaysLeftContext from "../context/TrialDaysLeftContext";

export default () => {
    let { t } = useTranslation();

    let headerRef = createRef<HTMLDivElement>();
    let wrapRef = createRef<HTMLDivElement>();
    let [ trialDaysLeft ] = useContext(TrialDaysLeftContext);

    useEffect(() => {
        if (trialDaysLeft > 0 && headerRef.current && wrapRef.current) {
            headerRef.current.style.height = "28px";
            wrapRef.current.style.height = "28px";
        }
    }, [trialDaysLeft]);

    return (
        <div id="affiliateheaderforcp" ref={headerRef}>
            <div id="hdrWrap" style={{ margin: "0 0 -5px" }} ref={wrapRef}>
                <div id="navBg">
                    <div id="htmlNav">
                        <ul id="bu_nav">
                            <li><NavigationLink link={__environment__.links.home} text={t('home')} /></li>
                            <li>|</li>
                            <li><NavigationLink link={__environment__.links.blog} text={t('blog')} /></li>
                            <li>|</li>
                            <li><NavigationLink link={__environment__.links.help} text={t('help')} /></li>
                            <li>|</li>
                            <li><NavigationLink link={__environment__.links.parents} text={t('parents')} /></li>
                            <li>|</li>
                            <li className="noMarg"><NavigationLink link={__environment__.links.membership} text={t('membership')} /></li>
                        </ul>
                        <ScreenSizeToggle />
                        <LanguageSelect text={t('selectlang')} langs={['en', 'pt', 'fr', 'es', 'de', 'ru']} />
                        <div id="logoff">
                            <NavigationLink link={__environment__.links.exit} text={t('exit')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
