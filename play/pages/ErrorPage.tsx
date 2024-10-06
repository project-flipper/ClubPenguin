import React from "react";
import { useRouteError } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default () => {
    let { t } = useTranslation('errors');
    let error = useRouteError();

    return <>
        <Header />
        <div id="D_ER_ErrorSection">
            <div id="D_ER_ErrorMsg">
                <Trans i18nKey="error" ns="errors">
                    Sorry, something went wrong
                    <br />
                    with Club Penguin.
                    <br />
                    Try logging in again.
                </Trans>
            </div>
            <a id="D_ER_ErrorBtn" href="" target="_self" title={t('errorTitle')}>{t('ok')}</a>
        </div>
        <Footer/>
    </>
};
