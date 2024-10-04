import React from "react";
import { useRouteError } from "react-router-dom";

export default () => {
    let error = useRouteError();
    return <>
        <div>
            An error occurred
        </div>
    </>
};
