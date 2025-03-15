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
    
    // Original positions to restore when back to desktop
    let titleOriginalParent = null;
    let titleOriginalSibling = null;
    
    // Function to check if we're on mobile (using a breakpoint of 768px)
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Function to rearrange layout for mobile
    function rearrangeForMobile() {
        if (isMobile()) {
            // For mobile: We need title, then nav, then content
            
            // Step 1: Extract the title from right-content
            if (pageTitle && pageTitle.parentNode === rightContent) {
                // Save original positions to restore later
                titleOriginalParent = rightContent;
                titleOriginalSibling = pageTitle.nextElementSibling;
                
                // Move title to the very top of the page-layout parent
                pageLayout.parentNode.insertBefore(pageTitle, pageLayout);
                
                // Ensure title has full width
                pageTitle.style.width = '100%';
            }
            
            // Step 2: Move quick nav after the title
            if (quickNav && pageTitle) {
                pageLayout.parentNode.insertBefore(quickNav, pageLayout);
                
                // Ensure it has full width
                quickNav.style.width = '100%';
                quickNav.style.maxWidth = '100%';
                quickNav.style.margin = '20px 0';
            }
            
            // Step 3: Ensure page-layout only contains the right-content with main-content
            if (pageLayout) {
                pageLayout.style.padding = '0';
                pageLayout.style.flexDirection = 'column';
            }
        } else {
            // Restore desktop layout
            
            // Step 1: Move title back to its original position in right-content
            if (pageTitle && titleOriginalParent) {
                if (titleOriginalSibling) {
                    titleOriginalParent.insertBefore(pageTitle, titleOriginalSibling);
                } else {
                    titleOriginalParent.appendChild(pageTitle);
                }
                
                // Reset width
                pageTitle.style.width = '';
            }
            
            // Step 2: Move quick nav back to page-layout as first child
            if (quickNav && pageLayout) {
                pageLayout.insertBefore(quickNav, pageLayout.firstChild);
                
                // Reset styles
                quickNav.style.width = '';
                quickNav.style.maxWidth = '';
                quickNav.style.margin = '';
            }
            
            // Step 3: Reset page-layout styles
            if (pageLayout) {
                pageLayout.style.padding = '';
                pageLayout.style.flexDirection = '';
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
