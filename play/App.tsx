import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Footer from "@play/components/Footer";
import Header from "@play/components/Header";
import ErrorPage from "@play/pages/ErrorPage";
import PlayPage from "@play/pages/PlayPage";
import ScreenSize from "@play/services/ScreenSize";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PlayPage />,
        errorElement: <ErrorPage />
    }
]);

export default () => {
    let state = window.location.href.search(/smallscreen/) >= 0 ?  'small' : 'big';

    let [ screenSize, set ] = useState(state);

    let { t, i18n } = useTranslation();
    useEffect(() => {
        document.title = t('title');
    }, [i18n.language]);

    return (
        <ScreenSize.Provider value={[ screenSize, set ]}>
            <Header />
            <RouterProvider router={router} />
            <Footer />
        </ScreenSize.Provider>
    );
};
