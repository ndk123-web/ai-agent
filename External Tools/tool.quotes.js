import axios from "axios";

async function quoteTool({ author }) {
  const url = `https://api.quotable.io/quotes?author=${author}`;
  try {
    const res = await axios.get(url);
    if (res.data.count === 0) return "No quotes found";
    return res.data.results[0].content;
  } catch {
    return "Author not found";
  }
}

// quoteTool("Einstein").then(console.log);
export { quoteTool };
