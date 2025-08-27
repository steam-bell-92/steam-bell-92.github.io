function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function onScroll(header, aboutHeading, boxes, faqHeading, faqBoxes, workExperienceHeading, workExperienceBoxes, contactHeading, contactSubheading, contactBoxes) {
    const homeSection = document.querySelector('#home'); // Assuming the home section has an ID of 'home'
    const homeSectionTop = homeSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (homeSectionTop < windowHeight) {
        header.classList.add('visible');
    }
    if (isInViewport(aboutHeading)) {
        aboutHeading.classList.add('fade-in');
    }
    boxes.forEach((box, index) => {
        if (isInViewport(box)) {
            setTimeout(() => {
                box.classList.add('pop-up');
            }, index * 200);
        }
    });
    
    if (faqHeading && isInViewport(faqHeading)) {
        faqHeading.style.opacity = '1';
        faqHeading.style.transform = 'translateY(0)';
    }
    
    faqBoxes.forEach((faqBox, index) => {
        if (isInViewport(faqBox)) {
            setTimeout(() => {
                faqBox.style.opacity = '1';
                faqBox.style.transform = 'scale(1)';
            }, index * 200); 
        }
    });
    
    if (workExperienceHeading && isInViewport(workExperienceHeading)) {
        workExperienceHeading.classList.add('fade-in');
    }
    
    workExperienceBoxes.forEach((workBox, index) => {
        if (isInViewport(workBox)) {
            setTimeout(() => {
                workBox.classList.add('fade-in');
            }, index * 200); 
        }
    });

    contactBoxes.forEach((contactBox, index) => {
        if (isInViewport(contactBox)) {
            setTimeout(() => {
                contactBox.classList.add('fade-in');
            }, index * 200);
        }
    });
    if (contactHeading && isInViewport(contactHeading)) {
        contactHeading.classList.add('fade-in');
    }
    if (contactSubheading && isInViewport(contactSubheading)) {
        contactSubheading.classList.add('fade-in');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    if (header) {
        header.classList.add('visible');
    } else {
        console.error('Header element not found.');
    }

    const navLinks = document.querySelectorAll('nav a'); 

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                setTimeout(() => onScroll(header, aboutHeading, boxes, faqHeading, faqBoxes, workExperienceHeading, workExperienceBoxes, contactHeading, contactSubheading, contactBoxes), 500); // Adjust the delay as needed
            } else {
                console.error(`Target section with ID ${targetId} not found.`);
            }
        });
    });

    if (performance.getEntriesByType("navigation")[0].type === "reload") {
        window.location.hash = '#home';
    }

    const aboutHeading = document.querySelector('.about-heading');
    const boxes = document.querySelectorAll('.box');
    const faqHeading = document.querySelector('.faq-heading');
    const faqBoxes = document.querySelectorAll('.faq-box');
    const workExperienceHeading = document.querySelector('.work-experience-heading');
    const workExperienceBoxes = document.querySelectorAll('.work-experience-box');
    const contactHeading = document.querySelector('.contact-heading');
    const contactSubheading = document.querySelector('.contact-subheading');
    const contactBoxes = document.querySelectorAll('.contact-box');

    window.addEventListener('scroll', () => onScroll(header, aboutHeading, boxes, faqHeading, faqBoxes, workExperienceHeading, workExperienceBoxes, contactHeading, contactSubheading, contactBoxes));
    onScroll(header, aboutHeading, boxes, faqHeading, faqBoxes, workExperienceHeading, workExperienceBoxes, contactHeading, contactSubheading, contactBoxes); // Trigger the scroll event on page load

    if (faqHeading) {
        faqHeading.style.opacity = '1';
        faqHeading.style.transform = 'translateY(0)';
    }

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinksContainer = document.getElementById('nav-links');

    if (hamburgerMenu && navLinksContainer) {
        console.log('Hamburger menu and nav links container found.');

        hamburgerMenu.addEventListener('click', function () {
            console.log('Hamburger menu clicked.');
            navLinksContainer.classList.toggle('active');
        });

        document.addEventListener('click', function (event) {
            if (!navLinksContainer.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                console.log('Clicked outside nav links container.');
                navLinksContainer.classList.remove('active');
            }
        });
    } else {
        console.error('Hamburger menu or nav links container not found.');
    }
});