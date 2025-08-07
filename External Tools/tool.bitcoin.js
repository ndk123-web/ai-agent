import axios from "axios";


async function bitcoinTool({ currency }) {
  const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
  const res = await axios.get(url);
  const data = res.data;

  const upperCurrency = currency.toUpperCase();
  if (!data.bpi[upperCurrency]) return "Currency not supported";

  return `${upperCurrency}: ${data.bpi[upperCurrency].rate}`;
}

// bitcoinTool("INR").then(console.log);
export { bitcoinTool };