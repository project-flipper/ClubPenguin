import React from "react";
import { useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default () => {
    let { t } = useTranslation();
    let error = useRouteError();

    return <>
        <Header showSiteLinks={true} showScreenSizeToggle={true} showLanguageSelect={true} showLogoff={true} />
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
        <Footer/>
    </>
};
