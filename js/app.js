const moodButtons = document.querySelectorAll("[data-mood]");
const moodResult = document.getElementById("moodResult");
const suggestion = document.getElementById("suggestion");

const moodTips = {
  Happy: "Nice! Take a moment to notice what went well today.",
  Okay: "Try choosing one small, manageable goal for today.",
  Stressed: "Pause for a moment, relax your shoulders, and break your next task into smaller steps.",
  Sad: "Be kind to yourself. If you can, consider talking with someone you trust."
};

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    moodButtons.forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");

    const mood = button.dataset.mood;
    moodResult.textContent = `Your selected mood: ${mood}`;
    suggestion.textContent = moodTips[mood];
  });
});

const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chat = document.getElementById("chat");

function getReply(message) {
  const text = message.toLowerCase();

  if (/\b(stress|stressed|exam|pressure|overwhelmed)\b/.test(text)) {
    return "That sounds like a lot to manage. You could try breaking one task into smaller steps and taking a short break. Would you like to talk about what's causing the pressure?";
  }
  if (/\b(sad|lonely|alone|upset)\b/.test(text)) {
    return "I'm sorry things feel difficult. You deserve support. Would it help to talk with a trusted friend, family member, teacher, or counsellor?";
  }
  if (/\b(happy|great|good|excited)\b/.test(text)) {
    return "I'm glad you shared that. What has been the best part of your day?";
  }
  if (/\b(hello|hi|hey)\b/.test(text)) {
    return "Hi! How are you feeling today?";
  }
  if (/\b(help|support|counsellor|counselor)\b/.test(text)) {
    return "I can share general wellness ideas, but I'm not a professional. A trusted adult, college counsellor, or qualified health professional can provide personal support.";
  }
  if (/\b(unsafe|emergency|danger)\b/.test(text)) {
    return "Your safety matters. Please contact a trusted person who can be with you now or your local emergency service if there is immediate danger. This demo cannot provide emergency assistance.";
  }

  return "Thank you for sharing. What kind of support would feel useful right now: talking it through, a small practical step, or a simple relaxation activity?";
}

function addMessage(label, text, className) {
  const message = document.createElement("div");
  message.className = `message ${className}`;

  const strong = document.createElement("strong");
  strong.textContent = `${label}: `;
  message.appendChild(strong);
  message.appendChild(document.createTextNode(text));

  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("You", message, "user");
  addMessage("MindMate", getReply(message), "bot");
  userInput.value = "";
  userInput.focus();
});
