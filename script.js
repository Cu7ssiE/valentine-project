// 1. Floating Hearts Background (Dynamic Creation)
function createHearts() {
    const heartContainer = document.querySelector('.hearts-bg');
    const heartCount = 20;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-float');

        // Randomize position and animation properties
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's'; // 2-5s
        heart.style.animationDelay = Math.random() * 5 + 's';

        // Randomize opacity slightly for depth
        heart.style.opacity = Math.random() * 0.5 + 0.3;

        heartContainer.appendChild(heart);
    }
}
createHearts();

// 2. Scroll Animation (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.15 });

// Observe timeline items for the scroll animation
const scrollElements = document.querySelectorAll('.timeline-item');
scrollElements.forEach((el) => observer.observe(el));

// 3. New Surprise Section Logic
function openGift() {
    const giftBox = document.getElementById('gift-box');
    const surpriseContent = document.getElementById('surprise-content');

    // Animate Box Opening
    giftBox.classList.add('open');

    // Trigger Confetti Pop
    triggerConfetti();

    // Show Content after short delay
    setTimeout(() => {
        giftBox.style.display = 'none';
        surpriseContent.classList.remove('hidden');
    }, 600);
}

function acceptLove() {
    const surpriseContent = document.getElementById('surprise-content');
    const successMsg = document.getElementById('success-msg');

    surpriseContent.classList.add('hidden');
    successMsg.classList.remove('hidden');

    // Big Celebration
    triggerConfetti();
    setInterval(triggerConfetti, 2000); // More rain!
}

// "No" Button Evasion Logic
// "No" Button Logic
function handleNoClick() {
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.querySelector('.btn-yes');

    // 1. Change Text (Cuter & Funnier)
    const phrases = [
        "อย่ากดเลยนะ... 🥺",
        "คิดดีๆ อีกทีนะ! 💕",
        "เค้าเสียใจนะ... 😭",
        "ให้โอกาสเค้าเถอะ!",
        "งื้อออ ไม่เอาหน่า...",
        "ใจร้ายที่สุดเลย! 💔",
        "นะนะนะ ตกลงเถอะ! 🙏",
        "ถ้าไม่กด จะร้องไห้แล้วนะ 😿"
    ];

    // Pick a random phrase
    const randomIndex = Math.floor(Math.random() * phrases.length);
    btnNo.innerText = phrases[randomIndex];

    // 2. Make Yes Button Bigger
    let currentSize = parseFloat(window.getComputedStyle(btnYes).fontSize);
    let newSize = currentSize * 1.4; // Grow by 40% each time

    // Limit max size to prevent breaking layout completely
    if (newSize < 300) {
        btnYes.style.fontSize = `${newSize}px`;
        // Also increase padding slightly for balance
        let currentPadding = parseFloat(window.getComputedStyle(btnYes).paddingTop);
        btnYes.style.padding = `${currentPadding * 1.2}px ${currentPadding * 1.5}px`;
    } else {
        // If it gets too big, fill the screen (Joke)
        btnYes.style.width = "100%";
        btnYes.style.height = "100%";
        btnYes.style.fontSize = "5rem";
        btnYes.innerText = "ตกลงได้แล้ว! ❤️";
    }

    // 3. Shrink No Button (New Feature)
    let currentNoSize = parseFloat(window.getComputedStyle(btnNo).fontSize);
    let newNoSize = currentNoSize * 0.85; // Shrink by 15% each time

    // Prevent it from disappearing completely (keep at least 8px)
    if (newNoSize > 8) {
        btnNo.style.fontSize = `${newNoSize}px`;

        // Also decrease padding
        let currentNoPadding = parseFloat(window.getComputedStyle(btnNo).paddingTop);
        btnNo.style.padding = `${currentNoPadding * 0.85}px ${currentNoPadding * 1.2}px`;
    } else {
        // Make it almost invisible or unclickable eventually
        btnNo.style.opacity = '0.5';
        btnNo.style.pointerEvents = 'none';
        btnNo.innerText = "หายไปแย้ว...";
    }
}

function triggerConfetti() {
    if (typeof confetti === 'function') {
        const colors = ['#ff4081', '#ffffff', '#ffeb3b'];

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: colors
        });
    }
}

// --- Envelope Logic (Existing) ---
const envelopeWrapper = document.getElementById('envelope');
const instruction = document.querySelector('.instruction');
const overlay = document.getElementById('envelope-overlay');
let isOpen = false;
let isTransitioning = false;

// Tilt Logic
document.addEventListener('mousemove', (e) => {
    // Only tilt if overlay is visible
    if (overlay.style.display === 'none') return;
    if (isOpen) return;

    const x = e.clientX;
    const y = e.clientY;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const xRotate = ((y / height) - 0.5) * -20;
    const yRotate = ((x / width) - 0.5) * 20;

    if (envelopeWrapper) {
        envelopeWrapper.style.transform = `rotateX(${xRotate}deg) rotateY(${yRotate}deg)`;
    }
});

document.addEventListener('mouseleave', () => {
    if (isOpen) return;
    if (envelopeWrapper) {
        envelopeWrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
});

// Open & Transition Logic
// Open & Transition Logic
let step = 0; // 0: Closed, 1: Seal Removed, 2: Open, 3: Transitioning

window.openEnvelope = function () {
    if (isTransitioning) return;

    // STEP 1: REMOVE SEAL
    if (step === 0) {
        step = 1;
        const seal = document.querySelector('.seal');
        const instruction = document.querySelector('.instruction');

        // Add class to animate seal removal
        seal.classList.add('removed');

        // Update instruction
        if (instruction) {
            instruction.innerText = "แตะอีกครั้งเพื่อเปิดซอง... 📩";
        }
        return;
    }

    // STEP 2: OPEN ENVELOPE
    if (step === 1) {
        step = 2;
        isOpen = true; // For tilt logic

        // Stop float animation
        envelopeWrapper.style.animation = 'none';
        envelopeWrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';

        // Add open class (Triggers Flap & Letter Rise via CSS)
        envelopeWrapper.classList.add('open');

        // Update instruction
        if (instruction) {
            instruction.style.opacity = '0';
            setTimeout(() => {
                instruction.innerText = "แตะอีกครั้งเพื่อไปต่อ... ❤️";
                instruction.style.opacity = '1';
            }, 1500); // Wait for letter to rise
        }
        return;
    }

    // STEP 3: TRANSITION
    if (step === 2) {
        step = 3;
        isTransitioning = true;
        if (instruction) instruction.style.opacity = '0';

        // Transition Animation
        const heart = document.getElementById('heart-transition');
        heart.style.transform = 'translate(-50%, -50%) scale(50)';

        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            window.scrollTo(0, 0);
            document.body.style.overflow = 'auto';
        }, 1000);
    }
}

// Force scroll to top
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
