import { Type } from "@google/genai";

const weatherToolFunctionDeclaration = {
  name: "weatherTool",
  description: "Can Provide Weather Information",
  parameters: {
    type: Type.OBJECT,
    properties: {
      city: {
        type: Type.STRING,
        description: "The city to get weather information for",
      },
    },
    required: ["city"],
  },
};

export { weatherToolFunctionDeclaration };
