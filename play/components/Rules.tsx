import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface RulesProps {
    show?: boolean;
    interval?: number;
    children?: React.ReactNode;
}

export default ({ show = true, interval = 5000 }: RulesProps) => {
    let [currentIndex, setCurrentIndex] = useState(0);
    let [carouselActive, setCarouselActive] = useState(true);

    let { t, i18n } = useTranslation();
    let currentLanguage = i18n.resolvedLanguage || i18n.language;

    let rules = [
        <>
            <p className="title">{t('rules.1.title')}</p>
            <p>{t('rules.1.text')}</p>
        </>,
        <>
            <p className="title">{t('rules.2.title')}</p>
            <p>{t('rules.2.text')}</p>
        </>,
        <>
            <p className="title">{t('rules.3.title')}</p>
            <p>{t('rules.3.text')}</p>
        </>,
        <>
            <p className="title">{t('rules.4.title')}</p>
            <p>{t('rules.4.text')}</p>
        </>
    ];

    useEffect(() => {
        if (!carouselActive || !show) return;

        let intervalId = setInterval(() => {
            let nextIndex = (currentIndex + 1) % rules.length;
            setCurrentIndex(nextIndex);
        }, interval);

        return () => clearInterval(intervalId);
    }, [show, carouselActive, currentIndex]);

    return (
        <div id="rules-wrap">
            <div id="rules" className={currentLanguage != 'en' ? `lang-${currentLanguage}` : undefined}>
                <ul>
                    {
                        rules.map((rule, index) => (
                            <li key={index} id={`r${index}`} className={currentIndex === index ? "active" : ""} onMouseOver={() => setCurrentIndex(index)} onMouseEnter={() => {
                                setCurrentIndex(index);
                                setCarouselActive(false);
                                setCarouselActive(true);
                            }}>
                                {rule}
                            </li>
                        ))
                    }
                </ul>
                <div id="rules-container">
                    {rules[currentIndex]}
                </div>
                <div id="warning">{t('ruleswarning')}</div>
            </div>
        </div>
    );
};
