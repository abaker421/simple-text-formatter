function capitalizeFirstLetter(inputString) {
    if (typeof inputString !== 'string' || inputString.length === 0) {
        return inputString;
    }

    const firstChar = inputString.charAt(0);
    const restOfString = inputString.slice(1);

    return firstChar.toUpperCase() + restOfString.toLowerCase();
}

function display() {
    // Get user input text
    const userInput = document.getElementById("userTextInput").value;

    // Get checkbox values
    const bold = document.getElementById("boldCheckbox").checked;
    const italics = document.getElementById("italicsCheckbox").checked;
    const underline = document.getElementById("underlineCheckbox").checked;
    const strikethrough = document.getElementById("strikethroughCheckbox").checked;
    const lowercase = document.getElementById("lowercaseCheckbox").checked;

    // Build the style string based on checkbox values
    let styles = "";
    if (bold) styles += "font-weight: bold;";
    if (italics) styles += "font-style: italic;";
    if (underline) styles += "text-decoration: underline;";
    if (strikethrough) styles += "text-decoration-line: line-through;";

    // Apply styles and set the text content
    const resultTextElement = document.getElementById("resultText");

    // Capitalize the first letter and handle lowercase based on checkbox
    const modifiedUserInput = lowercase ? capitalizeFirstLetter(userInput) : userInput;

    resultTextElement.style.cssText = styles;
    resultTextElement.textContent = modifiedUserInput;
}
