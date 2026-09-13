// ai-design.js - AI Studio Logic

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('studio-generate');
    const loadingOverlay = document.getElementById('studio-loading');
    const resultImage = document.querySelector('.active-render');
    const bhkBtns = document.querySelectorAll('.bhk-btn');

    // BHK Selection
    bhkBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            bhkBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Mock AI Generation
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            loadingOverlay.classList.add('active');
            
            // Simulating AI Processing
            setTimeout(() => {
                loadingOverlay.classList.remove('active');
                // Just refreshing the placeholder for visual feedback
                const currentSrc = resultImage.src;
                resultImage.src = '';
                resultImage.src = currentSrc + '&t=' + Date.now();
                
                // Show success notification (mock)
                alert('AI Design Generated Successfully!');
            }, 3000);
        });
    }
});
