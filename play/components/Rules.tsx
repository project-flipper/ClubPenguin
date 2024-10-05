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

    let { t } = useTranslation();

    let rules = [
        <>
            <p className="title">Respect Others</p>
            <p>We do not tolerate bullying, or being mean to others.</p>
        </>,
        <>
            <p className="title">No Bad Words</p>
            <p>We do not allow any rude, inappropriate language or behavior. This includes swearing, racism, talking about drugs, sex or alcohol.</p>
        </>,
        <>
            <p className="title">Stay Safe Online</p>
            <p>We do not tolerate the sharing of personal information like your real name, phone number, address, email or password.</p>
        </>,
        <>
            <p className="title">No Cheating</p>
            <p>We do not allow the use of 3rd party programs.</p>
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
            <div id="rules">
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
                <div id="warning">Players found not following the Club Penguin rules risk being banned, temporarily or
                    permanently*</div>
            </div>
        </div>
    );
};
