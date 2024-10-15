import React, { useContext, useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";

import TrialDaysLeftContext from "../context/TrialDaysLeftContext";

export default () => {
    let containerRef = useRef<HTMLDivElement>(null);

    let [ daysLeft ] = useContext(TrialDaysLeftContext);

    useEffect(() => {
        if (daysLeft >= 1 && containerRef.current) {
            containerRef.current.style.transition = "height 1s";
            containerRef.current.style.height = "28px";
        } else if (containerRef.current) {
            containerRef.current.style.height = "0px";
        }
    }, [daysLeft]);

    let { i18n } = useTranslation();
    let currentLanguage = i18n.resolvedLanguage || i18n.language;

    return (
        <div id="TrialBannerContainer" ref={containerRef}>
            {
                daysLeft > 0 &&
                <div id="TrialBanner">
                    <div id="TrialBannerBtn" className={currentLanguage != "en" ? `lang-${currentLanguage}` : undefined}>
                        <a id="TrialBannerLink" href="/" target="_blank"></a>
                    </div>
                    <div id="TrialText" className="no_translate">
                        <Trans i18nKey="trialbanner" count={daysLeft}>
                            Today is the <b>last day</b> of your free membership.
                        </Trans>
                    </div>
                    <div style={{ clear: "both" }}></div>
                </div>
            }
        </div>
    );
};
