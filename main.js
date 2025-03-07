const SideBarModule = (function () {
    const closeBtns = document.querySelectorAll('.js-side-bar-toggle');
    const sideBar = document.getElementById('aside');
    const sideBarLinks = document.querySelectorAll('.js-aside__link');
    const asideLinkGroup = document.getElementById('aside__link-group');

    // Click event listener for open-close sidebar buttons
    closeBtns.forEach(function (element) {
        element.addEventListener('click', function (event) {
            element.classList.toggle('open');
            sideBar.classList.toggle('aside--open');
            const header = document.getElementById('header');
            
            document.body.classList.toggle("no-scroll");
      
            if (!asideLinkGroup.classList.contains('aside__link-group--active')) {
                setTimeout(function () {
                    asideLinkGroup.classList.toggle('aside__link-group--active');
                }, 300)
            } else {
                asideLinkGroup.classList.toggle('aside__link-group--active');
            }

            if (sideBar.classList.contains("aside--open")) {
                header.classList.remove('header--scroll-active');
            } else {
                let y = window.scrollY || window.pageYOffset;
                if (y > 0) header.classList.add('header--scroll-active');
            }
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
})()

const HeaderModule = (function () {
    const header = document.getElementById('header');

    // Active header if page is away from top
    window.addEventListener('scroll', function () {
        let y = Math.round(this.scrollY);

        if (y > 0) {
            header.classList.add('header--scroll-active');
        } else {
            header.classList.remove("header--scroll-active");
        }
    });
})();