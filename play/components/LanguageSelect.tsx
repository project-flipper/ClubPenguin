import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    text: string,
    langs: string[]
};

export default ({ text, langs }: Props) => {
    let { t, i18n } = useTranslation();
    let ref = useRef<HTMLSelectElement>(null);

    console.log(i18n.languages);
    let currentLanguage = i18n.resolvedLanguage || i18n.language;

    let changeLanguage = (lang: string) => i18n.changeLanguage(lang);

    return <form>
        <label>{text}</label>
        <select onChange={() => {
            if (ref.current == null) return;
            let lang = ref.current.options[ref.current.selectedIndex].value;
            console.log(lang);
            changeLanguage(lang);
        }} ref={ref}>
            {langs.map(lang => <option value={lang} selected={lang == currentLanguage}>{t(`lang_${lang}`)}</option>)}
        </select>
    </form>;
};
