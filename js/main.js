document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      });
    });
  }

  // Sticky Navbar
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load

  // Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // FAQ Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      // Close other open items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // Project Tracking Feature Logic
  const trackBtn = document.getElementById('trackBtn');
  const projectCodeInput = document.getElementById('projectCodeInput');
  const trackResult = document.getElementById('trackResult');

  // Mock Database for Project Codes
  const mockProjects = {
    'PTW-824': { name: 'GharKhoj Real Estate', status: 'Development', currentStep: 2, nextMilestone: 'Backend Integration API' },
    'PTW-912': { name: 'Spice Route Website', status: 'Design Mockup', currentStep: 1, nextMilestone: 'Client Approval on Figma UI' },
    'PTW-755': { name: 'Rangara E-Commerce', status: 'Final Testing', currentStep: 3, nextMilestone: 'Payment Gateway Live Test' },
    'PTW-102': { name: 'Veda Yoga Landing Page', status: 'Launched', currentStep: 4, nextMilestone: 'None. Site is Live!' }
  };

  const timelineSteps = [
    { title: 'Initial Discussion', desc: 'Requirements gathering & deposit' },
    { title: 'Design Mockup', desc: 'Figma UI design & revisions' },
    { title: 'Development', desc: 'Coding the frontend & backend' },
    { title: 'Final Testing', desc: 'QA, responsive checks & SEO' },
    { title: 'Launched', desc: 'Project delivered & live' }
  ];

  if (trackBtn && projectCodeInput && trackResult) {
    trackBtn.addEventListener('click', () => {
      const code = projectCodeInput.value.trim().toUpperCase();
      
      if (!code) {
        showTrackResult('<p style="color: var(--accent);"><i class="fa-solid fa-triangle-exclamation"></i> Please enter a project code.</p>');
        return;
      }

      // Simulate API Call delay
      trackResult.style.display = 'block';
      trackResult.innerHTML = '<p><i class="fa-solid fa-circle-notch fa-spin"></i> Fetching project timeline...</p>';

      setTimeout(() => {
        const project = mockProjects[code];
        
        if (project) {
          const colorClass = project.currentStep === 4 ? '#C19A6B' : 'var(--primary)';
          
          let timelineHTML = '<div class="timeline">';
          timelineSteps.forEach((step, index) => {
            let stepClass = '';
            let icon = '';
            if (index < project.currentStep) {
              stepClass = 'completed';
              icon = '<i class="fa-solid fa-check"></i>';
            } else if (index === project.currentStep) {
              stepClass = 'active';
              icon = '';
            } else {
              icon = index + 1;
            }
            
            timelineHTML += `
              <div class="timeline-step ${stepClass}">
                <div class="timeline-icon">${icon}</div>
                <div class="timeline-content">
                  <h4>${step.title}</h4>
                  <p>${step.desc}</p>
                </div>
              </div>
            `;
          });
          timelineHTML += '</div>';

          showTrackResult(`
            <h4 style="font-size: 1.25rem; font-family: 'Space Grotesk', sans-serif; margin-bottom: 0.5rem;">${project.name}</h4>
            <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Code: <strong>${code}</strong> | Status: <strong style="color: ${colorClass}">${project.status}</strong></p>
            
            <div style="background: rgba(255,255,255,0.02); padding: 1.5rem 1rem; border-radius: 12px; border: 1px solid var(--border-light);">
              ${timelineHTML}
            </div>
            
            <div style="background: rgba(193, 154, 107, 0.05); padding: 1rem; border-radius: 8px; border-left: 3px solid ${colorClass}; margin-top: 1.5rem;">
              <p style="margin: 0; font-size: 0.875rem;"><strong style="color: white;">Next Milestone:</strong> ${project.nextMilestone}</p>
            </div>
          `);

        } else {
          showTrackResult(`
            <div style="text-align: center;">
              <i class="fa-solid fa-circle-xmark" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
              <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Project Not Found</h4>
              <p style="color: var(--text-muted);">We couldn't find a project with the code <strong>${code}</strong>. Please check and try again.</p>
              <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 1rem;">Try mock codes: PTW-824, PTW-912, PTW-755, PTW-102</p>
            </div>
          `);
        }
      }, 800);
    });
  }

  function showTrackResult(htmlContent) {
    trackResult.style.display = 'block';
    trackResult.innerHTML = htmlContent;
    // Small animation
    trackResult.style.opacity = '0';
    trackResult.style.transform = 'translateY(10px)';
    setTimeout(() => {
      trackResult.style.transition = 'all 0.3s ease';
      trackResult.style.opacity = '1';
      trackResult.style.transform = 'translateY(0)';
    }, 50);
  }

  // Contact Form Submission via Formspree API
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = quoteForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
      btn.disabled = true;
      
      const formData = new FormData(quoteForm);
      
      try {
        const response = await fetch("https://formspree.io/f/xnjllzyk", {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Request Sent!';
          btn.style.background = '#C19A6B';
          
          // Trigger Modal
          const serviceSelect = quoteForm.querySelector('select[name="service"]');
          const serviceValue = serviceSelect ? serviceSelect.value : '';
          
          let amount = '₹300';
          let imgFile = 'qr-starter.jpg';
          
          if (serviceValue === 'business') {
            amount = '₹500';
            imgFile = 'qr-business.jpg';
          } else if (serviceValue === 'premium') {
            amount = '₹700';
            imgFile = 'qr-premium.jpg';
          }
          
          const modal = document.getElementById('depositModal');
          if (modal) {
            document.getElementById('depositAmount').innerText = amount;
            document.getElementById('qrCodeImage').src = 'assets/images/' + imgFile;
            
            setTimeout(() => {
              modal.classList.add('active');
            }, 500);
          }
          
          quoteForm.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error Sending';
        btn.style.background = '#ff5f56';
      }
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    });
  }

  // Modal Logic
  const depositModal = document.getElementById('depositModal');
  const closeModal = document.getElementById('closeModal');
  const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
  
  if (depositModal) {
    const closeFunc = () => depositModal.classList.remove('active');
    
    if (closeModal) closeModal.addEventListener('click', closeFunc);
    
    // Close on overlay click
    depositModal.addEventListener('click', (e) => {
      if (e.target === depositModal) closeFunc();
    });
    
    const payLaterBtn = document.getElementById('payLaterBtn');
    if (payLaterBtn) {
      payLaterBtn.addEventListener('click', () => {
        payLaterBtn.innerHTML = '<i class="fa-solid fa-clock"></i> Noted';
        setTimeout(() => {
          closeFunc();
          payLaterBtn.innerHTML = 'Pay Later';
        }, 1000);
      });
    }
    
    if (confirmPaymentBtn) {
      confirmPaymentBtn.addEventListener('click', () => {
        confirmPaymentBtn.innerHTML = '<i class="fa-solid fa-check"></i> Verified & Initialized';
        confirmPaymentBtn.style.background = '#C19A6B';
        setTimeout(() => {
          closeFunc();
          confirmPaymentBtn.innerHTML = 'I have paid';
          confirmPaymentBtn.style.background = '';
        }, 1500);
      });
    }
  }

  // Auto-select package from pricing buttons
  const pricingBtns = document.querySelectorAll('.pricing .btn');
  const serviceSelectInput = document.getElementById('serviceSelect');
  
  pricingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (serviceSelectInput) {
        if (btn.innerText.includes('Starter')) serviceSelectInput.value = 'starter';
        if (btn.innerText.includes('Business')) serviceSelectInput.value = 'business';
        if (btn.innerText.includes('Premium')) serviceSelectInput.value = 'premium';
      }
    });
  });

  // Cursor Glow Logic
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
      });
    });
  }
});
