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
 * This script ensures that on mobile devices:
 * 1. Title appears at the top
 * 2. Quick navigation appears below the title
 * 3. Main content follows the navigation
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
            }
        }
    }
    
    // Apply layout changes immediately and on resize
    rearrangeForMobile();
    
    // Add resize listener for responsive behavior
    window.addEventListener('resize', function() {
        rearrangeForMobile();
    });
});
