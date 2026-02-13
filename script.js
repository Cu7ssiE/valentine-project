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

// --- Creator Mode Logic (Expanded) ---

// 0. Tab Switching
function switchTab(tabId) {
    // Hide all contents
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    // Deactivate all buttons
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    // Activate selected
    document.getElementById(tabId).classList.add('active');

    // Find button that triggered this
    const btns = document.querySelectorAll('.tab-btn');
    if (tabId === 'tab-hero' && btns[0]) btns[0].classList.add('active');
    if (tabId === 'tab-timeline' && btns[1]) btns[1].classList.add('active');
    if (tabId === 'tab-letter' && btns[2]) btns[2].classList.add('active');
}

// 1. Check URL Params on Load (Full Version)
function checkUrlParams() {
    const p = new URLSearchParams(window.location.search);
    let data = {};

    // Decompress if 'data' param exists
    if (p.get('data')) {
        try {
            // Check if LZString is available (it should be)
            if (typeof LZString !== 'undefined') {
                const decompressed = LZString.decompressFromEncodedURIComponent(p.get('data'));
                if (decompressed) data = JSON.parse(decompressed);
            }
        } catch (e) {
            console.error("Decompression failed:", e);
        }
    }

    // Unified getter: Check compressed data first, then normal URL params
    const getParam = (key) => data[key] || p.get(key);

    // Helper to set text
    const setText = (id, key) => {
        const el = document.getElementById(id);
        const val = getParam(key);
        if (el && val) el.innerText = val;
    };
    // Helper to set image src
    const setImg = (id, key) => {
        const el = document.getElementById(id);
        const val = getParam(key);
        if (el && val) el.src = val;
    };
    // Helper for HTML (newlines)
    const setHtml = (id, key) => {
        const el = document.getElementById(id);
        const val = getParam(key);
        if (el && val) el.innerHTML = val.replace(/\n/g, '<br>');
    };

    // Hero
    setText('hero-title', 'hT');
    setText('hero-subtitle', 'hS');

    // Timeline 1
    setText('t1-date', 't1d');
    setImg('t1-img', 't1i');
    setText('t1-title', 't1t');
    setText('t1-desc', 't1desc');

    // Timeline 2
    setText('t2-date', 't2d');
    setImg('t2-img', 't2i');
    setText('t2-title', 't2t');
    setText('t2-desc', 't2desc');

    // Timeline 3
    setText('t3-date', 't3d');
    setImg('t3-img', 't3i');
    setText('t3-title', 't3t');
    setText('t3-desc', 't3desc');

    // Letter
    if (getParam('to')) {
        const header = document.getElementById('letter-header');
        if (header) header.innerText = `ถึง... ${getParam('to')} 💖`;

        const instr = document.querySelector('.instruction');
        if (instr) instr.innerText = `มีข้อความถึงคุณ ${getParam('to')} 💌`;
    }

    setHtml('letter-body', 'msg');

    // Surprise
    setImg('surprise-img', 'sImg');
    setText('surprise-text', 'sText');
    setText('btn-yes', 'sYes');
    setText('btn-no', 'sNo');

    // Success
    setImg('success-img', 'sucImg');
    setText('success-title', 'sucTitle');
    setText('success-text', 'sucText');

    // Check for 'hide' param
    if (getParam('hide') === '1') {
        const createBtn = document.querySelector('.floating-create-btn');
        if (createBtn) createBtn.style.display = 'none';
    }
}

// Run on load
checkUrlParams();

// 2. Go to Create Page (with params)
function goToCreatePage() {
    // Preserve current query params to pre-fill the form
    window.location.href = 'create.html' + window.location.search;
}

// 3. Generate Link (Full Version)
function generateLink() {
    const baseUrl = window.location.origin + window.location.pathname;
    const p = new URLSearchParams();

    // Helper to get value
    const getVal = (id) => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
    };
    const add = (key, val) => { if (val) p.set(key, val); };

    // Hero
    add('hT', getVal('in-hero-h1'));
    add('hS', getVal('in-hero-sub'));

    // Timeline 1
    add('t1d', getVal('in-t1-date'));
    add('t1i', getVal('in-t1-img'));
    add('t1t', getVal('in-t1-title'));
    add('t1desc', getVal('in-t1-desc'));

    // Timeline 2
    add('t2d', getVal('in-t2-date'));
    add('t2i', getVal('in-t2-img'));
    add('t2t', getVal('in-t2-title'));
    add('t2desc', getVal('in-t2-desc'));

    // Timeline 3
    add('t3d', getVal('in-t3-date'));
    add('t3i', getVal('in-t3-img'));
    add('t3t', getVal('in-t3-title'));
    add('t3desc', getVal('in-t3-desc'));

    // Letter
    add('to', getVal('in-letter-to'));
    add('msg', getVal('in-letter-msg'));

    if (Array.from(p).length === 0) {
        alert("ยังไม่ได้แก้ไขอะไรเลยนะ! 😅");
        return;
    }

    const finalUrl = `${baseUrl}?${p.toString()}`;

    // Show Result
    const linkInput = document.getElementById('share-link');
    if (linkInput) linkInput.value = finalUrl;

    const resultArea = document.getElementById('result-area');
    if (resultArea) resultArea.classList.remove('hidden');
}

// 4. Copy Link
function copyLink() {
    const linkInput = document.getElementById('share-link');
    if (!linkInput) return;

    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // For mobile

    navigator.clipboard.writeText(linkInput.value).then(() => {
        alert("คัดลอกลิงก์แล้ว! ส่งให้เขาได้เลย 📨");
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert("คัดลอกไม่ติด ลองกดคัดลอกเองนะ 😅");
    });
}
