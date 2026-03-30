console.log("JS is running");

// --- 1. Typing Effect ---
let target;
const phrases = ["Web Developer", "Information Systems Student", "UI/UX Designer", "Graphic Artist"];
let pIdx = 0, cIdx = 0, isDeleting = false;

function type() {
    if (!target) return;
    const current = phrases[pIdx];
    target.textContent = isDeleting 
        ? current.substring(0, Math.max(0, cIdx-1)) 
        : current.substring(0, cIdx+1);
    cIdx = isDeleting ? cIdx-1 : cIdx+1;

    let speed = isDeleting ? 50 : 150;
    if (!isDeleting && cIdx === current.length) { speed = 2000; isDeleting = true; }
    else if (isDeleting && cIdx === 0) { isDeleting = false; pIdx = (pIdx+1) % phrases.length; speed = 500; }

    setTimeout(type, speed);
}

// --- 2. Projects / Certificates / TechStack ---
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
    {title:"DICT", img:"images/dict1.png"},
    {title:"IBM", img:"images/ibm1.png"},
    {title:"DICT", img:"images/dict2.png"},
];

const techStackData = [
    {name:"HTML", iconClass:"fab fa-html5", color:"#E34F26"},
    {name:"CSS", iconClass:"fab fa-css3-alt", color:"#1572B6"},
    {name:"JavaScript", iconClass:"fab fa-js", color:"#F7DF1E"},
    {name:"ReactJS", iconClass:"fab fa-react", color:"#61DAFB"},
    {name:"Node.js", iconClass:"fab fa-node-js", color:"#339933"},
    {name:"Flutter", iconClass:"fas fa-mobile-alt", color:"#02569B"}, 
    {name:"Firebase", iconClass:"fas fa-fire", color:"#FFCA28"}, 
    {name:"Tailwind", iconClass:"fas fa-wind", color:"#38B2AC"} 
];

// --- 3. Batch Loading Projects ---
let loadedProjects = 0;
const LOAD_STEP = 3;

function renderProjects() {
    const grid = document.getElementById("project-grid");
    if(!grid) return;

    const slice = projects.slice(loadedProjects, loadedProjects + LOAD_STEP);

    grid.insertAdjacentHTML('beforeend', slice.map(proj => `
        <div class="project-card reveal">
            <div class="card-image">
                <img src="${proj.image}" alt="${proj.title}">
            </div>
            
            <div class="card-content">
                <h3 class="project-title">${proj.title}</h3>
                <p class="project-desc">${proj.description.substring(0, 95)}...</p>
            </div>

            <div class="card-footer">
                <a href="${proj.liveLink}" class="live-link" target="_blank">
                    Live Demo <i class="fas fa-external-link-alt"></i>
                </a>
                <button class="details-btn" onclick="showProjectDetails('${proj.id}')">
                    Details <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `).join(''));

    loadedProjects += slice.length;
    const seeMoreContainer = document.getElementById('see-more-container');
    if (seeMoreContainer) seeMoreContainer.style.display = loadedProjects < projects.length ? 'block' : 'none';
    ScrollTrigger.refresh();
}

// --- 4. Certificates ---
function loadCertificates() {
    const grid = document.getElementById("cert-grid");
    if(!grid) return;
    grid.innerHTML = certificates.map(c => `
        <div class="cert-card" onclick="openModal('${c.img}')">
            <img src="${c.img}" alt="${c.title}">
        </div>
    `).join('');
    ScrollTrigger.refresh();
}

// --- 5. Tech Stack ---
function loadTech() {
    const grid = document.getElementById("tech-grid");
    if(!grid) return;
    grid.innerHTML = techStackData.map(t=>`
        <div class="tech-card reveal">
            <i class="${t.iconClass} tech-icon" style="color:${t.color}"></i>
            <span>${t.name}</span>
        </div>
    `).join('');
    ScrollTrigger.refresh();
}

// --- 6. Tabs ---
function switchTab(tabName, element){
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    element.classList.add('active');
    document.getElementById(`${tabName}-view`).classList.add('active');
}

// --- 7. Project Details ---
function showProjectDetails(id){
    const p = projects.find(x=>x.id===id);
    if(!p) return;
    document.getElementById('detail-title').textContent = p.title;
    document.getElementById('detail-description').textContent = p.description;
    document.getElementById('detail-breadcrumb-title').textContent = p.title;
    document.getElementById('detail-main-img').src = p.image;
    document.getElementById('detail-live-link').href = p.liveLink;
    document.getElementById('detail-github-link').href = p.githubLink;
    document.getElementById('detail-tech-tags').innerHTML = p.techStack.map(t=>`<span class="tech-tag">${t}</span>`).join('');
    document.getElementById('detail-features-list').innerHTML = p.features.map(f=>`<li>${f}</li>`).join('');
    document.getElementById('detail-tech-count').textContent = p.techStack.length;
    document.getElementById('detail-feature-count').textContent = p.features.length;
    document.getElementById('project-details-view').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideProjectDetails(){
    document.getElementById('project-details-view').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// --- 8. Certificate Modal ---
function openModal(img){
    const m = document.getElementById("cert-modal");
    const i = document.getElementById("full-cert-img");
    if(!m || !i) return;
    m.style.display = "flex";
    i.src = img;
}
function closeModal(){
    const m = document.getElementById("cert-modal");
    if(!m) return;
    m.style.display = "none";
}

// --- 9. Smoke Effect ---
const numWisps = 4;
for (let i = 0; i < numWisps; i++) {
    const wisp = document.createElement('div');
    wisp.className = 'smoke';
    document.body.appendChild(wisp);

    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let t = Math.random() * 1000;

    const speed = 0.001 + Math.random() * 0.002;
    const amplitudeX = 50 + Math.random() * 50;
    const amplitudeY = 30 + Math.random() * 30;
    const freqX = 0.01 + Math.random() * 0.02;
    const freqY = 0.01 + Math.random() * 0.02;

    function animate() {
        t += speed;
        const offsetX = Math.sin(t / freqX) * amplitudeX;
        const offsetY = Math.cos(t / freqY) * amplitudeY;
        wisp.style.transform = `translate(${x + offsetX}px, ${y + offsetY}px) scale(${0.8 + Math.sin(t)*0.2})`;
        requestAnimationFrame(animate);
    }

    animate();
}

function createSmoke() {
    const smokeContainer = document.getElementById('smoke-container');
    if (!smokeContainer) return;

    const wisp = document.createElement('div');
    wisp.className = 'smoke-wisp';
    wisp.style.left = Math.random() * 90 + '%';
    wisp.style.animationDuration = 6 + Math.random() * 4 + 's';

    smokeContainer.appendChild(wisp);

    setTimeout(() => {
        if (smokeContainer.contains(wisp)) smokeContainer.removeChild(wisp);
    }, 10000);
}

// --- 10. Init ---
document.addEventListener('DOMContentLoaded', () => {
    target = document.getElementById('type-target');
    type();
    renderProjects();
    loadCertificates();
    loadTech();

    const seeMoreBtn = document.getElementById('see-more-btn');
    if (seeMoreBtn) seeMoreBtn.addEventListener('click', renderProjects);

    const closeBtn = document.querySelector("#cert-modal .close-btn");
    if(closeBtn) closeBtn.addEventListener('click', e => { e.stopPropagation(); closeModal(); });
});

// --- 11. Navigation Scroll ---
window.addEventListener('scroll', ()=>{
    const nav = document.querySelector('.navbar');
    if(!nav) return;
    if(window.scrollY > 50){
        nav.classList.add('scrolled');
        nav.style.background = "rgba(2,2,5,0.98)";
        nav.style.height = "70px";
    } else {
        nav.classList.remove('scrolled');
        nav.style.background = "rgba(2,2,5,0.8)";
        nav.style.height = "80px";
    }
});

// --- 12. Loader ---
window.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();
    const brandName = "howldotcom";
    const loaderTyping = document.querySelector("#loader-typing");

    gsap.set(".loader-icons i, .loader-text", { opacity: 0, y: 30 });

    tl.to(".smoke-explosion", {
        duration: 2.5,
        opacity: 0.4,
        scale: 15,
        stagger: { each: 0.2, from: "random" },
        x: () => (Math.random() - 0.5) * 500,
        y: () => (Math.random() - 0.5) * 500,
        ease: "power4.out"
    })
    .to(".loader-icons i", { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(2)" }, "-=2.2")
    .to(".loader-text", { opacity: 1, y: 0 }, "-=1.5")
    .to({}, { duration: 1.2, onUpdate: function() {
        const progress = this.progress();
        const currentLength = Math.floor(progress * brandName.length);
        loaderTyping.textContent = brandName.substring(0, currentLength);
    }}, "-=1")
    .to("#loader-wrapper", {
        opacity: 0,
        display: "none",
        duration: 1,
        delay: 1.5,
        onComplete: () => { target = document.getElementById('type-target'); type(); }
    });
});

// --- 13. GSAP Reveal + Parallax ---
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el,
        { opacity: 0, y: 80, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, delay: i*0.08, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' } }
    );
});

gsap.to('.parallax-bg', {
    y: 100, ease: 'none',
    scrollTrigger: { trigger: '.parallax-section', start: 'top bottom', end: 'bottom top', scrub: true }
});
gsap.to('.parallax-text', {
    y: -50,
    scrollTrigger: { trigger: '.parallax-section', start: 'top bottom', end: 'bottom top', scrub: true }
});
gsap.from('.hero-text', { opacity: 0, y: 80, duration: 1.2, ease: 'power3.out' });

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_rk0ikjo', 'template_d3d4pim', this)
    .then(function() {
        alert('Message sent successfully!');
        document.getElementById('contact-form').reset();
    }, function(error) {
        alert('Failed to send message. Please try again.');
        console.error(error);
    });
});
