// Função para inicializar o portfólio
function initializePortfolio() {
    loadPersonalInfo();
    loadProjects();
    setupEventListeners();
    setupCarousel();
}

// Carregar informações pessoais
function loadPersonalInfo() {
    const data = portfolioData.personalInfo;
    const social = portfolioData.socialLinks;
    
    // Header
    document.getElementById('header-name').textContent = data.name;
    document.getElementById('header-title').textContent = data.title;
    
    // Hero section
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
    
    // About section
    const aboutContent = document.getElementById('about-content');
    aboutContent.innerHTML = '';
    data.about.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        aboutContent.appendChild(p);
    });
    
    // Social links
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

// Carregar projetos
function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    projectsContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    portfolioData.projects.forEach((project, index) => {
        // Criar card do projeto
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
        
        // Adicionar evento de clique
        projectCard.addEventListener('click', () => {
            if (project.articleUrl) {
                window.open(project.articleUrl, '_blank');
            }
        });
        
        projectsContainer.appendChild(projectCard);
        
        // Criar indicador do carrossel
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.setAttribute('data-index', index);
        indicatorsContainer.appendChild(indicator);
    });
}

// Configurar carrossel
function setupCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!portfolioData.settings.enableCarousel || projectCards.length === 0) {
        carouselContainer.style.flexWrap = 'wrap';
        carouselContainer.style.justifyContent = 'center';
        carouselContainer.style.transform = 'none';
        document.querySelector('.carousel-btn.prev').style.display = 'none';
        document.querySelector('.carousel-btn.next').style.display = 'none';
        document.querySelector('.carousel-indicators').style.display = 'none';
        return;
    }
    
    let currentIndex = 0;
    const cardCount = projectCards.length;

    let startX = 0;
    let endX = 0;
    let isDragging = false;

    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    carouselContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
    }, { passive: true });

    carouselContainer.addEventListener('touchend', () => {
        if (!isDragging) return;
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {

                moveNext();
            } else {
            
                movePrev();
            }
        }
        isDragging = false;
    });

    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }
    
    function updateCarousel() {
        const gap = 30; 
        const cardWidth = projectCards[0].offsetWidth + gap;
        const translateX = -currentIndex * cardWidth;
        carouselContainer.style.transform = `translateX(${translateX}px)`;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function moveNext() {
        currentIndex = (currentIndex + 1) % cardCount;
        updateCarousel();
    }

    function movePrev() {
        currentIndex = (currentIndex - 1 + cardCount) % cardCount;
        updateCarousel();
    }
    
    nextBtn.addEventListener('click', moveNext);
    prevBtn.addEventListener('click', movePrev);
    
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateCarousel();
        });
    });
    
    window.addEventListener('resize', updateCarousel);
    updateCarousel();
}

// Configurar event listeners
function setupEventListeners() {
    document.querySelectorAll('.resume-btn, #footer-resume').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(portfolioData.socialLinks.resume, '_blank');
        });
    });
    
    // Prevenir comportamento padrão dos links sociais (exceto currículo)
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

// Suporte para exportação de módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { portfolioData, initializePortfolio };
}