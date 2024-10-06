import React, { useCallback, useEffect } from "react";

interface ModalProps {
    children?: React.ReactNode;
    show?: boolean,
    closeModal?: () => void;
    overlayOpacity?: number;
    centerOnResize?: boolean
    fadeDuration?: number;
}

export default ({ children, closeModal, show = true, overlayOpacity = 0.8, centerOnResize = true, fadeDuration = 250 }: ModalProps) => {
    let ref = React.createRef<HTMLDivElement>();
    let overlayRef = React.createRef<HTMLDivElement>();

    let fadeOutModal = useCallback(() => {
        if (ref.current) {
            ref.current.style.transition = `opacity ${fadeDuration}ms easeOut`;
            ref.current.style.opacity = "0";
            setTimeout(() => closeModal && closeModal(), fadeDuration);
        }
        if (overlayRef.current) {
            overlayRef.current.style.transition = `opacity ${fadeDuration}ms easeOut`;
            overlayRef.current.style.opacity = "0";
        }
        closeModal && closeModal();
    }, [closeModal]);

    useEffect(() => {
        if (show) {
            if (ref.current) {
                ref.current.style.transition = `opacity ${fadeDuration}ms easeIn`;
                ref.current.style.opacity = "1";
            }
            if (overlayRef.current) {
                overlayRef.current.style.transition = `opacity ${fadeDuration}ms easeIn`;
                overlayRef.current.style.opacity = overlayOpacity.toString();
            }
        } else fadeOutModal();
    }, [show]);

    useEffect(() => {
        let callback = () => {
            if (centerOnResize && ref.current) {
                if (ref.current) {
                    const element = ref.current;
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
            }
        };
        if (show) callback();
        window.addEventListener('resize', callback);
        return () => window.removeEventListener('resize', callback);
    }, [show, centerOnResize]);

    useEffect(() => {
        if (show) document.body.classList.add('modal-active');
        else document.body.classList.remove('modal-active');
    }, [show]);

    return (
        <>
            <div id="modal-overlay" style={{ opacity: overlayOpacity, display: show ? "block" : "none" }} ref={overlayRef}></div>
            <div id="modal-loading"></div>
            <div id="modal-window" ref={ref} style={{ visibility: show ? "visible" : "hidden", display: show ? "block" : "none" }}>
                {closeModal && <a className="modal-close" href="#" onClick={e => {
                    e.preventDefault();
                    fadeOutModal();
                }}>close</a>}
                <div id="modal-content">{children}</div>
            </div>
        </>
    );
};
