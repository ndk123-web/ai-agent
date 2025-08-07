import { GoogleGenAI, Type } from "@google/genai";
import readlineSync from "readline-sync";
import "dotenv/config";

// Tools
import { sumTool } from "./External Tools/tool.sum.js";
import { dictionaryTool } from "./External Tools/tool.disctionary.js";
import { quoteTool } from "./External Tools/tool.quotes.js";
import { weatherTool } from "./External Tools/tool.weather.js";
import { jokeTool } from "./External Tools/tool.jokes.js";
import { bitcoinTool } from "./External Tools/tool.bitcoin.js";

// Declarations
import { dictionaryToolFunctionDeclaration } from "./Tool Declaration/declare.dictionary.js";
import { sumToolFunctionDeclaration } from "./Tool Declaration/declare.sum.js";
import { weatherToolFunctionDeclaration } from './Tool Declaration/declare.weather.js';
import { quoteToolFunctionDeclaration } from './Tool Declaration/declare.quotes.js';
import { jokeToolFunctionDeclaration } from './Tool Declaration/declare.jokes.js';
import { bitCoinFunctionDeclaration } from './Tool Declaration/declare.bitcoin.js';


// Initialize AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); // Enter Your GEMINI API HERE

// Conversation History
const History = [];

// Tool Declarations For Gemini API  
const tools = [
  {
    functionDeclarations: [
      sumToolFunctionDeclaration,
      jokeToolFunctionDeclaration,
      bitCoinFunctionDeclaration,
      quoteToolFunctionDeclaration,
      dictionaryToolFunctionDeclaration,
      weatherToolFunctionDeclaration,
    ],
  },
];

async function runAgent(question) {
  console.log("Generating response....");

  const result = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: History,
    config: { tools },
  });

  if (result.functionCalls && result.functionCalls.length > 0) {
    console.log("Taking External Action....");

    // const functionCall = result.functionCalls[0];

    let toolResult;

    for (let tool of result.functionCalls) {
      const functionName = tool.name;
      const functionArgs = tool.args;

      console.log("Function name:", functionName);
      console.log("Function arguments:", functionArgs);

      switch (tool["name"]) {
        case "sumTool":
          toolResult = await sumTool(functionArgs);
          break;
        case "jokeTool":
          toolResult = await jokeTool(functionArgs);
          break;
        case "bitCoinTool":
          toolResult = await bitCoinTool(functionArgs);
          break;
        case "quoteTool":
          toolResult = await quoteTool(functionArgs);
          break;
        case "dictionaryTool":
          toolResult = await dictionaryTool(functionArgs);
          break;
        case "weatherTool":
          toolResult = await weatherTool(functionArgs);
          break;
        default:
          throw new Error("Unknown function call");
      }

      History.push({
        role: "user",
        name: functionName,
        parts: [{ text: JSON.stringify(toolResult) }],
      });
      console.log("Tool result:", toolResult);
    }
  } else {
    console.log(result.text);
    History.push({
      role: "model",
      parts: [{ text: result.text }],
    });
  }
}

async function main() {
  const question = readlineSync.question("Ask your question: ");

  if (question.trim() === "exit") {
    console.log("Bye ...");
    return ;
  }

  if (question.trim() === "") {
    console.log("Please ask a question.");
  }

  if (question.trim() === "history"){
    console.log("History: ",History)
    return;
  }

  History.push({ role: "user", parts: [{ text: question }] });
  await runAgent(question);

  main(); // its recursive
}

main();
