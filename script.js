let isTransitioning = false;

    // Switch to Register
    function switchToRegister() {
      if (isTransitioning) return;
      
      isTransitioning = true;
      const wrapper = document.getElementById('authWrapper');
      
      // Add loading state
      wrapper.classList.add('loading');
      
      setTimeout(() => {
        wrapper.classList.add('show-register');
        wrapper.classList.remove('loading');
        
        setTimeout(() => {
          isTransitioning = false;
        }, 800);
      }, 200);
    }

    // Switch to Login
    function switchToLogin() {
      if (isTransitioning) return;
      
      isTransitioning = true;
      const wrapper = document.getElementById('authWrapper');
      
      // Add loading state
      wrapper.classList.add('loading');
      
      setTimeout(() => {
        wrapper.classList.remove('show-register');
        wrapper.classList.remove('loading');
        
        setTimeout(() => {
          isTransitioning = false;
        }, 800);
      }, 200);
    }

    // Mouse movement parallax effect
    document.addEventListener('mousemove', (e) => {
      if (isTransitioning) return;
      
      const spheres = document.querySelectorAll('.sphere3d');
      const wrapper = document.querySelector('.auth-wrapper');
      
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      spheres.forEach((sphere, index) => {
        const speed = 0.5 + (index * 0.1);
        const xMove = (x - 50) * speed;
        const yMove = (y - 50) * speed;
        
        sphere.style.transform = `translate(${xMove}px, ${yMove}px)`;
      });
      
      // Subtle wrapper tilt effect
      const xTilt = (x - 50) * 0.05;
      const yTilt = (y - 50) * 0.05;
      wrapper.style.transform = `rotateY(${xTilt}deg) rotateX(${-yTilt}deg)`;
    });

    // Input focus animation
    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('focus', function() {
        if (!isTransitioning) {
          this.parentElement.style.transform = 'translateZ(15px) scale(1.02)';
        }
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateZ(10px) scale(1)';
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && e.shiftKey && e.ctrlKey) {
        e.preventDefault();
        const wrapper = document.getElementById('authWrapper');
        if (wrapper.classList.contains('show-register')) {
          switchToLogin();
        } else {
          switchToRegister();
        }
      }
    });

    // Form validation for register
    document.querySelector('#registerContainer form').addEventListener('submit', function(e) {
      const password = this.querySelector('input[name="password"]').value;
      const confirmPassword = this.querySelector('input[name="confirm_password"]').value;
      
      if (password !== confirmPassword) {
        e.preventDefault();
        alert('Passwords do not match!');
        return false;
      }
      
      if (password.length < 6) {
        e.preventDefault();
        alert('Password must be at least 6 characters long!');
        return false;
      }
    });

    // Add enter key navigation between forms
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        const wrapper = document.getElementById('authWrapper');
        if (wrapper.classList.contains('show-register')) {
          switchToLogin();
        } else {
          switchToRegister();
        }
      }
    });
