import { initPosters } from './posters.js';

document.addEventListener('DOMContentLoaded', () => {

    initPosters();


    lucide.createIcons();


    initSwiper();


    gsap.from("#hero-content > *", {
        opacity: 0,
        y: 40,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out"
    });


    initScrollReveal();


    initFAQ();


    initForm();


    initSmoothScroll();
});

function initSwiper() {
    new Swiper('.poster-swiper', {
        slidesPerView: 1.2,
        spaceBetween: 20,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 30,
            }
        }
    });
}

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            const content = item.querySelector('.faq-content');
            const icon = item.querySelector('[data-lucide]');
            
            document.querySelectorAll('.faq-content').forEach(c => {
                if(c !== content) {
                    c.classList.add('hidden');
                    const otherIcon = c.parentElement.querySelector('[data-lucide]');
                    if(otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            const isHidden = content.classList.contains('hidden');
            content.classList.toggle('hidden');
            
            if (icon) {
                icon.style.transform = isHidden ? 'rotate(45deg)' : 'rotate(0deg)';
            }
        });
    });
}

function initForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            const error = input.parentElement.querySelector('.error-msg');
            if (!input.value.trim()) {
                input.classList.add('border-red-300');
                if (error) error.classList.remove('hidden');
                isValid = false;
            } else {
                input.classList.remove('border-red-300');
                if (error) error.classList.add('hidden');
            }
        });

        if (isValid) {
            const btn = document.getElementById('submit-btn');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span class="animate-pulse">正在提交...</span>';


            setTimeout(() => {
                showModal();
                form.reset();
                btn.disabled = false;
                btn.innerHTML = originalText;
            }, 1200);
        }
    });
}

function showModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('pointer-events-none');
    modal.classList.add('opacity-100');
    modal.querySelector('.bg-white').classList.remove('scale-95');
}

window.closeModal = function() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('pointer-events-none');
    modal.classList.remove('opacity-100');
    modal.querySelector('.bg-white').classList.add('scale-95');
};

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}
