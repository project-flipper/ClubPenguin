import React from "react";
import { useTranslation } from "react-i18next";

import NavigationLink from "@play/components/NavigationLink";
import LanguageSelect from "@play/components/LanguageSelect";

export default () => {
    let { t } = useTranslation();

    return <div>
        <NavigationLink text={t('home')} />
        <NavigationLink text={t('blog')} />
        <NavigationLink text={t('help')} />
        <NavigationLink text={t('parents')} />
        <NavigationLink text={t('membership')} />
        <LanguageSelect text={t('selectlang')} langs={['en', 'pt', 'fr', 'es', 'de', 'ru']} />
        <NavigationLink text={t('exit')} />
    </div>;
};
