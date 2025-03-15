document.addEventListener('DOMContentLoaded', function() {
    // Get all sections
    const sections = document.querySelectorAll('.content-block');
    const navLinks = document.querySelectorAll('.quick-navigation a');
    
    // Highlight active section on scroll
    function highlightNavigation() {
        let scrollPosition = window.scrollY;
        
        // Add some offset to account for navbar
        scrollPosition += 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Call once to set initial state
    
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

document.addEventListener('DOMContentLoaded', function() {
  // Function to check if we're on mobile
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Function to rearrange elements
  function rearrangeElements() {
    const pageLayout = document.querySelector('.page-layout');
    const quickNavigation = document.querySelector('.quick-navigation');
    const rightContent = document.querySelector('.right-content');
    const pageTitle = document.querySelector('.page-title');
    const mainContent = document.querySelector('.main-content');
    
    if (isMobile()) {
      // On mobile: Title -> Navigation -> Main Content
      pageLayout.innerHTML = ''; // Clear the container
      
      // Append in desired order
      pageLayout.appendChild(pageTitle);
      pageLayout.appendChild(quickNavigation);
      pageLayout.appendChild(mainContent);
    } else {
      // On desktop: restore original structure
      pageLayout.innerHTML = ''; // Clear the container
      
      // Recreate original structure
      pageLayout.appendChild(quickNavigation);
      rightContent.innerHTML = ''; // Clear right content
      rightContent.appendChild(pageTitle);
      rightContent.appendChild(mainContent);
      pageLayout.appendChild(rightContent);
    }
  }

  // Run on page load
  rearrangeElements();
  
  // Run when window is resized
  window.addEventListener('resize', rearrangeElements);
});
