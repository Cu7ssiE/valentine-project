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
}, { threshold: 0.15 }); // Slightly higher threshold for better effect

// Observe timeline items for the scroll animation
const scrollElements = document.querySelectorAll('.timeline-item');
scrollElements.forEach((el) => observer.observe(el));

// 3. Surprise Button Effect
// 3. Surprise Button Effect
function showLove() {
    const msg = document.getElementById('secretMsg');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    // Show message with animation
    msg.style.display = 'block';

    // Hide buttons smoothly
    btnYes.style.display = 'none';
    btnNo.style.display = 'none';

    // Confetti removed from here as requested
}

// 4. Runaway "No" Button
function runAway(btn) {
    // Generate random position within the card or viewport
    // Using simple transform to avoid layout shifts
    const x = (Math.random() - 0.5) * 300; // Move up to 150px horizontally
    const y = (Math.random() - 0.5) * 300; // Move up to 150px vertically

    btn.style.transform = `translate(${x}px, ${y}px)`;
    btn.style.transition = 'all 0.2s ease-out';
}

function triggerConfetti() {
    // Check if canvas-confetti is loaded
    if (typeof confetti === 'function') {
        const colors = ['#c0392b', '#e1b12c', '#ffffff', '#d980fa']; // Deep Red, Gold, White, Purple

        // First burst
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: colors
        });

        // Continuous Fireworks
        var duration = 3 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    } else {
        console.log('Confetti library not loaded');
    }
}

// Trigger Confetti immediately on load
triggerConfetti();
