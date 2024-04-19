import { useState } from "react";
import { API_ENDPOINT } from "../config/constants";
// import { useHistory } from 'react-dom/client';

function App() {
  // const history = useHistory();

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
      <h1 className="text-center text-5xl font-semibold my-11 ">Design Craft</h1>
      <div className="container w-1/3 h-52 bg-slate-500 mx-auto rounded-lg">
        <form className="flex flex-col">
          <input
            className="w-3/4 self-center my-4 p-2 rounded-md"
            type="text"
            placeholder="ex: A website for  learning programming languages."
            value={userPrompt}
            onChange={(e) => handleInputChange(e)}
          />
          <button onClick={(e) => handleSubmit(e)} className="bg-lime-600 w-32 px-2 py-1 mx-auto mb-5">Submit</button>
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
              Preview site
            </a>
            <a
              className="bg-lime-600 w-32 px-2 py-1 mx-auto mt-2 text-center"
              href={`${API_ENDPOINT}/download`}
              >
              Download
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
