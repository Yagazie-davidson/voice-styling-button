const interim = document.querySelector("#interim");
console.log(interim);
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent =
	window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const colors = ["blue", "green", "padding", "margin", "coral" /* … */];
const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(
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

const button = document.querySelector("#button");
button.onclick = () => {
	recognition.start();
	console.log("Ready to receive command.");
};

// const str = "AND IT'S MESSING WIHT MY HEALTH";
// console.log(str.split(" "));
recognition.onresult = event => {
	let result = event.results[0][0].transcript;
	interim.innerHTML = result;
	result = result.split(" ");
	if (result[0] == "text") {
		if (result[0] == "text" && result[1] == "colour") {
			button.style.color = result[2];
		} else if (result[0] == "text" && result[1] == "size") {
			button.style.fontSize = `${result[2]}px`;
		}
	} else if (result[0] == "background") {
		if (result[0] == "background" && result[1] == "colour") {
			button.style.backgroundColor = result[2];
		}
	} else if (result[0] == "margin") {
		button.style.padding = `${result[1]}px`;
	}
	console.log(result);
	// console.log(`Confidence: ${event.results[0][0].confidence}`);
};
recognition.onnomatch = event => {
	console.log("I didn't recognize that color.");
};
