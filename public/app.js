// Initialize Firebase (make sure the configuration matches your project settings)
const firebaseConfig = {
    apiKey: "AIzaSyCxGNOFCTk9I-0PYMRuVrVjTwqtQl51GPw",
    authDomain: "basicallydiscordapp.firebaseapp.com",
    databaseURL: "https://basicallydiscordapp-default-rtdb.firebaseio.com",
    projectId: "basicallydiscordapp",
    storageBucket: "basicallydiscordapp.appspot.com",
    messagingSenderId: "401747450257",
    appId: "1:401747450257:web:e8e0bb3eddd410f74e2230",
    measurementId: "G-84BQQNM04C"
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Get a reference to the Realtime Database
const db = firebase.database();

// Reference to the messages collection in the database
const messagesRef = db.ref('messages');

// Listen for new messages added to the database
messagesRef.on('child_added', (snapshot) => {
    const message = snapshot.val();
    displayMessage(message.text);
});

// Function to send a new message to the database
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent the form from refreshing the page
    const input = document.getElementById('input');
    const message = input.value.trim();

    if (message) {
        // Push the message to the database
        messagesRef.push({ text: message });
        input.value = '';  // Clear the input field
    }
});

// Function to display the message on the chat interface
function displayMessage(message) {
    const messagesList = document.getElementById('messages');
    const newMessage = document.createElement('li');
    newMessage.textContent = message;
    messagesList.appendChild(newMessage);
    messagesList.scrollTop = messagesList.scrollHeight;  // Scroll to the bottom
}
