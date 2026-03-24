// --- 💎 ИЗУМРУДНЫЙ СКРИПТ (РЕЖИМ ФИНАЛЬНОГО ПРОЩАНИЯ) ---
const emerald = document.getElementById('emerald');
const statusText = document.getElementById('status');
const aiAnswer = document.getElementById('ai-answer');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// 📉 СТАРТ С 1000 (Или поставь 5 для теста!)
let countdown = 2;

function handleRequest() {
    // 🛑 ПРОВЕРКА НА НОЛЬ
    if (countdown <= 0) {
        const farewell = "Спасибо за запросы! Приходите завтра!";
        aiAnswer.innerText = farewell;
        speak(farewell);
        
        // Блокируем всё мясо!
        userInput.disabled = true;
        userInput.placeholder = "Лимит исчерпан. До завтра!";
        if (sendBtn) sendBtn.disabled = true;
        return;
    }

    const text = userInput.value.trim();
    if (text) {
        statusText.style.opacity = "1"; 
        statusText.innerText = "Никита: " + text;
        askAI(text);
        userInput.value = ""; 
    }
}

async function askAI(msg) {
    emerald.classList.add('thinking');
    aiAnswer.innerText = "Связь с Облачным Штабом...";
    
    try {
        const res = await fetch("https://emeraldcreator-emerald-plus-api.hf.space", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg }) 
        });
        const data = await res.json();
        
        // ✅ ПОЛУЧАЕМ МЯСО
        const reply = data.choices[0].message.content; 
        
        // 📉 МАТЕМАТИКА И ВЫВОД
        countdown = countdown - 1;
        aiAnswer.innerText = reply;
        
        // Показываем остаток в консоли
        console.log("Осталось запросов: " + countdown);
        
        speak(reply);
    } catch (e) {
        aiAnswer.innerText = "Ошибка связи (попробуйте через 1 минуту)";
    } finally {
        emerald.classList.remove('thinking');
    }
}

// 🎙️ ГОЛОС ПАВЛА
function speak(t) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'ru-RU';
    const voices = window.speechSynthesis.getVoices();
    const pavel = voices.find(v => v.name.includes('Pavel') || v.name.includes('Kirill'));
    u.voice = pavel || voices.find(v => v.lang.startsWith('ru'));
    window.speechSynthesis.speak(u);
}

// ⌨️ ОБРАБОТКА ЭНТЕРА И КЛИКА
if (sendBtn) sendBtn.onclick = handleRequest;
if (userInput) userInput.onkeypress = (e) => { if (e.key === 'Enter') handleRequest(); };

if (emerald) {
    emerald.onclick = () => {
        if (!userInput.disabled) {
            userInput.focus();
            handleRequest();
        }
    };
}

// 🔓 АКТИВАЦИЯ ЗВУКА
document.body.addEventListener('click', () => {
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
}, { once: true });
