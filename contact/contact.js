document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Create celebration container
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    
    // Add thank you message
    const thankYouMsg = document.createElement('div');
    thankYouMsg.className = 'thank-you-msg';
    thankYouMsg.textContent = 'Thank you! We will help you soon.';
    celebration.appendChild(thankYouMsg);
    
    // Add binary rain
    for (let i = 0; i < 50; i++) {
        const binary = document.createElement('div');
        binary.className = 'binary';
        binary.style.left = Math.random() * 100 + 'vw';
        binary.style.animationDelay = Math.random() * 2 + 's';
        binary.textContent = Math.random() > 0.5 ? '1' : '0';
        celebration.appendChild(binary);
    }
    
    document.body.appendChild(celebration);
    
    // Remove celebration after animation
    setTimeout(() => {
        celebration.remove();
        // Here you can add form submission logic
    }, 5000);  // Changed from 4000 to 5000 milliseconds
});

document.getElementById('queryType').addEventListener('change', function() {
    const otherQueryDiv = document.getElementById('otherQueryDiv');
    if (this.value === 'other') {
        otherQueryDiv.style.display = 'block';
        document.getElementById('otherQuery').required = true;
    } else {
        otherQueryDiv.style.display = 'none';
        document.getElementById('otherQuery').required = false;
    }
});