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

    return (
        <div id="languageselector" className="langselect">
            <form name="selectlang" style={{ padding: 0, margin: 0 }}>
                <label className="langselectlabel">{text}</label>
                <select className="langselectfield" onChange={() => {
                    if (ref.current == null) return;
                    let lang = ref.current.options[ref.current.selectedIndex].value;
                    console.log(lang);
                    changeLanguage(lang);
                }} ref={ref} defaultValue={currentLanguage}>
                    {langs.map(lang => <option key={lang} value={lang}>{t(`lang_${lang}`)}</option>)}
                </select>
            </form>
        </div>
    );
};
