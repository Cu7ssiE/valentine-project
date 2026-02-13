// --- Creator Page Logic ---

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
    if (tabId === 'tab-surprise' && btns[3]) btns[3].classList.add('active');
}

// 1. Generate Link (Full Version)
function generateLink() {
    // Determine the base URL for the CARD (index.html)
    // If we are on create.html, we assume index.html is in the same directory.
    const baseUrl = window.location.origin + window.location.pathname.replace('create.html', 'index.html');

    // Fallback if pathname doesn't end in create.html (e.g. just folder root)
    // but mostly likely it will be explicit.

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

    // Surprise
    add('sImg', getVal('in-surp-img'));
    add('sText', getVal('in-surp-text'));
    add('sYes', getVal('in-btn-yes'));
    add('sNo', getVal('in-btn-no'));

    // Success
    add('sucImg', getVal('in-suc-img'));
    add('sucTitle', getVal('in-suc-title'));
    add('sucText', getVal('in-suc-text'));

    // Options
    const hideBtn = document.getElementById('in-hide-btn');
    if (hideBtn && hideBtn.checked) {
        p.set('hide', '1');
    }

    if (Array.from(p).length === 0) {
        alert("ยังไม่ได้แก้ไขอะไรเลยนะ! 😅");
        return;
    }

    const finalUrl = `${baseUrl}?${p.toString()}`;

    // Show Result
    const linkInput = document.getElementById('share-link');
    if (linkInput) linkInput.value = finalUrl;

    const previewLink = document.getElementById('preview-link');
    if (previewLink) previewLink.href = finalUrl;

    const resultArea = document.getElementById('result-area');
    if (resultArea) resultArea.classList.remove('hidden');

    // Scroll to result
    resultArea.scrollIntoView({ behavior: 'smooth' });
}

// 2. Copy Link
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


// 3. Load Params to Inputs (Pre-fill)
function loadParamsToInputs() {
    const p = new URLSearchParams(window.location.search);

    const setVal = (id, key) => {
        const el = document.getElementById(id);
        if (el && p.get(key)) el.value = p.get(key);
    };

    // Hero
    setVal('in-hero-h1', 'hT');
    setVal('in-hero-sub', 'hS');

    // Timeline 1
    setVal('in-t1-date', 't1d');
    setVal('in-t1-img', 't1i');
    setVal('in-t1-title', 't1t');
    setVal('in-t1-desc', 't1desc');

    // Timeline 2
    setVal('in-t2-date', 't2d');
    setVal('in-t2-img', 't2i');
    setVal('in-t2-title', 't2t');
    setVal('in-t2-desc', 't2desc');

    // Timeline 3
    setVal('in-t3-date', 't3d');
    setVal('in-t3-img', 't3i');
    setVal('in-t3-title', 't3t');
    setVal('in-t3-desc', 't3desc');

    // Letter
    setVal('in-letter-to', 'to');
    setVal('in-letter-msg', 'msg');

    // Surprise
    setVal('in-surp-img', 'sImg');
    setVal('in-surp-text', 'sText');
    setVal('in-btn-yes', 'sYes');
    setVal('in-btn-no', 'sNo');

    // Success
    setVal('in-suc-img', 'sucImg');
    setVal('in-suc-title', 'sucTitle');
    setVal('in-suc-text', 'sucText');

    // Options
    const hideBtn = document.getElementById('in-hide-btn');
    if (hideBtn && p.get('hide') === '1') {
        hideBtn.checked = true;
    }
}

// Run on load
loadParamsToInputs();
