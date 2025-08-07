import { Type } from "@google/genai";

const sumToolFunctionDeclaration = {
  name: "sumTool",
  description: "Can Add, Subtract, Multiply, and Divide 2 Numbers",
  parameters: {
    type: Type.OBJECT,
    properties: {
      num1: { type: Type.NUMBER, description: "The first number" },
      num2: { type: Type.NUMBER, description: "The second number" },
      operation: {
        type: Type.STRING,
        description:
          "The mathematical operation to perform like add, sub, mul, or div",
      },
    },
    required: ["num1", "num2", "operation"],
  },
};

export { sumToolFunctionDeclaration };
