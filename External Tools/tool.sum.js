function sumTool( { num1 , num2 , operation } ) {
  switch (operation) {
    case "add": return num1 + num2;
    case "sub": return num1 - num2;
    case "mul": return num1 * num2;
    case "div": return num2 !== 0 ? num1 / num2 : "Division by zero";
    default: return "Invalid operation";
  }
}

// Example
// console.log(sumTool(5, 3, "mul")); // 15

export { sumTool };