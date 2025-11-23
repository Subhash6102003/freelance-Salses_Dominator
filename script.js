// ===============================================
// THREE.JS ANIMATED BACKGROUND
// ===============================================
function initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1);
    scene.add(ambientLight);

    // Create geometric shapes
    const torusGeometry = new THREE.TorusGeometry(10, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-20, 10, -10);
    scene.add(torus);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate particles
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;

        // Rotate torus
        torus.rotation.x += 0.001;
        torus.rotation.y += 0.002;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Mouse move effect
    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        camera.position.x = mouseX * 2;
        camera.position.y = mouseY * 2;
    });
}

// ===============================================
// GSAP ANIMATIONS
// ===============================================
function initGSAP() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.from('.hero-badge', {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.hero-title .hero-line', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.9,
        ease: 'power3.out'
    });

    gsap.from('.hero-stats .stat-item', {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        stagger: 0.2,
        delay: 1.2,
        ease: 'back.out(1.7)'
    });

    gsap.from('.hero-buttons button', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        delay: 1.5,
        ease: 'power3.out'
    });

    gsap.from('.hero-social', {
        opacity: 0,
        duration: 1,
        delay: 1.8,
        ease: 'power3.out'
    });

    // Scroll-triggered animations
    gsap.utils.toArray('.capability-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            rotation: 5,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Numbers animation
    gsap.utils.toArray('.number-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.5,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'back.out(1.7)'
        });
    });

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -100,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // About section floating cards
    gsap.utils.toArray('.floating-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0,
            rotation: 180,
            duration: 1,
            delay: index * 0.2,
            ease: 'back.out(1.7)'
        });
    });

    // Testimonials animation
    gsap.utils.toArray('.testimonial-card-modern').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // CTA section animation
    gsap.from('.cta-title', {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.cta-buttons button', {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Navbar background on scroll
    gsap.to('.navbar', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top -50',
            end: '+=9999',
            toggleClass: { targets: '.navbar', className: 'scrolled' },
            scrub: true
        }
    });

    // Parallax effect for hero
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        opacity: 0.3
    });
}

// ===============================================
// SMOOTH SCROLL & NAVIGATION
// ===============================================
function initNavigation() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: target, offsetY: 80 },
                    ease: 'power3.inOut'
                });
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// ===============================================
// BUTTON INTERACTIONS
// ===============================================
function initButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        button.addEventListener('click', function() {
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.pointerEvents = 'none';

            this.appendChild(ripple);

            gsap.to(ripple, {
                width: 300,
                height: 300,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            });

            // Button action placeholder
            console.log('Button clicked:', this.textContent);
        });
    });
}

// ===============================================
// CAPABILITY CARDS HOVER EFFECT
// ===============================================
function initCapabilityCards() {
    const cards = document.querySelectorAll('.capability-card, .number-card, .testimonial-card-modern');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        // 3D tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            gsap.to(this, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// ===============================================
// NUMBER COUNTER ANIMATION
// ===============================================
function initNumberCounters() {
    const numberCards = document.querySelectorAll('.number-value');

    numberCards.forEach(card => {
        ScrollTrigger.create({
            trigger: card,
            start: 'top 80%',
            onEnter: () => {
                const text = card.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                const suffix = text.replace(/[0-9]/g, '');

                if (!isNaN(number)) {
                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: number,
                        duration: 2,
                        ease: 'power2.out',
                        onUpdate: () => {
                            card.textContent = Math.floor(obj.val) + suffix;
                        }
                    });
                }
            }
        });
    });
}

// ===============================================
// SCROLL REVEAL ANIMATIONS
// ===============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.fade-in');

    revealElements.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
}

// ===============================================
// PAGE LOADER
// ===============================================
function initPageLoader() {
    window.addEventListener('load', () => {
        gsap.to('body', {
            opacity: 1,
            duration: 0.5
        });
    });
}

// ===============================================
// CURSOR EFFECT (OPTIONAL)
// ===============================================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: #FF7A3D;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.2s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 5,
            y: e.clientY - 5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    // Scale cursor on hover
    const interactiveElements = document.querySelectorAll('a, button, .capability-card, .number-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 3, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });
}

// ===============================================
// INITIALIZE ALL
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initGSAP();
    initNavigation();
    initButtons();
    initCapabilityCards();
    initNumberCounters();
    initScrollReveal();
    initPageLoader();
    // initCustomCursor(); // Uncomment if you want custom cursor

    console.log('%c🚀 Scales Dominator Website Loaded', 'color: #FF7A3D; font-size: 20px; font-weight: bold;');
});

// ===============================================
// PERFORMANCE OPTIMIZATION
// ===============================================
// Lazy load images if any
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}
