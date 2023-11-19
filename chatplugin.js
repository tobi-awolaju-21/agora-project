function(instance, properties, context) {

    //code for chat
// Get the HTML element with the ID "AgoraCallView"
var container = document.getElementById("AgoraCallView");
var AgoraCallView_height = container.clientHeight;


// Check if the container element exists
if (container) {
  container.style.backgroundColor = "white";
// Create a new div element
var divElement = document.createElement("div");
divElement.innerHTML = `
   <!-- Include CSS stylesheets and JavaScript files here -->
 
<style>

.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(${AgoraCallView_height}px - 20px);
}

.chat-messages {
flex: 1;
overflow-y: scroll;
padding: 10px;
}

.chat-message {
padding: 10px;
max-width: 60vw;
min-width: 10vw;
margin-bottom: 10px;
background-color: #eee;
border-radius: 5px;
white-space: nowrap;
}


.chat-message-author {
font-weight: bold;
}

.chat-message-timestamp {
font-size: 12px;
color: #999;
}

.chat-input-container {
display: flex;
margin-top: 10px;
padding: 10px;
background-color: #fff;
border-radius: 5px;
}

#chat-input {
flex: 1;
padding: 10px;
border: 1px solid #ccc;
border-radius: 50px;
}

#chat-send-button {
margin-left: 10px;
margin-right: 10px;
padding: 10px;
background-color: rgb(53, 121, 70);
color: #fff;
border-radius: 50px;
width:100px;
border: none;
cursor: pointer;
}

</style>


<div class="chat-container">
    <div class="chat-messages">
        </div>
    <div class="chat-input-container">
        <input type="text" id="chat-input" placeholder="Enter your message">
        <button id="chat-send-button">Send</button>
    </div>
</div>
`;

// Append the divElement to the container
container.appendChild(divElement);
}


// start of js script
    // Initialize Firebase

 var firebaseConfig = {
apiKey: "AIzaSyBBXgSPzS10gtRvsMinQCbBSY8YbCN9TwY",
authDomain: "agora-chat-54d3f.firebaseapp.com",
databaseURL: "https://agora-chat-54d3f-default-rtdb.firebaseio.com",
projectId: "agora-chat-54d3f",
storageBucket: "agora-chat-54d3f.appspot.com",
 };

firebase.initializeApp(firebaseConfig);


const chatMessagesElement = document.querySelector('.chat-messages');
const chatInputElement = document.getElementById('chat-input');
const chatSendButton = document.getElementById('chat-send-button');

// Fetch messages from the server
async function fetchMessages() {
try {

// Delete everything inside the chat-messages div
chatMessagesElement.innerHTML = '';
const response = await fetch('https://agora-chat-54d3f-default-rtdb.firebaseio.com/channel/deyplay.json');
const data = await response.json();

// Update messagesData with the fetched data
var messagesData = data || {};


// Generate chat messages from data
for (const messageId in messagesData) {
  const messageData = messagesData[messageId];
  const messageElement = createChatMessageElement(messageData);
  chatMessagesElement.appendChild(messageElement);
}
} catch (error) {
console.error('Error fetching messages:', error);
}
}

// Initial fetch on page load
fetchMessages();



function createChatMessageElement(messageData) {
const messageElement = document.createElement('div');
messageElement.classList.add('chat-message');

const messageAuthorElement = document.createElement('div');
messageAuthorElement.classList.add('chat-message-author');
messageAuthorElement.textContent = messageData.author;
messageElement.appendChild(messageAuthorElement);

const messageContentElement = document.createElement('div');
messageContentElement.classList.add('chat-message-content');
messageContentElement.textContent = messageData.message;
messageElement.appendChild(messageContentElement);

const messageTimestampElement = document.createElement('div');
messageTimestampElement.classList.add('chat-message-timestamp');
messageTimestampElement.textContent = new Date(messageData.timestamp).toLocaleString();
messageElement.appendChild(messageTimestampElement);

return messageElement;
}


// Handle chat input
chatSendButton.addEventListener('click', async () => {
const messageText = chatInputElement.value.trim();
if (messageText) {
  // Send message to server
  // ...  alex in the wonderland 
// Get the current timestamp
var timestamp = firebase.database.ServerValue.TIMESTAMP;
var channel_name = "deyplay";

// Reference the "canvas_images" node in the Realtime Database
var Messages = firebase.database().ref('channel/'+channel_name);
// Save the details to the Realtime Database
Messages.push({
message: messageText,
timestamp: timestamp,
arthur: "arthur",
});
  // Add message to chat UI
  fetchMessages()
  
  // Clear input field
  chatInputElement.value = "";
  messagesData = {};

}
});

}