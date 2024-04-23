import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enJSON from "./locale/en.json";
import hiJSON from "./locale/hi.json";
import esJSON from "./locale/es.json";
import jaJSON from "./locale/ja.json";
// import zhJSON from "./locale/zh.json";
// import frJSON from "./locale/fr.json";
// import deJSON from "./locale/de.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources: {
        en: { ...enJSON },
        hi: { ...hiJSON },
      ja: { ...jaJSON },
      es: { ...esJSON },
      //   zh: { ...zhJSON },
    //   de: { ...deJSON },
    //   fr: { ...frJSON },
    },
  });
