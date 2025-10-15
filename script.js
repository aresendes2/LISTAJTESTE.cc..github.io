//* ========================================
 //* Lista J - Página Oficial
 //* JavaScript Principal
 //* ========================================
 //

(function() {
    'use strict';

    // ========================================
    // 1. VARIÁVEIS GLOBAIS
    // ========================================
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const sections = document.querySelectorAll('section[id]');
    const toastContainer = document.getElementById('toast-container');
    const contactForm = document.getElementById('contact-form');

    // ========================================
    // 2. MENU MOBILE
    // ========================================
    
    /**
     * Toggle do menu mobile
     */
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }

    /**
     * Fechar menu mobile ao clicar num link
     */
    function closeMobileMenu() {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }

    // Event listeners para o menu mobile
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Apenas fechar o menu se for um link interno
            if (link.getAttribute('href').startsWith('#')) {
                closeMobileMenu();
            }
        });
    });

    // ========================================
    // 3. NAVEGAÇÃO ATIVA NO SCROLL
    // ========================================
    
    /**
     * Atualizar link ativo na navegação baseado na posição do scroll
     */
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ========================================
    // 4. EFEITO DE SCROLL NA NAVEGAÇÃO
    // ========================================
    
    /**
     * Adicionar classe 'scrolled' à navegação quando o utilizador faz scroll
     */
    function handleNavScroll() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    // ========================================
    // 5. TOAST NOTIFICATIONS
    // ========================================
    
    /**
     * Mostrar notificação toast
     * @param {string} message - Mensagem a exibir
     * @param {string} type - Tipo de notificação (success, error, info)
     */
    function showToast(message, type = 'success') {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconClass = type === 'success' ? 'check-circle' : 
                         type === 'error' ? 'exclamation-circle' : 
                         'info-circle';
        
        toast.innerHTML = `
            <i class="fas fa-${iconClass} toast-icon"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Remover toast após 3 segundos
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // ========================================
    // 6. FORMULÁRIO DE CONTACTO
    // ========================================
    
    /**
     * Validar email
     * @param {string} email - Email a validar
     * @returns {boolean}
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Processar envio do formulário de contacto
     * @param {Event} e - Evento de submit
     */
    function handleContactFormSubmit(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        // Obter valores do formulário
        const formData = {
            name: document.getElementById('name')?.value.trim(),
            email: document.getElementById('email')?.value.trim(),
            message: document.getElementById('message')?.value.trim()
        };
        
        // Validação
        if (!formData.name || formData.name.length < 3) {
            showToast('Por favor, insira um nome válido (mínimo 3 caracteres).', 'error');
            return;
        }
        
        if (!formData.email || !isValidEmail(formData.email)) {
            showToast('Por favor, insira um email válido.', 'error');
            return;
        }
        
        if (!formData.message || formData.message.length < 10) {
            showToast('Por favor, insira uma mensagem válida (mínimo 10 caracteres).', 'error');
            return;
        }
        
        // Desabilitar botão durante o envio
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A enviar...';
        
        // Simular envio (substituir por chamada API real)
        setTimeout(() => {
            showToast('Mensagem enviada com sucesso! Entraremos em contacto em breve.', 'success');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }, 1500);
        
        // Exemplo de integração com API:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            showToast('Mensagem enviada com sucesso!', 'success');
            contactForm.reset();
        })
        .catch(error => {
            showToast('Erro ao enviar mensagem. Tente novamente.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
        */
    }

    // Event listener para o formulário
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // ========================================
    // 7. SCROLL REVEAL ANIMATION
    // ========================================
    
    /**
     * Revelar elementos ao fazer scroll
     */
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    // ========================================
    // 8. SMOOTH SCROLL PARA LINKS INTERNOS
    // ========================================
    
    /**
     * Adicionar smooth scroll para links internos
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Ignorar links vazios
                if (href === '#' || href === '#!') {
                    e.preventDefault();
                    return;
                }
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80; // Ajustar para altura da navegação
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========================================
    // 9. EVENT LISTENERS GLOBAIS
    // ========================================
    
    /**
     * Inicializar todos os event listeners
     */
    function initEventListeners() {
        // Scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            // Debounce para melhor performance
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                updateActiveNavLink();
                handleNavScroll();
                revealOnScroll();
            }, 10);
        });

        // Resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Fechar menu mobile se a janela for redimensionada
                if (window.innerWidth > 768) {
                    closeMobileMenu();
                }
            }, 250);
        });

        // Fechar menu mobile ao clicar fora
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    // ========================================
    // 10. INICIALIZAÇÃO
    // ========================================
    
    /**
     * Inicializar todas as funcionalidades quando o DOM estiver pronto
     */
    function init() {
        console.log('Lista J - Website carregado com sucesso!');
        
        // Inicializar funcionalidades
        initEventListeners();
        initSmoothScroll();
        updateActiveNavLink();
        handleNavScroll();
        revealOnScroll();
        
        // Adicionar classe reveal a elementos que devem ter animação
        const animatedElements = document.querySelectorAll('.card, .team-member, .event-item');
        animatedElements.forEach(element => {
            element.classList.add('reveal');
        });
        
        // Mostrar toast de boas-vindas (opcional)
        // showToast('Bem-vindo à Lista J!', 'info');
    }

    // Executar quando o DOM estiver completamente carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ========================================
    // 11. EXPORTAR FUNÇÕES PÚBLICAS
    // ========================================
    
    // Tornar algumas funções disponíveis globalmente se necessário
    window.ListaJ = {
        showToast: showToast,
        closeMobileMenu: closeMobileMenu
    };

})();

/**
 * ========================================
 * FIM DO SCRIPT
 * ======================================
 */