const interim = document.querySelector("#interim");
// Important stuff for the web speech API
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent =
	window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// Helps with the grammar
const words = ["color", "text", "padding", "margin"];
const grammar = `#JSGF V1.0; grammar colors; public <color> = ${words.join(
	" | "
)};`;
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = true;
recognition.maxAlternatives = 1;

// Start listening
const button = document.querySelector("#button");
button.onclick = () => {
	recognition.start();
	console.log("Ready to receive command.");
};

// Get results
recognition.onresult = event => {
	let result = event.results[0][0].transcript;
	interim.innerHTML = result;
	result = result.split(" ");

	// check if the statment prefix with word "text"
	if (result[0] == "text") {
		if (result[0] == "text" && result[1] == "colour") {
			// change text color
			button.style.color = result[2];
		} else if (result[0] == "text" && result[1] == "size") {
			// change font size
			button.style.fontSize = `${result[2]}px`;
		}
	} else if (result[0] == "background") {
		if (result[0] == "background" && result[1] == "colour") {
			// change background color
			button.style.backgroundColor = result[2];
		}
	} else if (result[0] == "margin") {
		//  Add padding
		button.style.padding = `${result[1]}px`;
	}
};

// Handle Error in hearing
recognition.onnomatch = event => {
	console.log("I didn't recognize that color.");
};
