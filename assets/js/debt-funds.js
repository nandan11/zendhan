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
            // We'll use CSS order property instead of moving elements in the DOM
            // This preserves the element's container context
            if (rightContent) {
                // Set flex-direction to column and use order properties
                rightContent.style.display = 'flex';
                rightContent.style.flexDirection = 'column';
                
                if (pageTitle) {
                    // Ensure the title has appropriate width
                    pageTitle.style.width = '100%';
                    pageTitle.style.order = '1'; // First
                }
                
                if (mainContent) {
                    mainContent.style.order = '3'; // Last
                }
            }
            
            if (quickNav) {
                // Move quick nav to be after title but before content
                pageLayout.insertBefore(quickNav, rightContent);
                quickNav.style.order = '2'; // Middle
                quickNav.style.width = '100%';
                quickNav.style.marginRight = '0';
            }
        } else {
            // Restore desktop layout
            if (rightContent) {
                // Remove the flex display settings
                rightContent.style.display = '';
                rightContent.style.flexDirection = '';
                
                if (pageTitle) {
                    pageTitle.style.order = '';
                    pageTitle.style.width = '';
                }
                
                if (mainContent) {
                    mainContent.style.order = '';
                }
            }
            
            if (quickNav) {
                // Ensure quick nav is directly inside page layout
                quickNav.style.order = '';
                quickNav.style.width = '';
                quickNav.style.marginRight = '';
                pageLayout.insertBefore(quickNav, rightContent);
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
