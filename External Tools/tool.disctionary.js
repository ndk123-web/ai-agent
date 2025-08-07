import axios from "axios";

async function dictionaryTool({ word }) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  try {
    const res = await axios.get(url);
    const meaning = res.data[0].meanings[0].definitions[0].definition;
    return `${word}: ${meaning}`;
  } catch {
    return "Word not found";
  }
}

// dictionaryTool("truth").then(console.log);
export { dictionaryTool };
