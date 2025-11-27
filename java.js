const CREDENTIALS = { user: "admin", pass: "1234" };
let isMusicPlaying = false;
const bgMusic = document.getElementById('bgMusic');

// --- LOGIN & START MUSIC ---
function login() {
    const userInput = document.getElementById('username').value;
    const passInput = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    if (userInput === CREDENTIALS.user && passInput === CREDENTIALS.pass) {
        // Hide Login, Show Main
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('mainPage').classList.remove('hidden');
        document.getElementById('mainPage').style.display = 'flex';
        
        // --- MULAI MUSIK DI SINI ---
        playMusic(); 
    } else {
        errorMsg.innerText = "Salah bos! Coba: admin / 1234";
        errorMsg.classList.add('show');
        shakeCard();
    }
}

// --- FUNGSI MUSIK ---
function playMusic() {
    bgMusic.volume = 0.5; // Set volume 50% biar gak kaget
    bgMusic.play().then(() => {
        isMusicPlaying = true;
        updateMusicBtn();
    }).catch(error => {
        console.log("Autoplay dicegah browser, user harus interaksi dulu.");
    });
}

function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
    } else {
        bgMusic.play();
        isMusicPlaying = true;
    }
    updateMusicBtn();
}

function updateMusicBtn() {
    const btnText = document.querySelector('.music-btn');
    const icon = document.getElementById('musicIcon');
    
    if (isMusicPlaying) {
        btnText.innerHTML = '<i class="fas fa-volume-up"></i> Musik: ON';
        btnText.style.background = '#00d2d3'; // Cyan
        btnText.style.animation = 'pulse 1s infinite'; // Goyang lagi
    } else {
        btnText.innerHTML = '<i class="fas fa-volume-mute"></i> Musik: OFF';
        btnText.style.background = '#bdc3c7'; // Abu-abu
        btnText.style.animation = 'none'; // Stop goyang
    }
}

// --- NAVIGASI ---
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    
    // Update tombol aktif style
    document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('active'));
    // (Logic active button disederhanakan untuk contoh ini)
}

function logout() {
    bgMusic.pause(); // Matikan musik saat logout
    bgMusic.currentTime = 0;
    location.reload(); // Reload halaman biar bersih
}

function shakeCard() {
    const card = document.querySelector('.login-card');
    card.style.transform = "translateX(10px)";
    setTimeout(() => { card.style.transform = "translateX(-10px)"; }, 100);
    setTimeout(() => { card.style.transform = "translateX(0px)"; }, 200);
}

// GAME LOGIC
let secretNumber = Math.floor(Math.random() * 10) + 1;
function playGame() {
    const userGuess = parseInt(document.getElementById('guessInput').value);
    const result = document.getElementById('gameResult');

    if (userGuess === secretNumber) {
        result.innerText = "🎉 JEDAG JEDUG MENANG!";
        result.style.color = "green";
        secretNumber = Math.floor(Math.random() * 10) + 1;
    } else {
        result.innerText = "Salah bos, coba lagi!";
        result.style.color = "red";
    }
}


