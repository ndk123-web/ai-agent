import { Type } from "@google/genai";

const jokeToolFunctionDeclaration = {
  name: "jokeTool",
  description: "Can Tell Jokes",
  parameters: {
    type: Type.OBJECT,
    properties: {
      type: { type: Type.STRING, description: "The type of joke" },
    },
    required: ['type'] // Not required default is Programming Joke
  },
};

export { jokeToolFunctionDeclaration };
