import React from "react";
import { useRouteError } from "react-router-dom";
import Header from "@play/components/Header";
import Footer from "@play/components/Footer";

export default () => {
    let error = useRouteError();
    return <>
        <Header showSiteLinks={true} showScreenSizeToggle={true} showLanguageSelect={true} showLogoff={true} />
        <div>
            An error occurred
        </div>
        <Footer/>
    </>
};
