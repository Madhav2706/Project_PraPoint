document.addEventListener('DOMContentLoaded', () => {

    const USERS = {
        'demo@example.com': 'password123',
        'user@prapoint.com': 'secret456'
    };
    

    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const signInForm = document.getElementById('signInForm');
    const signInResult = document.getElementById('signInResult');
    const openSignInBtn = document.getElementById('openSign');


    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeToggle) themeToggle.textContent = '☀️ Light Mode';
    } else if (themeToggle) {
        themeToggle.textContent = '🌙 Dark Mode';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        });
    }


    const setActivePage = (targetId) => {
        pageSections.forEach(section => {
            section.style.display = 'none';
        });

        const activeSection = document.getElementById(targetId);
        if (activeSection) {
            activeSection.style.display = 'block';
        }

        navLinks.forEach(link => {
            link.classList.toggle('current', link.getAttribute('data-page') === targetId);
        });
        history.pushState(null, '', `#${targetId}`);
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            setActivePage(link.getAttribute('data-page'));
        });
    });

    if (openSignInBtn) {
        openSignInBtn.addEventListener('click', () => {
            setActivePage('sign-in');
        });
    }


    setActivePage(window.location.hash.substring(1) || 'home');


    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.elements.signInEmail.value.trim();
            const password = e.target.elements.signInPassword.value;
            
            signInResult.className = 'contact-result';
            
            if (USERS[email] === password) {
                signInResult.textContent = '✅ Signed in successfully! Welcome back.';
                signInResult.style.color = '#116530';
                signInForm.reset();
            } else {
                signInResult.textContent = '❌ Invalid email or password.';
                signInResult.style.color = '#ef4444';
            }
        });
    }


    document.getElementById('year').textContent = new Date().getFullYear();
});