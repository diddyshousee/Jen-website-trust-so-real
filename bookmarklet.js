
(function() {
    // Prevent multiple instances
    if (document.getElementById('notes-bookmarklet-container')) {
        return;
    }

    // --- STYLES (with Glassmorphism) ---
    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
        #notes-bookmarklet-container {
            position: fixed;
            top: 40px;
            right: 40px;
            width: 380px;
            height: 550px;
            z-index: 2147483647; /* Max z-index */
            background-color: rgba(26, 26, 26, 0.65);
            -webkit-backdrop-filter: blur(12px) saturate(180%);
            backdrop-filter: blur(12px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: scale(0.95) translate(20px, -20px);
            opacity: 0;
            transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
        }
        #notes-bookmarklet-container.active {
             transform: scale(1) translate(0, 0);
             opacity: 1;
        }
        #notes-bookmarklet-header {
            padding: 10px 15px;
            background-color: rgba(44, 44, 44, 0.7);
            color: #EAEAEA;
            font-family: 'Poppins', sans-serif;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: move;
            user-select: none;
        }
        #notes-bookmarklet-close {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 30px;
            height: 30px;
            background: transparent;
            color: #AAAAAA;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            line-height: 30px;
            text-align: center;
            transition: color 0.2s, background-color 0.2s;
        }
        #notes-bookmarklet-close:hover {
            color: #FFFFFF;
            background-color: rgba(255, 107, 107, 0.8);
        }
        #notes-bookmarklet-iframe {
            flex-grow: 1;
            border: none;
            background-color: transparent;
        }
    `;

    // --- HTML ELEMENTS ---
    const container = document.createElement('div');
    container.id = 'notes-bookmarklet-container';

    const header = document.createElement('div');
    header.id = 'notes-bookmarklet-header';
    header.textContent = 'Quick Notes';

    const closeButton = document.createElement('button');
    closeButton.id = 'notes-bookmarklet-close';
    closeButton.innerHTML = '&times;';

    const iframe = document.createElement('iframe');
    iframe.id = 'notes-bookmarklet-iframe';
    iframe.src = 'https://diddyshousee.github.io/Jen-website-trust-so-real/';

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;

    // --- ASSEMBLY & INJECTION ---
    header.appendChild(closeButton);
    container.appendChild(header);
    container.appendChild(iframe);
    document.head.appendChild(styleSheet);
    document.body.appendChild(container);

    // Animate in
    setTimeout(() => container.classList.add('active'), 50);

    // --- FUNCTIONALITY ---
    closeButton.onclick = function() {
        container.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(container);
            document.head.removeChild(styleSheet);
        }, 300);
    };

    // Draggable logic
    let isDragging = false;
    let dragStartX, dragStartY;
    let offsetX, offsetY;

    header.onmousedown = function(e) {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        offsetX = container.offsetLeft;
        offsetY = container.offsetTop;
        header.style.cursor = 'grabbing';
        container.style.transition = 'none'; // Disable transition while dragging
    };

    document.onmousemove = function(e) {
        if (!isDragging) return;
        let x = offsetX + e.clientX - dragStartX;
        let y = offsetY + e.clientY - dragStartY;
        container.style.left = x + 'px';
        container.style.top = y + 'px';
    };

    document.onmouseup = function() {
        if (!isDragging) return;
        isDragging = false;
        header.style.cursor = 'move';
        container.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease';
    };
})();
