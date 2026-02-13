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
    const baseUrl = window.location.origin + window.location.pathname.replace('create.html', 'index.html');

    // Collect all data into an object
    const data = {};
    const getVal = (id) => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
    };

    // Hero
    data.hT = getVal('in-hero-h1');
    data.hS = getVal('in-hero-sub');

    // Timeline 1
    data.t1d = getVal('in-t1-date');
    data.t1i = getVal('in-t1-img');
    data.t1t = getVal('in-t1-title');
    data.t1desc = getVal('in-t1-desc');

    // Timeline 2
    data.t2d = getVal('in-t2-date');
    data.t2i = getVal('in-t2-img');
    data.t2t = getVal('in-t2-title');
    data.t2desc = getVal('in-t2-desc');

    // Timeline 3
    data.t3d = getVal('in-t3-date');
    data.t3i = getVal('in-t3-img');
    data.t3t = getVal('in-t3-title');
    data.t3desc = getVal('in-t3-desc');

    // Letter
    data.to = getVal('in-letter-to');
    data.msg = getVal('in-letter-msg');

    // Surprise
    data.sImg = getVal('in-surp-img');
    data.sText = getVal('in-surp-text');
    data.sYes = getVal('in-btn-yes');
    data.sNo = getVal('in-btn-no');

    // Success
    data.sucImg = getVal('in-suc-img');
    data.sucTitle = getVal('in-suc-title');
    data.sucText = getVal('in-suc-text');

    // Options
    const hideBtn = document.getElementById('in-hide-btn');
    if (hideBtn && hideBtn.checked) {
        data.hide = '1';
    }

    // Clean empty keys to save space
    Object.keys(data).forEach(key => (data[key] === '' || data[key] === null) && delete data[key]);

    if (Object.keys(data).length === 0) {
        alert("ยังไม่ได้แก้ไขอะไรเลยนะ! 😅");
        return;
    }

    // Compress
    const jsonString = JSON.stringify(data);
    const compressed = LZString.compressToEncodedURIComponent(jsonString);

    const finalUrl = `${baseUrl}?data=${compressed}`;

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
    let data = {};

    // Decompress if 'data' param exists
    if (p.get('data')) {
        try {
            if (typeof LZString !== 'undefined') {
                const decompressed = LZString.decompressFromEncodedURIComponent(p.get('data'));
                if (decompressed) data = JSON.parse(decompressed);
            }
        } catch (e) {
            console.error("Decompression failed:", e);
        }
    }

    const getParam = (key) => data[key] || p.get(key);

    const setVal = (id, key) => {
        const el = document.getElementById(id);
        const val = getParam(key);
        if (el && val) el.value = val;
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
    if (hideBtn && getParam('hide') === '1') {
        hideBtn.checked = true;
    }
}

// Run on load
loadParamsToInputs();
