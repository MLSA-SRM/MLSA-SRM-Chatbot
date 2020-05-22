// MSPC BOT Credentials
const host = "mspcbot-faq.azurewebsites.net"
const POSTkey = '946b8385-23cd-4333-a5f4-8e4bb7075770'
const key = 'EndpointKey d984024e-ca78-4394-8b1c-d96907585545'

// popup action open
function openForm() {
    document.getElementById("myForm").style.display = "block";
    var chat_container = document.getElementsByClassName("chat")[0].firstElementChild;
    var new_chat_gen = document.createElement('div');
    new_chat_gen.id = 'chat-generate';
    chat_container.appendChild(new_chat_gen);
    newBotDialogue('<p>How we may help you?</p>');
}

// popup action close
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    chat_gen = document.getElementById("chat-generate");
    console.log(chat_gen.children.length);
    chat_gen.remove();
}

// add bot dialogue to chat
function newBotDialogue(dialogue) {
    var this_dialogue_row = document.createElement('div');
    this_dialogue_row.className = 'row';

    var this_dialogue_col = document.createElement('div');
    this_dialogue_col.className = 'col-8 p-1 my-2 border';

    var xmlString = dialogue;
    var doc = new DOMParser().parseFromString(xmlString, "text/xml");
    console.log(doc)
    var this_dialogue_text = document.createElement('div');
    this_dialogue_text.appendChild(doc.firstChild);
    this_dialogue_col.appendChild(this_dialogue_text);

    var this_dialogue_filler = document.createElement('div');
    this_dialogue_filler.className = 'col p-1 my-2';

    this_dialogue_row.appendChild(this_dialogue_filler);
    this_dialogue_row.insertBefore(this_dialogue_col, this_dialogue_filler);

    var chat_gen = document.getElementById('chat-generate');
    chat_gen.appendChild(this_dialogue_row);

    this_dialogue_row.scrollIntoView();
}

//add user dialogue to chat
function newUserDialogue(dialogue) {
    var this_dialogue_row = document.createElement('div');
    this_dialogue_row.className = 'row';

    var this_dialogue_col = document.createElement('div');
    this_dialogue_col.className = 'col-8 p-1 bg-info my-2 text-white';

    var this_dialogue_filler = document.createElement('div');
    this_dialogue_filler.className = 'col p-1 my-2';

    var this_dialogue_text = document.createTextNode(dialogue.toString());
    this_dialogue_col.appendChild(this_dialogue_text);

    this_dialogue_row.appendChild(this_dialogue_col);
    this_dialogue_row.insertBefore(this_dialogue_filler, this_dialogue_col);

    var chat_gen = document.getElementById('chat-generate');
    chat_gen.appendChild(this_dialogue_row);

    this_dialogue_row.scrollIntoView();
}


// send new message
function sendMessage() {
    var msg = document.getElementsByName('psw')[0].value;
    if (msg.toString() != "") {
        console.log(msg);
        document.getElementsByName('psw')[0].value = '';
        
        payload = {
            "data": {
                "question": "'" + msg.toString() + "'",
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

        newUserDialogue(msg);

        fetch("https://mspcbotgate.azurewebsites.net/botservice/question", requestOptions)
        .then(response => response.json())
        .then(result => {
            var converter = new showdown.Converter(),
            text = result['reply'],
            html = converter.makeHtml(text);
            newBotDialogue(html)
        })
        .catch(error => console.log('error', error));
    }
}