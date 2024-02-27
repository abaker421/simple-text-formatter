function capitalizeFirstLetter(inputString) {
    if (typeof inputString !== 'string' || inputString.length === 0) {
        return inputString;
    }

    // Split the string into words
    const words = inputString.split(/[\s.]+/);

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
        if (word.length > 0) {
            const firstChar = word.charAt(0);
            const restOfString = word.slice(1);
            return firstChar.toUpperCase() + restOfString.toLowerCase();
        } else {
            return word; // Preserve empty strings (e.g., consecutive spaces)
        }
    });

    // Join the words back together with spaces
    const resultString = capitalizedWords.join(' ');

    return resultString;
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

    // Capitalize the first letter after a period or space and handle lowercase based on checkbox
    const modifiedUserInput = lowercase ? capitalizeFirstLetter(userInput) : userInput;

    resultTextElement.style.cssText = styles;
    resultTextElement.textContent = modifiedUserInput;
}
