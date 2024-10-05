import ClubPenguinLauncher from "@play/components/ClubPenguinLauncher";
import Footer from "@play/components/Footer";
import Header from "@play/components/Header";
import ScreenSize from "@play/services/ScreenSize";
import React, { useContext, useEffect, useState } from "react";

declare global {
    function centerError(errorId: string): void;
}

export default () => {
    let state = window.location.href.search(/smallscreen/) >= 0 ?  'small' : 'big';

    let [ screenSize, setScreenSize ] = useState(state);

    return (
        <ScreenSize.Provider value={[ screenSize, setScreenSize ]}>
            <Header showSiteLinks={true} showScreenSizeToggle={true} showLanguageSelect={true} showLogoff={true} />
            <ClubPenguinLauncher />
            <div id="D_ER_ErrorSection">
                <div id="D_ER_ErrorMsg">
                    Sorry, something went wrong
                    <br />
                    with Club Penguin.
                    <br />
                    Try logging in again.
                </div>
                <a id="D_ER_ErrorBtn" href="" target="_self" title="Try logging in again">OK</a>
            </div>
            <div id="CP_SNFError_ErrorSection" className="D_ER_ErrorSection">
                <div id="CP_SNFError_Version_ErrorMsg" className="D_ER_ErrorMsg">
                    Sorry! There was a problem loading Card-Jitsu Snow.
                    <br />
                    Please try again, or contact support if the problem continues.
                </div>
                <a id="CP_SNFError_Version_ErrorBtn" className="D_ER_ErrorBtn" href="#">OK</a>
            </div>
            <div id="CP_ES_Version_ErrorSection" className="D_ER_ErrorSection">
                <div id="CP_ES_Version_ErrorMsg" className="D_ER_ErrorMsg">
                    Oops! You need the latest Chrome browser to play Card-Jitsu Snow.
                    <br />
                    Ask your parent to download it from google.com/chrome.
                </div>
                <a id="CP_ES_Version_ErrorBtn" className="D_ER_ErrorBtn" href="#">OK</a>
            </div>
            <Footer />
        </ScreenSize.Provider>
    );
};
