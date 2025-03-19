document.addEventListener('DOMContentLoaded', () => {
    const wizard = document.getElementById('setupWizard');
    const steps = wizard.querySelectorAll('.wizard-step');
    const loadingScreen = document.getElementById('loadingScreen');
    let currentStep = 1;

    // Initialize first step
    steps[0].classList.add('active');

    // Setup state
    const state = {
        personal: {
            name: '',
            profession: '',
            bio: ''
        },
        style: {
            theme: 'minimal'
        },
        sections: ['about', 'portfolio', 'contact'],
        contact: {
            email: '',
            social: {
                twitter: '',
                instagram: '',
                linkedin: ''
            }
        }
    };

    // Navigation functions
    function showStep(step) {
        steps.forEach(s => s.classList.remove('active'));
        steps[step - 1].classList.add('active');
        currentStep = step;
    }

    function validateStep(step) {
        switch(step) {
            case 2:
                const name = document.getElementById('userName').value;
                const profession = document.getElementById('profession').value;
                return name.trim() !== '' && profession.trim() !== '';
            case 3:
                return state.style.theme !== '';
            case 4:
                const email = document.getElementById('email').value;
                return email.trim() !== '' && email.includes('@');
            default:
                return true;
        }
    }

    // Event Listeners
    wizard.addEventListener('click', (e) => {
        if (e.target.classList.contains('next-btn')) {
            if (validateStep(currentStep)) {
                saveStepData(currentStep);
                showStep(currentStep + 1);
            } else {
                alert('Please fill in all required fields');
            }
        }
        
        if (e.target.classList.contains('back-btn')) {
            showStep(currentStep - 1);
        }
        
        if (e.target.classList.contains('finish-btn')) {
            if (validateStep(currentStep)) {
                saveStepData(currentStep);
                finishSetup();
            } else {
                alert('Please fill in all required fields');
            }
        }
    });

    // Style selection
    const styleOptions = document.querySelectorAll('.style-option');
    styleOptions.forEach(option => {
        option.addEventListener('click', () => {
            styleOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            state.style.theme = option.dataset.style;
        });
    });

    // Section selection
    const sectionCheckboxes = document.querySelectorAll('.section-option input');
    sectionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            state.sections = Array.from(sectionCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
        });
    });

    function saveStepData(step) {
        switch(step) {
            case 2:
                state.personal.name = document.getElementById('userName').value;
                state.personal.profession = document.getElementById('profession').value;
                state.personal.bio = document.getElementById('bio').value;
                break;
            case 4:
                state.contact.email = document.getElementById('email').value;
                const socialInputs = document.querySelectorAll('.social-links input');
                state.contact.social.twitter = socialInputs[0].value;
                state.contact.social.instagram = socialInputs[1].value;
                state.contact.social.linkedin = socialInputs[2].value;
                break;
        }
    }

    function finishSetup() {
        // Save website data
        const websiteData = {
            personal: {
                name: document.getElementById('userName').value,
                tagline: document.getElementById('profession').value,
                bio: document.getElementById('bio').value
            },
            style: state.style,
            sections: {
                about: true,
                portfolio: document.querySelector('input[value="portfolio"]').checked,
                blog: document.querySelector('input[value="blog"]').checked,
                contact: document.querySelector('input[value="contact"]').checked
            },
            contact: {
                email: document.getElementById('email').value,
                social: {
                    twitter: document.querySelector('input[placeholder="Twitter URL"]').value,
                    instagram: document.querySelector('input[placeholder="Instagram URL"]').value,
                    linkedin: document.querySelector('input[placeholder="LinkedIn URL"]').value
                }
            }
        };

        localStorage.setItem('websiteData', JSON.stringify(websiteData));
        
        // Redirect to website
        window.location.href = 'website.html';
    }

    // Add hover effects
    function addHoverEffects() {
        const interactiveElements = document.querySelectorAll('.style-option, .section-option');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    addHoverEffects();
});
