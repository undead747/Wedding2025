const SideBarModule = (function () {
    window.scrollTo(0, 0);

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

async function loadData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Dữ liệu đã tải xong!");
            resolve();
        }, 100000);
    });
}

async function initialize() {
    document.body.classList.toggle("intro");

    var animation = lottie.loadAnimation({
        container: document.getElementById('lottie-container'), // The div where animation will appear
        renderer: 'svg', // or 'canvas' or 'html'
        loop: true, // true for infinite loop
        autoplay: true, // auto play on load
        path: 'heart-balloons.json' // Path to your JSON file
    });

    const typingTextElement = document.getElementById('typing-text');
    const texts = [
        'Đang chuẩn bị mọi thứ cho bạn,',
        'Chúng tôi sẽ mang lại những trải nghiệm tuyệt vời!',
    ];
    let currentIndex = 0;

    function changeText() {
        typingTextElement.textContent = ''; // Clear current text
        typingTextElement.style.animation = 'none'; // Reset animation

        // Change text after a delay
        setTimeout(() => {
            typingTextElement.textContent = texts[currentIndex]; // Set new text
            // Trigger animation again
            typingTextElement.style.animation = 'typing 4s steps(22) 1s forwards, blink 0.5s step-end infinite alternate';
        }, 1000); // Delay before changing text (1 second)
    }

    function loopText() {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % texts.length; // Loop through texts
            changeText();
        }, 5000); // Wait for 5 seconds before changing text
    }

    // Initialize the loop
    loopText();

    await loadData();
    runGSAPAnimations();
    document.body.classList.toggle("intro");
}

function runGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".section-studio_gallery_item").forEach((item) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none none",
            }
        });
    });

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

    scaleTl.to(".intro_img:first-child", {
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
        }, ">-0.4");
    });

    mainTl.add(revealerTl)
        .add(scaleTl, "-=2")
        .add(() => {
            document.querySelectorAll(".intro_img:not(.main)").forEach((img) => img.remove());

            const state = Flip.getState(".main");
            const imagesContainer = document.querySelector(".intro_imgs");

            imagesContainer.classList.add("stacked-container");

            document.querySelectorAll(".main").forEach((img, i) => {
                img.classList.add("stacked");
                img.style.order = i + 1;
                gsap.set(".intro_img.stacked", {
                    clearProps: "transform, top, left"
                });
            });

            return Flip.from(state, {
                duration: 1,
                ease: "hop",
                absolute: true,
                stagger: { amount: -0.3 }
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

            setTimeout(() => {
                gsap.to(".btn-seemore, .menu-icon, .navigation", {
                    opacity: 1,
                    duration: 1,
                    delay: 1.5
                });
            }, 1500);

            setTimeout(() => {
                document.querySelectorAll('.intro_img').forEach(img => img.classList.add('dec'));
                document.querySelector(".intro_img")?.classList.add("active");
            }, 2500);

            var swiper = new Swiper(".background", {
                loop: true,
                autoplay: { delay: 5000, disableOnInteraction: false },
                navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
                pagination: { el: ".swiper-pagination", clickable: true },
                effect: "fade",
            });

            swiper.on('slideChange', function () {
                const navigationTitle = document.querySelector('.js-navigation_title');
                const currIdx = swiper.realIndex + 1;
                navigationTitle.textContent = `0${currIdx}`;

                document.querySelectorAll('.intro_img').forEach(img => img.classList.remove('active'));
                document.querySelectorAll('.intro_img').forEach(img => {
                    if (parseInt(img.getAttribute('data-slide')) === currIdx) {
                        img.classList.add('active');
                    }
                });
            });

            document.querySelectorAll('.intro_img').forEach((img) => {
                img.addEventListener('click', () => {
                    const slideIndex = img.getAttribute('data-slide');
                    swiper.slideTo(parseInt(slideIndex) - 1);
                    document.querySelectorAll('.intro_img').forEach((item) => item.classList.remove('active'));
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
        });

    options = {
        "hoverEffect": "circle-move",
        "hoverItemMove": false,
        "defaultCursor": false,
        "outerWidth": 30,
        "outerHeight": 30
    };
    magicMouse(options);
}

// Gọi hàm initialize để bắt đầu quá trình tải dữ liệu và chạy GSAP sau khi xong
initialize();