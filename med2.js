const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const recentChats = document.getElementById("recentChats"); // match HTML id

let chatHistory = [];
let chatCount = 0;

function appendMessage(content, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender === "user" ? "user-message" : "bot-message");
  msg.textContent = content;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function saveChat(prompt, reply) {
  chatCount++;
  const chatId = `chat-${chatCount}`; // fixed template literal
  chatHistory.push({ id: chatId, prompt, reply });

  const li = document.createElement("li");
  li.textContent = prompt.slice(0, 20) + "...";
  li.onclick = () => loadChat(chatId);
  recentChats.appendChild(li);
}

function loadChat(chatId) {
  chatBox.innerHTML = "";
  const chat = chatHistory.find(c => c.id === chatId);
  if (chat) {
    appendMessage(chat.prompt, "user");
    appendMessage(chat.reply, "bot");
  }
}

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  userInput.value = "";

  setTimeout(() => {
    const reply = "🤖 This is a placeholder bot reply for: " + message;
    appendMessage(reply, "bot");
    saveChat(message, reply);
  }, 700);
}

// Handle Enter key
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});