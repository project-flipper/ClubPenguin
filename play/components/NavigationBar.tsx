import React from "react";
import { useTranslation } from "react-i18next";

import NavigationLink from "./NavigationLink";
import LanguageSelect from "./LanguageSelect";
import ScreenSizeToggle from "./ScreenSizeToggle";

export interface NavigationBarProps {
    showSiteLinks: boolean;
    showScreenSizeToggle: boolean;
    showLanguageSelect: boolean;
    showLogoff: boolean;
}

export default ({ showSiteLinks = true, showScreenSizeToggle = true, showLanguageSelect = true, showLogoff = true }: NavigationBarProps) => {
    let { t } = useTranslation();

    return (
        <div id="affiliateheaderforcp">
            <div id="hdrWrap" style={{ margin: "0 0 -5px" }}>
                <div id="navBg">
                    <div id="htmlNav">
                        { showSiteLinks && (
                            <ul id="bu_nav">
                                <li><NavigationLink link="/" text={t('home')} /></li>
                                <li>|</li>
                                <li><NavigationLink link="/" text={t('blog')} /></li>
                                <li>|</li>
                                <li><NavigationLink link="/" text={t('help')} /></li>
                                <li>|</li>
                                <li><NavigationLink link="/" text={t('parents')} /></li>
                                <li>|</li>
                                <li className="noMarg"><NavigationLink link="/" text={t('membership')} /></li>
                            </ul>
                        )}
                        { showScreenSizeToggle && <ScreenSizeToggle /> }
                        { showLanguageSelect && (
                            <LanguageSelect text={t('selectlang')} langs={['en', 'pt', 'fr', 'es', 'de', 'ru']} />
                        )}
                        { showLogoff && (
                            <div id="logoff">
                                <NavigationLink link="/" text={t('exit')} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
