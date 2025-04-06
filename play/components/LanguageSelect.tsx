import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    text: string,
    langs: string[]
};

export default ({ text, langs }: Props) => {
    let { t, i18n } = useTranslation();
    let ref = useRef<HTMLSelectElement>(null);

    let currentLanguage = i18n.resolvedLanguage || i18n.language;

    let changeLanguage = () => {
        let lang = ref.current!.options[ref.current!.selectedIndex].value;
        i18n.changeLanguage(lang);
    };

    return (
        <div id="languageselector" className="langselect notranslate">
            <form name="selectlang" style={{ padding: 0, margin: 0 }}>
                <label htmlFor="go2" className="langselectlabel">{text}</label>
                <select name="go2" id="go2" className="langselectfield" onChange={changeLanguage} ref={ref} defaultValue={currentLanguage}>
                    {langs.map(lang => <option key={lang} value={lang}>{t(`lang_${lang}`)}</option>)}
                </select>
            </form>
        </div>
    );
};
