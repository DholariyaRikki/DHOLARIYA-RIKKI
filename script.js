/**
 * 1. BOOTSTRAP ALERT ENGINE
 * Replaces standard JS alert()
 */
function showAlert(message, type = 'success') {
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible fade show shadow-lg" role="alert">`,
        `   <div><i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');
    alertPlaceholder.append(wrapper);
    setTimeout(() => {
        const alert = bootstrap.Alert.getOrCreateInstance(wrapper.firstElementChild);
        if (alert) alert.close();
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                showAlert('Please fill in all required fields correctly.', 'danger');
            } else {
                event.preventDefault(); // Stop actual submission for demo
                
                // Specific logic for Booking Form
                if (form.id === 'bookingForm') {
                    const checkIn = document.getElementById('checkIn').value;
                    const guests = document.getElementById('guests').value;
                    showAlert(`Success! Room availability found for ${checkIn} with ${guests} guest(s).`, 'success');
                }
            }
            form.classList.add('was-validated');
        }, false);
    });
});
/**
 * 2. CORE PAGE NAVIGATION
 */
function showPage(pageName) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    
    const selectedPage = document.getElementById(pageName + 'Page');
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const navbar = document.querySelector('.navbar');
    if (window.scrollY < 50) {
        navbar.classList.remove('scrolled');
    }

    updateActiveNavLink(pageName);

    const navBarCollapse = document.getElementById('navbarNav');
    if (navBarCollapse && navBarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navBarCollapse) || new bootstrap.Collapse(navBarCollapse);
        bsCollapse.hide();
    }
}

function updateActiveNavLink(pageName) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase().includes(pageName) || 
            (pageName === 'hotels' && link.textContent.toLowerCase().includes('rooms'))) {
            link.classList.add('active');
        }
    });
}

/**
 * 3. LOGIN & AUTHENTICATION
 */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sessionStorage.setItem('hotelLoggedIn', 'true');
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        showPage('home');
        showAlert('Welcome back to Serenity Grand!', 'success');
    });
}

function logout() {
    sessionStorage.removeItem('hotelLoggedIn');
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('loginPage').style.display = 'flex';
    if (loginForm) loginForm.reset();
}

/**
 * 4. NAVBAR SCROLL EFFECT
 */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/**
 * 5. CONTACT & NEWSLETTER HANDLERS (Updated with Bootstrap Alerts)
 */
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showAlert('Your message has been sent successfully. Our concierge will contact you shortly.', 'success');
        this.reset();
    });
}

// Newsletter Handler
const subscribeBtn = document.querySelector('.newsletter-group .btn-primary-custom');
if (subscribeBtn) {
    subscribeBtn.addEventListener('click', function() {
        const emailInput = document.querySelector('.newsletter-group input');
        if (emailInput.value) {
            showAlert('Thank you for subscribing to our exclusive updates!', 'success');
            emailInput.value = '';
        } else {
            showAlert('Please enter a valid email address.', 'danger');
        }
    });
}

/**
 * 6. INITIALIZATION
 */
window.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('hotelLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        showPage('home');
    }

    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('.booking-bar input[type="date"]').forEach(input => {
        input.setAttribute('min', today);
    });
});