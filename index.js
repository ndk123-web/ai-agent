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
import { weatherToolFunctionDeclaration } from "./Tool Declaration/declare.weather.js";
import { quoteToolFunctionDeclaration } from "./Tool Declaration/declare.quotes.js";
import { jokeToolFunctionDeclaration } from "./Tool Declaration/declare.jokes.js";
import { bitCoinFunctionDeclaration } from "./Tool Declaration/declare.bitcoin.js";

// Initialize AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); // Enter Your GEMINI API HERE

// Conversation History
const History = [];

const MAX_ITERATIONS = 5;
let CURRENT_ITERATION = 0;

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
  /**
   * 0 to MAX_ITERATIONS
   */
  while (CURRENT_ITERATION < MAX_ITERATIONS) {
    console.log("Generating response....");

    if (CURRENT_ITERATION >= MAX_ITERATIONS) {
      console.log("Max iterations reached. Stopping.");
      return;
    }

    CURRENT_ITERATION++;

    const result = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: History,
      config: { tools },
    });

    // if function calls are there
    if (result.functionCalls && result.functionCalls.length > 0) {
      console.log("Taking External Action....");

      // const functionCall = result.functionCalls[0];

      var toolResult = "";

      for (let tool of result.functionCalls) {
        const functionName = tool.name;
        const functionArgs = tool.args;

        console.log("Function name:", functionName);
        console.log("Function arguments:", functionArgs);

        switch (tool["name"]) {
          case "sumTool": {
            const res = await sumTool(functionArgs);
            toolResult =
              (typeof res === "object" ? JSON.stringify(res) : res) +
              " " +
              toolResult;
            break;
          }
          case "jokeTool": {
            const res = await jokeTool(functionArgs);
            toolResult =
              (typeof res === "object" ? JSON.stringify(res) : res) +
              "\n" +
              toolResult;
            break;
          }
          case "bitcoinTool": {
            const res = await bitcoinTool(functionArgs);
            toolResult =
              (typeof res === "object" ? JSON.stringify(res) : res) +
              "\n" +
              toolResult;
            break;
          }
          case "quoteTool": {
            const res = await quoteTool(functionArgs);
            toolResult =
              (typeof res === "object" ? JSON.stringify(res) : res) +
              "\n" +
              toolResult;
            break;
          }
          case "dictionaryTool": {
            const res = await dictionaryTool(functionArgs);
            toolResult =
              (typeof res === "object" ? JSON.stringify(res) : res) +
              "\n" +
              toolResult;
            break;
          }
          case "weatherTool": {
            const res = await weatherTool(functionArgs);
            toolResult =
              (typeof res === "object" ? JSON.stringify(res) : res) +
              "\n" +
              toolResult;
            break;
          }
          default:
            throw new Error("Unknown function call");
        }

        // we need to tell to the model that this is the Functiona name and response
        // according to the that it will generate NLP Output
        History.push({
          role: "user",
          parts: [
            {
              functionResponse: {
                name: functionName,
                response: { result: toolResult },
              },
            },
          ],
        });

        console.log("Tool: ", toolResult);
        console.log("Tool result:", JSON.stringify(toolResult));
      }

      // only when run if there is any functiona Calls are there !
      // Calling the function again for getting better response
      // because we saw that
      const newQuestion = "Check History Accordingly give me the Final Output!";
      await runAgent(newQuestion);
      break;
    } else {
      // Find the text parts explicitly to avoid the SDK's internal warning about "thoughtSignature"
      const textResponse = result.candidates[0].content.parts
        .filter((part) => part.text)
        .map((part) => part.text)
        .join("");

      console.log(textResponse);
      History.push({
        role: "model",
        parts: [{ text: textResponse }],
      });
      return;
    }
  }
}

async function main() {
  const question = readlineSync.question("Ask your question: ");

  if (question.trim() === "exit") {
    console.log("Bye ...");
    return;
  }

  if (question.trim() === "") {
    console.log("Please ask a question.");
  }

  if (question.trim() === "history") {
    console.log("History: ", History);
    return;
  }

  History.push({ role: "user", parts: [{ text: question }] });
  await runAgent(question);

  main(); // its recursive
}

main();
