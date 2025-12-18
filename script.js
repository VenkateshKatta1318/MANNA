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




// --- 1. CONFIGURATION ---
const PUBLIC_KEY = "t9w2w4opFznvbPE_J";   
const SERVICE_ID = "service_i6qdayr";   
const TEMPLATE_ID = "template_dnbr30k"; 

// --- 2. SELECT YOUR EXISTING ELEMENTS ---
const inputField = document.getElementById('manna-email'); // Must match the ID of your input
const joinButton = document.getElementById('manna-btn');   // Must match the ID of your button

// Initialize EmailJS
(function() {
    emailjs.init(PUBLIC_KEY);
})();

// --- 3. THE LOGIC ---
joinButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevents page reload

    // Check if the user actually typed an email
    if (!inputField.value.includes("@")) {
        alert("Please enter a valid email address first!");
        return;
    }

    // Change button text to show loading
    const originalText = joinButton.innerText;
    joinButton.innerText = "Sending...";

    // Prepare data
    const templateParams = {
        user_email: inputField.value,
    };

    // Send email
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function() {
            // Success
            joinButton.innerText = "Welcome! 🍦";
            joinButton.style.backgroundColor = "#4CAF50"; // Optional green success color
            inputField.value = ""; // Clear the input
            
            // Optional: Reset button after 3 seconds
            setTimeout(() => {
                joinButton.innerText = originalText;
            }, 3000);

        }, function(error) {
            // Error
            console.log('FAILED...', error);
            joinButton.innerText = "Try Again";
            alert("Something went wrong. Please check your internet.");
        });
})});

