const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
const userPrompt = "A food ordering website"

async function generateContent() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  

  const prompt = `Please return JSON response for a place holders in a website description given using the following schema. The description of placeholders is given beside them:

  {
    pageTitle:  "Short Title of the page which is seen on the tab",
    navbarLink1:  "navbar item number 1",
    navbarLink2:  "navbar item number 2",
    navbarLink3:  "navbar item number 3",
    navbarLink4:  "navbar item number 4",
    carouselImage1GenPrompt: "Detailed prompt to generate 1st image  for a carousel.",
    carouselImageTitle1 : "generic carousel Image Title for the image generated using prompt",
    carouselImageDescription1 : "generic description for the carousel image 1 ",
    carouselImage2GenPrompt: "Detailed prompt to generate 2nd image  for a carousel.",
    carouselImageTitle2 : "generic carousel Image Title for the image generated using prompt",
    carouselImageDescription2 : "generic description for the carousel image 2 ",
    carouselImage3GenPrompt: "Detailed prompt to generate 3rd image  for a carousel.",
    carouselImageTitle3 : "generic carousel Image Title for the image generated using prompt",
    carouselImageDescription3 : "generic description for the carousel image 3 ",
    mainTitle : "mainTitle of the whole page  ",
    subTitle :  "subTitle just below the main title",
    mainContent : "page content of the website right in the middle of the page upto 100 words",
    galleryImage1GenPrompt: "Detailed prompt to generate 1st image  for a images in the gallery images section of the website.",
    galleryImageTitle1: "galleryImageTitle1",
    galleryImage2GenPrompt: "Detailed prompt to generate 2nd image  for a images in the gallery images section of the website.",
    galleryImageTitle2: "galleryImageTitle2",
    galleryImage3GenPrompt: "Detailed prompt to generate 3rd image  for a images in the gallery images section of the website.",
    galleryImageTitle3: "galleryImageTitle3",
    finalImage :  "detailed prompt to generate finalImage that is in the  bottom of the page."
  }

  All fields are required and in string format.

  Important: Only return a single piece of valid parsable JSON text.

  here is the website description

  ` + userPrompt

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  // const parsedText = JSON.parse(text);
  console.log(text);
  return text
}

// generateContent();
module.exports= generateContent;