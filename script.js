console.log("JS is running");

// === SMOOTH SCROLL FOR NAV LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Update active nav
            document.querySelectorAll('.nav-item').forEach(li => li.classList.remove('active'));
            const li = this.closest('.nav-item');
            if (li) li.classList.add('active');
        }
    });
});

// === HAMBURGER MOBILE MENU ===
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

function closeMobileNav() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });
}

// Close mobile nav on outside click
document.addEventListener('click', e => {
    if (mobileNav && mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
        closeMobileNav();
    }
});

// === SCROLL ANIMATION OBSERVER — re-triggers every time element enters/leaves ===
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function initScrollAnimations() {
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale').forEach(el => {
        animateOnScroll.observe(el);
    });
}

// === ACTIVE NAV ON SCROLL — RAF throttled, viewport-accurate ===
const sectionNavMap = { home: '#home', about: '#about', portfolio: '#portfolio', pixode: '#portfolio', contact: '#contact' };
let navTicking = false;

function updateNav() {
    const nav = document.querySelector('.navbar');
    if (!nav) { navTicking = false; return; }

    nav.classList.toggle('scrolled', window.scrollY > 50);

    // Use getBoundingClientRect — always accurate regardless of page layout
    const allSections = Array.from(document.querySelectorAll('section[id]'));
    const navHeight = nav.offsetHeight || 80;
    const threshold = navHeight + 20; // just below navbar bottom

    let current = allSections[0]?.getAttribute('id') || 'home';

    allSections.forEach(s => {
        const rect = s.getBoundingClientRect();
        // Section top has passed the threshold line
        if (rect.top <= threshold) {
            current = s.getAttribute('id');
        }
    });

    const activeHref = sectionNavMap[current] || '#' + current;

    document.querySelectorAll('.nav-item').forEach(li => {
        li.classList.remove('active');
        const a = li.querySelector('a');
        if (a && a.getAttribute('href') === activeHref) {
            li.classList.add('active');
        }
    });

    navTicking = false;
}

window.addEventListener('scroll', () => {
    if (!navTicking) { requestAnimationFrame(updateNav); navTicking = true; }
}, { passive: true });

// Also fire once on load so Home is active from the start
document.addEventListener('DOMContentLoaded', () => setTimeout(updateNav, 100));

// === 1. TYPING EFFECT ===
let typeTarget;
const phrases = ["Web Developer", "Information Systems Student", "UI/UX Designer", "Graphic Artist"];
let pIdx = 0, cIdx = 0, isDeleting = false;

function type() {
    if (!typeTarget) return;
    const current = phrases[pIdx];
    typeTarget.textContent = isDeleting
        ? current.substring(0, Math.max(0, cIdx - 1))
        : current.substring(0, cIdx + 1);
    cIdx = isDeleting ? cIdx - 1 : cIdx + 1;
    let speed = isDeleting ? 50 : 150;
    if (!isDeleting && cIdx === current.length) { speed = 2000; isDeleting = true; }
    else if (isDeleting && cIdx === 0) { isDeleting = false; pIdx = (pIdx + 1) % phrases.length; speed = 500; }
    setTimeout(type, speed);
}

// === 2. PROJECTS DATA ===
const projects = [
    {
        id: "p1",
        title: "CafeLupe Website",
        description: "A premium reservation platform for CafeLupe.",
        image: "images/cafelupe.png",
        techStack: ["ReactJS", "Tailwind"],
        features: ["Info Page", "Gallery"],
        liveLink: "#",
        githubLink: "#"
    },
    {
        id: "p2",
        title: "PawikanCare Management System",
        description: "An automated management platform for turtle nesting and conservation.",
        image: "images/capstone.png",
        techStack: ["PHP", "LARAVEL", "SQL"],
        features: ["Nesting Tracking", "Admin Dashboard", "Interactive Maps/Point COORD LOCATION", "PDF export Summary Report"],
        liveLink: "#",
        githubLink: "https://github.com/Howl-dotcom/pawikan-care"
    },
    {
        id: "p3",
        title: "Caffè Aura",
        description: "A high-end 3D coffee shop experience with interactive elements.",
        image: "images/coffee.png",
        techStack: ["Three.js", "GSAP"],
        features: ["3D Interaction", "Smooth Scroll"],
        liveLink: "#",
        githubLink: "#"
    },
    {
        id: "p4",
        title: "Ataratxia City",
        description: "A custom 3D loading screen designed for FiveM servers.",
        image: "images/ataratxia.png",
        techStack: ["HTML", "CSS", "LUA SCRIPTING", "JAVASCRIPT"],
        features: ["3D Interaction", "Smooth Scroll"],
        liveLink: "#",
        githubLink: "#"
    },
    {
        id: "p5",
        title: "Tetriz",
        description: "A modern, 3D reimagining of the classic Tetris game.",
        image: "images/tetriz.png",
        techStack: ["Three.js", "GSAP"],
        features: ["3D Gameplay", "Interactive UI"],
        liveLink: "#",
        githubLink: "#"
    },
    {
        id: "p6",
        title: "The Cats",
        description: "An interactive social gallery for sharing and exploring cat photography.",
        image: "images/cat.png",
        techStack: ["HTML", "CSS", "JS"],
        features: ["Community Gallery", "Photo Uploads"],
        liveLink: "https://howl-dotcom.github.io/The-Cats/",
        githubLink: "https://github.com/Howl-dotcom/The-Cats"
    },
    {
        id: "p7",
        title: "Portfolio V1",
        description: "The initial iteration of my professional portfolio and project showcase.",
        image: "images/portfoliov1.png",
        techStack: ["HTML", "CSS", "JS"],
        features: ["Project Showcase", "Certification Tracking"],
        liveLink: "https://howl-dotcom.github.io/Rojas_JohnMhel/",
        githubLink: "https://github.com/Howl-dotcom/Rojas_JohnMhel"
    },
    {
        id: "p8",
        title: "Portfolio V2",
        description: "Portfolio-v2 website is the previous version of this website which contains information about various projects I have worked on, and technologies I have mastered.",
        image: "images/portfoliov2.png",
        techStack: ["HTML", "CSS", "JS"],
        features: ["Showing the technology used in each project", "Showcasing various completed projects with various detailed information."],
        liveLink: "https://howl-dotcom.github.io/Howl/",
        githubLink: "https://github.com/Howl-dotcom/Howl"
    },
    {
        id: "p9",
        title: "Portfolio V3",
        description: "Portfolio-v3 of this website which contains information about various projects I have worked on, and technologies I have mastered. and Showing the certificates I obtained",
        image: "images/portfoliov3.png",
        techStack: ["HTML", "CSS", "JS"],
        features: ["Certificates", "Showcasing various completed projects with various detailed information.", "List of published projects with detail"],
        liveLink: "https://howl-dotcom.github.io/Howl/",
        githubLink: "https://github.com/Howl-dotcom/Howl"
    },
    {
        id: "p10",
        title: "Salt & Sand Coffee Shop",
        description: "This website template for Salt & Sand is a sophisticated blend of minimalist layout and dynamic visual storytelling",
        image: "images/saltnsand.png",
        techStack: ["HTML", "CSS", "JS"],
        features: ["Split-Screen Design", "Scroll Animations", "Atmospheric Illustration"],
        liveLink: "https://howl-dotcom.github.io/Coffee-Template/",
        githubLink: "https://github.com/Howl-dotcom/Coffee-Template"
    },

];

const certificates = [
    { title: "DICT", img: "images/dict1.png" },
    { title: "IBM", img: "images/ibm1.png" },
    { title: "DICT", img: "images/dict2.png" },
    { title: "Cisco", img: "images/java1.jpg" },
    { title: "Cisco", img: "images/java2.jpg" },
    { title: "Cisco", img: "images/python1.jpg" },
    { title: "Cisco", img: "images/python2.jpg" },
];

const techStackData = [
    { name: "HTML", iconClass: "fab fa-html5", color: "#E34F26" },
    { name: "CSS", iconClass: "fab fa-css3-alt", color: "#1572B6" },
    { name: "JavaScript", iconClass: "fab fa-js", color: "#F7DF1E" },
    { name: "ReactJS", iconClass: "fab fa-react", color: "#61DAFB" },
    { name: "Node.js", iconClass: "fab fa-node-js", color: "#339933" },
    { name: "Flutter", iconClass: "fas fa-mobile-alt", color: "#02569B" },
    { name: "Firebase", iconClass: "fas fa-fire", color: "#FFCA28" },
    { name: "Tailwind", iconClass: "fas fa-wind", color: "#38B2AC" },
    { name: "Python", iconClass: "fab fa-python", color: "#3776AB" },
    { name: "PHP", iconClass: "fab fa-php", color: "#777BB4" },
    { name: "Laravel", iconClass: "fab fa-laravel", color: "#FF2D20" },
    { name: "SQL", iconClass: "fas fa-database", color: "#4479A1" },
    { name: "Lua", iconClass: "fas fa-moon", color: "#000080" },
    { name: "Git", iconClass: "fab fa-git-alt", color: "#F05032" },
    { name: "GitHub", iconClass: "fab fa-github", color: "#181717" },
    { name: "Next.js", iconClass: "fab fa-node-js", color: "#000000" },
];

// === 3. BATCH LOADING PROJECTS ===
let loadedProjects = 0;
const LOAD_STEP = 3;

function renderProjects() {
    const grid = document.getElementById("project-grid");
    if (!grid) return;
    const slice = projects.slice(loadedProjects, loadedProjects + LOAD_STEP);
    grid.insertAdjacentHTML('beforeend', slice.map(proj => `
        <div class="project-card fade-in-scale">
            <div class="card-image"><img src="${proj.image}" alt="${proj.title}" loading="lazy"></div>
            <div class="card-content">
                <h3 class="project-title">${proj.title}</h3>
                <p class="project-desc">${proj.description.substring(0, 95)}...</p>
            </div>
            <div class="card-footer">
                <a href="${proj.liveLink}" class="live-link" target="_blank">Live Demo <i class="fas fa-external-link-alt"></i></a>
                <button class="details-btn" onclick="showProjectDetails('${proj.id}')">Details <i class="fas fa-arrow-right"></i></button>
            </div>
        </div>
    `).join(''));
    loadedProjects += slice.length;
    const seeMoreContainer = document.getElementById('see-more-container');
    // Only show see-more for projects tab, not tech stack
    const projectsTabActive = document.querySelector('.tab.active')?.textContent?.includes('Project') !== false;
    if (seeMoreContainer) seeMoreContainer.style.display = loadedProjects < projects.length ? 'block' : 'none';
    // Re-observe new cards
    document.querySelectorAll('.project-card.fade-in-scale:not(.visible)').forEach(el => animateOnScroll.observe(el));
}

// === 4. CERTIFICATES ===
function loadCertificates() {
    const grid = document.getElementById("cert-grid");
    if (!grid) return;
    grid.innerHTML = certificates.map(c => `
        <div class="cert-card fade-in-scale" onclick="openModal('${c.img}')">
            <img src="${c.img}" alt="${c.title}" loading="lazy">
        </div>
    `).join('');
    grid.querySelectorAll('.fade-in-scale').forEach(el => animateOnScroll.observe(el));
}

// === 5. TECH STACK ===
function loadTech() {
    const grid = document.getElementById("tech-grid");
    if (!grid) return;
    grid.innerHTML = techStackData.map(t => `
        <div class="tech-card fade-in-scale">
            <i class="${t.iconClass} tech-icon" style="color:${t.color}"></i>
            <span>${t.name}</span>
        </div>
    `).join('');
    grid.querySelectorAll('.fade-in-scale').forEach(el => animateOnScroll.observe(el));
}

// === 6. TABS with sliding indicator ===
function moveSlider(activeTab) {
    const slider = document.getElementById('tab-slider');
    const tabsContainer = document.getElementById('portfolio-tabs');
    if (!slider || !activeTab || !tabsContainer) return;
    const containerRect = tabsContainer.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    slider.style.left = (tabRect.left - containerRect.left) + 'px';
    slider.style.width = tabRect.width + 'px';
}

function switchTab(tabName, element) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    element.classList.add('active');
    moveSlider(element);
    const view = document.getElementById(`${tabName}-view`);
    view.classList.add('active');

    // Show/hide see-more only for projects
    const seeMoreContainer = document.getElementById('see-more-container');
    if (seeMoreContainer) {
        seeMoreContainer.style.display = (tabName === 'projects' && loadedProjects < projects.length) ? 'block' : 'none';
    }

    setTimeout(() => {
        view.querySelectorAll('.fade-in-scale, .fade-in-up').forEach(el => animateOnScroll.observe(el));
    }, 50);
}

// === 7. PROJECT DETAILS ===
function showProjectDetails(id) {
    const p = projects.find(x => x.id === id);
    if (!p) return;

    document.getElementById('detail-title').textContent = p.title;
    document.getElementById('detail-breadcrumb-title').textContent = p.title;
    document.getElementById('detail-main-img').src = p.image;

    const descEl = document.getElementById('detail-description') || document.getElementById('detail-desc');
    if (descEl) descEl.textContent = p.description;

    document.getElementById('detail-live-link').href = p.liveLink;
    document.getElementById('detail-github-link').href = p.githubLink;
    document.getElementById('detail-tech-count').textContent = p.techStack.length;
    document.getElementById('detail-feature-count').textContent = p.features.length;

    document.getElementById('detail-tech-tags').innerHTML = p.techStack.map(t =>
        `<span class="detail-tech-pill">${t}</span>`
    ).join('');

    document.getElementById('detail-features-list').innerHTML = p.features.map((f, i) =>
        `<li class="dfl-item" style="animation-delay:${i * 0.08}s">
            <span class="dfl-num">${String(i+1).padStart(2,'0')}</span>
            <span>${f}</span>
        </li>`
    ).join('');

    const panel = document.getElementById('project-details-view');
    panel.style.display = 'block';
    panel.classList.remove('details-exit');
    panel.classList.add('details-enter');
    document.body.style.overflow = 'hidden';
    panel.scrollTop = 0;
}

function hideProjectDetails() {
    const panel = document.getElementById('project-details-view');
    panel.classList.remove('details-enter');
    panel.classList.add('details-exit');
    setTimeout(() => {
        panel.style.display = 'none';
        panel.classList.remove('details-exit');
        document.body.style.overflow = 'auto';
    }, 380);
}

// === 8. CERTIFICATE MODAL ===
function openModal(img) {
    const m = document.getElementById("cert-modal");
    const i = document.getElementById("full-cert-img");
    if (!m || !i) return;
    m.style.display = "flex";
    i.src = img;
}

function closeModal() {
    const m = document.getElementById("cert-modal");
    if (m) m.style.display = "none";
}

// === 9. SMOKE WISPS ===
const numWisps = 3;
for (let i = 0; i < numWisps; i++) {
    const wisp = document.createElement('div');
    wisp.className = 'smoke-wisp';
    const colors = ['rgba(244,146,240,0.06)', 'rgba(155,95,192,0.07)', 'rgba(94,66,156,0.07)'];
    wisp.style.background = colors[i % colors.length];
    document.body.appendChild(wisp);
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let t = Math.random() * 1000;
    const speed = 0.001 + Math.random() * 0.002;
    const ampX = 50 + Math.random() * 50;
    const ampY = 30 + Math.random() * 30;
    const freqX = 0.01 + Math.random() * 0.02;
    const freqY = 0.01 + Math.random() * 0.02;
    (function animate() {
        t += speed;
        wisp.style.transform = `translate(${x + Math.sin(t/freqX)*ampX}px, ${y + Math.cos(t/freqY)*ampY}px)`;
        requestAnimationFrame(animate);
    })();
}

// === 10. INIT ===
document.addEventListener('DOMContentLoaded', () => {
    typeTarget = document.getElementById('type-target');
    renderProjects();
    loadCertificates();
    loadTech();
    initScrollAnimations();

    const seeMoreBtn = document.getElementById('see-more-btn');
    const seeMoreLabel = document.getElementById('see-more-label');
    const seeMoreIcon = document.getElementById('see-more-icon');
    let allShowing = false;

    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', () => {
            if (!allShowing) {
                // Load remaining
                while (loadedProjects < projects.length) renderProjects();
                seeMoreLabel.textContent = 'See Less';
                seeMoreIcon.className = 'fas fa-chevron-up';
                allShowing = true;
                document.getElementById('see-more-container').style.display = 'block';
            } else {
                // Collapse back to 3
                const grid = document.getElementById('project-grid');
                grid.innerHTML = '';
                loadedProjects = 0;
                allShowing = false;
                renderProjects(); // shows first 3
                seeMoreLabel.textContent = 'See More';
                seeMoreIcon.className = 'fas fa-chevron-down';
                // Scroll back to portfolio
                document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Init slider on first active tab
    const firstTab = document.querySelector('.portfolio-tabs .tab.active');
    if (firstTab) setTimeout(() => moveSlider(firstTab), 100);

    const closeBtn = document.querySelector("#cert-modal .close-btn");
    if (closeBtn) closeBtn.addEventListener('click', e => { e.stopPropagation(); closeModal(); });
});

// === 11. LOADER (GSAP) — smooth GPU-only smoke explosion ===
window.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const brandName = "howldotcom";
    const loaderTyping = document.querySelector("#loader-typing");

    // Set initial states — GPU-only properties only
    gsap.set(".loader-icons i, .loader-text, .loader-subtext", { opacity: 0, y: 45, force3D: true });
    gsap.set(".loader-shockwave", { scale: 0, opacity: 0, force3D: true });
    gsap.set(".smoke-explosion", { scale: 0, opacity: 0, force3D: true });

    // 1. Shockwaves expand outward
    tl.to("#shockwave1", { scale: 10, opacity: 0.7, duration: 0.55, ease: "power2.out", force3D: true })
      .to("#shockwave1", { opacity: 0, duration: 0.45, ease: "power2.in" }, "-=0.25")
      .to("#shockwave2", { scale: 15, opacity: 0.45, duration: 0.7, ease: "power2.out", force3D: true }, "-=0.55")
      .to("#shockwave2", { opacity: 0, duration: 0.5 }, "-=0.3")

    // 2. Smoke erupts — transform only, NO filter changes
    .to(".smoke-explosion", {
        duration: 1.8,
        opacity: 0.6,
        scale: "random(12, 20)",
        x: "random(-350, 350)",
        y: "random(-280, 280)",
        ease: "expo.out",
        stagger: { each: 0.1, from: "random" },
        force3D: true
    }, "-=1.0")

    // 3. Content rises through smoke
    .to(".loader-icons i", { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "back.out(2)", force3D: true }, "-=1.5")
    .to(".loader-text",    { opacity: 1, y: 0, duration: 0.55, force3D: true }, "-=1.1")
    .to(".loader-subtext", { opacity: 1, y: 0, duration: 0.5,  force3D: true }, "-=0.85")

    // 4. Type brand name
    .to({}, {
        duration: 0.9,
        onUpdate: function() {
            const len = Math.floor(this.progress() * brandName.length);
            if (loaderTyping) loaderTyping.textContent = brandName.substring(0, len);
        }
    }, "-=0.5")

    // 5. Smoke fades out cleanly (opacity only — no scale change to avoid lag)
    .to(".smoke-explosion", {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
        stagger: { each: 0.05, from: "random" }
    }, "+=0.9")

    // 6. Content fades out
    .to(".loader-icons i, .loader-text, .loader-subtext", {
        opacity: 0, y: -25, duration: 0.45, stagger: 0.05, ease: "power2.in", force3D: true
    }, "-=0.4")

    // 7. Whole panel slides up and out — single clean transform
    .to("#loader-wrapper", {
        yPercent: -100,
        duration: 0.75,
        ease: "power4.inOut",
        force3D: true,
        onComplete: () => {
            const lw = document.getElementById('loader-wrapper');
            lw.style.display = 'none';
            lw.style.transform = '';
            typeTarget = document.getElementById('type-target');
            type();
            // Re-calc section positions after loader hidden, then init
            setTimeout(() => {
                initScrollAnimations();
                updateNav();
            }, 50);
        }
    }, "-=0.1");
});

// === 12. GSAP SCROLL REVEALS (for .reveal elements) ===
gsap.registerPlugin(ScrollTrigger);
gsap.from('.hero-text', { opacity: 0, y: 80, duration: 1.2, ease: 'power3.out' });

// Re-position slider on resize
window.addEventListener('resize', () => {
    const activeTab = document.querySelector('.portfolio-tabs .tab.active');
    if (activeTab) moveSlider(activeTab);
});

// === 13. CONTACT FORM ===
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm('service_rk0ikjo', 'template_d3d4pim', this)
        .then(function() {
            alert('Message sent successfully!');
            contactForm.reset();
        }, function(error) {
            alert('Failed to send message. Please try again.');
            console.error(error);
        });
    });
}
