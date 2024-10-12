import React, { PropsWithChildren, createRef, useEffect, useState } from "react";

interface ModalProps {
    show?: boolean,
    closeModal?: () => void;
    overlayOpacity?: number;
    centerOnResize?: boolean
    fadeDuration?: number;
}

export default ({ children, closeModal, show = true, overlayOpacity = 0.8, centerOnResize = true, fadeDuration = 250 }: PropsWithChildren<ModalProps>) => {
    let [ isHidden, setHidden ] = useState(!show);

    let ref = createRef<HTMLDivElement>();
    let innerRef = createRef<HTMLDivElement>();

    useEffect(() => {
        if (show) {
            document.body.classList.add('modal-active');
            if (ref.current) {
                ref.current.style.transition = `opacity ${fadeDuration}ms`;
                ref.current.style.opacity = "1";
            }
            setHidden(false);
        } else {
            document.body.classList.remove('modal-active');
            if (ref.current) {
                ref.current.style.transition = `opacity ${fadeDuration}ms`;
                ref.current.style.opacity = "0";
                setTimeout(() => {
                    if (closeModal) closeModal();
                    setHidden(true);
                }, fadeDuration);
            }
        }
    }, [show, ref, closeModal, fadeDuration]);

    useEffect(() => {
        let callback = () => {
            if (centerOnResize && innerRef.current) {
                const element = innerRef.current;
                const elementWidth = element.offsetWidth;
                const elementHeight = element.offsetHeight;
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                const scrollTop = window.scrollY;
                // calculate center
                let left = (windowWidth / 2) - (elementWidth / 2);
                let top = scrollTop + ((windowHeight / 2) - (elementHeight / 2));
                // bounding
                if (top < 0) top = 0;
                if (left < 0) left = 0;
                // set position
                element.style.top = `${top}px`;
                element.style.left = `${left}px`;
            }
        };
        if (show) callback();
        window.addEventListener('resize', callback);
        return () => window.removeEventListener('resize', callback);
    }, [show, centerOnResize, innerRef]);

    return (
        <div id="modal" ref={ref}>
            <div id="modal-overlay" style={{ display: isHidden ? "none" : "block", opacity: overlayOpacity }}></div>
            <div id="modal-loading"></div>
            <div id="modal-window" ref={innerRef} style={{ visibility: isHidden ? "hidden" : "visible", display: isHidden ? "none" : "block" }}>
                {closeModal && <a className="modal-close" href="#" onClick={e => {
                    e.preventDefault();
                    closeModal();
                }}>close</a>}
                <div id="modal-content">{children}</div>
            </div>
        </div>
    );
};
