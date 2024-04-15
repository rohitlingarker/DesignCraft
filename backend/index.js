// Import required modules
const express = require('express');
const path = require('path');
const routes = require('./routes');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
const story = "In the quaint town of Willow Creek, nestled amidst rolling hills and whispering willows, resided a young girl named Anya. As she stepped out of the creaky wooden door of her modest cottage, her heart skipped a beat with excitement and anticipation. Today was her first day of school, and she couldn't wait to show off her prized possession - a magical backpack.\n\nHanded down to her from her grandmother, the backpack was no ordinary satchel. Its soft, emerald-green fabric shimmered with an ethereal glow, and its leather straps held secrets that only Anya knew. Within its capacious interior lay an enchanted world, filled with wonders that would ignite her imagination and change her life forever.\n\nAnya's parents, kind-hearted Elise and wise-bearded Edward, bid her farewell with warm embraces. \"Remember, my dear,\" whispered her mother, \"use your magic wisely and for good.\" Her father added, \"Always seek knowledge, and let the backpack be your trusted companion.\"\n\nWith a skip in her step, Anya set off towards the town's only schoolhouse. On her way, she passed her best friend, Samuel, a curious and adventurous boy with a mischievous grin. \"Hey, Anya,\" he called out. \"Can I see your backpack?\"\n\nAnya hesitated for a moment before unzipping the flap and revealing its contents. Samuel's eyes widened in amazement as he peered inside. There, nestled amidst pencils and notebooks, were a shimmering sword, a book of ancient spells, a tiny compass that always pointed north, and a magical key that could open any lock.\n\nTogether, they marveled at the backpack's wonders, promising to keep its secrets safe. As they approached the schoolhouse, Anya noticed a group of older children huddled together, their faces etched with fear. Curiosity getting the better of her, she cautiously approached.\n\n\"What's wrong?\" she asked.\n\nA tall, lanky boy stepped forward. \"There's a monster in the forest,\" he stammered. \"It's been terrorizing the town, attacking animals and even people.\"\n\nAnya's heart sank. The town of Willow Creek was small and peaceful, and the thought of a monster brought a shiver down her spine. She knew she had to do something to protect her family and friends.\n\nWithout a moment's hesitation, Anya opened her backpack and retrieved the shimmering sword. With a determined gleam in her eye, she turned to her terrified peers. \"Don't worry,\" she said, her voice steady. \"I'll take care of it.\"\n\nWith Samuel close behind her, Anya ventured into the shadowy depths of the forest. The trees seemed to whisper secrets as she passed, and the undergrowth rustled with unseen creatures. As they walked deeper into the forest, the air grew heavy and the ground beneath their feet trembled.\n\nSuddenly, they came to a clearing, and there before their eyes was the monster - a massive beast with sharp teeth, glowing red eyes, and claws that could crush a human with ease. The creature roared, a thunderous sound that shook the forest to its core.\n\nFear surged through Anya, but she refused to let it consume her. She drew the sword from its sheath and charged towards the monster. The blade shimmered in the sunlight, and as it struck the beast's hide, a blinding light erupted, enveloping everything in its radiance.\n\nWhen the light faded, the monster was gone, and in its place was a pile of shattered crystals. Anya had defeated the creature with the magic of her backpack, proving that even the smallest of objects could hold the greatest of powers.\n\nAs she and Samuel returned to the town, they were greeted as heroes. The people of Willow Creek rejoiced, and the legend of Anya, the girl with the magic backpack, was passed down through generations. And so, Anya continued her adventures, using the backpack's wonders to make the world a better place, one magical step at a time.";

async function generateContent() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `Please return JSON response for a place holders in a website  using the following schema:

  {

  All fields are required.

  Important: Only return a single piece of valid JSON text.

  

  ` + story

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const parsedText = JSON.parse(text);
  console.log(parsedText);
}

generateContent();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000; // Set the port for the server

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
