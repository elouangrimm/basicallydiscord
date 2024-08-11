// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxGNOFCTk9I-0PYMRuVrVjTwqtQl51GPw",
  authDomain: "basicallydiscordapp.firebaseapp.com",
  projectId: "basicallydiscordapp",
  storageBucket: "basicallydiscordapp.appspot.com",
  messagingSenderId: "401747450257",
  appId: "1:401747450257:web:e8e0bb3eddd410f74e2230",
  measurementId: "G-84BQQNM04C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Wait for the DOM to load before accessing elements
document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');
    const chatBox = document.getElementById('chat-box');

    function sendMessage() {
        const username = usernameInput.value || 'Anonymous';
        const messageText = messageInput.value;

        if (messageText.trim()) {
            db.ref('messages').push({
                username: username,
                text: messageText
            }).then(() => {
                messageInput.value = ''; // Clear the message input after sending
            }).catch(error => {
                console.error("Error sending message: ", error);
            });
        }
    }

    // Set the click handler for the send button
    document.querySelector('button').addEventListener('click', sendMessage);
});


// Load messages from Firebase
db.ref('messages').on('child_added', (snapshot) => {
    const message = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.username}: ${message.text}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
});

// Send message to Firebase
function sendMessage() {
    const username = usernameInput.value || 'Anonymous';
    const messageText = messageInput.value;

    if (messageText.trim()) {
        db.ref('messages').push({
            username: username,
            text: messageText
        });
        messageInput.value = '';
    }
}
