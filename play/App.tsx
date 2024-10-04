import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Footer from "@play/components/Footer";
import NavigationBar from "@play/components/NavigationBar";
import CreatePage from "@play/pages/CreatePage";
import ErrorPage from "@play/pages/ErrorPage";
import LoginPage from "@play/pages/LoginPage";
import PlayPage from "@play/pages/PlayPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PlayPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/start",
        element: <PlayPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/create",
        element: <CreatePage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />
    }
]);

export default () => {
    let { t, i18n } = useTranslation();
    useEffect(() => {
        document.title = t('title');
    }, [i18n.language]);

    return (
        <>
            <NavigationBar />
            <main>
                <RouterProvider router={router} />
            </main>
            <Footer />
        </>
    );
};
