document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on the question
            this.classList.toggle('active');
            
            // Toggle active class on the answer
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
        });
    });
});

/**
 * Debt Funds Mobile Layout Script
 * 
 * This script:
 * 1. Detects mobile viewport sizes
 * 2. Reorders page elements for mobile view (title > nav > content)
 * 3. Adds accordion functionality to Quick Navigation
 * 4. Handles FAQ accordion functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements we need to manipulate
    const pageLayout = document.querySelector('.page-layout');
    const quickNav = document.querySelector('.quick-navigation');
    const rightContent = document.querySelector('.right-content');
    const pageTitle = document.querySelector('.page-title');
    const mainContent = document.querySelector('.main-content');
    
    // Function to check if we're on mobile (using a breakpoint of 768px)
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Function to rearrange layout for mobile
    function rearrangeForMobile() {
        if (isMobile()) {
            // Ensure proper order on mobile: title -> nav -> content
            if (pageTitle && quickNav && mainContent) {
                // First, move the title outside and above the page layout
                if (pageTitle.parentNode === rightContent) {
                    pageLayout.parentNode.insertBefore(pageTitle, pageLayout);
                }
                
                // Move the quick nav inside the page layout but before main content
                if (quickNav.parentNode === pageLayout) {
                    pageLayout.insertBefore(quickNav, rightContent);
                }
                
                // Add class to indicate mobile view
                document.body.classList.add('mobile-view');
            }
        } else {
            // Restore desktop layout
            if (pageTitle && quickNav && mainContent && rightContent) {
                // Move title back to right content as the first child
                if (pageTitle.parentNode !== rightContent) {
                    rightContent.insertBefore(pageTitle, rightContent.firstChild);
                }
                
                // Ensure quick nav is directly inside page layout
                if (quickNav.parentNode !== pageLayout) {
                    pageLayout.insertBefore(quickNav, rightContent);
                }
                
                // Remove mobile view class
                document.body.classList.remove('mobile-view');
            }
        }
    }
    
 /*   // Initialize collapsible quick navigation for mobile
    function initMobileNavCollapse() {
        // Create a toggle button for the navigation
        const navToggle = document.createElement('button');
        navToggle.className = 'nav-toggle';
        navToggle.innerHTML = 'Menu <span class="toggle-icon">▼</span>';
        
        // Add styles to the toggle button
        navToggle.style.display = 'block';
        navToggle.style.width = '100%';
        navToggle.style.padding = '10px';
        navToggle.style.backgroundColor = '#4CAF50';
        navToggle.style.color = 'white';
        navToggle.style.border = 'none';
        navToggle.style.borderRadius = '4px';
        navToggle.style.cursor = 'pointer';
        navToggle.style.textAlign = 'left';
        navToggle.style.fontSize = '16px';
        navToggle.style.fontWeight = 'bold';
        
        // Insert the toggle button before the nav list
        const navList = quickNav.querySelector('ul');
        if (navList) {
            navList.style.display = isMobile() ? 'none' : 'flex';
            quickNav.insertBefore(navToggle, navList);
            
            // Toggle the nav list when the button is clicked
            navToggle.addEventListener('click', function() {
                const isVisible = navList.style.display !== 'none';
                navList.style.display = isVisible ? 'none' : 'flex';
                navToggle.querySelector('.toggle-icon').textContent = isVisible ? '▼' : '▲';
            });
        }
    }*/
    
    // Initialize FAQ accordion functionality
    function initFaqAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                // Toggle active class on the question
                this.classList.toggle('active');
                
                // Toggle the answer visibility
                const answer = this.nextElementSibling;
                if (answer.classList.contains('active')) {
                    answer.classList.remove('active');
                    answer.style.maxHeight = '0';
                    answer.style.padding = '0';
                } else {
                    answer.classList.add('active');
                    answer.style.padding = '20px';
                    answer.style.maxHeight = answer.scrollHeight + 40 + 'px'; // 40px for padding
                }
            });
        });
    }
    
    // Smooth scrolling for navigation links
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.quick-navigation a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only if the href is an anchor
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Close the navigation menu on mobile if it's open
                        if (isMobile()) {
                            const navList = quickNav.querySelector('ul');
                            if (navList && navList.style.display !== 'none') {
                                navList.style.display = 'none';
                                document.querySelector('.toggle-icon').textContent = '▼';
                            }
                        }
                        
                        // Scroll to the target element
                        window.scrollTo({
                            top: targetElement.offsetTop - 120, // Adjust for header height
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Apply layout changes immediately and on resize
    rearrangeForMobile();
    
   /* // Initialize the mobile navigation if we have the quick navigation element
    if (quickNav) {
        initMobileNavCollapse();
    }*/
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Add resize listener for responsive behavior
    window.addEventListener('resize', function() {
        rearrangeForMobile();
        
        // Update nav list display based on viewport size
        const navList = quickNav ? quickNav.querySelector('ul') : null;
        if (navList) {
            navList.style.display = isMobile() ? 'none' : 'flex';
            
            // Reset toggle icon state
            const toggleIcon = document.querySelector('.toggle-icon');
            if (toggleIcon) {
                toggleIcon.textContent = '▼';
            }
        }
    });
});
