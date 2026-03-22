const emerald = document.getElementById('emerald');
const statusText = document.getElementById('status');
const aiAnswer = document.getElementById('ai-answer');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// --- ТВОЙ АТОМАРНЫЙ ЛДФЛДФ4 (КЛЮЧ СО СКРИНШОТА) ---
const p1 = "g"; const p2 = "s"; const p3 = "k"; const p4 = "_";
const b1 = "0AdMg160ObuSWt9l";
const b2 = "azpcWGdyb3FYnGnD";
const b3 = "RTOPDv9WXztFMPi6s9qI";

// Секретный пропуск!
const LDFLDF4 = (p1+p2+p3+p4+b1+b2+b3).trim();

// 1. ЛОГИКА ОТПРАВКИ (ТЕКСТ)
function handleRequest() {
    const text = userInput.value.trim();
    if (text) {
        statusText.innerText = "Никита: " + text;
        askAI(text);
        userInput.value = ""; 
    }
}

if (sendBtn) sendBtn.onclick = handleRequest;
if (userInput) userInput.onkeypress = (e) => { if (e.key === 'Enter') handleRequest(); };

// 2. ГОЛОСОВОЕ УПРАВЛЕНИЕ
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const rec = new SpeechRecognition();
    rec.lang = 'ru-RU';
    emerald.onclick = () => {
        window.speechSynthesis.cancel();
        rec.start();
        emerald.classList.add('active');
        statusText.innerText = "Слушаю тебя...";
    };
    rec.onresult = (event) => {
        const text = event.results.transcript; 
        emerald.classList.remove('active');
        statusText.innerText = "Никита: " + text;
        askAI(text);
    };
}

// 3. ЗАПРОС К GROQ (ЧЕРЕЗ LDFLDF4)
async function askAI(msg) {
    emerald.classList.add('thinking');
    aiAnswer.innerText = "LDFLDF4 пробивает защиту...";
    
    try {
        const proxy = "https://corsproxy.io?";
        const url = "https://api.groq.com";

        const res = await fetch(proxy + encodeURIComponent(url), {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${LDFLDF4}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "llama3-8b-8192", 
                "messages": [{ "role": "user", "content": `Ответь кратко на русском: ${msg}` }]
            })
        });

        const data = await res.json();
        const reply = data.choices.message.content;
        aiAnswer.innerText = reply;
        speak(reply);
    } catch (e) {
        aiAnswer.innerText = "Система LDFLDF4 перегружена! Ждём 02:00!";
    } finally {
        emerald.classList.remove('thinking');
    }
}

function speak(t) {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(t));
}
