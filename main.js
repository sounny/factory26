/* ══════════════════════════════════════════════════════════════
   Factory 2026 – Interactions
   ══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Intersection Observer for fade-in animations ───────── */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.session-card, .timeline-item, .section-title, .section-desc').forEach(el => {
        el.classList.add('fade-target');
        fadeObserver.observe(el);
    });

    /* ── Navbar background on scroll ────────────────────────── */
    const nav = document.querySelector('.top-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            nav.style.background = 'rgba(12, 12, 14, .92)';
        } else {
            nav.style.background = 'rgba(12, 12, 14, .75)';
        }
        lastScroll = scrollY;
    }, { passive: true });

    /* ── Smooth anchor scrolling ────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

/* ── CSS injected for fade animations ───────────────────────── */
const fadeStyles = document.createElement('style');
fadeStyles.textContent = `
    .fade-target {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity .6s cubic-bezier(.4,0,.2,1), transform .6s cubic-bezier(.4,0,.2,1);
    }
    .fade-target.visible {
        opacity: 1;
        transform: translateY(0);
    }
    .session-card.fade-target { transition-delay: .1s; }
    .session-card.fade-target:nth-child(2) { transition-delay: .25s; }
`;
document.head.appendChild(fadeStyles);
