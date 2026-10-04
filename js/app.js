document.addEventListener('DOMContentLoaded', () => {
    console.log('[WIRED_CONNECTION: ESTABLISHED]');

    const form = document.getElementById('theory-form');
    const theoriesList = document.getElementById('theories-list');

    // Cargar teorías previas del localStorage
    if (theoriesList) {
        loadTheories();
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const user = document.getElementById('user-name').value;
            const text = document.getElementById('theory-text').value;

            const theory = {
                user: user,
                text: text,
                date: new Date().toLocaleTimeString()
            };

            saveTheory(theory);
            renderTheory(theory);

            form.reset();
        });
    }

    function saveTheory(theory) {
        let theories = JSON.parse(localStorage.getItem('wired_theories')) || [];
        theories.push(theory);
        localStorage.setItem('wired_theories', JSON.stringify(theories));
    }

    function loadTheories() {
        let theories = JSON.parse(localStorage.getItem('wired_theories')) || [];
        theories.forEach(renderTheory);
    }

    function renderTheory(theory) {
        const item = document.createElement('div');
        item.classList.add('theory-item');
        item.innerHTML = `
            <div class="theory-user">&gt; ${escapeHtml(theory.user)} [${theory.date}]</div>
            <p style="color: #a3fba3; margin-top: 0.5rem;">${escapeHtml(theory.text)}</p>
        `;
        theoriesList.prepend(item);
    }

    function escapeHtml(text) {
        return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
});