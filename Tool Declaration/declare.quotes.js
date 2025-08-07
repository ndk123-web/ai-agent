import { Type } from "@google/genai";

const quoteToolFunctionDeclaration = {
  name: "quoteTool",
  description: "Can Provide Quotes",
  parameters: {
    type: Type.OBJECT,
    properties: {
      author: { type: Type.STRING, description: "The author of the quote" },
    },
    required: ["author"],
  },
};

export { quoteToolFunctionDeclaration };
