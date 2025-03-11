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
        ">-0.4"
    )
})

mainTl
    .add(revealerTl)
    .add(scaleTl, "-=1.5")
    .add(() => {
        document
            .querySelectorAll(".intro_img:not(.main)")
            .forEach((img) => img.remove());

        const state = Flip.getState(".main");
        const imagesContainer = document.querySelector(".intro_imgs");

        imagesContainer.classList.add("stacked-container");

        document.querySelectorAll(".main").forEach((img, i) => {
            img.classList.add("stacked");
            img.style.order = i;
            gsap.set(".intro_img.stacked", {
                clearProps:
                    "transform, bottom, left"
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
    }).add(() => {
        const curtain = document.querySelector(".curtains");
        curtain.style.display = "none";
        gsap.to(".js-intro_vignette-cur", {
            opacity: 0,
            duration: 1.5,
            onComplete: () => {
                document.querySelector(".js-intro_vignette-cur").style.display = "none";
            }
        });

        setTimeout(function () {
            const imgs = document.querySelectorAll('.intro_img');

            imgs.forEach(img => img.classList.add('dec'));

        }, 2500)

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
            const currIdx = swiper.realIndex + 1;
            navigationtitle.textContent = `0${currIdx}`

            const images = document.querySelectorAll('.intro_img');

            images.forEach(img => img.classList.remove('active'));

            images.forEach(img => {
                if (parseInt(img.getAttribute('data-slide')) === currIdx) {
                    img.classList.add('active');
                }
            });
        });

        const introImages = document.querySelectorAll('.intro_img');
        introImages.forEach((img) => {
            img.addEventListener('click', () => {
                const slideIndex = img.getAttribute('data-slide');
                swiper.slideTo(parseInt(slideIndex) - 1);

                introImages.forEach((item) => item.classList.remove('active'));

                img.classList.add('active');
            });
        });

        const progressBar = document.querySelector('.progress-bar');
        const progress = document.querySelector('.progress');

        progressBar.addEventListener('click', (e) => {
            const progressRect = progress.getBoundingClientRect();

            if (e.clientX < progressRect.left || e.clientX > progressRect.right) {
                swiper.slideNext();
            } else {
                swiper.slidePrev();
            }
        });
    }).to(".js-content_title-1, .js-content_title-2", {
        y: 0,
        duration: 3,
        ease: "hop2",
        stagger: 0.1,
        delav: 1.25
    })

options = {
    "hoverEffect": "circle-move",
    "hoverItemMove": false,
    "defaultCursor": false,
    "outerWidth": 30,
    "outerHeight": 30
};
magicMouse(options);