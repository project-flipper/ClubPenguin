import React, { useContext, useEffect, useRef } from "react";

import TrialDaysLeftContext from "../context/TrialDaysLeftContext";

export default () => {
    let containerRef = useRef<HTMLDivElement>(null);
    let textRef = useRef<HTMLDivElement>(null);
    let textAltRef = useRef<HTMLDivElement>(null);

    let [ daysLeft ] = useContext(TrialDaysLeftContext);

    useEffect(() => {
        if (daysLeft > 1 && containerRef.current) {
            containerRef.current.style.transition = "height 1s";
            containerRef.current.style.height = "28px";
        }
    }, [daysLeft]);

    return (
        <div id="TrialBannerContainer" ref={containerRef}>
            {
                daysLeft > 0 &&
                <div id="TrialBanner">
                    <div id="TrialBannerBtn"><a id="TrialBannerLink" href="/" target="_blank"></a></div>
                    {
                        daysLeft > 1 ?
                        <div id="TrialText" className="no_translate" ref={textRef}>Having fun? You have <b>{daysLeft} Days</b> left in your membership</div>
                        :
                        <div id="TrialText2" className="no_translate" ref={textAltRef}>Having Fun? Today is the <b>last day</b> of your free membership</div>
                    }
                    <div style={{ clear: "both" }}></div>
                </div>
            }
        </div>
    );
};
