import { Type } from "@google/genai";

const dictionaryToolFunctionDeclaration = {
  name: "dictionaryTool",
  description: "Can Provide Word Definitions",
  parameters: {
    type: Type.OBJECT,
    properties: {
      word: { type: Type.STRING, description: "The word to define" },
    },
    required: ["word"],
  },
};

export { dictionaryToolFunctionDeclaration };
