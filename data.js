const portfolioData = {
    // Informações pessoais
    personalInfo: {
        name: "Ryan Mesquita",
        title: "Gameplay Programmer",
        greeting: "Hello, I'm <span>Ryan</span>",
        profileImage: "resume-photo.png",
        description: [
            "Gameplay programmer focused on data-driven gameplay systems, performance-aware mechanics, and clear moment-to-moment player feedback.",
        ],
        about: [
            "I build gameplay systems using data-driven approaches and event-based communication, focusing on decoupled architectures that are easier to extend, test, and iterate on.",
            "I have experience developing gameplay mechanics under short deadlines and scope constraints, where early performance considerations and clear system boundaries are essential.",
            "I am currently in the 6th semester of an Information Systems degree, complementing my practical gameplay programming work with fundamentals in software engineering, development processes, and quality assurance.",
            // "I apply solid and battle tested programming principles on my code process, such as Data Driven for complex systems that require pass-throug of complex and interactive data, Observer for inter-communication between diferents areas of the game.",
            // "I love to work in welcoming teams but i also can work solo wiouth a problem.",
            // "If you have interest in contacting me..."
        ]
    },
    
    // Links sociais
    socialLinks: {
        linkedin: "https://www.linkedin.com/in/ryan-damasceno-823285288/",
        github: "https://github.com/RMD663",
        itch: "https://caixita.itch.io/",
        resume: "https://drive.google.com/file/d/seu-curriculo/view"
    },
    
    // Projetos
    projects: [
        {
            id: 1,
            title: "LV1000 Slime Dungeon",
            description: "High-density performance & Game Feel. Battle arena with 250+ simultaneous enemies and data-driven combat system.",
            tech: "Godot", 
            duration: "3 Days",
            gif: "assets/slime-dungeon-gameplay.gif",
            articleUrl: "articles/slime-article.html"
        },
        {
            id: 2,
            title: "Level Forever",
            description: "Commissioned 2D platformer for Mobile and PC, implementing event-based UI and decoupled gameplay systems for easy scalability.",
            tech: "Godot", 
            duration: "1 Week",
            gif: "assets/level-forever/level-forever-01.gif",
            articleUrl: "articles/level-forever-article.html"
        },
        {
            id: 3,
            title: "Child Of Warana",
            description: "Precision 2D platformer with time-travel resets created in 3 Days for a Game Jam.",
            tech: "Godot", 
            duration: "3 Days",
            gif: "assets/child-of-warana/child-of-warana-01.gif",
            articleUrl: "articles/child-article.html"
        },
        {
            id: 4,
            title: "Orbit Simulator",
            description: "Interactive 2D gravity simulator in p5.js. Add bodies with mass, velocity, and color to watch realistic orbits",
            tech: "Web", 
            duration: "1 Month",
            gif: "assets/orbit-sim/orbit-sim-01.gif",
            articleUrl: "articles/orbit-article.html"
        },
    ],
    
    // Configurações
    settings: {
        currentYear: new Date().getFullYear(),
        enableCarousel: true,
        maxProjectsToShow: 5
    }
};