import ScreenSize from "@play/services/ScreenSize";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

declare global {
    function loadGame(lang: string): void;
    function gameLang(): string;
    function sizeChange(): void;
}

export default () => {
    let { i18n } = useTranslation();
    useEffect(() => {
        console.log('Loading game', i18n.language);
        if (i18n.language != gameLang()) loadGame(i18n.language);
    }, [i18n.language]);

    let ref = useRef<HTMLDivElement>(null);

    let [ screenSize ] = useContext(ScreenSize);
    useEffect(() => {
        ref.current!.style.width = screenSize == "small" ? "95%" : "550px";
        console.log('Screen size changed', screenSize);
        sizeChange();
    }, [screenSize]);

    return (
        <>
            <div id="D_F"></div>
            <div id="D_F_GameSection" ref={ref}>
                <div id="club_penguin">
                    <div id="upgrade">
                        <div id="upgradeContent">
                            <div id="upgradeText">
                                <h1>Download the latest Chrome browser to play Club Penguin!</h1>
                                <p>Ask your parents for help before you download.</p>
                                <p>Visit our <a href="<%= links.home %>/help/help-topics/technical-help">Browser FAQ</a> to find out more about this update.</p>
                            </div>

                            <div id="installText">
                                <h1>Oops! You need the latest Chrome browser to play Club Penguin.</h1>
                                <p>Ask your parent to download it from google.com/chrome.</p>
                                <p>Visit our <a href="<%= links.home %>/help/help-topics/technical-help">Browser FAQ</a> to find out more about this update.</p>
                            </div>
                        </div>

                        <div id="upgradeButton">
                            <a><img src="<%= links.localPlay %>/images/upgradeButton.png" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
