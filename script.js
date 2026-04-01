// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.remove('active');
    }, 1000);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Modal functions for documents
function openDocModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeDocModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const icon = document.getElementById('notificationIcon');
    const msg = document.getElementById('notificationMessage');

    icon.textContent = type === 'success' ? '✓' : '✕';
    msg.textContent = message;
    notification.className = 'notification ' + type + ' show';

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Menu filter
function filterMenu(category) {
    const buttons = document.querySelectorAll('.menu-category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            const navLinks = document.getElementById('navLinks');
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// ========== КАРУСЕЛЬ ДЛЯ БЛОКА "ИНТЕРЬЕР" ==========
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel-js');
    const group = document.getElementById('group-js');

    if (carousel && group) {
        // Клонируем карточки для бесконечной прокрутки
        const cards = group.querySelectorAll('.card');
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            group.appendChild(clone);
        });

        let position = 0;
        const speed = 0.5;

        function animateCarousel() {
            position -= speed;
            const cardWidth = 470;
            const totalWidth = cardWidth * cards.length;

            if (Math.abs(position) >= totalWidth) {
                position = 0;
            }

            group.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animateCarousel);
        }

        animateCarousel();

        // Пауза при наведении
        carousel.addEventListener('mouseenter', function() {
            group.style.animationPlayState = 'paused';
        });

        carousel.addEventListener('mouseleave', function() {
            group.style.animationPlayState = 'running';
        });
    }
});

// ========== DROPDOWN ДЛЯ БЛОКА "ТОП ИГР" ==========
const gameData = {
    cs2: {
        title: 'Counter-Strike 2',
        description: 'Легендарный тактический шутер с обновленной графикой и физикой. Соревновательный режим, премьер-режим, тренировочные карты.',
        image: 'img/cs2.jpg'
    },
    dota2: {
        title: 'Dota 2',
        description: 'Главная MOBA планеты. 5 на 5, сотни героев, миллионы тактик. Регулярные турниры, обновления и патчи.',
        image: 'img/dota2.jpg'
    },
    valorant: {
        title: 'Valorant',
        description: 'Тактический шутер от Riot Games. Уникальные агенты с особыми способностями, точная стрельба и командная работа.',
        image: 'img/valorant2.jpeg'
    },
    apex: {
        title: 'Apex Legends',
        description: 'Королевская битва с уникальными легендами и быстрым геймплеем. Отряд из трех человек, ультимативные способности.',
        image: 'img/apex2.jpg'
    },
    pubg: {
        title: 'PUBG',
        description: 'Пионер королевских битв. Реалистичная графика, огромная карта, разнообразное оружие и тактические возможности.',
        image: 'img/pubg2.png'
    },
    genshin: {
        title: 'Genshin Impact',
        description: 'Открытый мир, магия и приключения. Исследуй Тейват в компании друзей, проходи подземелья.',
        image: 'img/genshin2.jpg'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const gameIcons = document.querySelectorAll('.game-icon');
    const tooltip = document.getElementById('game-tooltip');

    if (!tooltip) return;

    const tooltipImage = tooltip.querySelector('.game-tooltip__image');
    const tooltipTitle = tooltip.querySelector('.game-tooltip__title');
    const tooltipDescription = tooltip.querySelector('.game-tooltip__description');

    gameIcons.forEach(icon => {
        icon.addEventListener('mouseenter', (e) => {
            const game = e.currentTarget.dataset.game;
            const data = gameData[game];

            if (data) {
                tooltipImage.src = data.image;
                tooltipTitle.textContent = data.title;
                tooltipDescription.textContent = data.description;

                const rect = e.currentTarget.getBoundingClientRect();
                const tooltipHeight = 250;
                const windowHeight = window.innerHeight;

                let top;
                if (rect.top < tooltipHeight + 20) {
                    top = rect.bottom + 10;
                } else {
                    top = rect.top - tooltipHeight - 10;
                }

                tooltip.style.display = 'block';

                setTimeout(() => {
                    const tooltipRect = tooltip.getBoundingClientRect();
                    let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

                    if (left < 10) left = 10;
                    if (left + tooltipRect.width > window.innerWidth - 10) {
                        left = window.innerWidth - tooltipRect.width - 10;
                    }

                    tooltip.style.left = left + 'px';
                    tooltip.style.top = top + 'px';
                }, 0);
            }
        });

        icon.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });

    // Скрываем подсказку при скролле
    window.addEventListener('scroll', () => {
        tooltip.style.display = 'none';
    });
});
