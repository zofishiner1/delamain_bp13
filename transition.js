// transition.js - Терминальная анимация с построчным выводом текста
document.addEventListener('DOMContentLoaded', () => {
    // Создаем оверлей с терминальным стилем
    const transitionOverlay = document.createElement('div');
    transitionOverlay.id = 'page-transition';
    transitionOverlay.innerHTML = `
        <div class="terminal-loader">
            <div class="terminal-header">
                <span class="terminal-dot red"></span>
                <span class="terminal-dot yellow"></span>
                <span class="terminal-dot green"></span>
                <span class="terminal-title">user@delamain:~</span>
            </div>
            <div class="terminal-body">
                <div id="terminal-output" class="terminal-output"></div>
                <div class="terminal-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="progress-text">0%</div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(transitionOverlay);
    
    // ASCII ART из файла
    const asciiArt = `_______             __                                    __                                                        
|       \\           |  \\                                  |  \\                                                       
| $$$$$$$\\  ______  | $$  ______   ______ ____    ______   \\$$ _______          _______   ______    ______    ______  
| $$  | $$ /      \\ | $$ |      \\ |      \\    \\  |      \\ |  \\|       \\        /       \\ /      \\  /      \\  /      \\ 
| $$  | $$|  $$$$$$\\| $$  \\$$$$$$\\| $$$$$$\\$$$$\\  \\$$$$$$\\| $$| $$$$$$$\\      |  $$$$$$$|  $$$$$$\\|  $$$$$$\\|  $$$$$$\\
| $$  | $$| $$    $$| $$ /      $$| $$ | $$ | $$ /      $$| $$| $$  | $$      | $$      | $$  | $$| $$   \\$$| $$  | $$
| $$__/ $$| $$$$$$$$| $$|  $$$$$$$| $$ | $$ | $$|  $$$$$$$| $$| $$  | $$      | $$_____ | $$__/ $$| $$      | $$__/ $$
| $$    $$ \\$$     \\| $$ \\$$    $$| $$ | $$ | $$ \\$$    $$| $$| $$  | $$       \\$$     \\ \\$$    $$| $$      | $$    $$
 \\$$$$$$$   \\$$$$$$$ \\$$  \\$$$$$$$ \\$$  \\$$  \\$$  \\$$$$$$$ \\$$ \\$$   \\$$        \\$$$$$$$  \\$$$$$$  \\$$      | $$$$$$$ 
                                                                                                            | $$      
                                                                                                            | $$      
                                                                                                             \\$$`;
    
    // Linux-подобные сообщения для вывода
    const bootMessages = [
        { text: "Linux delamain 5.15.0-91-generic #101-Ubuntu SMP Tue Nov 12 19:22:24 UTC 2024 x86_64", type: "info", delay: 150 },
        { text: "", type: "empty", delay: 50 },
        { text: "The programs included with the Debian GNU/Linux system are free software;", type: "info", delay: 150 },
        { text: "the exact distribution terms for each program are described in the", type: "info", delay: 150 },
        { text: "individual files in /usr/share/doc/*/copyright.", type: "info", delay: 150 },
        { text: "", type: "empty", delay: 50 },
        { text: "Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent", type: "info", delay: 150 },
        { text: "permitted by applicable law.", type: "info", delay: 150 },
        { text: "", type: "empty", delay: 50 },
        { text: "[    0.000000] Linux version 5.15.0-delamain (root@delamain) (gcc-11)", type: "kernel", delay: 150 },
        { text: "[    0.124587] BIOS-provided physical RAM map:", type: "kernel", delay: 150 },
        { text: "[    0.256891] ACPI: Early table checksum verification disabled", type: "kernel", delay: 150 },
        { text: "[    0.389234] PCIe: ASPM is enabled", type: "kernel", delay: 150 },
        { text: "[    0.512467] NET: Registered protocol family 2", type: "kernel", delay: 150 },
        { text: "[    0.634789] Initializing cgroup subsys cpuset", type: "kernel", delay: 150 },
        { text: "[    0.756123] random: fast init done", type: "success", delay: 150 },
        { text: "[    0.878456] systemd[1]: systemd 249.11 running in system mode", type: "info", delay: 150 },
        { text: "[    1.023789] systemd[1]: Queued start job for default target", type: "info", delay: 150 },
        { text: "[    1.256234] EXT4-fs (sda1): mounted filesystem with ordered data mode", type: "success", delay: 150 },
        { text: "[    1.512345] Starting Network Manager...", type: "info", delay: 150 },
        { text: "[    1.756789] NetworkManager[1234]: <info>  device (eth0): state change: unmanaged -> unavailable", type: "info", delay: 150 },
        { text: "[    2.012345] NetworkManager[1234]: <info>  device (eth0): state change: unavailable -> disconnected", type: "info", delay: 150 },
        { text: "[    2.267890] NetworkManager[1234]: <info>  device (eth0): state change: disconnected -> activated", type: "success", delay: 150 },
        { text: "", type: "empty", delay: 50 },
        { text: "Debian GNU/Linux 11 delamain tty1", type: "prompt", delay: 150 },
        { text: "", type: "empty", delay: 50 },
        { text: "delamain login: root", type: "login", delay: 200 },
        { text: "Password: ********", type: "login", delay: 200 },
        { text: "", type: "empty", delay: 100 },
        { text: "Last login: " + new Date().toLocaleString(), type: "info", delay: 150 },
        { text: "", type: "empty", delay: 50 },
        { text: "root@delamain:~# systemctl status delamain.service", type: "command", delay: 200 },
        { text: "● delamain.service - DELAMAIN Neural OS Core Service", type: "service", delay: 150 },
        { text: "     Active: active (running) since " + new Date().toLocaleString(), type: "success", delay: 150 },
        { text: "   Main PID: 420 (delamain-core)", type: "service", delay: 150 },
        { text: "", type: "empty", delay: 50 },
        { text: "root@delamain:~# ./neuro_interface --activate", type: "command", delay: 200 },
        { text: "[NEURO] Neural interface initialized... OK", type: "success", delay: 150 },
        { text: "[NEURO] Synaptic calibration... DONE", type: "success", delay: 150 },
        { text: "", type: "empty", delay: 50 },
        { text: "SYSTEM: Redirecting to target interface...", type: "warning", delay: 200 }
    ];
    
    // Стили для терминальной анимации
    const style = document.createElement('style');
    style.textContent = `
        #page-transition {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0c0c0c;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.15s ease-out;
            font-family: 'Fira Code', 'Cascadia Code', 'Courier New', monospace;
        }
        
        #page-transition.active {
            opacity: 1;
            visibility: visible;
        }
        
        .terminal-loader {
            width: 800px;
            max-width: 95vw;
            background: #0a0a0a;
            border: 1px solid #2e2e2e;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }
        
        .terminal-header {
            background: #1e1e1e;
            padding: 8px 12px;
            border-bottom: 1px solid #2e2e2e;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .terminal-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        
        .terminal-dot.red { background: #ff5f56; }
        .terminal-dot.yellow { background: #ffbd2e; }
        .terminal-dot.green { background: #27c93f; }
        
        .terminal-title {
            font-size: 11px;
            letter-spacing: 0;
            color: #c0c0c0;
            margin-left: 8px;
            font-family: monospace;
        }
        
        .terminal-body {
            padding: 20px 24px;
            background: #0a0a0a;
            min-height: 500px;
            max-height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow-y: auto;
        }
        
        .terminal-body::-webkit-scrollbar {
            width: 8px;
            background: #1a1a1a;
        }
        
        .terminal-body::-webkit-scrollbar-thumb {
            background: #3a3a3a;
            border-radius: 4px;
        }
        
        .terminal-output {
            flex: 1;
            margin-bottom: 20px;
            font-family: 'Fira Code', 'Cascadia Code', 'Courier New', monospace;
        }
        
        .ascii-art {
            font-size: 7px;
            line-height: 1.2;
            color: #2ecc71;
            margin-bottom: 20px;
            white-space: pre;
            font-family: monospace;
            text-align: center;
            opacity: 0;
            animation: fadeIn 0.3s ease-out forwards;
            border-bottom: 1px solid #2ecc7133;
            padding-bottom: 15px;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 0.7; transform: translateY(0); }
        }
        
        .terminal-line {
            font-size: 11px;
            color: #c0c0c0;
            margin-bottom: 6px;
            line-height: 1.5;
            letter-spacing: 0;
            opacity: 0;
            transform: translateX(-3px);
            transition: opacity 0.06s ease, transform 0.06s ease;
            font-family: monospace;
        }
        
        .terminal-line.visible {
            opacity: 1;
            transform: translateX(0);
        }
        
        .terminal-line.kernel {
            color: #6a9fb5;
        }
        
        .terminal-line.info {
            color: #a0a0a0;
        }
        
        .terminal-line.success {
            color: #2ecc71;
        }
        
        .terminal-line.warning {
            color: #f1c40f;
        }
        
        .terminal-line.error {
            color: #e74c3c;
        }
        
        .terminal-line.command {
            color: #e67e22;
        }
        
        .terminal-line.prompt {
            color: #2ecc71;
        }
        
        .terminal-line.login {
            color: #f39c12;
        }
        
        .terminal-line.service {
            color: #9b59b6;
        }
        
        .terminal-line.empty {
            opacity: 1;
            transform: none;
            color: transparent;
            margin-bottom: 4px;
        }
        
        .terminal-line.blink::after {
            content: '▌';
            animation: terminalBlink 1s step-end infinite;
            color: #2ecc71;
            margin-left: 4px;
        }
        
        @keyframes terminalBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
        .terminal-progress {
            border-top: 1px solid #2e2e2e;
            padding-top: 15px;
        }
        
        .progress-bar {
            background: #1a1a1a;
            border: 1px solid #2e2e2e;
            border-radius: 3px;
            height: 3px;
            overflow: hidden;
        }
        
        .progress-fill {
            width: 0%;
            height: 100%;
            background: #2ecc71;
            transition: width 0.03s linear;
            box-shadow: 0 0 4px #2ecc71;
        }
        
        .progress-text {
            font-size: 9px;
            color: #6a6a6a;
            text-align: right;
            margin-top: 6px;
            letter-spacing: 0;
            font-family: monospace;
        }
        
        .page-content {
            animation: fadeInUp 0.4s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .glitch-reveal {
            animation: glitchReveal 0.25s steps(2, end);
        }
        
        @keyframes glitchReveal {
            0% { opacity: 0; text-shadow: -1px 0 #2ecc71, 1px 0 #e74c3c; }
            50% { opacity: 0.7; text-shadow: 1px 0 #2ecc71, -1px 0 #e74c3c; }
            100% { opacity: 1; text-shadow: none; }
        }
        
        @media (max-width: 600px) {
            .terminal-body { padding: 15px 18px; min-height: 400px; }
            .terminal-line { font-size: 8px; }
            .ascii-art { font-size: 4px; }
        }
    `;
    document.head.appendChild(style);
    
    // Функция добавления ASCII арта
    function addAsciiArt() {
        const outputContainer = document.getElementById('terminal-output');
        if (!outputContainer) return;
        
        const asciiContainer = document.createElement('div');
        asciiContainer.className = 'ascii-art';
        asciiContainer.textContent = asciiArt;
        outputContainer.appendChild(asciiContainer);
    }
    
    // Функция построчного вывода текста
    async function typeTerminalOutput() {
        const outputContainer = document.getElementById('terminal-output');
        if (!outputContainer) return;
        
        outputContainer.innerHTML = '';
        
        // Добавляем ASCII арт первым
        addAsciiArt();
        
        let currentTime = 0;
        
        for (let i = 0; i < bootMessages.length; i++) {
            const msg = bootMessages[i];
            
            // Пропускаем пустые строки
            if (msg.type === 'empty') {
                const line = document.createElement('div');
                line.className = 'terminal-line empty';
                line.textContent = '';
                outputContainer.appendChild(line);
                
                setTimeout(() => {
                    line.classList.add('visible');
                }, currentTime);
                
                currentTime += msg.delay;
                await new Promise(resolve => setTimeout(resolve, msg.delay));
                continue;
            }
            
            // Создаем строку
            const line = document.createElement('div');
            line.className = `terminal-line ${msg.type}`;
            line.textContent = msg.text;
            outputContainer.appendChild(line);
            
            // Анимация появления
            setTimeout(() => {
                line.classList.add('visible');
                // Автоскролл
                const terminalBody = document.querySelector('.terminal-body');
                if (terminalBody) {
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }
            }, currentTime);
            
            currentTime += msg.delay;
            await new Promise(resolve => setTimeout(resolve, msg.delay));
        }
        
        // Добавляем мигающий курсор
        const cursorLine = document.createElement('div');
        cursorLine.className = 'terminal-line prompt blink';
        cursorLine.innerHTML = 'user@delamain:~$ ';
        outputContainer.appendChild(cursorLine);
        setTimeout(() => {
            cursorLine.classList.add('visible');
        }, currentTime + 30);
        
        return true;
    }
    
    // Функция анимации прогресс-бара
    async function animateProgressBar(totalDuration) {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        const startTime = Date.now();
        
        function updateProgress() {
            const elapsed = Date.now() - startTime;
            let percent = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
            
            if (progressFill) {
                progressFill.style.width = percent + '%';
            }
            if (progressText) {
                progressText.textContent = percent + '%';
            }
            
            if (percent < 100) {
                requestAnimationFrame(updateProgress);
            }
        }
        
        updateProgress();
        
        await new Promise(resolve => setTimeout(resolve, totalDuration));
    }
    
    // Функция полной анимации загрузки (уменьшенное время)
    async function runTerminalAnimation() {
        const totalDuration = 4000; // Общая длительность анимации 4 секунды (было 6)
        
        // Запускаем вывод текста
        const typingPromise = typeTerminalOutput();
        
        // Запускаем прогресс-бар
        const progressPromise = animateProgressBar(totalDuration);
        
        // Ждем завершения всех анимаций
        await Promise.all([typingPromise, progressPromise]);
        
        // Небольшая пауза перед переходом
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Добавляем анимацию контента
    const pageContent = document.querySelector('.page') || document.querySelector('.container') || document.body;
    pageContent.classList.add('page-content');
    
    // Обрабатываем все внутренние ссылки
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
            return;
        }
        
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const targetUrl = href;
            
            const overlay = document.getElementById('page-transition');
            overlay.classList.add('active');
            
            const outputContainer = document.getElementById('terminal-output');
            if (outputContainer) outputContainer.innerHTML = '';
            
            await runTerminalAnimation();
            
            window.location.href = targetUrl;
        });
    });
    
    // При загрузке страницы — анимация появления заголовков
    setTimeout(() => {
        const headers = document.querySelectorAll('h1, h2, .section-num, .section-header h2');
        headers.forEach((header, index) => {
            setTimeout(() => {
                header.classList.add('glitch-reveal');
                setTimeout(() => {
                    header.classList.remove('glitch-reveal');
                }, 250);
            }, index * 60);
        });
    }, 100);
});