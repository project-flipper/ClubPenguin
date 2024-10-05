import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import ClubPenguinLauncher from "../components/ClubPenguinLauncher";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScreenSize from "../services/ScreenSize";

declare global {
    function centerError(errorId: string): void;
}

export default () => {
    let { t } = useTranslation('errors');
    let state = window.location.href.search(/smallscreen/) > 0 ? 'small' : 'big';

    let [ screenSize, setScreenSize ] = useState(state);

    return (
        <ScreenSize.Provider value={[ screenSize, setScreenSize ]}>
            <Header showSiteLinks={true} showScreenSizeToggle={true} showLanguageSelect={true} showLogoff={true} />
            <ClubPenguinLauncher />
            <div id="D_ER_ErrorSection">
                <div id="D_ER_ErrorMsg">
                    {t('error.1')}
                    <br />
                    {t('error.2')}
                    <br />
                    {t('error.3')}
                </div>
                <a id="D_ER_ErrorBtn" href="" target="_self" title={t('error.3')}>{t('ok')}</a>
            </div>
            <div id="CP_SNFError_ErrorSection" className="D_ER_ErrorSection">
                <div id="CP_SNFError_Version_ErrorMsg" className="D_ER_ErrorMsg">
                    {t('cjs.1')}
                    <br />
                    {t('cjs.2')}
                </div>
                <a id="CP_SNFError_Version_ErrorBtn" className="D_ER_ErrorBtn" href="#">{t('ok')}</a>
            </div>
            <div id="CP_ES_Version_ErrorSection" className="D_ER_ErrorSection">
                <div id="CP_ES_Version_ErrorMsg" className="D_ER_ErrorMsg">
                    {t('cjsupgrade.1')}
                    <br />
                    {t('cjsupgrade.2')}
                </div>
                <a id="CP_ES_Version_ErrorBtn" className="D_ER_ErrorBtn" href="#">{t('ok')}</a>
            </div>
            <Footer />
        </ScreenSize.Provider>
    );
};
