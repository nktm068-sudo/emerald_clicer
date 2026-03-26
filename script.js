// --- 💎 ИЗУМРУДНЫЙ КЛИКЕР 9.4 (SILENT CLOUD) ---
const emerald = document.getElementById('emerald');
const statusText = document.getElementById('status');
const aiAnswer = document.getElementById('ai-answer');

// 🔢 ПЕРЕМЕННЫЕ
let izumrudiki = 0;
let clickPower = 1;

// --- ☁️ СИНХРОНИЗАЦИЯ С ОБЛАКОМ ---
async function syncWithServer() {
    try {
        const res = await fetch("https://nktm068-sudo-serverjs-emeraldcr.hf.space");
        const data = await res.json();
        izumrudiki = data.score || 0;
        clickPower = data.power || 1;
        updateUI();
    } catch (e) {
        console.log("Cloud connection error");
    }
}

// --- 👋 ЗАПУСК ПРИ ЗАГРУЗКЕ ---
window.addEventListener('load', () => {
    syncWithServer(); // Сразу лезем в облако
});

function updateUI() {
    // Твой фирменный стиль "Пользователь + число"
    statusText.innerText = "Пользователь " + izumrudiki + " (Сила: x" + clickPower + ")";
    statusText.style.opacity = "1";
}

// --- 🖱️ ЛОГИКА ГИПЕР-КЛИКА (БЕЗОПАСНАЯ ВЕРСИЯ 10.1) ---
if (emerald) {
    emerald.onclick = async () => {
        // 1. Прибавляем изумруды (с учетом x2)
        izumrudiki += clickPower;
        updateUI();

        // 2. ✨ ЭФФЕКТ СВЕЧЕНИЯ (Вместо вспышки фона!)
        // Мы просто добавляем тень самому кристаллу на миг
        emerald.style.filter = "drop-shadow(0 0 50px #00ff00)";
        setTimeout(() => {
            emerald.style.filter = "drop-shadow(0 0 20px #00ff00)";
        }, 100);

        // 3. Эффект нажатия (Тряска)
        emerald.style.transform = "scale(0.95)";
        setTimeout(() => emerald.style.transform = "scale(1)", 50);

        // 4. МАГАЗИН: Авто-покупка X2 за 200
        if (izumrudiki >= 200 && clickPower === 1) {
            izumrudiki -= 200;
            clickPower = 2;
            // aiAnswer.innerText = "Upgrade: x2 Active"; // Если хочешь видеть текст, включи его в CSS!
        }

        // 5. СОХРАНЕНИЕ В ОБЛАКО
        saveToCloud(); 
    };
}

            });
        } catch (e) {
            console.log("Save error");
        }
    };
}
