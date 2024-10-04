import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default () => {
    let [ count, setCount ] = useState(0);
    let { i18n } = useTranslation();

    useEffect(() => setCount(count+1), [i18n.language]);

    return <>Club Penguin Login {count}</>;
};