// Enhanced Video Control System
document.addEventListener('DOMContentLoaded', () => {

    // DOM Elements
    const video = document.getElementById('main-video');
    const heroContainer = document.getElementById('hero-container');
    const playOverlay = document.getElementById('play-overlay');
    const videoControls = document.getElementById('video-controls');

    // Control Elements
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const rewindBtn = document.getElementById('rewind-btn');
    const forwardBtn = document.getElementById('forward-btn');
    const soundToggle = document.getElementById('sound-toggle');
    const muteIcon = document.getElementById('mute-icon');
    const unmuteIcon = document.getElementById('unmute-icon');

    // Progress Elements
    const progressBar = document.getElementById('progress-bar');
    const progressFilled = document.getElementById('progress-filled');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');

    // State
    let isSeeking = false;

    // ===================================
    // Utility Functions
    // ===================================

    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // ===================================
    // Play/Pause Functionality
    // ===================================

    function togglePlayPause() {
        if (video.paused) {
            video.play();
            playOverlay.classList.add('hidden');
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            video.pause();
            playOverlay.classList.remove('hidden');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    // Event Listeners for Play/Pause
    if (playOverlay) {
        playOverlay.addEventListener('click', togglePlayPause);
    }

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlayPause();
        });
    }

    if (video) {
        video.addEventListener('click', togglePlayPause);

        video.addEventListener('ended', () => {
            playOverlay.classList.remove('hidden');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        });
    }

    // ===================================
    // Rewind/Forward Functionality
    // ===================================

    if (rewindBtn) {
        rewindBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            video.currentTime = Math.max(0, video.currentTime - 10);

            // Visual feedback
            rewindBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                rewindBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }

    if (forwardBtn) {
        forwardBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            video.currentTime = Math.min(video.duration, video.currentTime + 10);

            // Visual feedback
            forwardBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                forwardBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // ===================================
    // Sound Toggle Functionality
    // ===================================

    if (soundToggle && video) {
        // Initialize muted
        video.muted = true;

        soundToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            video.muted = !video.muted;

            if (video.muted) {
                muteIcon.style.display = 'block';
                unmuteIcon.style.display = 'none';
            } else {
                muteIcon.style.display = 'none';
                unmuteIcon.style.display = 'block';
            }
        });
    }

    // ===================================
    // Progress Bar Functionality
    // ===================================

    if (video && progressBar && progressFilled) {
        // Update progress bar as video plays
        video.addEventListener('timeupdate', () => {
            if (!isSeeking && video.duration) {
                const progress = (video.currentTime / video.duration) * 100;
                progressFilled.style.width = `${progress}%`;
                currentTimeDisplay.textContent = formatTime(video.currentTime);
            }
        });

        // Update duration when metadata loads
        video.addEventListener('loadedmetadata', () => {
            durationDisplay.textContent = formatTime(video.duration);
        });

        // Seek functionality
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const newTime = percentage * video.duration;

            video.currentTime = newTime;
        });

        // Touch support for progress bar
        progressBar.addEventListener('touchstart', (e) => {
            isSeeking = true;
            e.preventDefault();
        });

        progressBar.addEventListener('touchmove', (e) => {
            if (isSeeking) {
                const touch = e.touches[0];
                const rect = progressBar.getBoundingClientRect();
                const touchX = touch.clientX - rect.left;
                const percentage = Math.max(0, Math.min(1, touchX / rect.width));
                const newTime = percentage * video.duration;

                video.currentTime = newTime;
                progressFilled.style.width = `${percentage * 100}%`;
                currentTimeDisplay.textContent = formatTime(newTime);
                e.preventDefault();
            }
        });

        progressBar.addEventListener('touchend', () => {
            isSeeking = false;
        });
    }

    // ===================================
    // Keyboard Controls (Bonus)
    // ===================================

    document.addEventListener('keydown', (e) => {
        if (!video) return;

        switch (e.key) {
            case ' ':
            case 'k':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                video.currentTime = Math.max(0, video.currentTime - 10);
                break;
            case 'ArrowRight':
                e.preventDefault();
                video.currentTime = Math.min(video.duration, video.currentTime + 10);
                break;
            case 'm':
                e.preventDefault();
                if (soundToggle) soundToggle.click();
                break;
        }
    });

    // ===================================
    // Read More Toggle
    // ===================================

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

    // ===================================
    // Gallery Interaction
    // ===================================

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.98)';
            setTimeout(() => item.style.transform = 'scale(1)', 150);
        });
    });

    // ===================================
    // Contact Button
    // ===================================

    const contactBtn = document.querySelector('.primary-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(10);
            alert('Appel de l\'agent en cours...');
        });
    }
});
