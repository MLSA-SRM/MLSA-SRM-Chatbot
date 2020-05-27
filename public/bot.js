// variables
var input_mode = 'feedback';
var positive_sentiment = 'Thank you for the feedback! We work hard to get the best experience and try to hit the mark for you. Hoping to see you in the upcoming events by MSPC!';
var negative_sentiment = 'Kindly receive our apologies for the inconvenience caused. We are constantly making progress to enhance your experience. We appreciate your valuable feedback.';
// -------

console

function popupChat () {
    var bot_interface = document.getElementsByClassName('bot-interface')[0];
    bot_interface.style.display = 'block';

    var sendmsg_form = document.getElementsByClassName('sendmsg')[0];

    var chat_box = document.createElement('div');
    chat_box.id = 'chat-box';
    chat_box.className = 'container';

    bot_interface.insertBefore(chat_box, sendmsg_form);

    botMessage('How may we help you?');
    presentButtonOptions();
}

function closeChat () {
    var bot_interface = document.getElementsByClassName('bot-interface')[0];
    var chat_box = document.getElementById('chat-box');
    
    storeChat(chat_box)
    
    chat_box.remove()
    bot_interface.style.display = 'none';
}

function storeFeedback (feedback, pred_senti) {
    thisFeedback = JSON.stringify({
        "timestamp": (new Date()).getTime(),
        "feedback": feedback,
        "pred_senti": pred_senti
    });

    console.log(thisFeedback);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(thisFeedback)
    };

    fetch("http://localhost:5000/botadmin/logs/feedback", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function storeChat (chat_box) {
        var diaList = []
        for (i=0; i<chat_box.children.length;i++) {
            if (chat_box.children[i].id.toString() == 'bot-dialogue') {
                dialogue = {
                    'bot': chat_box.children[i].children[0].innerText
                }
                diaList.push(dialogue);
            } else if (chat_box.children[i].id.toString() == 'user-dialogue') {
                dialogue = {
                    'user': chat_box.children[i].children[1].innerText
                }
                diaList.push(dialogue);
            }
        }
        
        var chat = JSON.stringify({
            "timestamp": (new Date()).getTime(),
            "dialogue": diaList
        });
        console.log(chat);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(chat)
        };

        fetch("http://localhost:5000/botadmin/logs/chat", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

function botMessage (msg) {
    var chat_box = document.getElementById('chat-box');
    
    var newRow = document.createElement('div');
    newRow.className = "row justify-content-md";
    newRow.id = "bot-dialogue";

    var txtCol = document.createElement('div');
    txtCol.className = "col-sm-auto p-1 m-1";
    txtCol.id = "bot-sub-dia-1";

    var filCol = document.createElement('div');
    filCol.className = "col m-1";
    filCol.id = "bot-sub-dia-2";

    var dialogueContainer = document.createElement('div');
    dialogueContainer.id = "dialogue-container";

    var htmlString = '<p class="dialogue">' + msg + '</p>';
    var doc = new DOMParser().parseFromString(htmlString, "text/html");
    paraSets = doc.getElementsByTagName('p');
    for (i = 0; i < paraSets.length; ++i) {
        if(paraSets[i].innerText != '') {
            var mainPara = paraSets[i];
        }
    }
    mainPara.style.margin = 0;
    dialogueContainer.appendChild(mainPara);
    txtCol.appendChild(dialogueContainer);
    newRow.appendChild(filCol);
    newRow.insertBefore(txtCol, filCol);
    chat_box.appendChild(newRow);
    newRow.scrollIntoView();
}

function userMessage (msg) {
    var chat_box = document.getElementById('chat-box');
    
    var newRow = document.createElement('div');
    newRow.className = "row justify-content-md";
    newRow.id = "user-dialogue"

    var txtCol = document.createElement('div');
    txtCol.className = "col-auto p-1 mt-2 mb-2";
    txtCol.id = "user-sub-dia-2";

    var filCol = document.createElement('div');
    filCol.className = "col m-1";
    filCol.id = "user-sub-dia-1";

    var dialogueContainer = document.createElement('div');
    dialogueContainer.id = "dialogue-container"

    dialogueContainer.appendChild(document.createTextNode(msg.toString()));
    txtCol.appendChild(dialogueContainer);
    newRow.appendChild(filCol);
    newRow.appendChild(txtCol);
    chat_box.appendChild(newRow);
    newRow.scrollIntoView();
}

function presentButtonOptions () {
    var inputToBeDisabled = document.getElementsByClassName('msg')[0];
    inputToBeDisabled.disabled = true;
    inputToBeDisabled.placeholder = '';

    var chat_box = document.getElementById('chat-box');
    
    var newRow = document.createElement('div');
    newRow.className = "row justify-content-md";
    newRow.id = "button-dialogue"

    var thisButtonOption = document.createElement('div');
    thisButtonOption.className = 'col-sm-auto p-1 m-1';
    thisButtonOption.id = 'button-option';

    var thisButton = document.createElement('button');
    thisButton.className = 'option-button';

    var thisOption = document.createTextNode('Question');

    thisButton.appendChild(thisOption);
    thisButtonOption.appendChild(thisButton);
    newRow.appendChild(thisButtonOption);

    thisButton.onclick = () => {
        questionMode();
    }

    var thisButtonOption = document.createElement('div');
    thisButtonOption.className = 'col-sm-auto p-1 m-1';
    thisButtonOption.id = 'button-option';

    var thisButton = document.createElement('button');
    thisButton.className = 'option-button';

    var thisOption = document.createTextNode('Feedback');

    thisButton.appendChild(thisOption);
    thisButtonOption.appendChild(thisButton);
    newRow.appendChild(thisButtonOption);

    thisButton.onclick = () => { 
        feedbackMode();
    }

    chat_box.appendChild(newRow);
}

function questionMode() {  
    var inputToBeEnabled = document.getElementsByClassName('msg')[0];
    inputToBeEnabled.disabled = false;
    inputToBeEnabled.placeholder = 'Type here...';
    input_mode = 'question';

    var button_row = document.getElementById('button-dialogue');
    button_row.remove();

    userMessage('Question');
    botMessage("We're glad to help! Ask us anything..");
}


function feedbackMode() {
    var inputToBeEnabled = document.getElementsByClassName('msg')[0];
    inputToBeEnabled.disabled = false;
    inputToBeEnabled.placeholder = 'Type here...';
    input_mode = 'feedback';

    var button_row = document.getElementById('button-dialogue');
    button_row.remove();

    userMessage('Feedback');
    botMessage('We would love to have your views!');
}


function askQuestion() {
    msg = document.getElementsByClassName('msg')[0].value;
    if (msg.toString() != "") {
        if (input_mode == 'question') {
            document.getElementsByClassName('msg')[0].value = '';
            
            payload = {
                "data": {
                    "question": '"' + msg.toString() + '"',
                    "host": "mspcbot-faq.azurewebsites.net",
                    "POSTkey": "946b8385-23cd-4333-a5f4-8e4bb7075770",
                    "key": "EndpointKey d984024e-ca78-4394-8b1c-d96907585545"
                }
            }
        
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "text/plain");
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(payload)
            };

            userMessage(msg);

            fetch("https://mspcbotmain.azurewebsites.net/botservice/question", requestOptions)
            .then(response => response.json())
            .then(result => {
                var md = new Remarkable();
                text = md.render(result['reply']);
                botMessage(text);
            })
            .catch(error => console.log('error', error));

        } 
        if (input_mode == 'feedback') {
            document.getElementsByClassName('msg')[0].value = '';

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "EndpointKey f7562a24-429f-4ea8-8512-dafb1bdcf64b");
            myHeaders.append("Content-Type", "application/json");

            payload = {
                "data": {
                    "feedback": {
                        "value": '"' + msg.toString() + '"'
                    }
                }
            }

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(payload),
            };

            userMessage(msg);
            fetch("http://localhost:5000/botservice/feedback", requestOptions)
            .then(response => response.json())
            .then(result => {
                input_mode = 'question';

                if(result['reply'].toString() == '1') {
                    botMessage(positive_sentiment);
                } else if (result['reply'].toString() == '0') {
                    botMessage(negative_sentiment);
                }
                storeFeedback(msg.toString(), result['reply']);
                botMessage('Want to know anything else?')
            })
            .catch(error => console.log('error', error));

        }
    }
}