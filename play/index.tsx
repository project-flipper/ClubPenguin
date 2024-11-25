import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import './translations';
import App from "./App";

interface ClubPenguinRunParams {
    parentId: string,
    elementId: string,
    elementClassName: string,
    language: string,
    crossOrigin: string,
    cacheVersion: string,
    contentVersion: string,
    minigameVersion: string,
    environmentType: string
}

interface ClubPenguinAPI {
    lang: string,
    elementId: string,
    run(params: ClubPenguinRunParams): void;
    isRunning(): boolean;
    sizeChange(repositionFriends: boolean): void;
    handleLogOff(redirectUrl: string): void;
    handleWindowUnload(): void;
    stop(terminate: boolean): void;
}

interface DisneyNamespace {
    CP: {
        rules: {
            currentIndex: number;
            showRules(): void;
            showRule(ruleId: string): void;
        }
    }
}

declare global {
    let CP: ClubPenguinAPI;
    let Disney: DisneyNamespace;

    interface Window {
        CP: ClubPenguinAPI;
        Disney: DisneyNamespace;
        handleGameError?(data?: { handled: boolean }): void;
        showTrialBanner?(daysLeft: number): void;
        centerError(id: string): void;
    }
    let __environment__: {
        language: string;
        apiPath: string;
        mediaPath: string;
        crossOrigin: string;
        cacheVersion: string;
        contentVersion: string;
        minigameVersion: string;
        environmentType: string;
        links: {
            home: string;
            play: string;
            localPlay: string;
        };
        recaptchaSiteKey: string;
    };
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
