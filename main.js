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

// var swiper = new Swiper(".background", {
//     loop: true,
//     autoplay: {
//         delay: 5000,
//         disableOnInteraction: false,
//     },
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//     },
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//     },
//     effect: "fade",
// });

CustomEase.create("hop", "M0,0 C0.355,0.022 0.448,0.079 0.5,0.5 0.542,0.846 0.615,1 1,1 ");
CustomEase.create("hop2", "M0,0 C0.078,0.617 0.114,0.716 0.255,0.828 0.373,0.922 0.561,1 1,1 ");

const mainTl = gsap.timeline();
const revealerTl = gsap.timeline();
const scaleTl = gsap.timeline();

revealerTl.to(".curtain-top", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    duration: 1.5,
    ease: "hop"
}).to(".curtain-bottom", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    duration: 1.5,
    ease: "hop"
}, "<");

revealerTl.to(".r-1", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    duration: 1.5,
    ease: "hop"
}).to(".r-2", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    duration: 1.5,
    ease: "hop"
}, "<");

scaleTl.to(" .intro_img:first-child", {
    scale: 1,
    duration: 2,
    ease: "power4.inOut"
});

const images = document.querySelectorAll(".intro_img:not(:first-child)");

images.forEach((img, index) => {
    scaleTl.to(img, {
        display: "block",
        scale: 1,
        duration: 1,
        ease: "power3.out"
    },
        ">-0.5"
    )
})

mainTl
    .add(revealerTl)
    .add(scaleTl, "-=1.25")
    .add(() => {
        document
            .querySelectorAll(".img:not(.main)")
            .forEach((img) => img.remove());

        const state = Flip.getState(".main");
        const imagesContainer = document.querySelector(".images");

        imagesContainer.classList.add("stacked-container");

        document.querySelectorAll(".main").forEach((img, i) => {
            img.classList.add("stacked");
            img.style.order = i;
            gsap.set(".img.stacked", {
                clearProps:
                    "transform, top, left"
            });
        });

        return Flip.from(state, {
            duration: 2,
            ease: "hop",
            absolute: true,
            stagger: {
                amount: -0.3,
            }
        });
    })

// swiper.on('slideChange', function () {
//     const navigationtitle = document.querySelector('.js-navigation_title');
//     navigationtitle.textContent = `0${swiper.realIndex + 1}`
// });

options = {
    "hoverEffect": "circle-move",
    "hoverItemMove": false,
    "defaultCursor": false,
    "outerWidth": 30,
    "outerHeight": 30
};
magicMouse(options);