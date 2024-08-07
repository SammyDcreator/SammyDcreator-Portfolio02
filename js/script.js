import projects from "../api/projects.json" with { type: "json" };

let menuicon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
menuicon.onclick = () => {
    menuicon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuicon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

let darkmodeIcon = document.querySelector('#darkMode-icon');
darkmodeIcon.onclick = () => {
    darkmodeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
    const hasDarkModeClass = document.body.classList.contains('dark-mode');
    if (hasDarkModeClass) {
        const style = document.createElement('style');
        style.innerHTML = `
            .progresscircle::before {
                background-color: #333;
            }
        `;
        document.head.appendChild(style);
    }
}

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', {
    origin: 'top'
});
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-box, .contact form', {
    origin: 'bottom'
});
ScrollReveal().reveal('.home-content h1, .about-img img', {
    origin: 'left'
});
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', {
    origin: 'right'
});

function animateProgress(element, start, end, duration) {
    let startTime = null;

    function animationStep(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let percentage = Math.min((progress / duration) * 100, 100);
        let value = start + (end - start) * (percentage / 100);

        element.style.setProperty('--i', `${value}%`);
        const span = element.querySelector('span');
        if (span) {
            span.textContent = `${Math.round(value)}%`;
        }

        if (percentage < 100) {
            requestAnimationFrame(animationStep);
        }
    }

    function startAnimation() {
        startTime = null;
        requestAnimationFrame(animationStep);
    }

    startAnimation();
}

const target = document.querySelector('.progresscircle');

const observer = new IntersectionObserver((entries, _observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressElements = document.querySelectorAll('.progresscircle');
            progressElements.forEach(element => {
                const targetValue = parseInt(element.getAttribute('data-target'), 10);
                animateProgress(element, 0, targetValue, 5000);
            });
        }
    });
}, {
    threshold: 0.1
});

if (target) {
    observer.observe(target);
}

const projectContainer = document.querySelector("#project-container");
const projectTemplate = document.querySelector("#project-template");

projects.forEach((project) => {
    const { id, name, description, link, image } = project;

    const projectClone = document.importNode(projectTemplate.content, true);

    projectClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    projectClone.querySelector(".projectImage").src = image;
    projectClone.querySelector(".projectImage").alt = name;
    projectClone.querySelector(".projectName").textContent = name;
    projectClone.querySelector(".projectDesc").textContent = description;
    projectClone.querySelector(".projectLink").href = link;

    projectContainer.append(projectClone);
})
