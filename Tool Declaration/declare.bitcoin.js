import { Type } from "@google/genai";

const bitCoinFunctionDeclaration = {
  name: "bitCoinTool",
  description: "Can Provide Bitcoin Information",
  parameters: {
    type: Type.OBJECT,
    properties: {
      currency: {
        type: Type.STRING,
        description: "The type of currency to retrieve information for",
      },
    },
    required: ["currency"],
  },
};

export { bitCoinFunctionDeclaration };
