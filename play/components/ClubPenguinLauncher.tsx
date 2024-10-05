import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import ScreenSize from "../services/ScreenSize";

export interface ClubPenguinRunParams {
    parentId: string,
    elementId: string,
    elementClassName: string,
    language: string,
    apiPath: string,
    mediaPath: string,
    crossOrigin: string,
    cacheVersion: string,
    contentVersion: string,
    minigameVersion: string,
    environmentType: string
}

export interface ClubPenguin {
    lang: string,
    elementId: string,
    run(params: ClubPenguinRunParams): void;
    isRunning(): boolean;
    sizeChange(repositionFriends: boolean): void;
    handleLogOff(redirectUrl: string): void;
    stop(terminate: boolean): void;
}

declare global {
    let CP: ClubPenguin;
    interface Window {
        CP: ClubPenguin;
        handleGameError?(data?: { handled: boolean }): void;
    }
    let __environment__: {
        language: string;
        apiPath: string;
        mediaPath: string;
        crossOrigin: string;
        cacheVersion: string;
        contentVersion: string;
        minigameVersion: string;
        environmentType: string;
        links: {
            home: string;
            play: string;
            localPlay: string;
        };
        recaptchaSiteKey: string;
    };
}

function handleGameError(data?: { handled: boolean }): void {
    if (!data) {
        if (document.getElementById('upgrade')) {
            document.getElementById('upgrade').style.display = 'block';
            document.getElementById('installText').style.display = 'none';
            document.getElementById('upgradeButton').style.display = 'none';
        }
        return;
    }

    if (data.handled) {
        return;
    }

    centerError("D_ER_ErrorSection");

    var element = document.getElementById("club_penguin");
    element.style.display = "none";
    var element = document.getElementById("D_ER_ErrorSection");
    element.style.display = "block";
}
window.handleGameError = handleGameError;

function loadGame(lang: string): void {
    try {
        CP.run({
            language: lang,
            parentId: "club_penguin",
            elementId: "cp_game",
            elementClassName: "disney_land_clubpenguin_player",
            apiPath: __environment__.apiPath,
            mediaPath: __environment__.mediaPath,
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

export default () => {
    let ref = useRef<HTMLDivElement>(null);
    let gameRef = useRef<HTMLDivElement>(null);

    let { t, i18n } = useTranslation('errors');
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
            loadGame(i18n.language);
        }
    }, [i18n.language]);

    let [ screenSize ] = useContext(ScreenSize);
    useEffect(() => {
        ref.current!.style.height = screenSize == "small" ? "550px" : "95%";
        gameRef.current!.style.height = screenSize == "small" ? "550px" : "95%";
        CP.sizeChange(document.getElementsByClassName('D_F_HudNotification').length > 0);
    }, [screenSize]);

    return (
        <>
            <div id="D_F"></div>
            <div id="D_F_GameSection" ref={ref}>
                <div id="club_penguin" ref={gameRef}>
                    <div id="upgrade">
                        <div id="upgradeContent">
                            <div id="upgradeText">
                                <h1>{t('upgrade.h1')}</h1>
                                <p>{t('upgrade.p')}</p>
                                <p>{t('upgrade.a:before')}<a href="<%= links.home %>/help/help-topics/technical-help">{t('upgrade.a')}</a>{t('upgrade.a:before')}</p>
                            </div>

                            <div id="installText">
                                <h1>{t('install.h1')}</h1>
                                <p>{t('install.p')}</p>
                                <p>{t('install.a:before')}<a href="<%= links.home %>/help/help-topics/technical-help">{t('install.a')}</a>{t('install.a:after')}</p>
                            </div>
                        </div>

                        <div id="upgradeButton">
                            <a><img src={`images/upgradeButton${langSuffix}.png`} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
