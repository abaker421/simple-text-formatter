// textFormatter.js
function formatSentences(inputString) {
    if (typeof inputString !== 'string' || inputString.length === 0) {
        return inputString;
    }

    // Split the string into sentences using periods as the delimiter
    const sentences = inputString.split('.');

    // Capitalize the first letter of each sentence
    const formattedSentences = sentences.map(sentence => {
        if (sentence.length > 0) {
            const firstChar = sentence.trim().charAt(0);
            const restOfString = sentence.trim().slice(1);
            return firstChar.toUpperCase() + restOfString.toLowerCase();
        } else {
            return sentence; // Preserve empty strings (i.e., consecutive spaces)
        }
    });

    // Join the sentences back together with periods
    const resultString = formattedSentences.join('. ');

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
    const formatSentencesCheckbox = document.getElementById("formatSentencesCheckbox").checked;

    // Build the style string based on checkbox values
    let styles = "";
    if (bold) styles += "font-weight: bold;";
    if (italics) styles += "font-style: italic;";
    if (underline) styles += "text-decoration: underline;";
    if (strikethrough) styles += "text-decoration-line: line-through;";

    // Apply styles and set the text content
    const resultTextElement = document.getElementById("resultText");

    // Apply sentence formatting based on checkbox
    const modifiedUserInput = formatSentencesCheckbox ? formatSentences(userInput) : userInput;

    resultTextElement.style.cssText = styles;
    resultTextElement.textContent = modifiedUserInput;
}
