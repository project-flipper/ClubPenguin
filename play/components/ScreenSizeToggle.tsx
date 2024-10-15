import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import ScreenSizeContext from "../context/ScreenSizeContext";

export default () => {
    let [ screenSize, setScreenSize ] = useContext(ScreenSizeContext);

    let { i18n } = useTranslation();
    let currentLanguage = i18n.resolvedLanguage || i18n.language;
    let langSuffix = currentLanguage === "en" ? "" : `_${currentLanguage}`;

    let big = useRef<HTMLDivElement>(null);
    let small = useRef<HTMLDivElement>(null);

    useEffect(() => {
        big.current!.style.display = screenSize == 'small' ? 'block' : 'none';
        small.current!.style.display = screenSize == 'small' ? 'none' : 'block';
    }, [screenSize]);

    let toggleScreenSize = useCallback(() => {
        let size = screenSize == 'small' ? 'big' : 'small';
        setScreenSize(size);
    }, [screenSize]);

    return (
        <>
            <div id="bigscreen" ref={big}>
                <div id={`big_screen_button${langSuffix}`}>
                    <a onClick={e => {
                        toggleScreenSize();
                        e.preventDefault();
                        return false;
                    }} href="#/smallscreen"></a>
                </div>
            </div>
            <div id="smallscreen" ref={small}>
                <div id={`sm_screen_button${langSuffix}`}>
                    <a onClick={e => {
                        toggleScreenSize();
                        e.preventDefault();
                        return false;
                    }} href="#/bigscreen"></a>
                </div>
            </div>
        </>
    );
};
