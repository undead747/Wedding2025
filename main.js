const SideBarModule = (function () {
    const closeBtns = document.querySelector('.js-side-bar-toggle');
    const sideBar = document.getElementById('aside');
    const sideBarLinks = document.querySelectorAll('.js-aside__link');
    const asideLinkGroup = document.getElementById('aside__link-group');

    // Click event listener for open-close sidebar buttons
    closeBtns.addEventListener('click', function (event) {
        closeBtns.classList.toggle('open');
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

    // Click event listener for every sidebar link 
    sideBarLinks.forEach(function (element) {
        element.addEventListener('click', function (event) {
            const headerScrollActive = document.querySelector('.header--scroll-active');

            sideBar.classList.toggle('aside--open');
            document.body.classList.toggle("no-scroll");
            closeBtns.classList.remove("open");
            asideLinkGroup.classList.toggle('aside__link-group--active');
            if (!headerScrollActive) header.classList.add('header--scroll-active');
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

var swiper = new Swiper(".background", {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    effect: "fade",
});

swiper.on('slideChange', function () {
    const navigationtitle = document.querySelector('.js-navigation_title');
    navigationtitle.textContent = `0${swiper.realIndex + 1}`
});