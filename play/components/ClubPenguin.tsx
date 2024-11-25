import React, { useContext, useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";

import ScreenSizeContext from "../context/ScreenSizeContext";
import TrialDaysLeftContext from "../context/TrialDaysLeftContext";

function handleGameError(data?: { handled: boolean }): void {
    if (!data) {
        if (document.getElementById('upgrade')) {
            document.getElementById('upgrade').style.display = 'block';
            document.getElementById('installText').style.display = 'none';
            document.getElementById('upgradeButton').style.display = 'block';
        }
        return;
    }

    if (data.handled) {
        return;
    }

    window.centerError("D_ER_ErrorSection");

    var element = document.getElementById("club_penguin");
    element.style.display = "none";
    var element = document.getElementById("D_ER_ErrorSection");
    element.style.display = "block";
}
window.handleGameError = handleGameError;

export default () => {
    let ref = useRef<HTMLDivElement>(null);

    let { i18n } = useTranslation('errors');
    let currentLanguage = i18n.resolvedLanguage || i18n.language;
    let langSuffix = currentLanguage === "en" ? "" : `_${currentLanguage}`;

    useEffect(() => {
        if (i18n.language != CP.lang) {
            if (CP.isRunning()) {
                let elementId = CP.elementId;
                CP.stop(false);
                let element = document.getElementById(elementId);
                if (element) element.remove();
            }
            try {
                CP.run({
                    language: currentLanguage,
                    parentId: "club_penguin",
                    elementId: "cp_game",
                    elementClassName: "disney_land_clubpenguin_player",
                    crossOrigin: __environment__.crossOrigin,
                    cacheVersion: __environment__.cacheVersion,
                    contentVersion: __environment__.contentVersion,
                    minigameVersion: __environment__.minigameVersion,
                    environmentType: __environment__.environmentType
                });
            } catch (e) {
                handleGameError();
                throw e;
            }
        }
    }, [i18n.language]);

    let [ screenSize ] = useContext(ScreenSizeContext);
    useEffect(() => {
        if (ref.current) ref.current.style.height = screenSize == "small" ? "550px" : "95%";
        CP.sizeChange(document.getElementsByClassName('D_F_HudNotification').length > 0);
    }, [screenSize]);

    let [ trialDaysLeft, setTrialDaysLeft ] = useContext(TrialDaysLeftContext);
    useEffect(() => {
        if (trialDaysLeft > 0 && ref.current) {
            ref.current.style.height = "95%";
        }
    }, [trialDaysLeft]);
    useEffect(() => {
        window.showTrialBanner = (daysLeft: number) => setTrialDaysLeft(daysLeft);
    }, [setTrialDaysLeft]);

    return (
        <>
            <div id="D_F"></div>
            <div id="D_F_GameSection" ref={ref}>
                <div id="club_penguin">
                    <div id="upgrade">
                        <div id="upgradeContent">
                            <div id="upgradeText">
                                <Trans i18nKey="upgrade" ns="errors">
                                    <h1>Download the latest Chrome browser to play Club Penguin!</h1>
                                    <p>Ask your parents for help before you download.</p>
                                </Trans>
                                <p>
                                    <Trans i18nKey="upgradeText" ns="errors">
                                        Visit our <a href={`${__environment__.links.home}/help/help-topics/technical-help`}>Browser FAQ</a> to find out more about this update.
                                    </Trans>
                                </p>
                            </div>

                            <div id="installText">
                                <Trans i18nKey="install" ns="errors">
                                    <h1>Oops! You need the latest Chrome browser to play Club Penguin.</h1>
                                    <p>Ask your parent to download it from google.com/chrome.</p>
                                </Trans>
                                <p>
                                    <Trans i18nKey="installText" ns="errors">
                                        Visit our <a href={`${__environment__.links.home}/help/help-topics/technical-help`}>Browser FAQ</a> to find out more about this update.
                                    </Trans>
                                </p>
                            </div>
                        </div>

                        <div id="upgradeButton">
                            <a href="https://www.google.com/chrome"><img src={`images/upgradeButton${langSuffix}.png`} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
