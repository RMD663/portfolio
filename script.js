function initializePortfolio() {
    loadPersonalInfo();
    loadProjects();
    setupEventListeners();
    setupCarousel();
}

function loadPersonalInfo() {
    const data = portfolioData.personalInfo;
    const social = portfolioData.socialLinks;
    
    // Header
    document.getElementById('header-name').textContent = data.name;
    document.getElementById('header-title').textContent = data.title;
    
    // Hero
    document.getElementById('hero-greeting').innerHTML = data.greeting;
    document.getElementById('profile-image').src = data.profileImage;
    document.getElementById('profile-image').alt = `Foto de ${data.name}`;
    
    const heroDesc = document.getElementById('hero-description');
    heroDesc.innerHTML = '';
    data.description.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        heroDesc.appendChild(p);
    });
    
    // About 
    const aboutContent = document.getElementById('about-content');
    aboutContent.innerHTML = '';
    data.about.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        aboutContent.appendChild(p);
    });
    
    // Social
    document.getElementById('linkedin-link').href = social.linkedin;
    document.getElementById('github-link').href = social.github;
    document.getElementById('itch-link').href = social.itch;
    document.getElementById('resume-btn').href = social.resume;
    
    document.getElementById('footer-linkedin').href = social.linkedin;
    document.getElementById('footer-github').href = social.github;
    document.getElementById('footer-itch').href = social.itch;
    document.getElementById('footer-resume').href = social.resume;
    
    // Footer
    document.getElementById('footer-copyright').textContent = `${portfolioData.settings.currentYear} ${data.name}`;
    document.getElementById('footer-subtitle').textContent = "Gameplay Programmer & Systems Programmer";
}

function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    projectsContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    portfolioData.projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-project-id', project.id);
        
        projectCard.innerHTML = `
            <div class="project-gif-container">
                <img src="${project.gif}" alt="${project.title}" class="project-gif">
            </div>
            <div class="project-info">
                <div class="project-tech">
                    <span>${project.tech}</span>
                    <div class="project-duration">
                        <i class="far fa-calendar-alt"></i>
                        <span>${project.duration}</span>
                    </div>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
            </div>
        `;
        
        projectCard.addEventListener('click', () => {
            if (project.articleUrl) {
                window.open(project.articleUrl, '_blank');
            }
        });
        
        projectsContainer.appendChild(projectCard);
        
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.setAttribute('data-index', index);
        indicatorsContainer.appendChild(indicator);
    });
}

function setupCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const cardCount = projectCards.length;
    const gap = 30;

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    carouselContainer.addEventListener('touchstart', touchStart);
    carouselContainer.addEventListener('touchmove', touchMove);
    carouselContainer.addEventListener('touchend', touchEnd);

    function touchStart(event) {
        isDragging = true;
        startPos = event.touches[0].clientX;
        
        carouselContainer.style.transition = 'none';
        
        animationID = requestAnimationFrame(animation);
    }

    function touchMove(event) {
        if (!isDragging) return;
        const currentPosition = event.touches[0].clientX;
        const diff = currentPosition - startPos;
        currentTranslate = prevTranslate + diff;
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < cardCount - 1) currentIndex += 1;
        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

        carouselContainer.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        updateCarousel();
    }

    function animation() {
        if (isDragging) {
            setSliderPosition();
            requestAnimationFrame(animation);
        }
    }

    function setSliderPosition() {
        carouselContainer.style.transform = `translateX(${currentTranslate}px)`;
    }

    function updateCarousel() {
        const cardWidth = projectCards[0].offsetWidth + gap;
        currentTranslate = -currentIndex * cardWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
        
        indicators.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cardCount - 1) {
            currentIndex++;
            carouselContainer.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            carouselContainer.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
            updateCarousel();
        }
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
}

function setupEventListeners() {
    document.querySelectorAll('.resume-btn, #footer-resume').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(portfolioData.socialLinks.resume, '_blank');
        });
    });
    
    document.querySelectorAll('.social-links a:not(.resume-btn), .footer-social a:not(#footer-resume)').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                const platform = this.querySelector('i').className.split(' ')[1];
                let platformName = "";
                
                if (platform.includes('linkedin')) platformName = "LinkedIn";
                else if (platform.includes('github')) platformName = "GitHub";
                else if (platform.includes('itch-io')) platformName = "Itch.io";
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initializePortfolio);

// módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { portfolioData, initializePortfolio };
}