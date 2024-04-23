/* eslint-disable no-unused-vars */
import { useEffect, useState, useTitle } from "react";
import { API_ENDPOINT } from "../config/constants";
// import { useHistory } from 'react-dom/client';
import "./i18n"
import { useTranslation } from "react-i18next";
import LanguageSelector from "./components/LanguageSelector";


function App() {
  // const history = useHistory();
  const { t } = useTranslation();


  const [userPrompt, setUserPrompt] = useState("");
  const [renderedEJS, setRenderedEJS] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted!");
    setLoading(true)
    setSubmitted(false)
    // Send user prompt to server and get response back here!
    const response = await fetch(`${API_ENDPOINT}/textgen/${userPrompt}`, {
      method: "GET",
      headers: { "Content-Type": "text/html" },
      mode: "no-cors",
    });
    setLoading(false)

    setSubmitted(true);
    setRenderedEJS(response.body);
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setUserPrompt(value);
  }






  
  //   function download(){
  // history.push('https://example.com');
  //   }

  return (
    <>
      <h1 className="text-center text-5xl font-semibold py-11 mb-2 bg-stone-600 text-gray-300 font-serif">Design Craft<p className="text-xl mt-2 text-gray-400 font-sans">{t('subtitle')}</p></h1>
      <LanguageSelector/>
      <div className="container w-1/3 h-64 bg-stone-800 mx-auto rounded-lg">
        <form className="flex flex-col pt-5">
           <label htmlFor="prompt" className="mb-2 text-center text-gray-300">{t('promptlabel')}</label>
          <input
            className="w-3/4 self-center my-4 p-2 rounded-md"
            type="text"
            id="prompt"
            placeholder={t("promptplaceholder")}
            value={userPrompt}
            onChange={(e) => handleInputChange(e)}
          />
          <button onClick={(e) => handleSubmit(e)} className="bg-lime-600 w-auto px-2 py-1 mx-auto mb-5">{t('Submit')}</button>
          {
            loading && 
            <div className="w-full flex justify-center">

            <l-hourglass 
            size="50"
            bg-opacity="0.1"
            speed="4.5"
            color="#9afcfe" 
            ></l-hourglass>
            </div>
          }
          {
            submitted && 
            <div className="flex flex-col ">
            <a 
            className="bg-cyan-300 w-32 px-2 py-1 mx-auto text-center" 
            href={API_ENDPOINT} target="_blank">
              {t('Previewsite')}
            </a>
            <a
              className="bg-lime-600 w-32 px-2 py-1 mx-auto mt-2 text-center"
              href={`${API_ENDPOINT}/download`}
              >
              {t('Download')}
            </a>
          </div>
            }
        </form>

        <div dangerouslySetInnerHTML={{ __html: renderedEJS }} />
      </div>
    </>
  );
}

export default App;
