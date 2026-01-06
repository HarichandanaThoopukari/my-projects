// Utility to translate text using Google Translate API (for demo only)
async function translateText(text, targetLang, sourceLang = "auto") {
  if (targetLang === "en") return text;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(item => item[0]).join("");
  } catch (e) {
    return text; // fallback to original if error
  }
}

function addMessage(text, className) {
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${className}`;
  msgDiv.innerHTML = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function saveRecentChat(query) {
  let chats = JSON.parse(localStorage.getItem("recentChats") || "[]");
  if (!chats.includes(query)) {
    chats.unshift(query);
    if (chats.length > 10) chats = chats.slice(0, 10);
    localStorage.setItem("recentChats", JSON.stringify(chats));
    renderRecentChats();
  }
}

function renderRecentChats() {
  const chats = JSON.parse(localStorage.getItem("recentChats") || "[]");
  const ul = document.getElementById("recent-chats");
  ul.innerHTML = "";
  chats.forEach(chat => {
    const li = document.createElement("li");
    li.textContent = chat;
    li.onclick = () => {
      document.getElementById("user-input").value = chat;
      sendMessage();
    };
    ul.appendChild(li);
  });
}

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const langSelect = document.getElementById("language-select");
  const selectedLang = langSelect ? langSelect.value : "en";

  addMessage(message, "user-message");
  input.value = "";

  let messageInEnglish = message;
  if (selectedLang !== "en") {
    messageInEnglish = await translateText(message, "en", selectedLang);
  }

  // Fuzzy intent: handle misspellings like "fevr" or phrases like "tips fevr"
  const { intent, candidate } = parseIntent(messageInEnglish);
  const handledByFuzzy = await handleFuzzyIfConfident(intent, candidate, selectedLang);
  if (handledByFuzzy) {
    input.value = "";
    return;
  }

  const symptomsMatch = messageInEnglish.match(/^symptoms of (.+)$/i);
  const tipsMatch = messageInEnglish.match(/^tips of (.+)$/i);

  try {
    if (symptomsMatch) {
      const diseaseName = symptomsMatch[1].trim();
      const res = await fetch(`http://localhost:3001/api/disease/${encodeURIComponent(diseaseName)}`);
      if (res.ok) {
        const data = await res.json();
        let reply = `🦠 <b>Symptoms of ${data.name}:</b><br>${data.symptoms.join(", ")}`;
        if (selectedLang !== "en") reply = await translateText(reply, selectedLang, "en");
        addMessage(reply, "bot-message");
        saveRecentChat(message);
      } else {
        let reply = "❓ Disease not found. Please check the spelling or try another disease.";
        if (selectedLang !== "en") reply = await translateText(reply, selectedLang, "en");
        addMessage(reply, "bot-message");
      }
      return;
    }

    if (tipsMatch) {
      const diseaseName = tipsMatch[1].trim();
      const res = await fetch(`http://localhost:3001/api/disease/${encodeURIComponent(diseaseName)}`);
      if (res.ok) {
        const data = await res.json();
        let reply = `🦠 <b>Tips for ${data.name}:</b><br>${data.tips.join(", ")}`;
        if (selectedLang !== "en") reply = await translateText(reply, selectedLang, "en");
        addMessage(reply, "bot-message");
        saveRecentChat(message);
      } else {
        let reply = "❓ Disease not found. Please check the spelling or try another disease.";
        if (selectedLang !== "en") reply = await translateText(reply, selectedLang, "en");
        addMessage(reply, "bot-message");
      }
      return;
    }

    const res = await fetch(`http://localhost:3001/api/disease/${encodeURIComponent(messageInEnglish)}`);
    if (res.ok) {
      const data = await res.json();
      let reply = `
        🦠 <b>${data.name}</b><br>
        ${data.description}<br><br>
        <b>Symptoms:</b> ${data.symptoms.join(", ")}<br>
        <b>Tips:</b> ${data.tips.join(", ")}
      `;
      if (selectedLang !== "en") reply = await translateText(reply, selectedLang, "en");
      addMessage(reply, "bot-message");
      saveRecentChat(data.name);
    } else {
      const searchRes = await fetch(`http://localhost:3001/api/search/${encodeURIComponent(messageInEnglish)}`);
      if (searchRes.ok) {
        const diseases = await searchRes.json();
        let reply = `<b>Diseases matching "${messageInEnglish}":</b><br>`;
        diseases.forEach(d => {
          reply += `🦠 <b>${d.name}</b>: ${d.description}<br>`;
        });
        if (selectedLang !== "en") reply = await translateText(reply, selectedLang, "en");
        addMessage(reply, "bot-message");
        saveRecentChat(message);
      } else {
        // Fallback: suggest closest disease names using fuzzy matching
        let suggestionReply = await buildSuggestionReply(messageInEnglish);
        if (selectedLang !== "en") suggestionReply = await translateText(suggestionReply, selectedLang, "en");
        addMessage(suggestionReply, "bot-message");
      }
    }
  } catch (err) {
    console.error("Error:", err);
    let reply = "⚠ Sorry, there was a problem connecting to the server. Here are some general tips: stay hydrated, rest well, and consult a healthcare professional for persistent symptoms.";
    if (selectedLang !== "en") reply = await translateText(reply, selectedLang, "en");
    addMessage(reply, "bot-message");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderRecentChats();

  document.getElementById("user-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  // Apply saved language to page and input placeholder
  const langSelect = document.getElementById("language-select");
  const savedLang = (langSelect && langSelect.value) || localStorage.getItem("uiLang") || "en";
  applyInputPlaceholder(savedLang);
  translatePage(savedLang);
});

// React on language changes from navbar selector
document.addEventListener('uiLangChanged', (e) => {
  const lang = (e && e.detail && e.detail.lang) || 'en';
  applyInputPlaceholder(lang);
  translatePage(lang);
});

function applyInputPlaceholder(lang) {
  const input = document.getElementById("user-input");
  if (!input) return;
  const map = {
    en: "Type your message...",
    hi: "अपना संदेश लिखें...",
    te: "మీ సందేశాన్ని టైప్ చేయండి...",
    ta: "உங்கள் செய்தியை தட்டச்சு செய்யவும்...",
    ml: "നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...",
    bn: "আপনার বার্তা লিখুন..."
  };
  input.placeholder = map[lang] || map.en;
}

// Page-wide translation of visible UI texts
async function translatePage(targetLang) {
  // No translation needed
  if (!targetLang || targetLang === 'en') {
    restoreOriginalTexts();
    return;
  }

  const elements = getTranslatableElements();
  for (const el of elements) {
    const original = el.dataset.originalText || el.textContent.trim();
    if (!el.dataset.originalText) el.dataset.originalText = original;
    if (!original) continue;
    try {
      const translated = await translateText(original, targetLang, 'en');
      el.textContent = translated;
    } catch (_) {
      // ignore per-element translation errors
    }
  }
}

function restoreOriginalTexts() {
  const elements = getTranslatableElements();
  for (const el of elements) {
    if (el.dataset.originalText) {
      el.textContent = el.dataset.originalText;
    }
  }
}

function getTranslatableElements() {
  // Choose key UI elements; exclude dynamic chat messages (already translated in responses)
  const selectors = [
    '.nav-left h1',
    '.nav-right .nav-btn',
    '.sidebar h2',
    'footer p',
    // initial bot message (static in HTML)
    '#chat-box .bot-message:first-child'
  ];
  const elements = [];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => elements.push(el));
  });
  return elements;
}

// --- Fuzzy Intent Handlers ---
function parseIntent(text) {
  const lower = text.toLowerCase();
  const isSymptoms = /\b(symptom|symptoms)\b/.test(lower);
  const isTips = /\b(tip|tips)\b/.test(lower);
  const intent = isSymptoms ? "symptoms" : (isTips ? "tips" : null);

  // Extract a disease candidate by removing intent words and stop words
  const stopWords = ["of", "for", "the", "a", "an", "about", "on", "in", "and", "to", "me", "please"];
  let candidate = lower
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(w => w && !["symptom", "symptoms", "tip", "tips"].includes(w) && !stopWords.includes(w))
    .join(" ")
    .trim();
  if (!candidate) {
    candidate = lower.replace(/[^a-z\s]/g, " ").trim();
  }
  return { intent, candidate };
}

async function handleFuzzyIfConfident(intent, candidate, selectedLang) {
  // If no intent, still try to fuzzy match for short queries (<= 3 words)
  const shouldTry = intent || (candidate && candidate.split(/\s+/).length <= 3);
  if (!shouldTry || !candidate) return false;

  const best = await findBestDiseaseMatch(candidate);
  if (!best || best.score < 0.6) return false; // require decent similarity

  try {
    const res = await fetch(`http://localhost:3001/api/disease/${encodeURIComponent(best.name)}`);
    if (!res.ok) return false;
    const data = await res.json();

    let reply;
    if (intent === "symptoms") {
      reply = `🦠 <b>Symptoms of ${data.name}:</b><br>${data.symptoms.join(", ")}`;
    } else if (intent === "tips") {
      reply = `🦠 <b>Tips for ${data.name}:</b><br>${data.tips.join(", ")}`;
    } else {
      reply = `
        🦠 <b>${data.name}</b><br>
        ${data.description}<br><br>
        <b>Symptoms:</b> ${data.symptoms.join(", ")}<br>
        <b>Tips:</b> ${data.tips.join(", ")}
      `;
    }
    if (selectedLang !== "en") reply = await translateText(reply, selectedLang, "en");
    addMessage(reply, "bot-message");
    saveRecentChat(candidate);
    return true;
  } catch (_) {
    return false;
  }
}

async function findBestDiseaseMatch(query) {
  const names = await getDiseaseNames();
  if (!names || !names.length) return null;
  const ranked = names
    .map(name => ({ name, score: stringSimilarity(query.toLowerCase(), name.toLowerCase()) }))
    .sort((a, b) => b.score - a.score);
  return ranked[0];
}

let __diseaseNamesCache = null;
async function getDiseaseNames() {
  if (__diseaseNamesCache) return __diseaseNamesCache;
  try {
    const res = await fetch("http://localhost:3001/api/diseases");
    if (!res.ok) return [];
    __diseaseNamesCache = await res.json();
    return __diseaseNamesCache;
  } catch (_) {
    return [];
  }
}

// Build helpful suggestions when query doesn't match
async function buildSuggestionReply(query) {
  // fetch all known diseases to compute suggestions
  try {
    const listRes = await fetch("http://localhost:3001/api/diseases");
    if (!listRes.ok) throw new Error("Failed to fetch diseases list");
    const names = await listRes.json();
    const ranked = names
      .map(name => ({ name, score: stringSimilarity(query.toLowerCase(), name.toLowerCase()) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .filter(item => item.score > 0.1);

    if (ranked.length > 0) {
      let reply = `❓ I couldn't find an exact match for "${query}". Did you mean:`;
      ranked.forEach(item => {
        reply += `<br>• <b>${item.name}</b>`;
      });
      reply += `<br><br>You can also ask like: <i>"symptoms of Dengue"</i> or <i>"tips of Fever"</i>.`;
      return reply;
    }

    return `❓ I couldn't find anything for "${query}". Try asking: <i>symptoms of malaria</i>, <i>tips of cold</i>, or type a disease name like <b>Dengue</b>.`;
  } catch (_) {
    return `❓ I couldn't fetch suggestions. Try: <i>symptoms of fever</i>, <i>tips of cold</i>, or simply a disease name.`;
  }
}

// Basic string similarity (normalized Levenshtein-like)
function stringSimilarity(a, b) {
  if (a === b) return 1;
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  const longerLen = longer.length;
  if (longerLen === 0) return 0;
  const editDist = levenshteinDistance(longer, shorter);
  return (longerLen - editDist) / longerLen;
}

function levenshteinDistance(s, t) {
  const m = s.length, n = t.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return dp[m][n];
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userProfile");
  localStorage.removeItem("currentUser");

  const userProfileDiv = document.getElementById("user-profile");
  const defaultNavDiv = document.getElementById("default-nav");
  if (userProfileDiv) userProfileDiv.style.display = "none";
  if (defaultNavDiv) defaultNavDiv.style.display = "flex";

  addMessage("👋 You have been logged out successfully!", "bot-message");
}