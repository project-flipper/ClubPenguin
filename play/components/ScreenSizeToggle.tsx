import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import ScreenSize from "@play/services/ScreenSize";

export default () => {
    let [ screenSize, set ] = useContext(ScreenSize);

    let { i18n } = useTranslation();
    let currentLanguage = i18n.resolvedLanguage || i18n.language;
    let langSuffix = currentLanguage === "en" ? "" : `_${currentLanguage}`;

    let big = useRef<HTMLDivElement>(null);
    let small = useRef<HTMLDivElement>(null);

    useEffect(() => {
        centerErrors();
        big.current!.style.display = screenSize == 'small' ? 'block' : 'none';
        small.current!.style.display = screenSize == 'small' ? 'none' : 'block';
    }, [screenSize]);

    return (
        <>
            <div id="bigscreen" ref={big}>
                <div id={`big_screen_button${langSuffix}`}>
                    <a onClick={() => {
                        set('small');
                        return false;
                    }} href="#smallscreen"></a>
                </div>
            </div>
            <div id="smallscreen" ref={small}>
                <div id={`sm_screen_button${langSuffix}`}>
                    <a onClick={() => {
                        set('big');
                        return false;
                    }} href="#bigscreen"></a>
                </div>
            </div>
        </>
    );
};
