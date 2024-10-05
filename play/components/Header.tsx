import React from "react";
import NavigationBar, { NavigationBarProps } from "./NavigationBar";

import TrialBanner from "./TrialBanner";

export default (props: NavigationBarProps) => {
    return (
        <>
            <NavigationBar {...props} />
            <TrialBanner />
        </>
    );
};
