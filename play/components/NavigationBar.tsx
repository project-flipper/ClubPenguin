import React from "react";
import { useTranslation } from "react-i18next";

import NavigationLink from "@play/components/NavigationLink";
import LanguageSelect from "@play/components/LanguageSelect";
import ScreenSizeToggle from "@play/components/ScreenSizeToggle";

export default () => {
    let { t } = useTranslation();

    return (
        <div id="navBg">
            <div id="htmlNav">
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
                <ScreenSizeToggle />
                <LanguageSelect text={t('selectlang')} langs={['en', 'pt', 'fr', 'es', 'de', 'ru']} />
                <div id="logoff">
                    <NavigationLink link="/" text={t('exit')}/>
                </div>
            </div>
        </div>
    );
};
