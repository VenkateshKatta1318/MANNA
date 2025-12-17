document.addEventListener('DOMContentLoaded', () => {
    
    /* --- Mobile Navigation --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    /* --- Modal Logic --- */
    const modal = document.getElementById('orderModal');
    const closeBtn = document.querySelector('.modal-close');
    const openBtns = document.querySelectorAll('.open-modal');
    const flavorSelect = document.getElementById('flavor-select');
    const orderForm = document.getElementById('orderForm');

    // Open Modal and Pre-select Flavor
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const flavor = btn.getAttribute('data-flavor');
            
            // If button has a specific flavor, select it. If empty (Nav button), default to first option.
            if(flavor) {
                flavorSelect.value = flavor;
            }
            
            modal.classList.add('active');
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove('active');
    };

    closeBtn.addEventListener('click', closeModal);

    // Close if clicking outside the modal container
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /* --- Form Submission with Redirect --- */
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 1. Change button text to show loading state
        const submitBtn = orderForm.querySelector('button[type="submit"]');
        
        submitBtn.innerText = "Freezing... 🍦";
        submitBtn.style.backgroundColor = "var(--choco-brown)";
        submitBtn.style.boxShadow = "none"; // Press the button down visually
        submitBtn.style.transform = "translate(2px, 2px)";
        
        // 2. Simulate processing delay (1.5 seconds)
        setTimeout(() => {
            // 3. Redirect to the Thank You page
            window.location.href = 'thankyou.html';
        }, 1500);
    });

    /* --- Smooth Scroll (Backup for older browsers) --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});