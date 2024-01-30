const screen = document.querySelector(".screen__text");
const buttons = Array.from(document.querySelectorAll("button"));
let equation = "";
let flag = true;
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (flag) {
      if (button.innerText != "=" && button.innerText != "C") {
        if (
          isApproved(
            screen.innerText[screen.innerText.length - 1],
            button.innerText
          )
        ) {
          screen.innerText += button.innerText;
          equation += button.innerText;
        }
      } else if (button.innerText == "C") {
        screen.innerText = "";
        equation = "";
      } else {
        if (
          equation[equation.length - 1] == "+" ||
          equation[equation.length - 1] == "-" ||
          equation[equation.length - 1] == "*" ||
          equation[equation.length - 1] == "/"
        ) {
          screen.innerText = "Syntax Error";
          flag = false;
        } else {
          while (equation.includes("*") || equation.includes("/")) {
            let firstValue = 0;
            let secondValue = 0;
            let operatorIndexM = equation.indexOf("*");
            let operatorIndexD = equation.indexOf("/");
            let operatorIndex = 0;
            if (operatorIndexM == -1) {
              operatorIndex = operatorIndexD;
            } else if (operatorIndexD == -1) {
              operatorIndex = operatorIndexM;
            } else {
              operatorIndex = Math.min(operatorIndexM, operatorIndexD);
            }
            let firstIndex = operatorIndex - 1;
            let secondIndex = operatorIndex + 1;
            let p = 1;
            while (
              firstIndex >= 0 &&
              equation[firstIndex] != "+" &&
              equation[firstIndex] != "-" &&
              equation[firstIndex] != "*" &&
              equation[firstIndex] != "/"
            ) {
              firstValue += parseInt(equation[firstIndex]) * p;
              firstIndex--;
              p *= 10;
            }
            p = 1;
            while (
              secondIndex < equation.length &&
              equation[secondIndex] != "+" &&
              equation[secondIndex] != "-" &&
              equation[secondIndex] != "*" &&
              equation[secondIndex] != "/"
            ) {
              secondValue = secondValue * p + parseInt(equation[secondIndex]);
              secondIndex++;
              p *= 10;
            }
            let result = 0;
            if (equation[operatorIndex] == "*") {
              result = firstValue * secondValue;
            } else {
              result = firstValue / secondValue;
            }
            secondValue = parseInt(secondValue);
            firstValue = parseInt(firstValue);
            equation = equation.replace(
              firstValue + equation[operatorIndex] + secondValue,
              result
            );
          }
          let result = 0;
          let firstValue = 0;
          let secondValue = 0;
          let f = false;
          let operator = "";
          for (let i = 0; i < equation.length; i++) {
            if (!f) {
              if (equation[i] != "+" && equation[i] != "-") {
                firstValue = firstValue * 10 + parseInt(equation[i]);
              } else {
                f = true;
                operator = equation[i];
              }
            } else {
              if (equation[i] != "+" && equation[i] != "-") {
                secondValue = secondValue * 10 + parseInt(equation[i]);
              } else {
                if (operator == "+") {
                  result = parseInt(firstValue) + parseInt(secondValue);
                } else {
                  result = parseInt(firstValue) - parseInt(secondValue);
                }
                firstValue = result;
                operator = equation[i];
                secondValue = 0;
              }
            }
          }
          if (operator == "+") {
            result = parseInt(firstValue) + parseInt(secondValue);
          } else {
            result = parseInt(firstValue) - parseInt(secondValue);
          }
          result = parseInt(result);
          screen.innerText = result;
          equation = result;
        }
      }
    } else {
      if (button.innerText == "C") {
        screen.innerText = "";
        equation = "";
        flag = true;
      }
    }
  });
});
function isApproved(endChar, newChar) {
  if (endChar == undefined) {
    if (newChar == "+" || newChar == "-" || newChar == "*" || newChar == "/") {
      return false;
    } else return true;
  }
  if (endChar == "+" || endChar == "-" || endChar == "*" || endChar == "/") {
    if (newChar == "+" || newChar == "-" || newChar == "*" || newChar == "/") {
      return false;
    } else return true;
  } else return true;
}
