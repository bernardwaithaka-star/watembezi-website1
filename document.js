document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ Videos page initialized');

    // ===== FILTER FUNCTIONALITY =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoItems = document.querySelectorAll('.video-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            console.log('→ Filtering videos by:', filterValue);
            
            // Filter videos
            videoItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    // Add fade-in animation
                    item.style.animation = 'none';
                    setTimeout(() => {
                        item.style.animation = 'slideInUp 0.5s ease-out forwards';
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ===== VIDEO PLAY FUNCTIONALITY =====
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.video-card');
            const title = card.querySelector('.card-title').textContent;
            
            console.log('▶ Playing video:', title);
            
            // In a real implementation, this would open a video player
            // For now, just show an alert
            alert(`Video player would open for: ${title}\n\nIn production, this would use YouTube Embed or similar.`);
        });
    });

    // ===== VIDEO CARD HOVER EFFECTS =====
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Subtle scale on hover (already in CSS, but this ensures it works)
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===== LOAD MORE FUNCTIONALITY =====
    const loadMoreBtn = document.querySelector('.btn-outline-light');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            console.log('→ Load more videos clicked');
            alert('More videos would load here in production!');
        });
    }

    console.log('✓ All video interactions initialized');
});

// Animation helper
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
