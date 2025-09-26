// Дополнительные анимации и интерактивные эффекты

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initInteractiveEffects();
    initScrollEffects();
});

// Анимации элементов при загрузке
function initAnimations() {
    // Анимация появления элементов
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдение за элементами с классом fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
}

// Интерактивные эффекты
function initInteractiveEffects() {
    // Эффект параллакса для фона
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        document.body.style.backgroundPosition = `${mouseX * 50}px ${mouseY * 50}px`;
    });

    // Анимация карточек при наведении
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02) rotateX(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(14, 23, 44, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            this.style.boxShadow = '0 8px 32px rgba(14, 23, 44, 0.1)';
        });
    });

    // Анимация кнопок
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 12px 30px rgba(14, 23, 44, 0.4)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(14, 23, 44, 0.3)';
        });

        // Эффект нажатия
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
    });

    // Анимация полей ввода
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(254, 199, 215, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 0 0 3px rgba(254, 199, 215, 0.2)';
        });
    });

    // Анимация логотипа
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(-2deg)';
            this.style.color = '#a786df';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.color = '#0e172c';
        });
    }

    // Анимация навигационных ссылок
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.color = '#a786df';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.color = '#0e172c';
        });
    });
}

// Эффекты при прокрутке
function initScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Параллакс для фоновых элементов
        const backgroundElements = document.querySelectorAll('body::before');
        backgroundElements.forEach(el => {
            if (el) {
                el.style.transform = `translateY(${rate}px)`;
            }
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Утилиты для анимаций
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Добавление стилей для ripple эффекта
const rippleStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(254, 199, 215, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Добавление ripple эффекта к кнопкам
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        createRippleEffect(this, e);
    });
});

// Анимация загрузки страницы
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #fec7d7, #f9f8fc);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 2rem; animation: bounce 1s infinite;">🛡️</div>
            <div style="font-size: 1.5rem; font-weight: 600; color: #0e172c;">Загрузка...</div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1000);
});

// Всплывающие уведомления
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#a786df' : '#0e172c'};
        color: #fffffe;
        padding: 1rem 2rem;
        border-radius: 15px;
        box-shadow: 0 8px 25px rgba(14, 23, 44, 0.3);
        transform: translateX(400px);
        transition: all 0.3s ease;
        z-index: 10000;
        font-weight: 600;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Экспорт функций для использования в других скриптах
window.Animations = {
    showNotification,
    createRippleEffect
};