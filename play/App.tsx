import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "@play/pages/ErrorPage";
import PlayPage from "@play/pages/PlayPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PlayPage />,
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
            <RouterProvider router={router} />
        </>
    );
};
