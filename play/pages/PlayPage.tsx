import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ClubPenguin from "../components/ClubPenguin";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScreenSizeContext from "../context/ScreenSizeContext";
import TrialDaysLeftContext from "../context/TrialDaysLeftContext";
import Modal from "../components/Modal";
import Rules from "../components/Rules";

export default () => {
    let { t } = useTranslation('errors');
    let state = window.location.href.search(/smallscreen/) > 0 ? 'small' : 'big';

    useEffect(() => {
        let gameCleanupNeeded = true;

        let links = document.getElementsByTagName("a");
        for (let index in links) {
            let element = links[index];
            if (element.href && element.href.search(/#/) < 0) {
                element.addEventListener("click", e => {
                    if (CP) {
                        CP.handleLogOff(element.href);
                        gameCleanupNeeded = false;

                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                });
            }
        }

        window.addEventListener('unload', () => {
            if (gameCleanupNeeded && CP) CP.handleWindowUnload();
        });

        window.addEventListener('resize', () => {
            let errors = document.getElementsByClassName('D_ER_ErrorSection');
            for (let index in errors) {
                let element = errors[index];
                window.centerError(element.id);
            }
        });
    }, []);

    let [ screenSize, setScreenSize ] = useState(state);
    let [ trialDaysLeft, setTrialDaysLeft ] = useState(0);
    let [ showRules, setShowRules ] = useState(false);

    window.Disney = window.Disney || {} as typeof window.Disney;
    window.Disney.CP = window.Disney.CP || {} as typeof window.Disney.CP;
    window.Disney.CP.rules = window.Disney.CP.rules || {} as typeof window.Disney.CP.rules;
    window.Disney.CP.rules.showRules = () => setShowRules(true);

    return (
        <ScreenSizeContext.Provider value={[ screenSize, setScreenSize ]}>
            <TrialDaysLeftContext.Provider value={[ trialDaysLeft, setTrialDaysLeft ]}>
                <Header />
                <ClubPenguin />
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
                <Modal show={showRules} closeModal={() => setShowRules(false)}>
                    <Rules show={showRules} />
                </Modal>
            </ TrialDaysLeftContext.Provider>
        </ScreenSizeContext.Provider>
    );
};
