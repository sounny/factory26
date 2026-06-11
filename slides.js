/* ══════════════════════════════════════════════════════════════
   Factory 2026 – Slide Navigation Engine
   Keyboard (arrow keys), button clicks, and touch swipe support
   ══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentEl = document.querySelector('.slide-current');
    const totalEl = document.querySelector('.slide-total');

    let current = 0;
    const total = slides.length;

    /* Set total count */
    if (totalEl) totalEl.textContent = total;

    function goTo(index) {
        if (index < 0 || index >= total) return;

        /* Outgoing slide */
        slides[current].classList.remove('active');
        if (index > current) slides[current].classList.add('exit-left');

        /* Clean up exit class after transition */
        const outgoing = slides[current];
        setTimeout(() => outgoing.classList.remove('exit-left'), 500);

        current = index;

        /* Incoming slide */
        slides[current].classList.add('active');

        /* Update counter */
        if (currentEl) currentEl.textContent = current + 1;

        /* Button states */
        if (prevBtn) prevBtn.disabled = current === 0;
        if (nextBtn) nextBtn.disabled = current === total - 1;
    }

    /* Button listeners */
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    /* Keyboard navigation */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            goTo(current + 1);
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goTo(current - 1);
        }
        /* Home / End */
        if (e.key === 'Home') goTo(0);
        if (e.key === 'End') goTo(total - 1);
    });

    /* Touch swipe */
    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 60) {
            diff > 0 ? goTo(current + 1) : goTo(current - 1);
        }
    }, { passive: true });

    /* Initialize */
    goTo(0);
});
