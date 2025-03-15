document.addEventListener('DOMContentLoaded', function() {
  // Function to reorder elements for mobile layout
  function adjustMobileLayout() {
    const pageLayout = document.querySelector('.page-layout');
    const quickNav = document.querySelector('.quick-navigation');
    const rightContent = document.querySelector('.right-content');
    const pageTitle = document.querySelector('.page-title');
    const mainContent = document.querySelector('.main-content');
    
    // Check if we're on a mobile device (less than 768px)
    if (window.innerWidth <= 768) {
      // If right-content div doesn't exist yet (for compatibility with both HTML versions)
      if (!rightContent && pageTitle && mainContent) {
        // Create right-content div if it doesn't exist
        const newRightContent = document.createElement('div');
        newRightContent.className = 'right-content';
        
        // Move elements to maintain proper order
        pageLayout.appendChild(newRightContent);
        
        // Move the title to top position
        pageLayout.insertBefore(pageTitle, pageLayout.firstChild);
        
        // Move quick navigation after the title
        if (quickNav) {
          pageLayout.insertBefore(quickNav, pageTitle.nextSibling);
        }
        
        // Move main content to the bottom
        newRightContent.appendChild(mainContent);
      } else if (rightContent) {
        // For the HTML structure that already has right-content
        
        // Move the title outside right-content to the top
        if (pageTitle) {
          pageLayout.insertBefore(pageTitle, pageLayout.firstChild);
        }
        
        // Move quick navigation after the title
        if (quickNav) {
          pageLayout.insertBefore(quickNav, pageTitle.nextSibling);
        }
      }
      
      // Add mobile-view class to body for any additional CSS targeting
      document.body.classList.add('mobile-view');
    } else {
      // Reset to desktop layout
      if (rightContent) {
        // Move title back inside right-content
        if (pageTitle && !rightContent.contains(pageTitle)) {
          rightContent.insertBefore(pageTitle, rightContent.firstChild);
        }
        
        // Move quick nav back to original position
        if (quickNav && quickNav.nextSibling !== rightContent) {
          pageLayout.insertBefore(quickNav, pageLayout.firstChild);
        }
      }
      
      // Remove mobile-view class
      document.body.classList.remove('mobile-view');
    }
    
    // Apply additional styling for mobile
    if (window.innerWidth <= 768) {
      if (quickNav) {
        quickNav.style.position = 'relative';
        quickNav.style.width = '100%';
        quickNav.style.maxWidth = '100%';
        quickNav.style.order = '0';
        quickNav.style.marginRight = '0';
      }
      
      if (pageTitle) {
        pageTitle.style.order = '-1';
        pageTitle.style.width = '100%';
      }
      
      if (mainContent) {
        mainContent.style.order = '1';
        mainContent.style.width = '100%';
      }
    } else {
      // Reset styles for desktop
      if (quickNav) {
        quickNav.style.position = 'sticky';
        quickNav.style.width = '280px';
        quickNav.style.maxWidth = '280px';
        quickNav.style.order = '';
        quickNav.style.marginRight = '30px';
      }
      
      if (pageTitle) {
        pageTitle.style.order = '';
        pageTitle.style.width = '100%';
      }
      
      if (mainContent) {
        mainContent.style.order = '';
        mainContent.style.width = '';
      }
    }
  }
  
  // Run when the page loads
  adjustMobileLayout();
  
  // Run when the window resizes
  window.addEventListener('resize', adjustMobileLayout);
});
