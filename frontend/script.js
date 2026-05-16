// --- DOM Elements ---
const checkBtn = document.getElementById('check-btn');
const toggleBtn = document.getElementById('toggle-btn');
const sendBtn = document.getElementById('send-btn');
const customMessageInput = document.getElementById('custom-message');

const resultBox = document.getElementById('result-box');
const statusText = document.getElementById('status-text');
const messageText = document.getElementById('message-text');

const replyBox = document.getElementById('reply-box');
const replyText = document.getElementById('reply-text');

const BASE_URL = 'http://127.0.0.1:5000';

// --- 1. Check Health Status ---
checkBtn.addEventListener('click', async () => {
    showLoadingHealth();
    try {
        const response = await fetch(`${BASE_URL}/health`);
        const data = await response.json();

        // Check if status is UP or DOWN
        if (data.status === 'UP') {
            setHealthUI('status-up', 'UP', data.message);
        } else {
            setHealthUI('status-down', 'DOWN', data.message);
        }
    } catch (error) {
        setHealthUI('status-down', 'ERROR', 'Could not connect to the API.');
    }
});

// --- 2. Simulate Server Crash / Recovery ---
let isServerDown = false;
toggleBtn.addEventListener('click', async () => {
    try {
        const response = await fetch(`${BASE_URL}/toggle-status`, {
            method: 'POST'
        });
        const data = await response.json();
        
        // Update button text based on new state
        if (data.status === 'DOWN') {
            toggleBtn.innerText = "Simulate Server Recovery";
            toggleBtn.style.backgroundColor = "#e94560";
            toggleBtn.style.color = "white";
        } else {
            toggleBtn.innerText = "Simulate Server Crash";
            toggleBtn.style.backgroundColor = "#2a1622";
            toggleBtn.style.color = "#e94560";
        }
        
        // Automatically check the health again so the user sees the update instantly
        checkBtn.click();
        
    } catch (error) {
        console.error("Failed to toggle server state", error);
    }
});

// --- 3. Send Custom Message to Backend ---
sendBtn.addEventListener('click', async () => {
    const message = customMessageInput.value.trim();
    if (!message) return; // Don't send empty messages

    replyBox.classList.remove('hidden');
    replyText.innerText = "Sending...";
    replyBox.style.display = 'block';

    try {
        const response = await fetch(`${BASE_URL}/echo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            replyText.innerText = data.reply;
            customMessageInput.value = ""; // Clear the input
        } else {
            replyText.innerText = `Error: ${data.error || 'Server error'}`;
        }
    } catch (error) {
        replyText.innerText = "Error: Could not connect to the API.";
    }
});

// Allow hitting "Enter" in the input box to send
customMessageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

// --- Helper UI Functions ---
function showLoadingHealth() {
    resultBox.classList.remove('hidden', 'status-up', 'status-down');
    statusText.innerText = "Checking...";
    messageText.innerText = "";
    resultBox.style.display = 'block';
}

function setHealthUI(statusClass, statusTitle, description) {
    resultBox.classList.remove('status-up', 'status-down');
    resultBox.classList.add(statusClass);
    statusText.innerText = `Status: ${statusTitle}`;
    messageText.innerText = description;
}
