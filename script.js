

        // Create floating particles
        function createParticles() {
            const container = document.getElementById('particles');
            const colors = ['#f9a8d4', '#f472b6', '#ec4899', '#fce7f3', '#fbcfe8'];

            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                const size = Math.random() * 12 + 4;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
                particle.style.animationDelay = (Math.random() * 10) + 's';
                container.appendChild(particle);
            }
        }

        createParticles();