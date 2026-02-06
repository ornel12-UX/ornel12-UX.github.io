// Native App Interaction Script
document.addEventListener('DOMContentLoaded', () => {

    // 1. "Read More" Toggle
    const readMoreBtn = document.querySelector('.read-more-btn');
    const moreText = document.getElementById('more-text');

    if (readMoreBtn && moreText) {
        readMoreBtn.addEventListener('click', () => {
            const isHidden = getComputedStyle(moreText).display === 'none';
            if (isHidden) {
                moreText.style.display = 'block';
                moreText.classList.remove('collapsed');
                readMoreBtn.textContent = 'Réduire';
            } else {
                moreText.style.display = 'none';
                moreText.classList.add('collapsed');
                readMoreBtn.textContent = 'Lire la suite';
            }
        });
    }

    // 2. Video Control System (Play/Pause/Sound)
    const heroContainer = document.getElementById('hero-container');
    const heroVideo = document.getElementById('main-video');
    const playOverlay = document.querySelector('.play-overlay');
    const soundBtn = document.querySelector('.sound-toggle-mini');
    const soundIcon = soundBtn ? soundBtn.querySelector('svg') : null;

    if (heroContainer && heroVideo && playOverlay) {

        // Toggle Play/Pause on container click
        function togglePlay() {
            if (heroVideo.paused) {
                heroVideo.play();
                playOverlay.classList.add('hidden');
            } else {
                heroVideo.pause();
                playOverlay.classList.remove('hidden');
            }
        }

        playOverlay.addEventListener('click', togglePlay);

        // Also allow clicking video directly to pause if controls are hidden
        heroVideo.addEventListener('click', togglePlay);

        // Show overlay again when video ends
        heroVideo.addEventListener('ended', () => {
            playOverlay.classList.remove('hidden');
        });
    }

    // Sound Toggle Logic
    if (soundBtn && heroVideo) {
        // Initialize muted
        heroVideo.muted = true;

        soundBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent toggling play when clicking sound

            heroVideo.muted = !heroVideo.muted;

            if (heroVideo.muted) {
                soundBtn.style.backgroundColor = 'rgba(0,0,0,0.6)';
                if (soundIcon) soundIcon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`;
            } else {
                soundBtn.style.backgroundColor = 'rgba(10, 132, 255, 0.8)';
                if (soundIcon) soundIcon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93L19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 12C17.004 13.3308 16.4774 14.6024 15.54 15.54" stroke="currentColor" stroke-width="2"/>`;
            }
        });
    }

    // 3. Simple Gallery Interaction (Optional: could add lightbox)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Simple bounce effect to indicate interactivity
            item.style.transform = 'scale(0.98)';
            setTimeout(() => item.style.transform = 'scale(1)', 150);
        });
    });

    // 4. Back Button (Mock Navigation)
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            alert('Retour liste des biens');
        });
    }

    // 5. Contact Button Haptic
    const contactBtn = document.querySelector('.primary-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(10);
            alert('Appel de l\'agent en cours...');
        });
    }
});
