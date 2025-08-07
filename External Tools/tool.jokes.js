import axios from "axios";


async function jokeTool({ type = "programming" }) {
  const url = `https://official-joke-api.appspot.com/jokes/${type}/random`;
  try {
    const res = await axios.get(url);
    const joke = res.data[0];
    return `${joke.setup} — ${joke.punchline}`;
  } catch {
    return "Joke type not found";
  }
}

// jokeTool("programming").then(console.log);
export { jokeTool };