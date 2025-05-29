document.addEventListener('DOMContentLoaded', () => {
    
    const cards = document.querySelectorAll('.card');
    const cardsContainer = document.querySelector('.cards-container');
    const galaxyBackground = document.querySelector('.galaxy-background');
    
    
    window.flipCard = flipCard;
    
    
    cards.forEach((card, index) => {
        card.setAttribute('data-card-id', `card-${index+1}`);
        
        
        card.addEventListener('click', function(e) {
            
            if (!e.target.closest('.btn')) {
                
                const isCurrentlyFlipped = card.classList.contains('flipped');
                flipCard(card, !isCurrentlyFlipped);
            }
        });

        
        card.addEventListener('touchend', function(e) {
            
            e.preventDefault();
            
            
            if (!e.target.closest('.btn')) {
                
                const isCurrentlyFlipped = card.classList.contains('flipped');
                flipCard(card, !isCurrentlyFlipped);
            }
        });
    });
    
    
    document.querySelectorAll('.flip-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            
            const card = button.closest('.card');
            
            
            const isOnFrontSide = button.closest('.card-front') !== null;
            
            
            addClickEffect(button, card);
            
            
            setTimeout(() => {
                
                flipCard(card, isOnFrontSide);
            }, 300);
            
            
            return false;
        });
    });
    
    
    cards.forEach((card, index) => {
        const color = card.getAttribute('data-color');
        const cardId = card.getAttribute('data-card-id');
        const cardInner = card.querySelector('.card-inner');
        const frontSide = card.querySelector('.card-front');
        const backSide = card.querySelector('.card-back');
        const frontButton = frontSide.querySelector('.btn');
        const backButton = backSide.querySelector('.btn');
        
        
        applyCardColors(card, color);
        
        
        initializeParticles(card, color);
        
        
        applyFloatingAnimation(card);
        
        
        
        frontButton.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            
            addClickEffect(this, card);
            
            
            card.style.zIndex = "10";
            
            
            setTimeout(() => {
                flipCard(card, true);
            }, 300);
            
            return false; 
        });
        
        
        backButton.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            
            addClickEffect(this, card);
            
            
            card.style.zIndex = "10";
            
            
            setTimeout(() => {
                flipCard(card, false);
            }, 300);
            
            return false; 
        });
    });
    
    
    function applyCardColors(card, color) {
        const icon = card.querySelector('.icon');
        const frontBtn = card.querySelector('.card-front .btn');
        const runes = card.querySelectorAll('.rune');
        
        card.style.setProperty('--glow', color);
        icon.style.setProperty('--icon-color', color);
        frontBtn.style.setProperty('--btn-color', color);
        
        
        runes.forEach(rune => {
            rune.style.color = color;
        });
        
        
        const secondaryColor = getComplementaryColor(color);
        frontBtn.style.setProperty('--btn-color-2', secondaryColor);
    }
    
    
    function initializeParticles(card, color) {
        const magneticParticles = card.querySelector('.magnetic-particles');
        createMagneticParticles(magneticParticles, color);
    }
    
    
    function flipCard(card, toBackSide) {
        const cardId = card.getAttribute('data-card-id');
        
        
        const cardInner = card.querySelector('.card-inner');
        const cardFront = card.querySelector('.card-front');
        const cardBack = card.querySelector('.card-back');
        const secretContent = card.querySelector('.secret-content');
        
        
        playFlipSound();
        
        
        if (toBackSide) {
            
            card.style.zIndex = "100";
            
            
            card.classList.add('flipped');
            
            
            if (cardInner) cardInner.style.transform = 'rotateY(180deg)';
            
            
            if (cardBack) {
                cardBack.style.opacity = '1';
                cardBack.style.visibility = 'visible';
                cardBack.style.zIndex = '3';
                cardBack.style.display = 'flex';
            }
            
            
            if (cardFront) {
                cardFront.style.opacity = '0';
                cardFront.style.visibility = 'hidden';
                cardFront.style.zIndex = '0';
            }
            
            
            if (secretContent) {
                secretContent.style.opacity = '1';
                secretContent.style.visibility = 'visible';
                secretContent.style.display = 'flex';
            }
            
            
            setTimeout(() => {
                
                animateRunes(card);
                
                
                showSecretContent(card);
            }, 300);
        } else {
            
            card.classList.remove('flipped');
            
            
            if (cardInner) cardInner.style.transform = 'rotateY(0deg)';
            
            
            if (cardFront) {
                cardFront.style.opacity = '1';
                cardFront.style.visibility = 'visible';
                cardFront.style.zIndex = '2';
            }
            
            
            if (cardBack) {
                cardBack.style.opacity = '0';
                cardBack.style.visibility = 'hidden';
                cardBack.style.zIndex = '1';
            }
            
            
            if (secretContent) {
                secretContent.style.opacity = '0';
                secretContent.style.visibility = 'hidden';
            }
            
            
            setTimeout(() => {
                card.style.zIndex = "";
            }, 1000);
        }
        
        
        card.classList.add('flipping');
        setTimeout(() => {
            card.classList.remove('flipping');
        }, 1000);
    }
    
    
    function showSecretContent(card) {
        
        const secretContent = card.querySelector('.secret-content');
        const secretIcon = card.querySelector('.secret-icon');
        const secretTitle = card.querySelector('.secret-title');
        const secretDescription = card.querySelector('.secret-description');
        const secretButton = card.querySelector('.card-back .btn');
        const runes = card.querySelectorAll('.rune');
        
        
        if (secretContent) {
            secretContent.style.opacity = '1';
            secretContent.style.visibility = 'visible';
            secretContent.style.display = 'flex';
        }
        
        
        if (secretIcon) {
            secretIcon.style.opacity = '1';
            secretIcon.style.visibility = 'visible';
            secretIcon.style.display = 'block';
            secretIcon.style.transform = 'scale(1)';
        }
        
        
        setTimeout(() => {
            if (secretTitle) {
                secretTitle.style.opacity = '1';
                secretTitle.style.visibility = 'visible';
                secretTitle.style.display = 'block';
                secretTitle.style.transform = 'scale(1)';
            }
        }, 150);
        
        
        setTimeout(() => {
            if (secretDescription) {
                secretDescription.style.opacity = '1';
                secretDescription.style.visibility = 'visible';
                secretDescription.style.display = 'block';
                secretDescription.style.transform = 'translateY(0)';
            }
        }, 300);
        
        
        setTimeout(() => {
            if (secretButton) {
                secretButton.style.opacity = '1';
                secretButton.style.visibility = 'visible';
                secretButton.style.display = 'block';
                secretButton.style.transform = 'scale(1)';
            }
        }, 450);
        
        
        if (runes.length > 0) {
            runes.forEach((rune, index) => {
                setTimeout(() => {
                    rune.style.opacity = '1';
                    rune.style.visibility = 'visible';
                }, 100 * index);
            });
        }
    }
    
    
    function animateRunes(card) {
        const runes = card.querySelectorAll('.rune');
        const centerX = 50;
        const centerY = 50;
        const radius = 35;
        
        runes.forEach((rune, index) => {
            
            const angle = (index / runes.length) * Math.PI * 2;
            const randomRadius = radius - 5 + Math.random() * 10;
            const x = centerX + Math.cos(angle) * randomRadius;
            const y = centerY + Math.sin(angle) * randomRadius;
            
            
            rune.style.transition = `all ${0.5 + Math.random() * 0.5}s ease-out`;
            rune.style.left = `${x}%`;
            rune.style.top = `${y}%`;
            
            
            const rotation = Math.random() * 360;
            rune.style.transform = `rotate(${rotation}deg)`;
        });
    }
    
    
    function playFlipSound() {
        
        if (!window.AudioContext && !window.webkitAudioContext) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            
            const oscillator1 = audioContext.createOscillator();
            const oscillator2 = audioContext.createOscillator();
            const oscillator3 = audioContext.createOscillator();
            
            
            oscillator1.type = 'sine';
            oscillator1.frequency.setValueAtTime(480, audioContext.currentTime);
            oscillator1.frequency.exponentialRampToValueAtTime(180, audioContext.currentTime + 0.5);
            
            oscillator2.type = 'triangle';
            oscillator2.frequency.setValueAtTime(520, audioContext.currentTime);
            oscillator2.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 0.7);
            
            oscillator3.type = 'sine';
            oscillator3.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator3.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
            
            
            const gainNode1 = audioContext.createGain();
            const gainNode2 = audioContext.createGain();
            const gainNode3 = audioContext.createGain();
            
            
            gainNode1.gain.setValueAtTime(0.04, audioContext.currentTime);
            gainNode2.gain.setValueAtTime(0.02, audioContext.currentTime);
            gainNode3.gain.setValueAtTime(0.015, audioContext.currentTime);
            
            
            gainNode1.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
            gainNode2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.7);
            gainNode3.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
            
            
            const panner = audioContext.createStereoPanner();
            panner.pan.setValueAtTime(-0.5, audioContext.currentTime);
            panner.pan.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.6);
            
            
            oscillator1.connect(gainNode1);
            oscillator2.connect(gainNode2);
            oscillator3.connect(gainNode3);
            
            gainNode1.connect(panner);
            gainNode2.connect(panner);
            gainNode3.connect(panner);
            
            panner.connect(audioContext.destination);
            
            
            oscillator1.start();
            oscillator2.start(audioContext.currentTime + 0.05);
            oscillator3.start(audioContext.currentTime + 0.1);
            
            oscillator1.stop(audioContext.currentTime + 0.5);
            oscillator2.stop(audioContext.currentTime + 0.7);
            oscillator3.stop(audioContext.currentTime + 0.3);
            
        } catch (e) {
            
        }
    }
    
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        
        galaxyBackground.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
        
        
        cardsContainer.style.transform = `translate(${x * 10}px, ${y * 10}px) rotateX(${y * 3}deg) rotateY(${-x * 3}deg)`;
    });
    
    
    cards.forEach(card => {
        const cardInner = card.querySelector('.card-inner');
        
        card.addEventListener('mousemove', (e) => {
            
            if (card.classList.contains('flipped')) return;
            
            handleCardMouseMove(e, card);
            
            
            handleReflectiveTexture(e, card);
            
            
            createRipple(e, card);
        });
        
        card.addEventListener('mouseleave', () => {
            
            if (card.classList.contains('flipped')) return;
            resetCardEffects(card);
        });
        
        card.addEventListener('mouseenter', () => {
            
            if (card.classList.contains('flipped')) return;
            
            playHoverSound();
        });
        
        
        card.addEventListener('touchmove', (e) => {
            
            if (card.classList.contains('flipped')) return;
            
            const touch = e.touches[0];
            handleCardMouseMove(touch, card);
            handleReflectiveTexture(touch, card);
            createRipple(touch, card);
            e.preventDefault(); 
        });
        
        card.addEventListener('touchend', () => {
            
            if (card.classList.contains('flipped')) return;
            resetCardEffects(card);
        });
    });
    
    
    if ('ontouchstart' in window) {
        activateAutoPulseEffect();
    }
    
    
    createFloatingParticles();
    
    
    
    
    function createMagneticParticles(container, color) {
        
        container.innerHTML = '';
        
        const particleCount = 50; 
        
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('magnetic-particle');
            
            
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            
            const size = 1 + Math.random() * 4;
            
            
            const opacity = 0.1 + Math.random() * 0.3;
            
            
            const blur = 1 + Math.random() * 2;
            
            
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = opacity;
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 ${blur}px ${blur}px ${color}`;
            
            
            particle.style.animation = `pulsate ${1 + Math.random() * 2}s infinite alternate`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            
            
            container.appendChild(particle);
        }
    }
    
    
    function createRipple(e, card) {
        const rippleContainer = card.querySelector('.ripple-effect');
        const rect = card.getBoundingClientRect();
        
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        
        const color = card.getAttribute('data-color');
        ripple.style.background = `radial-gradient(circle at center, ${color}40 0%, transparent 70%)`;
        
        
        rippleContainer.appendChild(ripple);
        
        
        setTimeout(() => {
            ripple.style.transition = 'all 1s ease';
            ripple.style.transform = 'scale(3)';
            ripple.style.opacity = '0';
            
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        }, 10);
    }
    
    
    function handleReflectiveTexture(e, card) {
        
        if (card.classList.contains('flipped')) return;
        
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        
        const normalizedX = mouseX / rect.width;
        const normalizedY = mouseY / rect.height;
        
        
        const angleX = (normalizedX - 0.5) * 2; 
        const angleY = (normalizedY - 0.5) * 2; 
        
        
        const highlight = card.querySelector('.highlight');
        if (highlight) {
            
            highlight.style.opacity = 0.2 + Math.abs(angleX * angleY) * 0.3;
            highlight.style.background = `radial-gradient(
                circle at ${normalizedX * 100}% ${normalizedY * 100}%,
                rgba(255, 255, 255, 0.8) 0%,
                rgba(255, 255, 255, 0.1) 30%,
                transparent 60%
            )`;
            
            
            const color = card.getAttribute('data-color') || '#7b00ff';
            highlight.style.mixBlendMode = 'overlay';
            
            
            const reflectionSize = 60 - Math.abs(angleX * angleY) * 20; 
            highlight.style.transform = `translate(-50%, -50%) scale(${1 + Math.abs(angleX * angleY)})`;
        }
    }
    
    
    function handleCardMouseMove(e, card) {
        
        if (card.classList.contains('flipped')) return;
        
        
        const rect = card.getBoundingClientRect();
        
        
        const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
        
        
        card.style.setProperty('--mouse-x', `${mouseX}%`);
        card.style.setProperty('--mouse-y', `${mouseY}%`);
        
        
        const rotateY = -(((e.clientX - rect.left) / rect.width) - 0.5) * 20;
        const rotateX = (((e.clientY - rect.top) / rect.height) - 0.5) * 20;
        
        
        const cardInner = card.querySelector('.card-inner');
        cardInner.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        
        
        const angle = Math.atan2(mouseY - 50, mouseX - 50) * (180 / Math.PI);
        card.style.setProperty('--reflective-angle', `${angle + 90}deg`);
        
        
        card.classList.add('active');
        
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distanceFromCenter = Math.sqrt(
            Math.pow((e.clientX - rect.left - centerX), 2) + 
            Math.pow((e.clientY - rect.top - centerY), 2)
        );
        
        
        const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
        const intensity = 1 - normalizedDistance;
        
        
        const cardGlow = card.querySelector('.card-glow');
        cardGlow.style.opacity = 0.5 + (intensity * 0.5);
        cardGlow.style.background = `radial-gradient(
            circle at ${mouseX}% ${mouseY}%, 
            var(--glow, #7b00ff) 0%, 
            transparent ${50 + (intensity * 30)}%
        )`;
        
        
        const edgeGlow = card.querySelector('.edge-glow');
        if (edgeGlow) {
            
            const edgeDistanceTop = mouseY;
            const edgeDistanceBottom = 100 - mouseY;
            const edgeDistanceLeft = mouseX;
            const edgeDistanceRight = 100 - mouseX;
            
            
            const minDistance = Math.min(edgeDistanceTop, edgeDistanceBottom, edgeDistanceLeft, edgeDistanceRight);
            
            
            let gradientAngle = 0;
            if (minDistance === edgeDistanceTop) gradientAngle = 0;
            else if (minDistance === edgeDistanceRight) gradientAngle = 90;
            else if (minDistance === edgeDistanceBottom) gradientAngle = 180;
            else if (minDistance === edgeDistanceLeft) gradientAngle = 270;
            
            
            const edgeProximityFactor = 1 - (minDistance / 50); 
            const brightness = 1 + Math.max(0, edgeProximityFactor) * 0.7;
            
            edgeGlow.style.opacity = 0.5 + (intensity * 0.5) + Math.max(0, edgeProximityFactor) * 0.3;
            edgeGlow.style.filter = `blur(${3 + intensity * 3}px) brightness(${brightness})`;
            edgeGlow.style.background = `linear-gradient(${gradientAngle}deg, var(--glow, #7b00ff), transparent 70%) border-box`;
        }
        
        
        const borderOpacity = 0.7 + intensity * 0.3;
        const borderBlur = 4 + intensity * 4;
        card.style.setProperty('--border-opacity', borderOpacity);
        card.style.setProperty('--border-blur', `${borderBlur}px`);
        
        
        updateMagneticParticles(card, mouseX, mouseY, intensity);
    }
    
    
    function resetCardEffects(card) {
        
        if (card.classList.contains('flipped')) return;
        
        const cardFront = card.querySelector('.card-front');
        const cardGlow = cardFront.querySelector('.card-glow');
        const highlight = cardFront.querySelector('.highlight');
        const magneticParticles = cardFront.querySelectorAll('.magnetic-particle');
        const cardInner = card.querySelector('.card-inner');
        const edgeGlow = card.querySelector('.edge-glow');
        
        
        cardInner.style.transform = '';
        
        
        cardGlow.style.opacity = '0';
        highlight.style.opacity = '0';
        
        
        if (edgeGlow) {
            edgeGlow.style.opacity = '0.5';
            edgeGlow.style.filter = 'blur(3px) brightness(1)';
            edgeGlow.style.background = 'linear-gradient(135deg, var(--glow, #7b00ff), transparent 70%) border-box';
        }
        
        
        magneticParticles.forEach(particle => {
            particle.style.opacity = '0';
            particle.style.transform = '';
        });
        
        
        card.style.setProperty('--border-opacity', '0.5');
        card.style.setProperty('--border-blur', '4px');
        
        
        card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.5), 0 0 10px var(--glow, rgba(123, 0, 255, 0.3))';
        
        
        card.classList.remove('active');
        
        
        applyFloatingAnimation(card);
    }
    
    
    function applyFloatingAnimation(card) {
        
        if (card.classList.contains('flipped')) return;
        
        
        const duration = 5 + Math.random() * 5; 
        const delay = Math.random() * 2; 
        const translateY = 5 + Math.random() * 8; 
        
        const cardInner = card.querySelector('.card-inner');
        cardInner.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite alternate`;
        
        
        if (!document.querySelector('style#floating-animation')) {
            const style = document.createElement('style');
            style.id = 'floating-animation';
            style.textContent = `
                @keyframes floating {
                    0% { transform: translateY(0px); }
                    100% { transform: translateY(-${translateY}px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    
    function activateAutoPulseEffect() {
        let activeIndex = 0;
        
        setInterval(() => {
            
            cards.forEach(card => {
                
                if (card.classList.contains('flipped')) return;
                
                card.classList.remove('active');
                const cardFront = card.querySelector('.card-front');
                cardFront.querySelector('.card-glow').style.opacity = '0';
                cardFront.querySelector('.highlight').style.opacity = '0';
                cardFront.querySelector('.ripple-effect').innerHTML = '';
                
                const magneticParticles = cardFront.querySelectorAll('.magnetic-particle');
                magneticParticles.forEach(particle => {
                    particle.style.opacity = '0';
                    particle.style.transform = '';
                });
            });
            
            
            let nextCard = cards[activeIndex];
            let count = 0;
            while (nextCard.classList.contains('flipped') && count < cards.length) {
                activeIndex = (activeIndex + 1) % cards.length;
                nextCard = cards[activeIndex];
                count++;
            }
            
            
            if (count >= cards.length) return;
            
            const card = nextCard;
            const rect = card.getBoundingClientRect();
            
            
            const x = rect.width / 2;
            const y = rect.height / 2;
            
            
            card.classList.add('active');
            
            const cardFront = card.querySelector('.card-front');
            const cardGlow = cardFront.querySelector('.card-glow');
            const highlight = cardFront.querySelector('.highlight');
            const magneticParticles = cardFront.querySelectorAll('.magnetic-particle');
            
            
            cardGlow.style.opacity = '0.4';
            cardGlow.style.left = `${x}px`;
            cardGlow.style.top = `${y}px`;
            
            highlight.style.left = `${x}px`;
            highlight.style.top = `${y}px`;
            highlight.style.opacity = '0.5';
            
            
            createRipple({clientX: rect.left + x, clientY: rect.top + y}, card);
            
            
            magneticParticles.forEach((particle, index) => {
                const angle = (index / magneticParticles.length) * Math.PI * 2;
                const radius = 30 + (index % 3) * 15;
                
                const particleX = x + Math.cos(angle) * radius;
                const particleY = y + Math.sin(angle) * radius;
                
                particle.style.transition = `transform 1s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 1s ease`;
                particle.style.transform = `translate(${particleX}px, ${particleY}px)`;
                particle.style.opacity = '0.7';
            });
            
            
            activeIndex = (activeIndex + 1) % cards.length;
        }, 2000);
    }
    
    
    function createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);
        
        
        const style = document.createElement('style');
        style.textContent = `
            .particles-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
                z-index: 1;
            }
            .particle {
                position: absolute;
                background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
            }
        `;
        document.head.appendChild(style);
        
        
        for (let i = 0; i < 15; i++) {
            createParticle(particlesContainer);
        }
    }
    
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        
        const size = 2 + Math.random() * 6;
        const posX = Math.random() * 100; 
        const posY = Math.random() * 100; 
        const duration = 10 + Math.random() * 20; 
        const delay = Math.random() * 10; 
        
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = Math.random() * 0.6;
        
        
        particle.style.animation = `float-particle ${duration}s linear ${delay}s infinite`;
        
        
        container.appendChild(particle);
        
        
        if (!document.querySelector('style#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes float-particle {
                    0% {
                        transform: translate(0, 0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: var(--opacity, 0.6);
                    }
                    90% {
                        opacity: var(--opacity, 0.6);
                    }
                    100% {
                        transform: translate(${Math.random() > 0.5 ? '' : '-'}${40 + Math.random() * 40}px, -${80 + Math.random() * 80}px) rotate(${Math.random() * 360}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    
    function playHoverSound() {
        
        if (!window.AudioContext) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            
            const oscillator = audioContext.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.value = 320 + Math.random() * 60;
            
            
            const gainNode = audioContext.createGain();
            gainNode.gain.value = 0.03;
            
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
            
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            
        }
    }
    
    
    function getComplementaryColor(hex) {
        
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        
        
        r = Math.min(255, (r + 50) % 255);
        g = Math.min(255, (g + 100) % 255);
        b = Math.min(255, (b + 150) % 255);
        
        
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    
    
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    
    function updateMagneticParticles(card, mouseX, mouseY, intensity) {
        const particles = card.querySelectorAll('.magnetic-particle');
        
        particles.forEach((particle, index) => {
            
            const particleX = parseFloat(particle.style.left) || 50;
            const particleY = parseFloat(particle.style.top) || 50;
            
            
            const dirX = mouseX - particleX;
            const dirY = mouseY - particleY;
            
            
            const distance = Math.sqrt(dirX * dirX + dirY * dirY);
            
            
            const normDirX = dirX / distance;
            const normDirY = dirY / distance;
            
            
            const maxPullDistance = 50; 
            const pullStrength = Math.max(0, 1 - Math.min(distance / maxPullDistance, 1)) * intensity * 20;
            
            
            const newX = particleX + normDirX * pullStrength;
            const newY = particleY + normDirY * pullStrength;
            
            
            particle.style.transition = `transform 0.3s ease, opacity 0.3s ease`;
            particle.style.transform = `translate(${normDirX * pullStrength * 0.5}px, ${normDirY * pullStrength * 0.5}px)`;
            
            
            particle.style.opacity = 0.3 + (pullStrength / 20) * 0.7;
            particle.style.filter = `blur(${1 + (pullStrength / 20) * 2}px) brightness(${1 + (pullStrength / 20) * 0.5})`;
        });
    }

    
    function addClickEffect(button, card) {
        
        const ripple = document.createElement('div');
        ripple.className = 'button-ripple';
        button.appendChild(ripple);
        
        
        ripple.style.position = 'absolute';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.width = '150%';
        ripple.style.height = '150%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.zIndex = '-1';
        ripple.style.animation = 'button-ripple 0.6s cubic-bezier(0.1, 0.7, 0.3, 1) forwards';
        
        
        if (!document.querySelector('style#button-ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'button-ripple-animation';
            style.textContent = `
                @keyframes button-ripple {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                    80% { opacity: 0.5; }
                    100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        
        const pulseBorder = document.createElement('div');
        pulseBorder.className = 'card-pulse';
        card.appendChild(pulseBorder);
        
        
        pulseBorder.style.position = 'absolute';
        pulseBorder.style.inset = '-10px';
        pulseBorder.style.borderRadius = '25px';
        pulseBorder.style.boxShadow = `0 0 20px 10px ${card.getAttribute('data-color') || '#7b00ff'}`;
        pulseBorder.style.opacity = '0';
        pulseBorder.style.animation = 'card-pulse-animation 0.8s ease-out forwards';
        pulseBorder.style.zIndex = '0';
        pulseBorder.style.pointerEvents = 'none';
        
        
        if (!document.querySelector('style#card-pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'card-pulse-animation';
            style.textContent = `
                @keyframes card-pulse-animation {
                    0% { opacity: 0.8; transform: scale(0.95); }
                    70% { opacity: 0.2; }
                    100% { opacity: 0; transform: scale(1.1); }
                }
            `;
            document.head.appendChild(style);
        }
        
        
        setTimeout(() => {
            ripple.remove();
            pulseBorder.remove();
        }, 800);
    }
}); 
