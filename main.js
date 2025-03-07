const SideBarModule = (function () {
    const closeBtns = document.querySelectorAll('.js-side-bar-toggle');
    const sideBar = document.getElementById('aside');
    const sideBarLinks = document.querySelectorAll('.js-aside__link');

    const banner = document.getElementById('banner');
    const about = document.getElementById('about');
    const service = document.getElementById('service');
    const portfolio = document.getElementById('portfolio');
    const contact = document.getElementById('contact');

    const bannerLink = document.getElementById('banner-link');
    const aboutLink = document.getElementById('about-link');
    const serviceLink = document.getElementById('service-link');
    const portfolioLink = document.getElementById('portfolio-link');
    const contactLink = document.getElementById('contact-link');

    // Click event listener for open-close sidebar buttons
    closeBtns.forEach(function (element) {
        element.addEventListener('click', function (event) {
            sideBar.classList.toggle('aside--open');
            element.classList.toggle('open');
        })
    })
    

    // Click event listener for every sidebar link 
    sideBarLinks.forEach(function (element) {
        element.addEventListener('click', function (event) {
            let sideBarLinkActive = document.querySelector('.sidebar--active');
            let y = document.documentElement.scrollTop;

            // Stop page-scroll event listener
            window.removeEventListener('scroll', SideBarScrollAnimation);

            // Remove current active side-bar link
            sideBarLinkActive.classList.remove('sidebar--active');
            // Set active class to current event element
            event.target.classList.add('sidebar--active');

            // Wait .5s and close side-bar
            setTimeout(function () {
                sideBar.classList.toggle('aside--open');
            }, 500);

            // Check if Page is scrolling or not - if not active page-scroll event listener 
            var checkScroll = setInterval(function () {
                if (y === document.documentElement.scrollTop) {
                    window.addEventListener('scroll', SideBarScrollAnimation);
                    clearInterval(checkScroll);
                } else y = document.documentElement.scrollTop;
            }, 500);
        })
    })

    //Page scroll event listener (change side-bar active link)
    window.addEventListener('scroll', SideBarScrollAnimation);

    function SideBarScrollAnimation() {
        let sideBarLinkActive = document.querySelector('.sidebar--active');
        let y = Math.round(this.scrollY);

        if (y >= banner.offsetTop && y < about.offsetTop) {
            sideBarLinkActive.classList.remove('sidebar--active');
            bannerLink.classList.add('sidebar--active');
        }

        if (y >= about.offsetTop && y < service.offsetTop) {
            sideBarLinkActive.classList.remove('sidebar--active');
            aboutLink.classList.add('sidebar--active');
        }

        if (y >= service.offsetTop && y < portfolio.offsetTop) {
            sideBarLinkActive.classList.remove('sidebar--active');
            serviceLink.classList.add('sidebar--active');
        }


        if (y >= portfolio.offsetTop && y < contact.offsetTop && Math.ceil(window.innerHeight + window.scrollY) < document.body.scrollHeight) {
            sideBarLinkActive.classList.remove('sidebar--active');
            portfolioLink.classList.add('sidebar--active');
        }

        if (y >= contact.offsetTop) {
            sideBarLinkActive.classList.remove('sidebar--active');
            contactLink.classList.add('sidebar--active');
        }

        if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            sideBarLinkActive.classList.remove('sidebar--active');
            contactLink.classList.add('sidebar--active');
        }
    }
})()

const HeaderModule = (function () {
    const header = document.getElementById('banner-header');

    // Active header if page is away from top
    window.addEventListener('scroll', function () {
        let y = Math.round(this.scrollY);

        if (y > 0) {
            header.classList.add('banner__header--scroll-active');
        } else {
            header.classList.remove("banner__header--scroll-active");
        }
    });
})();