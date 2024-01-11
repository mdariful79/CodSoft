document.addEventListener("DOMContentLoaded", function () {
  var operator = document.getElementsByClassName("operator");
  for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function () {
      handleOperatorClick(this.id);
    });
  }

  var number = document.getElementsByClassName("number");
  for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function () {
      handleNumberClick(this.id);
    });
  }

  function handleOperatorClick(operatorId) {
    if (operatorId == "clear") {
      printHistory("");
      printOutput("");
    } else if (operatorId == "backspace") {
      var output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else if (operatorId == "=") {
      performCalculation();
    } else {
      handleOperator(operatorId);
    }
  }

  function handleNumberClick(numberId) {
    var output = reverseNumberFormat(getOutput());
    if (!isNaN(output) || numberId === ".") {
      // if output is a number or it's a decimal point
      output = output + numberId;
      printOutput(output);
    }
  }

  function performCalculation() {
    var output = getOutput();
    var history = getHistory();
    if (output == "" && history != "") {
      if (isNaN(history[history.length - 1])) {
        history = history.substr(0, history.length - 1);
      }
    }
    if (output != "" || history != "") {
      output = output == "" ? output : reverseNumberFormat(output);
      history = history + output;
      var result = eval(history);
      printOutput(result);
      printHistory("");
    }
  }

  function handleOperator(operatorId) {
    var output = getOutput();
    var history = getHistory();
    if (output != "") {
      if (output.slice(-1) === ".") {
        output = output.slice(0, -1);
      }
      history += output + operatorId;
      output = "";
    } else if (history != "") {
      history = history.slice(0, -1) + operatorId;
    }
    printHistory(history);
    printOutput(output);
  }

  function getHistory() {
    return document.getElementById("history-value").innerText;
  }

  function printHistory(num) {
    document.getElementById("history-value").innerText = num;
  }

  function getOutput() {
    return document.getElementById("output-value").innerText;
  }

  function printOutput(num) {
    if (num == "") {
      document.getElementById("output-value").innerText = num;
    } else {
      document.getElementById("output-value").innerText =
        getFormattedNumber(num);
    }
  }

  function getFormattedNumber(num) {
    if (num == "-") {
      return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
  }

  function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ""));
  }
});
