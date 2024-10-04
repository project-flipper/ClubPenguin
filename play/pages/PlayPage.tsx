import ClubPenguinLauncher from "@play/components/ClubPenguinLauncher";
import ScreenSize from "@play/services/ScreenSize";
import React, { useContext, useEffect } from "react";

declare global {
    function centerError(errorId: string): void;
    function centerErrors(): void;
}

export default () => {
    let [ screenSize ] = useContext(ScreenSize);
    useEffect(() => {
        centerErrors();
    }, [screenSize]);

    return (
        <>
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
        </>
    );
};
