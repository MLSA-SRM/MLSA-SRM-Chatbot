// // // variables
// // var input_mode = 'question';
// // var positive_sentiment = 'Thank you for the feedback! We work hard to get the best experience and try to hit the mark for you. Hoping to see you in the upcoming events by MSPC!';
// // var negative_sentiment = 'Kindly receive our apologies for the inconvenience caused. We are constantly making progress to enhance your experience. We appreciate your valuable feedback.';
var feedback_mode = false;
// // // -------

function botCommand(cmd) {
	console.log('CMD: ' + cmd.toString());

	switch (cmd.toString()) {
		case 'help':
			botMessage(
				'You can ask questions related to the club. We will try our best to answer them :)<br>Following Commands are also available for convenience:<br>@feedback - give feedback<br>@clear - clear current chat<br>@quit - close chatbot'
			);
			break;
		case 'feedback':
			botMessage('Your feedback is always welcome');
			feedback_mode = true;
			break;
		case 'clear':
			closeChat();
			popupChat();
			break;
		case 'quit':
			closeChat();
			break;
		default:
			botMessage('Invalid Command Attempt. Use @help to see available commands.');
	}
}

chat_log = [];

function popupChat() {
	// var newz = document.getElementsByClassName('events_btn_cer')[0];
	// newz.style.zIndex="1";
	var bot_interface = document.getElementsByClassName('bot-interface')[0];
	bot_interface.style.display = 'block';

	var chatBox = document.getElementById('chat-box');
	var chatHolder = document.createElement('div');
	chatHolder.id = 'chat-holder';

	chatBox.insertBefore(chatHolder, document.getElementsByClassName('user-input-dialogue')[0]);

	document.getElementsByClassName('user-input')[0].focus();
	botMessage('How may we help you?');
	// presentButtonOptions();
}

function closeChat() {
	// document.getElementsByClassName('events_btn_cer').style.zIndex = '6';
	var bot_interface = document.getElementsByClassName('bot-interface')[0];
	var chat_box = document.getElementById('chat-box');

	document.getElementById('chat-holder').remove();
	bot_interface.style.display = 'none';
}

function storeChat(chat_box) {
	var diaList = chat_log;
	console.log(diaList);
	chat_log = [];

	var chat = JSON.stringify({
		timestamp: new Date().getTime(),
		dialogue: diaList
	});
	console.log(chat);

	var myHeaders = new Headers();
	myHeaders.append('Content-Type', 'text/plain');

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify(chat)
	};

	// fetch("http://localhost:5000/botadmin/logs/chat", requestOptions)
	fetch('https://mspcchatbot.azurewebsites.net/botadmin/logs/chat', requestOptions)
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log('error', error));
}

function botMessage(msg) {
	var chat_box = document.getElementById('chat-holder');

	var dialogueContainer = document.createElement('div');
	dialogueContainer.id = 'dialogue-container';

	var dialogue = document.createElement('p');
	dialogue.className = 'dialogue';

	var spanT = document.createElement('span');
	spanT.id = 'bot-prompt';

	var botPrompt = document.createTextNode('/atlas> ');
	spanT.appendChild(botPrompt);

	dialogue.appendChild(spanT);

	var htmlString = '<p>' + msg + '</p>';
	var doc = new DOMParser().parseFromString(htmlString, 'text/html');
	console.log(doc);
	paraSets = doc.getElementsByTagName('p');
	console.log(paraSets);
	for (i = 0; i < paraSets.length; ++i) {
		if (paraSets[i].innerText != '') {
			var mainPara = paraSets[i];
		}
	}

	dialogue.appendChild(mainPara);
	dialogueContainer.appendChild(dialogue);
	chat_box.append(dialogueContainer);
	dialogueContainer.scrollIntoView();
	document.getElementsByClassName('bounds')[1].scrollIntoView();
	chat_log.push({
		bot: mainPara.innerText.toString()
	});

	var links = document.getElementsByTagName('a');
	if (links.length) {
		for (var i = 0; i < links.length; i++) {
			links[i].setAttribute('target', '_blank');
		}
	}
}

function userMessage(msg) {
	var chat_box = document.getElementById('chat-holder');

	var dialogueContainer = document.createElement('div');
	dialogueContainer.id = 'dialogue-container';

	var dialogue = document.createElement('p');
	dialogue.className = 'dialogue';

	var spanT = document.createElement('span');
	spanT.id = 'user-prompt';

	var botPrompt = document.createTextNode('/user> ');
	spanT.appendChild(botPrompt);

	dialogue.appendChild(spanT);

	var htmlString = '<p>' + msg + '</p>';
	var doc = new DOMParser().parseFromString(htmlString, 'text/html');
	console.log(doc);
	paraSets = doc.getElementsByTagName('p');
	console.log(paraSets);
	for (i = 0; i < paraSets.length; ++i) {
		if (paraSets[i].innerText != '') {
			var mainPara = paraSets[i];
		}
	}

	dialogue.appendChild(mainPara);
	dialogueContainer.appendChild(dialogue);
	chat_box.appendChild(dialogueContainer);
	dialogueContainer.scrollIntoView();
	chat_log.push({
		user: msg.toString()
	});
}

// // function presentButtonOptions () {
// //     var inputToBeDisabled = document.getElementsByClassName('msg')[0];
// //     inputToBeDisabled.disabled = true;
// //     inputToBeDisabled.placeholder = '';

// //     var chat_box = document.getElementById('chat-box');

// //     var newRow = document.createElement('div');
// //     newRow.className = "row justify-content-md";
// //     newRow.id = "button-dialogue"

// //     var thisButtonOption = document.createElement('div');
// //     thisButtonOption.className = 'col-sm-auto p-1 m-1';
// //     thisButtonOption.id = 'button-option';

// //     var thisButton = document.createElement('button');
// //     thisButton.className = 'option-button';

// //     var thisOption = document.createTextNode('Question');

// //     thisButton.appendChild(thisOption);
// //     thisButtonOption.appendChild(thisButton);
// //     newRow.appendChild(thisButtonOption);

// //     thisButton.onclick = () => {
// //         questionMode();
// //     }

// //     var thisButtonOption = document.createElement('div');
// //     thisButtonOption.className = 'col-sm-auto p-1 m-1';
// //     thisButtonOption.id = 'button-option';

// //     var thisButton = document.createElement('button');
// //     thisButton.className = 'option-button';

// //     var thisOption = document.createTextNode('Feedback');

// //     thisButton.appendChild(thisOption);
// //     thisButtonOption.appendChild(thisButton);
// //     newRow.appendChild(thisButtonOption);

// //     thisButton.onclick = () => {
// //         feedbackMode();
// //     }

// //     chat_box.appendChild(newRow);
// // }

// // function questionMode() {
// //     var inputToBeEnabled = document.getElementsByClassName('msg')[0];
// //     inputToBeEnabled.disabled = false;
// //     inputToBeEnabled.placeholder = 'Type here...';
// //     input_mode = 'question';

// //     var button_row = document.getElementById('button-dialogue');
// //     button_row.remove();

// //     userMessage('Question');
// //     botMessage("We're glad to help! Ask us anything..");
// // }

// // function feedbackMode() {
// //     var inputToBeEnabled = document.getElementsByClassName('msg')[0];
// //     inputToBeEnabled.disabled = false;
// //     inputToBeEnabled.placeholder = 'Type here...';
// //     input_mode = 'feedback';

// //     var button_row = document.getElementById('button-dialogue');
// //     button_row.remove();

// //     userMessage('Feedback');
// //     botMessage('We would love to have your views!');
// // }

function askQuestion() {
	var inputField = document.getElementsByClassName('user-input')[0];

	var prompt = document.getElementsByTagName('form')[0];
	prompt.style.display = 'none';

	msg = inputField.value;
	console.log(msg[0]);
	inputField.value = '';
	if (msg[0] != '@') {
		if (msg.toString() != '') {
			if (!feedback_mode) {
				payload = {
					data: {
						question: '"' + msg.toString() + '"',
						host: 'mspcbot-faq.azurewebsites.net',
						POSTkey: '2be5dde2-29b4-4b60-820a-04a6acf34292',
						key: 'EndpointKey d984024e-ca78-4394-8b1c-d96907585545'
					}
				};

				var myHeaders = new Headers();
				myHeaders.append('Content-Type', 'text/plain');
				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: JSON.stringify(payload)
				};

				userMessage(msg);

				// fetch("http://localhost:5000/botservice/question", requestOptions)
				fetch('https://mspcchatbot.azurewebsites.net/botservice/question', requestOptions)
					.then((response) => response.json())
					.then((result) => {
						var md = new Remarkable();
						text = md.render(result['reply']);
						botMessage(text);
						// inputField.style.display = "inline";
						prompt.style.display = 'inline';
						inputField.focus();
					})
					.catch((error) => {
						console.log('error', error);
						botMessage("I couldn't quite understand that.");
						prompt.style.display = 'inline';
						inputField.focus();
					});
			}
			if (feedback_mode) {
				userMessage(msg);
				storeChat();
				input_mode = 'question';
				botMessage('Thank you for your feedback! Need help with something else?');
				prompt.style.display = 'inline';
				inputField.focus();
				feedback_mode = false;
			}
		}
	} else if (msg[0] == '@') {
		userMessage(msg);
		botCommand(msg.slice(1, msg.length));
		prompt.style.display = 'inline';
		inputField.focus();
	}
}
