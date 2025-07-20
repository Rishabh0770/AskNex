// === Theme toggle with localStorage ===
const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("asknex-theme");

if (currentTheme === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "🌞";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const theme = document.body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("asknex-theme", theme);
  themeToggle.textContent = theme === "light" ? "🌞" : "🌙";
});

// === Active nav highlight ===
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

// === Gemini Chat Integration ===
const API_KEY = "AIzaSyBK0FelMHtqS7Iml9GImoMgWrD8GuTS0SA"; // <-- Replace with your actual key
const chatForm = document.getElementById("chatForm");
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

if (chatForm && chatBox && userInput) {
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userText = userInput.value.trim();
    if (!userText) return;

    appendMessage("user", userText);
    userInput.value = "";
    appendMessage("ai", "Thinking...", true); // Loading message

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userText }] }]
        })
      });

      const data = await res.json();
      const response = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't get that.";
      removeLoading();
      appendMessage("ai", response);
    } catch (err) {
      removeLoading();
      appendMessage("ai", "❌ Oops! Something went wrong.");
      console.error(err);
    }
  });

  function appendMessage(role, text, isLoading = false) {
    const msg = document.createElement("div");
    msg.className = `chat-message ${role}`;
    msg.textContent = (role === "ai" ? "👾 " : "🙋‍♂️ ") + text;
    if (isLoading) msg.classList.add("loading");
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function removeLoading() {
    const loadingEl = chatBox.querySelector(".loading");
    if (loadingEl) loadingEl.remove();
  }
}


// scroll.js
document.addEventListener("DOMContentLoaded", () => {
  const animatedEls = document.querySelectorAll('.animate');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2
  });

  animatedEls.forEach(el => observer.observe(el));
});

// button to go to chat page
document.getElementById("startChatBtn").addEventListener("click", () => {
  window.location.href = "chat.html";
});


